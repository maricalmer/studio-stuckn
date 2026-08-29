import {TextIcon} from '@sanity/icons/Text'
import {defineField, defineType} from 'sanity'

export const subtitle = defineType({
  name: 'subtitle',
  title: 'Subtitle',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCyrillic',
      title: 'Use Cyrillic styling',
      type: 'boolean',
      description: 'Enable the Cyrillic-specific subtitle treatment used by the website.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      isCyrillic: 'isCyrillic',
    },
    prepare({title, isCyrillic}) {
      return {
        title: title || 'Untitled subtitle',
        subtitle: isCyrillic ? 'Cyrillic styling' : undefined,
      }
    },
  },
})
