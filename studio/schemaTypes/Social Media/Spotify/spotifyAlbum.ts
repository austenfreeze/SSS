import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'spotifyAlbum',
  type: 'document',
  title: 'Spotify Album',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'artist', type: 'reference', to: [{ type: 'spotifyArtist' }] }),
    defineField({ name: 'releaseDate', type: 'date' }),
    defineField({ name: 'image', type: 'image' })
  ],
  preview: {
    select: {
      title: 'name',
      artistName: 'artist.name',
      media: 'image'
    },
    prepare({ title, artistName, media }) {
      return {
        title: title || 'Unknown Album',
        subtitle: artistName || 'Unknown Artist',
        media: media
      }
    }
  }
})