import {ClipboardImageIcon} from '@sanity/icons/ClipboardImage'
import {defineField, defineType} from 'sanity'

export const projectListing = defineType({
  name: 'projectListing',
  title: 'Project listing',
  type: 'object',
  icon: ClipboardImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Representative image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Display title',
      type: 'string',
      description: 'The title shown on Digital or Physical project listings.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'alt',
      media: 'image',
    },
  },
})
