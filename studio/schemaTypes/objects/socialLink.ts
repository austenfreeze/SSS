import { defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const socialLink = {
  name: 'socialLink',
  type: 'object',
  title: 'Social Portal',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {
        list: [
          { title: 'Spotify', value: 'spotify' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'GitHub', value: 'github' },
        ],
      },
    }),
    defineField({
      name: 'profileReference',
      title: 'Profile Portal',
      description: 'Reference the unified profile document for this platform.',
      type: 'reference',
      to: [
        { type: 'spotifyProfile' },
        { type: 'facebookProfile' },
      ],
      options: {
        filter: ({ parent }: any) => {
          if (parent?.platform === 'spotify') return { filter: '_type == "spotifyProfile"' }
          if (parent?.platform === 'facebook') return { filter: '_type == "facebookProfile"' }
          return {}
        }
      }
    })
  ],
  preview: {
    select: {
      platform: 'platform',
      refName: 'profileReference.profileName',
      // Navigates through the reference to find the image in the 'photo' document
      refImage: 'profileReference.profilePhoto.image' 
    },
    prepare({ platform, refName, refImage }) {
      const platformLabels: Record<string, string> = {
        spotify: 'Spotify',
        facebook: 'Facebook',
        github: 'GitHub',
        instagram: 'Instagram'
      }

      const displayTitle = platformLabels[platform] || `${platform ? platform.toUpperCase() : 'Unknown'} Portal`

      return {
        title: displayTitle,
        subtitle: refName ? `${refName}` : 'No Profile Linked',
        media: refImage || LinkIcon 
      }
    }
  }
}