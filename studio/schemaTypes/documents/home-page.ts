import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Homepage text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {decorators: [], annotations: []},
        }),
      ],
      description: 'Plain paragraphs displayed on the homepage, in order.',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare({content}) {
      return {
        title: 'Homepage',
        subtitle: content?.[0]?.children?.[0]?.text || 'No homepage text yet',
      }
    },
  },
})
