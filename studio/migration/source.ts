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
    'Ronja Stucken is a Berlin-based 3D artist, fashion designer, and creative mind showcasing her work.',
    'Services include comprehensive 3D design solutions for fashion, accessories, avatars, product visualization, animations, scene building, lighting and digital photoshoots, alongside expertise in physical fashion design and pattern making.',
  ],
  socialLinks: [
    {label: 'LinkedIn', url: 'https://de.linkedin.com/in/ronja-stucken'},
    {label: 'Artstation', url: 'https://www.artstation.com/ronja_stucken'},
    {label: 'Instagram', url: 'https://www.instagram.com/studio.stuckn'},
    {label: 'Email', url: 'info@mailgo.dev'},
  ],
  images: [
    {path: 'public/img/about/elbow_on_chair.webp', alt: 'picture of ronja stuckn'},
    {path: 'public/img/about/low_hands.webp', alt: 'Ronja Stucken with crossed arms'},
    {path: 'public/img/about/profile.webp', alt: 'Ronja Stucken in profile'},
  ],
  seo: {
    metaTitle: 'About | Ronja Stucken',
    metaDescription:
      'About Ronja Stucken, a Berlin-based 3D artist, fashion designer, and creative mind.',
  },
}

export const homePageSource: SourceContent['homePage'] = {
  heading: 'Ronja Stucken',
  paragraphs: [
    'The boundaries of reality are no longer limited to the tangible and the visible; instead, the tangible and the virtual merge seamlessly, creating an entirely new landscape.',
    'The conventional boundaries of traditional design concepts are being challenged in the ever-expanding digital fashion world.',
    'Ronja Stucken embraces the limitless possibilities of digital design and enters an inspiring cosmos where creativity is defined by passion, technology and curiosity.',
  ],
}

export const siteSettingsSource: SourceContent['siteSettings'] = {
  siteTitle: 'Ronja Stucken, 3D artist based in Berlin',
  navbarOpenBackgroundColor: '#261b26',
  navbarOpenTextColor: '#b4b4b4',
  navbarDigitalBackgroundColor: '#131313',
  navbarDigitalTextColor: '#0a063e',
  navbarDemoReelBackgroundColor: '#261b26',
  navbarDemoReelTextColor: '#b4b4b4',
  navbarPhysicalBackgroundColor: '#a6a08f',
  navbarPhysicalTextColor: '#011e0f',
  navbarAboutBackgroundColor: '#efebe6',
  navbarAboutTextColor: '#482d65',
  contactEmail: 'info@mailgo.dev',
  socialLinks: [
    {label: 'LinkedIn', url: 'https://de.linkedin.com/in/ronja-stucken'},
    {label: 'Artstation', url: 'https://www.artstation.com/ronja_stucken'},
    {label: 'Instagram', url: 'https://www.instagram.com/studio.stuckn'},
    {label: 'Email', url: 'info@mailgo.dev'},
  ],
  defaultSeo: {
    metaTitle: 'Ronja Stucken, 3D artist based in Berlin',
    metaDescription:
      "Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design.",
    socialImageUrl:
      'https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png',
    socialImageAlt: 'Ronja Stucken portfolio preview',
  },
}

export const categoryRepresentativeImages = {
  digital: {
    path: 'public/img/digital/etherea-part-two/marion.webp',
    alt: '3D avatar representing digital work',
  },
} as const
