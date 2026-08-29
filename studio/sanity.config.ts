import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {singletonSchemaTypes, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'studio',

  projectId: '35ex4ltc',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

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
