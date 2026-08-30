import {ProjectsIcon} from '@sanity/icons/Projects'
import {defineArrayMember, defineField, defineType} from 'sanity'

const RESERVED_PROJECT_SLUGS = new Set(['about', 'api', 'digital', 'physical', 'studio'])
const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const VALIDATION_API_VERSION = '2026-08-01'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'metadata', title: 'Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'metadata',
      description: 'The project URL at the website root, for example /flanelle.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = value?.current
          if (!slug) return true

          if (!PROJECT_SLUG_PATTERN.test(slug)) {
            return 'Use lowercase letters, numbers, and single hyphens only.'
          }

          if (RESERVED_PROJECT_SLUGS.has(slug)) {
            return `/${slug} is reserved by a static website route.`
          }

          const documentId = context.document?._id?.replace(/^drafts\./, '')
          if (!documentId) return true

          const duplicateCount = await context
            .getClient({apiVersion: VALIDATION_API_VERSION})
            .fetch<number>(
              `count(*[_type == "project" && slug.current == $slug && !(_id in [$documentId, $draftId])])`,
              {slug, documentId, draftId: `drafts.${documentId}`},
            )

          return duplicateCount === 0 || 'Another project already uses this slug.'
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'metadata',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'metadata',
      description: 'Position within the selected category. Lower numbers appear first.',
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(0)
          .custom(async (value, context) => {
            if (typeof value !== 'number') return true

            const category = context.document?.category as {_ref?: string} | undefined
            const categoryId = category?._ref
            const documentId = context.document?._id?.replace(/^drafts\./, '')
            if (!categoryId || !documentId) return true

            const duplicateCount = await context
              .getClient({apiVersion: VALIDATION_API_VERSION})
              .fetch<number>(
                `count(*[_type == "project" && category._ref == $categoryId && order == $order && !(_id in [$documentId, $draftId])])`,
                {categoryId, order: value, documentId, draftId: `drafts.${documentId}`},
              )

            return (
              duplicateCount === 0 ||
              'Another project in this category already uses this display order.'
            )
          }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'software',
      title: 'Software',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'credit'})],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      description: 'Images and videos are displayed in this order.',
      of: [
        defineArrayMember({type: 'galleryImage'}),
        defineArrayMember({type: 'youtubeEmbed'}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'listing',
      title: 'Listing card',
      type: 'projectListing',
      group: 'media',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fashionCredits',
      title: 'Fashion credits',
      type: 'fashionCredits',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'metadata',
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
      category: 'category.title',
      order: 'order',
      media: 'listing.image',
    },
    prepare({title, category, order, media}) {
      const position = typeof order === 'number' ? ` · ${order}` : ''

      return {
        title: title || 'Untitled project',
        subtitle: category ? `${category}${position}` : 'Category not selected',
        media,
      }
    },
  },
})
