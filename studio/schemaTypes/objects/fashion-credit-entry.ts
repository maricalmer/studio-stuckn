import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const fashionCreditEntry = defineType({
  name: 'fashionCreditEntry',
  title: 'Fashion credit entry',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'lookNumber',
      title: 'Gallery position',
      type: 'number',
      description: 'The one-based gallery position to which these credits belong.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'details',
      title: 'Credits',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      lookNumber: 'lookNumber',
      details: 'details',
    },
    prepare({lookNumber, details}) {
      return {
        title: lookNumber ? `Gallery position ${lookNumber}` : 'Unassigned fashion credit',
        subtitle: details,
      }
    },
  },
})
