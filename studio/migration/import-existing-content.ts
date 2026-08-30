import {createHash} from 'node:crypto'
import {createReadStream} from 'node:fs'
import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'
import type {SanityClient, SanityDocument} from '@sanity/client'
import {getCliClient} from 'sanity/cli'
import {extractSourceContent} from './extract'
import {
  API_VERSION,
  DATASET,
  LOCAL_ASSET_SOURCE,
  PROJECT_ID,
  REMOTE_ASSET_SOURCE,
} from './source'
import {
  createReport,
  dryRunAssets,
  migrationDocumentIds,
  transformDocuments,
  validateSource,
} from './transform'
import type {
  AssetReferenceMap,
  LocalImageCandidate,
  MigrationReport,
  SanityDocumentInput,
  SourceContent,
} from './types'

const studioRoot = process.cwd()
const repoRoot = path.resolve(studioRoot, '..')
const migrationRoot = path.join(studioRoot, 'migration')
const extractedDirectory = path.join(migrationRoot, 'extracted')
const reportDirectory = path.join(migrationRoot, 'reports')

function requestedMode(): MigrationReport['mode'] {
  if (process.argv.includes('--execute')) return 'execute'
  if (process.argv.includes('--validate-live')) return 'validate-live'
  return 'dry-run'
}

async function writeJson(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), {recursive: true})
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function sourceSnapshot(source: SourceContent) {
  return {
    generatedFrom: {
      projects: 'data/projects/*.ts',
      projectOrder: 'data/projects/index.ts',
      about: 'app/about/page.tsx and public/img/about',
      siteSettings: 'app/layout.tsx and app/about/page.tsx',
      images: 'public/img/**/*.webp',
    },
    ...source,
  }
}

async function mapConcurrent<T, U>(
  values: readonly T[],
  concurrency: number,
  worker: (value: T, index: number) => Promise<U>,
): Promise<U[]> {
  const results = new Array<U>(values.length)
  let nextIndex = 0

  async function runWorker() {
    while (nextIndex < values.length) {
      const index = nextIndex
      nextIndex += 1
      results[index] = await worker(values[index], index)
    }
  }

  await Promise.all(Array.from({length: Math.min(concurrency, values.length)}, runWorker))
  return results
}

interface ExistingAsset {
  _id: string
  source?: {id?: string; name?: string}
}

async function existingAssets(client: SanityClient) {
  const records = await client.fetch<ExistingAsset[]>(
    `*[_type == "sanity.imageAsset" && source.name in $sourceNames]{_id, source}`,
    {sourceNames: [LOCAL_ASSET_SOURCE, REMOTE_ASSET_SOURCE]},
  )

  return new Map(
    records
      .filter((record) => record.source?.name && record.source.id)
      .map((record) => [`${record.source?.name}:${record.source?.id}`, record._id]),
  )
}

async function remoteSocialImage(source: SourceContent) {
  const url = source.siteSettings.defaultSeo.socialImageUrl
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Could not download social image (${response.status}): ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())

  return {
    url,
    buffer,
    contentType: response.headers.get('content-type') || 'image/png',
    sha256: createHash('sha256').update(buffer).digest('hex'),
  }
}

