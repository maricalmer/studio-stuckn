import type {SourceContent} from './types'

export const PROJECT_ID = '35ex4ltc'
export const DATASET = 'production'
export const API_VERSION = '2026-08-01'
export const LOCAL_ASSET_SOURCE = 'studio-stuckn-local-import'
export const REMOTE_ASSET_SOURCE = 'studio-stuckn-remote-import'

export const aboutPageSource: Omit<SourceContent['aboutPage'], 'images'> & {
  images: Array<{path: string; alt: string}>
} = {
  heading: 'Say Hello',
  paragraphs: [
    'Ronja Stucken, a Berlin-based 3D Artist, fashion designer and creative mind, showcases her works under the synonym Studio.Stuckn.',
    'Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.',
  ],
  images: [
    {path: 'public/img/about/elbow_on_chair.webp', alt: 'picture of ronja stuckn'},
    {path: 'public/img/about/low_hands.webp', alt: 'Ronja Stucken with crossed arms'},
    {path: 'public/img/about/profile.webp', alt: 'Ronja Stucken in profile'},
  ],
  seo: {
    metaTitle: 'About | Studio.Stuckn',
    metaDescription:
      'About Ronja Stucken, a Berlin-based 3D artist, fashion designer, and creative mind working as Studio.Stuckn.',
  },
}

export const siteSettingsSource: SourceContent['siteSettings'] = {
  siteTitle: 'Studio.Stuckn, 3D artist based in Berlin',
  contactEmail: 'info@mailgo.dev',
  instagramUrl: 'https://www.instagram.com/studio.stuckn',
  linkedinUrl: 'https://de.linkedin.com/in/ronja-stucken',
  defaultSeo: {
    metaTitle: 'Studio.Stuckn, 3D artist based in Berlin',
    metaDescription:
      "Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design.",
    socialImageUrl:
      'https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png',
    socialImageAlt: 'Studio.Stuckn portfolio preview',
  },
}

export const categoryRepresentativeImages = {
  digital: {
    path: 'public/img/digital/etherea-part-two/marion.webp',
    alt: '3D avatar representing digital work',
  },
} as const
