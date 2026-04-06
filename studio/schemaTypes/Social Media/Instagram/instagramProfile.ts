import { defineType, defineField } from 'sanity'
import { SiInstagram } from 'react-icons/si'

export default defineType({
  name: 'instagramProfile',
  title: 'Instagram Profile',
  type: 'document',
  icon: SiInstagram,
  fields: [
    defineField({
      name: 'profileName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Username',
      description: 'Instagram handle without the @ symbol',
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
      name: 'postsCount',
      title: 'Posts Count',
      type: 'number',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Account',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'archivedPosts',
      title: 'Archived Posts',
      description: 'References to archived Instagram post records.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instagramArchive' }] }],
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'profileName',
      username: 'username',
      followers: 'followersCount',
      media: 'profilePhoto.image',
    },
    prepare({ title, username, followers, media }) {
      const formattedFollowers = followers 
        ? followers >= 1000 
          ? `${(followers / 1000).toFixed(1)}K` 
          : followers.toString()
        : '0'
      return {
        title: title || 'Unnamed Profile',
        subtitle: `@${username || 'unknown'} · ${formattedFollowers} followers`,
        media: media || SiInstagram,
      }
    },
  },
})
