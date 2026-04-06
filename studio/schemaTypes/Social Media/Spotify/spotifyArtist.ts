import { defineType, defineField } from 'sanity'
import { SiSpotify } from 'react-icons/si'

export default defineType({
  name: 'spotifyArtist',
  title: 'Spotify Artist',
  type: 'document',
  icon: SiSpotify,
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'spotifyUrl', type: 'url' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'bio',
      title: 'Archival Bio',
      type: 'text',
      description: 'Notes on the artist’s impact on the user’s timeline.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bio',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unknown Artist',
        subtitle: subtitle || 'No forensic bio provided.',
        media: media
      }
    }
  }
})