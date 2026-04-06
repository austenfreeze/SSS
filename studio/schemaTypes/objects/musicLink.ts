import { defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const musicLink = {
  name: 'musicLink',
  type: 'object',
  title: 'Music Link',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          { title: 'Spotify', value: 'spotify' },
          { title: 'Apple Music', value: 'apple-music' },
          { title: 'YouTube Music', value: 'youtube-music' }
        ]
      }
    }),
    defineField({
      name: 'contentType',
      type: 'string',
      options: {
        list: ['Playlist', 'Album', 'Artist', 'Track']
      }
    }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'url', type: 'url', title: 'Deep Link' }),
    defineField({ 
      name: 'embedCode', 
      type: 'text',
      description: 'Paste the iframe embed code here.'
    })
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      contentType: 'contentType'
    },
    prepare({ title, platform, contentType }) {
      // Helper to turn 'apple-music' into 'Apple Music'
      const formatPlatform = (str: string) => 
        str ? str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ''

      return {
        title: title || 'Untitled Link',
        subtitle: `${formatPlatform(platform)} [${contentType || 'Media'}]`
      }
    }
  }
}