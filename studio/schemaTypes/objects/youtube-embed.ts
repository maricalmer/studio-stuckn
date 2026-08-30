import {PlayIcon} from '@sanity/icons/Play'
import {defineField, defineType} from 'sanity'

function validateYouTubeUrl(value: string | undefined) {
  if (!value) return true

  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
    const pathParts = url.pathname.split('/').filter(Boolean)

    if (url.protocol !== 'https:') {
      return 'Use an HTTPS YouTube URL.'
    }

    if (hostname === 'youtu.be') {
      return pathParts.length === 1 || 'Enter a valid YouTube share URL.'
    }

    if (hostname === 'youtube-nocookie.com') {
      return pathParts[0] === 'embed' && Boolean(pathParts[1])
        ? true
        : 'Enter a valid youtube-nocookie.com embed URL.'
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const isWatchUrl = url.pathname === '/watch' && Boolean(url.searchParams.get('v'))
      const isPathUrl = ['embed', 'shorts', 'live'].includes(pathParts[0]) && Boolean(pathParts[1])

      return isWatchUrl || isPathUrl || 'Enter a valid YouTube watch, embed, Shorts, or live URL.'
    }

    return 'Only YouTube URLs are supported.'
  } catch {
    return 'Enter a valid YouTube URL.'
  }
}

export const youtubeEmbed = defineType({
  name: 'youtubeEmbed',
  title: 'YouTube embed',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste a YouTube watch, share, Shorts, live, or privacy-enhanced embed URL.',
      validation: (rule) =>
        rule.required().uri({scheme: ['https']}).custom(validateYouTubeUrl),
    }),
    defineField({
      name: 'title',
      title: 'Accessible title',
      type: 'string',
      description: 'Describe the video for screen-reader and iframe users.',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})
