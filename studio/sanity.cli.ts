import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  typegen: {
    enabled: true,
    path: '../lib/sanity/queries.ts',
    schema: './schema.json',
    generates: '../lib/sanity/types.generated.ts',
    overloadClientMethods: true,
  },
  api: {
    projectId: '35ex4ltc',
    dataset: 'production'
  },
  deployment: {
    appId: 'eynxcyt37oksi23ynjq26qjh',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
