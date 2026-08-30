import {createHash} from 'node:crypto'
import {promises as fs} from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import {aboutPageSource, categoryRepresentativeImages, siteSettingsSource} from './source'
import type {
  LocalImageCandidate,
  ProjectCategory,
  SourceContent,
  SourceImage,
  SourceProject,
} from './types'

function unwrapExpression(expression: ts.Expression): ts.Expression {
  if (
    ts.isAsExpression(expression) ||
    ts.isSatisfiesExpression(expression) ||
    ts.isParenthesizedExpression(expression)
  ) {
    return unwrapExpression(expression.expression)
  }

  return expression
}

function propertyName(name: ts.PropertyName): string {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text
  }

  throw new Error(`Unsupported computed property name: ${name.getText()}`)
}

function evaluateExpression(
  rawExpression: ts.Expression,
  imageImports: ReadonlyMap<string, SourceImage>,
): unknown {
  const expression = unwrapExpression(rawExpression)

  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
    return expression.text
  }

  if (ts.isNumericLiteral(expression)) return Number(expression.text)
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true
  if (expression.kind === ts.SyntaxKind.FalseKeyword) return false
  if (expression.kind === ts.SyntaxKind.NullKeyword) return null

  if (ts.isPrefixUnaryExpression(expression) && ts.isNumericLiteral(expression.operand)) {
    const value = Number(expression.operand.text)
    return expression.operator === ts.SyntaxKind.MinusToken ? -value : value
  }

  if (ts.isIdentifier(expression)) {
    const image = imageImports.get(expression.text)
    if (image) return image
    if (expression.text === 'undefined') return undefined
    throw new Error(`Unknown identifier in project data: ${expression.text}`)
  }

  if (ts.isArrayLiteralExpression(expression)) {
    return expression.elements.map((element) => {
      if (ts.isSpreadElement(element)) {
        throw new Error(`Spread elements are not supported: ${element.getText()}`)
      }
      return evaluateExpression(element, imageImports)
    })
  }

  if (ts.isObjectLiteralExpression(expression)) {
    const result: Record<string, unknown> = {}

    for (const property of expression.properties) {
      if (!ts.isPropertyAssignment(property)) {
        throw new Error(`Unsupported project property: ${property.getText()}`)
      }

      result[propertyName(property.name)] = evaluateExpression(property.initializer, imageImports)
    }

    return result
  }

  throw new Error(`Unsupported project expression: ${expression.getText()}`)
}

async function parseModule(filePath: string) {
  const sourceText = await fs.readFile(filePath, 'utf8')
  return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function imageImportsFromModule(sourceFile: ts.SourceFile): Map<string, SourceImage> {
  const imports = new Map<string, SourceImage>()

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue

    const specifier = statement.moduleSpecifier.text
    const localName = statement.importClause?.name?.text
    if (!localName || !specifier.startsWith('@/public/')) continue

    imports.set(localName, {path: specifier.replace('@/', '')})
  }

  return imports
}

function variableInitializer(sourceFile: ts.SourceFile, variableName: string): ts.Expression {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === variableName &&
        declaration.initializer
      ) {
        return declaration.initializer
      }
    }
  }

  throw new Error(`Could not find ${variableName} in ${sourceFile.fileName}`)
}

async function extractProject(filePath: string): Promise<SourceProject> {
  const sourceFile = await parseModule(filePath)
  const imageImports = imageImportsFromModule(sourceFile)

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue

    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer || !ts.isIdentifier(declaration.name)) continue

      const value = evaluateExpression(declaration.initializer, imageImports)
      if (
        typeof value === 'object' &&
        value !== null &&
        'slug' in value &&
        'media' in value &&
        'listing' in value
      ) {
        return value as unknown as SourceProject
      }
    }
  }

  throw new Error(`Could not find a project definition in ${filePath}`)
}

async function categoryOrder(repoRoot: string): Promise<Record<ProjectCategory, readonly string[]>> {
  const sourceFile = await parseModule(path.join(repoRoot, 'data/projects/index.ts'))
  const value = evaluateExpression(
    variableInitializer(sourceFile, 'categoryProjectSlugs'),
    new Map(),
  )

  return value as Record<ProjectCategory, readonly string[]>
}

async function walk(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, {withFileTypes: true})
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const itemPath = path.join(directory, entry.name)
      return entry.isDirectory() ? walk(itemPath) : [itemPath]
    }),
  )

  return nested.flat()
}

async function localImageCandidates(repoRoot: string): Promise<LocalImageCandidate[]> {
  const files = (await walk(path.join(repoRoot, 'public/img')))
    .filter((filePath) => filePath.toLowerCase().endsWith('.webp'))
    .sort()

  return Promise.all(
    files.map(async (filePath) => {
      const [buffer, stats] = await Promise.all([fs.readFile(filePath), fs.stat(filePath)])
      return {
        path: path.relative(repoRoot, filePath).split(path.sep).join('/'),
        bytes: stats.size,
        sha256: createHash('sha256').update(buffer).digest('hex'),
      }
    }),
  )
}

export async function extractSourceContent(repoRoot: string): Promise<SourceContent> {
  const projectDirectory = path.join(repoRoot, 'data/projects')
  const projectFiles = (await fs.readdir(projectDirectory))
    .filter((filename) => filename.endsWith('.ts') && !['index.ts', 'types.ts'].includes(filename))
    .sort()

  const [unorderedProjects, orders, candidates] = await Promise.all([
    Promise.all(projectFiles.map((filename) => extractProject(path.join(projectDirectory, filename)))),
    categoryOrder(repoRoot),
    localImageCandidates(repoRoot),
  ])

  const projectsBySlug = new Map(unorderedProjects.map((project) => [project.slug, project]))
  const orderedSlugs = [...orders.digital, ...orders.physical]
  const projects = orderedSlugs.map((slug) => {
    const project = projectsBySlug.get(slug)
    if (!project) throw new Error(`Category order references missing project: ${slug}`)
    return project
  })

  const categories = (['digital', 'physical'] as const).map((slug, order) => ({
    slug,
    title: slug === 'digital' ? 'Digital' : 'Physical',
    order,
    projectSlugs: orders[slug],
    representativeImage:
      slug === 'digital'
        ? {
            image: {path: categoryRepresentativeImages.digital.path},
            alt: categoryRepresentativeImages.digital.alt,
          }
        : undefined,
  }))

  return {
    projects,
    categories,
    aboutPage: {
      ...aboutPageSource,
      images: aboutPageSource.images.map(({path: imagePath, alt}) => ({
        image: {path: imagePath},
        alt,
      })),
    },
    siteSettings: siteSettingsSource,
    localImageCandidates: candidates,
  }
}
