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
          { title: 'YouTube', value: 'youtube' },
          { title: 'Twitter/X', value: 'twitter' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'GitHub', value: 'github' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Threads', value: 'threads' },
          { title: 'Discord', value: 'discord' },
          { title: 'Twitch', value: 'twitch' },
          { title: 'SoundCloud', value: 'soundcloud' },
          { title: 'Bandcamp', value: 'bandcamp' },
          { title: 'Other', value: 'other' },
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
        { type: 'instagramProfile' },
        { type: 'youtubeProfile' },
        { type: 'twitterProfile' },
        { type: 'tiktokProfile' },
      ],
      options: {
        filter: ({ parent }: any) => {
          const platformToType: Record<string, string> = {
            spotify: 'spotifyProfile',
            facebook: 'facebookProfile',
            instagram: 'instagramProfile',
            youtube: 'youtubeProfile',
            twitter: 'twitterProfile',
            tiktok: 'tiktokProfile',
          }
          const schemaType = platformToType[parent?.platform]
          if (schemaType) {
            return { filter: `_type == "${schemaType}"` }
          }
          return {}
        }
      }
    }),
    defineField({
      name: 'url',
      title: 'Direct URL',
      description: 'Manual URL for platforms without profile documents',
      type: 'url',
    }),
    defineField({
      name: 'username',
      title: 'Username/Handle',
      description: 'Display handle for this platform',
      type: 'string',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Account',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPrimary',
      title: 'Primary Platform',
      description: 'Mark as the primary/featured social platform',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      username: 'username',
      refName: 'profileReference.profileName',
      refChannelName: 'profileReference.channelName',
      refDisplayName: 'profileReference.displayName',
      refImage: 'profileReference.profilePhoto.image',
      isVerified: 'isVerified',
      isPrimary: 'isPrimary',
    },
    prepare({ platform, username, refName, refChannelName, refDisplayName, refImage, isVerified, isPrimary }) {
      const platformLabels: Record<string, string> = {
        spotify: 'Spotify',
        facebook: 'Facebook',
        instagram: 'Instagram',
        youtube: 'YouTube',
        twitter: 'Twitter/X',
        tiktok: 'TikTok',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        discord: 'Discord',
        twitch: 'Twitch',
        soundcloud: 'SoundCloud',
        bandcamp: 'Bandcamp',
        other: 'Other',
      }

      const displayTitle = platformLabels[platform] || `${platform ? platform.toUpperCase() : 'Unknown'} Portal`
      const name = refName || refChannelName || refDisplayName || username
      const verifiedBadge = isVerified ? ' [Verified]' : ''
      const primaryBadge = isPrimary ? ' (Primary)' : ''

      return {
        title: `${displayTitle}${primaryBadge}`,
        subtitle: name ? `${name}${verifiedBadge}` : 'No Profile Linked',
        media: refImage || LinkIcon 
      }
    }
  }
}
