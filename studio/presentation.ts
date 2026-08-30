import {
  defineDocuments,
  defineLocations,
  type PresentationPluginOptions,
} from 'sanity/presentation'

const mainDocuments = defineDocuments([
  {
    route: '/about',
    type: 'aboutPage',
  },
  {
    route: '/digital',
    filter: '_type == "category" && slug.current == "digital"',
  },
  {
    route: '/physical',
    filter: '_type == "category" && slug.current == "physical"',
  },
  {
    route: '/:slug',
    filter: '_type == "project" && slug.current == $slug',
  },
])

const locations: NonNullable<PresentationPluginOptions['resolve']>['locations'] = {
  project: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
      categoryTitle: 'category->title',
      categorySlug: 'category->slug.current',
    },
    resolve: (document) => {
      const resolvedLocations = []

      if (document?.slug) {
        resolvedLocations.push({
          title: document.title || 'Untitled project',
          href: `/${document.slug}`,
        })
      }

      if (document?.categorySlug) {
        resolvedLocations.push({
          title: `${document.categoryTitle || 'Category'} projects`,
          href: `/${document.categorySlug}`,
        })
      }

      return {locations: resolvedLocations}
    },
  }),
  category: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (document) => ({
      locations: document?.slug
        ? [
            {
              title: document.title || 'Untitled category',
              href: `/${document.slug}`,
            },
          ]
        : [],
    }),
  }),
  aboutPage: defineLocations({
    select: {
      heading: 'heading',
    },
    resolve: (document) => ({
      locations: [
        {
          title: document?.heading || 'About page',
          href: '/about',
        },
      ],
    }),
  }),
  siteSettings: defineLocations({
    message: 'Site settings are used across the entire website.',
    tone: 'caution',
  }),
}

export const presentationResolve: PresentationPluginOptions['resolve'] = {
  mainDocuments,
  locations,
}
