import { defineField, defineType } from 'sanity'
import { SiSpotify } from 'react-icons/si'

export default defineType({
  name: 'spotifyPlaylist',
  type: 'document', // Changed from 'object' to 'document'
  title: 'Spotify Playlist',
  icon: SiSpotify,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'spotifyUrl', type: 'url', title: 'Playlist Link' }),
    defineField({ name: 'coverArt', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'tracks',
      title: 'Track List',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'songTitle', type: 'string' },
          defineField({
            name: 'artistRef',
            title: 'Artist Entity',
            type: 'reference',
            to: [{ type: 'spotifyArtist' }]
          }),
          { name: 'albumName', type: 'string' },
          { name: 'duration', type: 'string' },
          { name: 'isFavorite', type: 'boolean', initialValue: false }
        ],
        preview: {
          select: { title: 'songTitle', subtitle: 'artistRef.name', media: 'artistRef.image' }
        }
      }]
    }),
    defineField({ 
      name: 'embedCode', 
      type: 'text', 
      title: 'Iframe Embed Code'
    })
  ],
  preview: {
    select: {
      title: 'title',
      tracks: 'tracks',
      media: 'coverArt'
    },
    prepare({ title, tracks, media }) {
      const count = tracks?.length || 0
      return {
        title: title || 'Untitled Playlist',
        subtitle: `${count} Tracks recorded`,
        media: media
      }
    }
  }
})