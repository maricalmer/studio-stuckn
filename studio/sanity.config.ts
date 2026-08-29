import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationResolve} from './presentation'
import {schemaTypes} from './schemaTypes'
import {singletonSchemaTypes, structure} from './structure'

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://www.ronjastucken.com'
    : 'http://localhost:3000')

export default defineConfig({
  name: 'default',
  title: 'Ronja.Stucken',

  projectId: '35ex4ltc',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl,
      allowOrigins: ['http://localhost:*', 'https://www.ronjastucken.com'],
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
