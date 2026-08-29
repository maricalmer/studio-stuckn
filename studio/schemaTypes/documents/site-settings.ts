import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

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
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
      validation: (rule) => rule.uri({scheme: ['https']}),
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
