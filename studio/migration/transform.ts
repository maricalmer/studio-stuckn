import {createHash} from 'node:crypto'
import {access} from 'node:fs/promises'
import path from 'node:path'
import {DATASET, PROJECT_ID} from './source'
import type {
  AssetReferenceMap,
  MigrationReport,
  SanityDocumentInput,
  SourceContent,
  SourceImage,
  SourceProject,
  ValidationIssues,
} from './types'

function key(value: string): string {
  return `k${createHash('sha1').update(value).digest('hex').slice(0, 15)}`
}

function reference(_ref: string) {
  return {_type: 'reference', _ref}
}

function sanityImage(image: SourceImage, assets: AssetReferenceMap) {
  const assetId = assets.local.get(image.path)
  if (!assetId) throw new Error(`No Sanity asset mapping for ${image.path}`)

  return {
    _type: 'image',
    asset: reference(assetId),
  }
}

function sanityImageWithAlt(image: SourceImage, alt: string, assets: AssetReferenceMap) {
  return {...sanityImage(image, assets), alt}
}

function portableText(paragraphs: string | readonly string[], identity: string) {
  const values = typeof paragraphs === 'string' ? [paragraphs] : paragraphs
  return values.map((text, index) => ({
    _type: 'block',
    _key: key(`${identity}:block:${index}:${text}`),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: key(`${identity}:span:${index}:${text}`),
        marks: [],
        text,
      },
    ],
  }))
}

function projectId(slug: string) {
  return `project-${slug}`
}

function categoryId(slug: string) {
  return `category-${slug}`
}

function projectDocument(
  project: SourceProject,
  order: number,
  assets: AssetReferenceMap,
): SanityDocumentInput {
  const description = Array.isArray(project.description)
    ? project.description.join(' ')
    : project.description
  const listingImage = sanityImage(project.listing.image, assets)

  const document: SanityDocumentInput = {
    _id: projectId(project.slug),
    _type: 'project',
    title: project.title,
    slug: {_type: 'slug', current: project.slug},
    category: reference(categoryId(project.category)),
    order,
    description: portableText(project.description, `project:${project.slug}:description`),
    gallery: project.media.map((item, index) =>
      item.type === 'image'
        ? {
            _type: 'galleryImage',
            _key: key(`project:${project.slug}:gallery:${index}:${item.image.path}`),
            image: sanityImage(item.image, assets),
            alt: item.alt,
          }
        : {
            _type: 'youtubeEmbed',
            _key: key(`project:${project.slug}:gallery:${index}:${item.src}`),
            url: item.src,
            title: item.title,
          },
    ),
    listing: {
      _type: 'projectListing',
      image: listingImage,
      alt: project.listing.alt,
      title: project.listing.title,
    },
    seo: {
      _type: 'seo',
      metaTitle: project.subtitle
        ? `${project.title} ${project.subtitle.text} | Studio.Stuckn`
        : `${project.title} | Studio.Stuckn`,
      metaDescription: description,
      socialImage: sanityImageWithAlt(project.listing.image, project.listing.alt, assets),
    },
  }

  if (project.subtitle) {
    document.subtitle = {
      _type: 'subtitle',
      text: project.subtitle.text,
      isCyrillic: project.subtitle.cyrillic,
    }
  }

  if (project.softwares) document.software = project.softwares

  if (project.credits?.length) {
    document.credits = project.credits.map(([label, value], index) => ({
      _type: 'credit',
      _key: key(`project:${project.slug}:credit:${index}:${label}:${value}`),
      label,
      value,
    }))
  }

  if (project.fashionCredits) {
    document.fashionCredits = {
      _type: 'fashionCredits',
      logo: sanityImage(project.fashionCredits.logo, assets),
      logoAlt: project.fashionCredits.alt,
      entries: Object.entries(project.fashionCredits.creditsPieces).map(([position, details]) => ({
        _type: 'fashionCreditEntry',
        _key: key(`project:${project.slug}:fashion:${position}:${details}`),
        lookNumber: Number(position),
        details,
      })),
    }
  }

  return document
}

