import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'url',
      title: 'URL or email address',
      type: 'string',
      description: 'Use an https:// URL or a plain email address.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== 'string') return 'Enter a URL or email address.'
          const input = value.trim()
          const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            input.replace(/^mailto:/i, ''),
          )
          if (email) return true

          try {
            const url = new URL(input)
            return url.protocol === 'https:' || 'Use an https:// URL or email address.'
          } catch {
            return 'Use an https:// URL or email address.'
          }
        }),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
    prepare({title, subtitle}) {
      return {title: title || 'Untitled social link', subtitle}
    },
  },
})