async function resolveAssets(
  client: SanityClient,
  source: SourceContent,
  allowUpload: boolean,
): Promise<{
  assets: AssetReferenceMap
  uploaded: number
  reused: number
  missingSourceIds: string[]
}> {
  const knownAssets = await existingAssets(client)
  let uploaded = 0
  let reused = 0
  const missingSourceIds: string[] = []

  const localEntries = await mapConcurrent(
    source.localImageCandidates,
    3,
    async (candidate: LocalImageCandidate, index) => {
      const sourceId = `sha256:${candidate.sha256}`
      const lookupKey = `${LOCAL_ASSET_SOURCE}:${sourceId}`
      let assetId = knownAssets.get(lookupKey)

      if (assetId) {
        reused += 1
      } else if (allowUpload) {
        const absolutePath = path.join(repoRoot, candidate.path)
        const uploadedAsset = await client.assets.upload('image', createReadStream(absolutePath), {
          filename: path.basename(candidate.path),
          contentType: 'image/webp',
          title: candidate.path,
          source: {id: sourceId, name: LOCAL_ASSET_SOURCE},
        })
        assetId = uploadedAsset._id
        knownAssets.set(lookupKey, assetId)
        uploaded += 1
        console.log(`[asset ${index + 1}/${source.localImageCandidates.length}] ${candidate.path}`)
      } else {
        missingSourceIds.push(lookupKey)
      }

      return [candidate.path, assetId] as const
    },
  )

  const remote = await remoteSocialImage(source)
  const remoteSourceId = `sha256:${remote.sha256}`
  const remoteLookupKey = `${REMOTE_ASSET_SOURCE}:${remoteSourceId}`
  let socialImage = knownAssets.get(remoteLookupKey)
  if (socialImage) {
    reused += 1
  } else if (allowUpload) {
    const uploadedAsset = await client.assets.upload('image', remote.buffer, {
      filename: path.basename(new URL(remote.url).pathname) || 'meta_img.png',
      contentType: remote.contentType,
      title: 'Studio.Stuckn default social image',
      source: {id: remoteSourceId, name: REMOTE_ASSET_SOURCE, url: remote.url},
    })
    socialImage = uploadedAsset._id
    uploaded += 1
  } else {
    missingSourceIds.push(remoteLookupKey)
  }

  return {
    assets: {
      local: new Map(
        localEntries
          .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
          .map(([sourcePath, assetId]) => [sourcePath, assetId]),
      ),
      socialImage: socialImage || 'missing-social-image',
    },
    uploaded,
    reused,
    missingSourceIds,
  }
}

async function replaceDocuments(
  client: SanityClient,
  documents: ReturnType<typeof transformDocuments>,
) {
  const baseCategories = documents.categories.map((category) => {
    const {representativeProject: _representativeProject, ...baseCategory} = category
    return baseCategory as SanityDocumentInput
  })

  const groups = [
    baseCategories,
    documents.projects,
    documents.categories,
    [documents.aboutPage, documents.siteSettings],
  ]

  for (const group of groups) {
    let transaction = client.transaction()
    group.forEach((document) => {
      transaction = transaction.createOrReplace(document)
    })
    await transaction.commit({visibility: 'sync'})
  }

  return documents.projects.length + documents.categories.length + 2
}