export function transformDocuments(source: SourceContent, assets: AssetReferenceMap) {
  const projectOrders = new Map<string, number>()
  for (const category of source.categories) {
    category.projectSlugs.forEach((slug, index) => projectOrders.set(slug, index))
  }

  const projects = source.projects.map((project) =>
    projectDocument(project, projectOrders.get(project.slug) ?? -1, assets),
  )

  const categories = source.categories.map((category) => {
    const document: SanityDocumentInput = {
      _id: categoryId(category.slug),
      _type: 'category',
      title: category.title,
      slug: {_type: 'slug', current: category.slug},
      order: category.order,
      representativeProject: reference(projectId(category.projectSlugs[0])),
    }

    if (category.representativeImage) {
      document.representativeImage = sanityImageWithAlt(
        category.representativeImage.image,
        category.representativeImage.alt,
        assets,
      )
    }

    return document
  })

  const aboutPage: SanityDocumentInput = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    heading: source.aboutPage.heading,
    content: portableText(source.aboutPage.paragraphs, 'about:content'),
    images: source.aboutPage.images.map(({image, alt}, index) => ({
      _type: 'galleryImage',
      _key: key(`about:image:${index}:${image.path}`),
      image: sanityImage(image, assets),
      alt,
    })),
    seo: {
      _type: 'seo',
      ...source.aboutPage.seo,
      socialImage: sanityImageWithAlt(
        source.aboutPage.images[0].image,
        source.aboutPage.images[0].alt,
        assets,
      ),
    },
  }

  const siteSettings: SanityDocumentInput = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: source.siteSettings.siteTitle,
    contactEmail: source.siteSettings.contactEmail,
    instagramUrl: source.siteSettings.instagramUrl,
    linkedinUrl: source.siteSettings.linkedinUrl,
    defaultSeo: {
      _type: 'seo',
      metaTitle: source.siteSettings.defaultSeo.metaTitle,
      metaDescription: source.siteSettings.defaultSeo.metaDescription,
      socialImage: {
        _type: 'image',
        asset: reference(assets.socialImage),
        alt: source.siteSettings.defaultSeo.socialImageAlt,
      },
    },
  }

  return {projects, categories, aboutPage, siteSettings}
}

function allAssociatedImages(source: SourceContent) {
  const images: Array<{location: string; image: SourceImage; alt: string}> = []

  for (const project of source.projects) {
    images.push({
      location: `${project.slug}.listing`,
      image: project.listing.image,
      alt: project.listing.alt,
    })
    project.media.forEach((item, index) => {
      if (item.type === 'image') {
        images.push({location: `${project.slug}.gallery[${index}]`, image: item.image, alt: item.alt})
      }
    })
    if (project.fashionCredits) {
      images.push({
        location: `${project.slug}.fashionCredits.logo`,
        image: project.fashionCredits.logo,
        alt: project.fashionCredits.alt,
      })
    }
  }

  source.categories.forEach((category) => {
    if (category.representativeImage) {
      images.push({
        location: `category.${category.slug}.representativeImage`,
        image: category.representativeImage.image,
        alt: category.representativeImage.alt,
      })
    }
  })
  source.aboutPage.images.forEach(({image, alt}, index) =>
    images.push({location: `about.images[${index}]`, image, alt}),
  )

  return images
}

function validYouTubeUrl(value: string) {
  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
    const parts = url.pathname.split('/').filter(Boolean)
    if (url.protocol !== 'https:') return false
    if (hostname === 'youtu.be') return parts.length === 1
    if (hostname === 'youtube-nocookie.com') return parts[0] === 'embed' && Boolean(parts[1])
    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      return (
        (url.pathname === '/watch' && Boolean(url.searchParams.get('v'))) ||
        (['embed', 'shorts', 'live'].includes(parts[0]) && Boolean(parts[1]))
      )
    }
    return false
  } catch {
    return false
  }
}

