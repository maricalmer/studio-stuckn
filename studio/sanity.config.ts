import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationResolve} from './presentation'
import {schemaTypes} from './schemaTypes'
import {singletonSchemaTypes, structure} from './structure'

const previewOrigins = ['http://localhost:3000', 'https://www.ronjastucken.com'] as const
const configuredPreviewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://www.ronjastucken.com'
    : 'http://localhost:3000')

function getPreviewOrigin(value: string) {
  const url = new URL(value)
  if (
    !previewOrigins.includes(url.origin as (typeof previewOrigins)[number]) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    (url.pathname !== '' && url.pathname !== '/')
  ) {
    throw new Error(
      `SANITY_STUDIO_PREVIEW_URL must be one of: ${previewOrigins.join(', ')}`,
    )
  }
  return url.origin
}

const previewOrigin = getPreviewOrigin(configuredPreviewUrl)

export default defineConfig({
  name: 'default',
  title: 'Ronja.Stucken',

  projectId: '35ex4ltc',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      // Presentation trust is independent from Sanity API CORS. Keep this
      // allowlist explicit; do not permit arbitrary deployment previews.
      allowOrigins: [...previewOrigins],
      resolve: presentationResolve,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (previousTemplates) =>
      previousTemplates.filter((template) => !singletonSchemaTypes.has(template.schemaType)),
  },

  document: {
    actions: (previousActions, context) =>
      singletonSchemaTypes.has(context.schemaType)
        ? previousActions.filter((action) => action.action !== 'duplicate')
        : previousActions,
  },
})
