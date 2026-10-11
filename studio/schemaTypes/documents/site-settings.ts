import {CogIcon} from '@sanity/icons/Cog'
import {defineArrayMember, defineField, defineType} from 'sanity'

const navbarColor = (name: string, title: string, initialValue: string) =>
  defineField({
    name,
    title,
    type: 'string',
    group: 'general',
    initialValue,
    description: 'Six-digit hex color used by this navbar menu state.',
    validation: (rule) =>
      rule.required().custom((value) =>
        typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.trim())
          ? true
          : 'Use a six-digit hex color, for example #131313.',
      ),
  })

const navbarImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group: 'general',
    description: 'Optional ordered images shown while hovering this menu item (up to three).',
    of: [
      defineArrayMember({
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({
            name: 'alt',
            title: 'Alternative text',
            type: 'string',
            validation: (rule) => rule.required().min(1),
          }),
        ],
      }),
    ],
    validation: (rule) => rule.max(3),
  })

const legacyNavbarImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    hidden: true,
    readOnly: true,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        validation: (rule) => rule.required().min(1),
      }),
    ],
  })

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'contact', title: 'Contact and social'},
    {name: 'seo', title: 'Default SEO'},
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    navbarImage('navbarDigitalImages', 'Digital menu images'),
    navbarImage('navbarDemoReelImages', 'Demo Reel menu images'),
    navbarImage('navbarPhysicalImages', 'Physical menu images'),
    navbarImage('navbarAboutImages', 'About menu images'),
    legacyNavbarImage('navbarDigitalImage', 'Legacy Digital menu image'),
    legacyNavbarImage('navbarDemoReelImage', 'Legacy Demo Reel menu image'),
    legacyNavbarImage('navbarPhysicalImage', 'Legacy Physical menu image'),
    legacyNavbarImage('navbarAboutImage', 'Legacy About menu image'),
    navbarColor('navbarDigitalBackgroundColor', 'Digital menu background color', '#131313'),
    navbarColor('navbarDigitalTextColor', 'Digital menu text color', '#0a063e'),
    navbarColor('navbarDemoReelBackgroundColor', 'Demo Reel menu background color', '#261b26'),
    navbarColor('navbarDemoReelTextColor', 'Demo Reel menu text color', '#b4b4b4'),
    navbarColor('navbarPhysicalBackgroundColor', 'Physical menu background color', '#a6a08f'),
    navbarColor('navbarPhysicalTextColor', 'Physical menu text color', '#011e0f'),
    navbarColor('navbarAboutBackgroundColor', 'About menu background color', '#efebe6'),
    navbarColor('navbarAboutTextColor', 'About menu text color', '#482d65'),
    defineField({
      name: 'navbarOpenBackgroundColor',
      title: 'Navbar open background color',
      type: 'string',
      group: 'general',
      initialValue: '#261b26',
      description: 'Six-digit hex color used when the navbar menu is open.',
      validation: (rule) =>
        rule.required().custom((value) =>
          typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.trim())
            ? true
            : 'Use a six-digit hex color, for example #261b26.',
        ),
    }),
    defineField({
      name: 'navbarOpenTextColor',
      title: 'Navbar open text color',
      type: 'string',
      group: 'general',
      initialValue: '#b4b4b4',
      description: 'Six-digit hex color used for text when the navbar menu is open.',
      validation: (rule) =>
        rule.required().custom((value) =>
          typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.trim())
            ? true
            : 'Use a six-digit hex color, for example #b4b4b4.',
        ),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'socialLink'})],
      description: 'Add links and drag them into the order used by the site.',
      validation: (rule) => rule.required().min(1),
    }),
    // Kept hidden so older imported Site Settings documents do not show
    // unknown-field warnings while they are transitioned to socialLinks.
    defineField({
      name: 'instagramUrl',
      title: 'Legacy Instagram URL',
      type: 'url',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'Legacy LinkedIn URL',
      type: 'url',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description: 'Fallback metadata, including the default social image, for the website.',
      validation: (rule) =>
        rule.required().custom((value) => {
          const defaults = value as
            | {
                metaTitle?: string
                metaDescription?: string
                socialImage?: {asset?: {_ref?: string}; alt?: string}
              }
            | undefined

          if (!defaults?.metaTitle?.trim()) return 'Add a default meta title.'
          if (!defaults.metaDescription?.trim()) return 'Add a default meta description.'
          if (!defaults.socialImage?.asset?._ref) return 'Add a default social image.'
          if (!defaults.socialImage.alt?.trim()) return 'Add alternative text for the social image.'

          return true
        }),
    }),
  ],
  preview: {
    select: {
      siteTitle: 'siteTitle',
      media: 'defaultSeo.socialImage',
    },
    prepare({siteTitle, media}) {
      return {
        title: 'Site settings',
        subtitle: siteTitle,
        media,
      }
    },
  },
})
