import { defineType, defineField } from 'sanity'
import { SiSpotify } from 'react-icons/si'

export default defineType({
  name: 'spotifyProfile',
  title: 'Spotify Profile',
  type: 'document',
  icon: SiSpotify,
  fields: [
    defineField({
      name: 'profileName',
      title: 'Display Name',
      type: 'string',
      initialValue: 'Austen Freeze'
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'reference',
      to: [{ type: 'photo' }], 
    }),
    defineField({
      name: 'url',
      title: 'User Profile URL',
      type: 'url'
    }),
    defineField({
      name: 'playlists',
      title: 'Playlists',
      type: 'array',
      // This 'to' array tells Sanity which types are allowed to be created/referenced
      of: [
        defineField({
          name: 'playlistReference',
          type: 'reference',
          to: [{ type: 'spotifyPlaylist' }]
        })
      ],
    }),
  ],
  preview: {
    select: {
      title: 'profileName',
      subtitle: 'contextNote',
      playlists: 'playlists',
      media: 'profilePhoto.image'
    },
    prepare({ title, subtitle, playlists, media }) {
      const count = playlists?.length || 0
      return {
        title: title || 'Unnamed Profile',
        subtitle: `(${count} Playlists) ${subtitle || ''}`,
        media: media
      }
    }
  }
})