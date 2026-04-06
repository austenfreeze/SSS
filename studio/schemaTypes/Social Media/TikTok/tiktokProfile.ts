import { defineType, defineField } from 'sanity'
import { SiTiktok } from 'react-icons/si'

export default defineType({
  name: 'tiktokProfile',
  title: 'TikTok Profile',
  type: 'document',
  icon: SiTiktok,
  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Username',
      description: 'TikTok handle without the @ symbol',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'followersCount',
      title: 'Followers Count',
      type: 'number',
    }),
    defineField({
      name: 'followingCount',
      title: 'Following Count',
      type: 'number',
    }),
    defineField({
      name: 'likesCount',
      title: 'Total Likes Received',
      type: 'number',
    }),
    defineField({
      name: 'videoCount',
      title: 'Video Count',
      type: 'number',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Account',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'archivedVideos',
      title: 'Archived Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tiktokArchive' }] }],
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      username: 'username',
      followers: 'followersCount',
      media: 'profilePhoto.image',
    },
    prepare({ title, username, followers, media }) {
      const formattedFollowers = followers 
        ? followers >= 1000000 
          ? `${(followers / 1000000).toFixed(1)}M` 
          : followers >= 1000 
            ? `${(followers / 1000).toFixed(1)}K` 
            : followers.toString()
        : '0'
      return {
        title: title || 'Unnamed Profile',
        subtitle: `@${username || 'unknown'} · ${formattedFollowers} followers`,
        media: media || SiTiktok,
      }
    },
  },
})
