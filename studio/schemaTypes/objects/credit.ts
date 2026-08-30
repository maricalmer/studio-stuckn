import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const credit = defineType({
  name: 'credit',
  title: 'Credit',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Name or credit',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'Optional link for this credit.',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