function stripSystemFields(document: SanityDocument | SanityDocumentInput) {
  const result: Record<string, unknown> = {}
  for (const [field, value] of Object.entries(document)) {
    if (['_createdAt', '_updatedAt', '_rev', '_originalId'].includes(field)) continue
    result[field] = value
  }
  return result
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([field, nested]) => `${JSON.stringify(field)}:${canonicalJson(nested)}`)
      .join(',')}}`
  }
  return JSON.stringify(value)
}

function collectReferences(
  value: unknown,
  currentPath: string,
  references: Array<{path: string; id: string}>,
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectReferences(item, `${currentPath}[${index}]`, references))
    return
  }

  if (!value || typeof value !== 'object') return
  const object = value as Record<string, unknown>
  if (object._type === 'reference' && typeof object._ref === 'string') {
    references.push({path: currentPath, id: object._ref})
  }
  Object.entries(object).forEach(([field, nested]) =>
    collectReferences(nested, currentPath ? `${currentPath}.${field}` : field, references),
  )
}

async function validateLive(
  client: SanityClient,
  source: SourceContent,
  assets: AssetReferenceMap,
  expected: ReturnType<typeof transformDocuments>,
): Promise<NonNullable<MigrationReport['live']>> {
  const expectedDocuments = [
    ...expected.categories,
    ...expected.projects,
    expected.aboutPage,
    expected.siteSettings,
  ]
  const documentIds = migrationDocumentIds(source)
  const actualDocuments = await client.fetch<SanityDocument[]>(`*[_id in $ids]`, {ids: documentIds})
  const actualById = new Map(actualDocuments.map((document) => [document._id, document]))
  const missingDocumentIds = documentIds.filter((id) => !actualById.has(id))
  const mismatchedDocumentIds = expectedDocuments
    .filter((document) => {
      const actual = actualById.get(document._id)
      return (
        !actual ||
        canonicalJson(stripSystemFields(actual)) !== canonicalJson(stripSystemFields(document))
      )
    })
    .map((document) => document._id)

  const expectedAssetIds = [...new Set([...assets.local.values(), assets.socialImage])]
  const foundAssetIds = await client.fetch<string[]>(
    `*[_type == "sanity.imageAsset" && _id in $ids]._id`,
    {ids: expectedAssetIds},
  )
  const foundAssetSet = new Set(foundAssetIds)
  const missingAssetIds = expectedAssetIds.filter((id) => !foundAssetSet.has(id))

  const references: Array<{path: string; id: string}> = []
  actualDocuments.forEach((document) => collectReferences(document, document._id, references))
  const validReferenceIds = new Set([...actualById.keys(), ...foundAssetIds])
  const unresolvedReferencePaths = references
    .filter((item) => !validReferenceIds.has(item.id))
    .map((item) => `${item.path} -> ${item.id}`)

  return {
    foundDocuments: actualDocuments.length,
    foundAssets: foundAssetIds.length,
    missingDocumentIds,
    missingAssetIds,
    mismatchedDocumentIds,
    unresolvedReferencePaths,
  }
}

async function main() {
  const mode = requestedMode()
  const source = await extractSourceContent(repoRoot)
  const {issues, valid} = await validateSource(repoRoot, source)
  const report = createReport(source, issues, mode)

  await writeJson(path.join(extractedDirectory, 'existing-content.json'), sourceSnapshot(source))

  if (!valid) {
    await writeJson(path.join(reportDirectory, `existing-content-${mode}.json`), report)
    throw new Error('Source validation failed. Review the migration report before importing.')
  }

  if (mode === 'dry-run') {
    const documents = transformDocuments(source, dryRunAssets(source))
    await writeJson(path.join(extractedDirectory, 'transformed-document-preview.json'), documents)
    await writeJson(path.join(reportDirectory, 'existing-content-dry-run.json'), report)
    console.log(JSON.stringify(report, null, 2))
    return
  }

  const client = getCliClient({apiVersion: API_VERSION}).withConfig({
    projectId: PROJECT_ID,
    dataset: DATASET,
    useCdn: false,
  })
  const resolved = await resolveAssets(client, source, mode === 'execute')

  if (resolved.missingSourceIds.length) {
    report.status = 'invalid'
    report.live = {
      foundDocuments: 0,
      foundAssets: resolved.reused,
      missingDocumentIds: [],
      missingAssetIds: resolved.missingSourceIds,
      mismatchedDocumentIds: [],
      unresolvedReferencePaths: [],
    }
    await writeJson(path.join(reportDirectory, `existing-content-${mode}.json`), report)
    throw new Error('Live validation is missing imported assets. Run migration:import first.')
  }

  const documents = transformDocuments(source, resolved.assets)
  if (mode === 'execute') {
    const replacedDocuments = await replaceDocuments(client, documents)
    report.import = {
      uploadedAssets: resolved.uploaded,
      reusedAssets: resolved.reused,
      replacedDocuments,
    }
  }

  report.live = await validateLive(client, source, resolved.assets, documents)
  if (
    report.live.missingDocumentIds.length ||
    report.live.missingAssetIds.length ||
    report.live.mismatchedDocumentIds.length ||
    report.live.unresolvedReferencePaths.length
  ) {
    report.status = 'invalid'
  }

  await writeJson(path.join(reportDirectory, `existing-content-${mode}.json`), report)
  console.log(JSON.stringify(report, null, 2))
  if (report.status !== 'valid') process.exitCode = 1
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
