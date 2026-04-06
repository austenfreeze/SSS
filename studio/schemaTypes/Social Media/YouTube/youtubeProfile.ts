import { defineType, defineField } from 'sanity'
import { SiYoutube } from 'react-icons/si'

export default defineType({
  name: 'youtubeProfile',
  title: 'YouTube Profile',
  type: 'document',
  icon: SiYoutube,
  fields: [
    defineField({
      name: 'channelName',
      title: 'Channel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'channelId',
      title: 'Channel ID',
      description: 'YouTube Channel ID for API integration',
      type: 'string',
    }),
    defineField({
      name: 'customUrl',
      title: 'Custom URL Handle',
      description: 'Custom @handle for the channel',
      type: 'string',
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Channel Avatar',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'url',
      title: 'Channel URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Channel Description',
      type: 'text',
    }),
    defineField({
      name: 'subscriberCount',
      title: 'Subscriber Count',
      type: 'number',
    }),
    defineField({
      name: 'videoCount',
      title: 'Total Videos',
      type: 'number',
    }),
    defineField({
      name: 'viewCount',
      title: 'Total Views',
      type: 'number',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Channel',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videos',
      title: 'Archived Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'youtubeVideo' }] }],
    }),
    defineField({
      name: 'playlists',
      title: 'Playlists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'youtubePlaylist' }] }],
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'channelName',
      handle: 'customUrl',
      subs: 'subscriberCount',
      media: 'profilePhoto.image',
    },
    prepare({ title, handle, subs, media }) {
      const formattedSubs = subs 
        ? subs >= 1000000 
          ? `${(subs / 1000000).toFixed(1)}M` 
          : subs >= 1000 
            ? `${(subs / 1000).toFixed(1)}K` 
            : subs.toString()
        : '0'
      return {
        title: title || 'Unnamed Channel',
        subtitle: `${handle ? `@${handle}` : 'No handle'} · ${formattedSubs} subscribers`,
        media: media || SiYoutube,
      }
    },
  },
})
