import {PlayIcon} from '@sanity/icons/Play'
import {defineField, defineType} from 'sanity'

export const demoReelPage = defineType({
  name: 'demoReelPage',
  title: 'Demo Reel page',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'Paste the public Vimeo URL for the demo reel.',
      validation: (rule) =>
        rule.required().uri({scheme: ['https']}).custom((value) => {
          if (!value) return true
          try {
            const hostname = new URL(value).hostname.replace(/^www\./, '')
            return hostname === 'vimeo.com' || hostname === 'player.vimeo.com'
              ? true
              : 'Use a Vimeo URL.'
          } catch {
            return 'Use a Vimeo URL.'
          }
        }),
    }),
  ],
  preview: {
    select: {vimeoUrl: 'vimeoUrl'},
    prepare({vimeoUrl}) {
      return {title: 'Demo Reel page', subtitle: vimeoUrl}
    },
  },
})
