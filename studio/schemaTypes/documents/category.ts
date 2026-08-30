import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

const CATEGORY_SLUGS = new Set(['digital', 'physical'])
const VALIDATION_API_VERSION = '2026-08-01'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The category route. This site supports /digital and /physical.',
      options: {
        source: 'title',
        maxLength: 32,
        slugify: (input) => input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
      },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = value?.current
          if (!slug) return true

          if (!CATEGORY_SLUGS.has(slug)) {
            return 'Category slug must be either digital or physical.'
          }

          const documentId = context.document?._id?.replace(/^drafts\./, '')
          if (!documentId) return true

          const duplicateCount = await context
            .getClient({apiVersion: VALIDATION_API_VERSION})
            .fetch<number>(
              `count(*[_type == "category" && slug.current == $slug && !(_id in [$documentId, $draftId])])`,
              {slug, documentId, draftId: `drafts.${documentId}`},
            )

          return duplicateCount === 0 || 'Another category already uses this slug.'
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(0)
          .custom(async (value, context) => {
            if (typeof value !== 'number') return true

            const documentId = context.document?._id?.replace(/^drafts\./, '')
            if (!documentId) return true

            const duplicateCount = await context
              .getClient({apiVersion: VALIDATION_API_VERSION})
              .fetch<number>(
                `count(*[_type == "category" && order == $order && !(_id in [$documentId, $draftId])])`,
                {order: value, documentId, draftId: `drafts.${documentId}`},
              )

            return duplicateCount === 0 || 'Another category already uses this display order.'
          }),
    }),
    defineField({
      name: 'representativeProject',
      title: 'Representative project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Optional project used to represent this category.',
    }),
    defineField({
      name: 'representativeImage',
      title: 'Representative image override',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional image used instead of the representative project image.',
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
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      order: 'order',
      overrideMedia: 'representativeImage',
      projectMedia: 'representativeProject.listing.image',
    },
    prepare({title, slug, order, overrideMedia, projectMedia}) {
      const route = slug ? `/${slug}` : 'Slug missing'
      const position = typeof order === 'number' ? ` · ${order}` : ''

      return {
        title: title || 'Untitled category',
        subtitle: `${route}${position}`,
        media: overrideMedia || projectMedia,
      }
    },
  },
})
