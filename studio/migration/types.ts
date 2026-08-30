export type ProjectCategory = 'digital' | 'physical'

export interface SourceImage {
  path: string
}

export interface SourceSubtitle {
  text: string
  cyrillic: boolean
}

export type SourceCredit = readonly [label: string, value: string]

export type SourceMedia =
  | {
      type: 'image'
      image: SourceImage
      alt: string
    }
  | {
      type: 'youtube'
      src: string
      title: string
    }

export interface SourceProject {
  slug: string
  category: ProjectCategory
  title: string
  subtitle?: SourceSubtitle
  description: string | readonly string[]
  softwares?: string
  credits?: readonly SourceCredit[]
  media: readonly SourceMedia[]
  listing: {
    image: SourceImage
    alt: string
    title: string
  }
  fashionCredits?: {
    logo: SourceImage
    alt: string
    creditsPieces: Readonly<Record<string, string>>
  }
}

export interface SourceCategory {
  slug: ProjectCategory
  title: string
  order: number
  projectSlugs: readonly string[]
  representativeImage?: {
    image: SourceImage
    alt: string
  }
}

export interface SourceContent {
  projects: SourceProject[]
  categories: SourceCategory[]
  aboutPage: {
    heading: string
    paragraphs: string[]
    images: Array<{image: SourceImage; alt: string}>
    seo: {
      metaTitle: string
      metaDescription: string
    }
  }
  siteSettings: {
    siteTitle: string
    contactEmail: string
    instagramUrl: string
    linkedinUrl: string
    defaultSeo: {
      metaTitle: string
      metaDescription: string
      socialImageUrl: string
      socialImageAlt: string
    }
  }
  localImageCandidates: LocalImageCandidate[]
}

export interface LocalImageCandidate {
  path: string
  bytes: number
  sha256: string
}

export interface ValidationIssues {
  missingFiles: string[]
  missingAltText: string[]
  duplicateSlugs: string[]
  duplicateCategoryOrders: number[]
  duplicateProjectOrders: string[]
  invalidGalleryReferences: string[]
  invalidYoutubeUrls: string[]
  unassociatedLocalImages: string[]
  duplicateAssetContent: Array<{sha256: string; paths: string[]}>
  countMismatches: string[]
}

export interface MigrationReport {
  generatedAt: string
  mode: 'dry-run' | 'execute' | 'validate-live'
  target: {projectId: string; dataset: string}
  counts: {
    projects: number
    categories: number
    aboutPages: number
    siteSettings: number
    credits: number
    galleryImages: number
    youtubeEmbeds: number
    fashionCreditEntries: number
    localImageCandidates: number
    uniqueLocalImageContent: number
    remoteImages: number
    expectedDocuments: number
    expectedAssets: number
  }
  issues: ValidationIssues
  status: 'valid' | 'invalid'
  import?: {
    uploadedAssets: number
    reusedAssets: number
    replacedDocuments: number
  }
  live?: {
    foundDocuments: number
    foundAssets: number
    missingDocumentIds: string[]
    missingAssetIds: string[]
    mismatchedDocumentIds: string[]
    unresolvedReferencePaths: string[]
  }
}

export interface SanityDocumentInput {
  _id: string
  _type: string
  [key: string]: unknown
}

export interface AssetReferenceMap {
  local: Map<string, string>
  socialImage: string
}