export async function validateSource(repoRoot: string, source: SourceContent) {
  const issues: ValidationIssues = {
    missingFiles: [],
    missingAltText: [],
    duplicateSlugs: [],
    duplicateCategoryOrders: [],
    duplicateProjectOrders: [],
    invalidGalleryReferences: [],
    invalidYoutubeUrls: [],
    unassociatedLocalImages: [],
    duplicateAssetContent: [],
    countMismatches: [],
  }

  const slugCounts = new Map<string, number>()
  source.projects.forEach((project) => slugCounts.set(project.slug, (slugCounts.get(project.slug) ?? 0) + 1))
  issues.duplicateSlugs = [...slugCounts].filter(([, count]) => count > 1).map(([slug]) => slug)

  const categoryOrders = new Map<number, number>()
  source.categories.forEach((category) =>
    categoryOrders.set(category.order, (categoryOrders.get(category.order) ?? 0) + 1),
  )
  issues.duplicateCategoryOrders = [...categoryOrders]
    .filter(([, count]) => count > 1)
    .map(([order]) => order)

  for (const category of source.categories) {
    const orderSlugs = new Set<string>()
    category.projectSlugs.forEach((slug, index) => {
      if (orderSlugs.has(slug)) issues.duplicateProjectOrders.push(`${category.slug}:${index}:${slug}`)
      orderSlugs.add(slug)
    })
  }

  const associatedImages = allAssociatedImages(source)
  const candidatePaths = new Set(source.localImageCandidates.map((candidate) => candidate.path))
  const associatedPaths = new Set(associatedImages.map(({image}) => image.path))

  for (const {location, image, alt} of associatedImages) {
    if (!alt.trim()) issues.missingAltText.push(location)
    if (!candidatePaths.has(image.path)) issues.missingFiles.push(`${location}: ${image.path}`)
    try {
      await access(path.join(repoRoot, image.path))
    } catch {
      issues.missingFiles.push(`${location}: ${image.path}`)
    }
  }

  issues.unassociatedLocalImages = source.localImageCandidates
    .filter((candidate) => !associatedPaths.has(candidate.path))
    .map((candidate) => candidate.path)

  const contentHashes = new Map<string, string[]>()
  source.localImageCandidates.forEach((candidate) => {
    const paths = contentHashes.get(candidate.sha256) ?? []
    paths.push(candidate.path)
    contentHashes.set(candidate.sha256, paths)
  })
  issues.duplicateAssetContent = [...contentHashes]
    .filter(([, paths]) => paths.length > 1)
    .map(([sha256, paths]) => ({sha256, paths}))

  let youtubeEmbeds = 0
  for (const project of source.projects) {
    const galleryLength = project.media.length
    project.media.forEach((item, index) => {
      if (item.type !== 'youtube') return
      youtubeEmbeds += 1
      if (!item.title.trim() || !validYouTubeUrl(item.src)) {
        issues.invalidYoutubeUrls.push(`${project.slug}.gallery[${index}]: ${item.src}`)
      }
    })

    for (const position of Object.keys(project.fashionCredits?.creditsPieces ?? {}).map(Number)) {
      if (!Number.isInteger(position) || position < 1 || position > galleryLength) {
        issues.invalidGalleryReferences.push(
          `${project.slug}.fashionCredits position ${position} is outside gallery 1-${galleryLength}`,
        )
      }
    }
  }

  const expectedCounts = [
    [source.projects.length, 12, 'projects'],
    [source.categories.length, 2, 'categories'],
    [source.localImageCandidates.length, 125, 'local image candidates'],
    [youtubeEmbeds, 2, 'YouTube embeds'],
  ] as const
  expectedCounts.forEach(([actual, expected, label]) => {
    if (actual !== expected) issues.countMismatches.push(`${label}: expected ${expected}, found ${actual}`)
  })

  const errors = [
    ...issues.missingFiles,
    ...issues.missingAltText,
    ...issues.duplicateSlugs,
    ...issues.duplicateCategoryOrders.map(String),
    ...issues.duplicateProjectOrders,
    ...issues.invalidGalleryReferences,
    ...issues.invalidYoutubeUrls,
    ...issues.unassociatedLocalImages,
    ...issues.countMismatches,
  ]

  return {issues, valid: errors.length === 0}
}

export function createReport(
  source: SourceContent,
  issues: ValidationIssues,
  mode: MigrationReport['mode'],
): MigrationReport {
  const galleryImages = source.projects.reduce(
    (count, project) => count + project.media.filter((item) => item.type === 'image').length,
    0,
  )
  const youtubeEmbeds = source.projects.reduce(
    (count, project) => count + project.media.filter((item) => item.type === 'youtube').length,
    0,
  )
  const credits = source.projects.reduce((count, project) => count + (project.credits?.length ?? 0), 0)
  const fashionCreditEntries = source.projects.reduce(
    (count, project) => count + Object.keys(project.fashionCredits?.creditsPieces ?? {}).length,
    0,
  )
  const uniqueLocalImageContent = new Set(
    source.localImageCandidates.map((candidate) => candidate.sha256),
  ).size

  const hasErrors = Object.entries(issues).some(([name, values]) => {
    if (name === 'duplicateAssetContent') return false
    return values.length > 0
  })

  return {
    generatedAt: new Date().toISOString(),
    mode,
    target: {projectId: PROJECT_ID, dataset: DATASET},
    counts: {
      projects: source.projects.length,
      categories: source.categories.length,
      aboutPages: 1,
      siteSettings: 1,
      credits,
      galleryImages,
      youtubeEmbeds,
      fashionCreditEntries,
      localImageCandidates: source.localImageCandidates.length,
      uniqueLocalImageContent,
      remoteImages: 1,
      expectedDocuments: source.projects.length + source.categories.length + 2,
      expectedAssets: uniqueLocalImageContent + 1,
    },
    issues,
    status: hasErrors ? 'invalid' : 'valid',
  }
}

export function dryRunAssets(source: SourceContent): AssetReferenceMap {
  return {
    local: new Map(
      source.localImageCandidates.map((candidate) => [
        candidate.path,
        `image-dry-run-${candidate.sha256.slice(0, 32)}-1x1-webp`,
      ]),
    ),
    socialImage: 'image-dry-run-social-1x1-png',
  }
}

export const migrationDocumentIds = (source: SourceContent) => [
  ...source.categories.map((category) => categoryId(category.slug)),
  ...source.projects.map((project) => projectId(project.slug)),
  'aboutPage',
  'siteSettings',
]
