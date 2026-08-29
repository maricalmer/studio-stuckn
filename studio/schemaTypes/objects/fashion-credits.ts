import {TagsIcon} from '@sanity/icons/Tags'
import {defineArrayMember, defineField, defineType} from 'sanity'

interface FashionCreditValue {
  lookNumber?: number
}

export const fashionCredits = defineType({
  name: 'fashionCredits',
  title: 'Fashion credits',
  type: 'object',
  icon: TagsIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Publication logo',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo alternative text',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'entries',
      title: 'Credits by gallery position',
      type: 'array',
      of: [defineArrayMember({type: 'fashionCreditEntry'})],
      validation: (rule) =>
        rule.required().min(1).custom((entries: FashionCreditValue[] | undefined) => {
          if (!entries) return true

          const positions = entries
            .map((entry) => entry.lookNumber)
            .filter((position): position is number => typeof position === 'number')

          return new Set(positions).size === positions.length
            ? true
            : 'Each gallery position can only have one fashion-credit entry.'
        }),
    }),
  ],
  preview: {
    select: {
      media: 'logo',
      entries: 'entries',
    },
    prepare({media, entries}) {
      const entryCount = Array.isArray(entries) ? entries.length : 0

      return {
        title: 'Fashion credits',
        subtitle: `${entryCount} ${entryCount === 1 ? 'entry' : 'entries'}`,
        media,
      }
    },
  },
})
