import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {DesktopIcon} from '@sanity/icons/Desktop'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const singletonDocumentIds = {
  aboutPage: 'aboutPage',
  siteSettings: 'siteSettings',
} as const

export const singletonSchemaTypes = new Set<string>(Object.keys(singletonDocumentIds))

const projectOrdering = [{field: 'order', direction: 'asc'}] as const

function projectsByCategory(
  S: StructureBuilder,
  title: string,
  categorySlug: 'digital' | 'physical',
  icon: typeof DesktopIcon,
) {
  return S.listItem()
    .id(`${categorySlug}-projects`)
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .id(`${categorySlug}-projects`)
        .title(`${title} projects`)
        .schemaType('project')
        .filter('_type == "project" && category->slug.current == $categorySlug')
        .params({categorySlug})
        .defaultOrdering([...projectOrdering]),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('projects')
        .title('Projects')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .id('projects')
            .title('Projects')
            .items([
              S.listItem()
                .id('all-projects')
                .title('All projects')
                .icon(DocumentsIcon)
                .child(
                  S.documentTypeList('project')
                    .id('all-projects')
                    .title('All projects')
                    .defaultOrdering([...projectOrdering]),
                ),
              S.divider(),
              projectsByCategory(S, 'Digital', 'digital', DesktopIcon),
              projectsByCategory(S, 'Physical', 'physical', CaseIcon),
            ]),
        ),
      S.listItem()
        .id('categories')
        .title('Categories')
        .icon(TagIcon)
        .child(
          S.documentTypeList('category')
            .id('categories')
            .title('Categories')
            .defaultOrdering([...projectOrdering]),
        ),
      S.divider(),
      S.listItem()
        .id('about-page')
        .title('About page')
        .icon(DocumentIcon)
        .child(
          S.document()
            .id(singletonDocumentIds.aboutPage)
            .schemaType('aboutPage')
            .documentId(singletonDocumentIds.aboutPage)
            .title('About page'),
        ),
      S.listItem()
        .id('site-settings')
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.document()
            .id(singletonDocumentIds.siteSettings)
            .schemaType('siteSettings')
            .documentId(singletonDocumentIds.siteSettings)
            .title('Site settings'),
        ),
    ])
