import { defineType, defineField } from 'sanity'
import { SiX } from 'react-icons/si'

export default defineType({
  name: 'twitterProfile',
  title: 'Twitter/X Profile',
  type: 'document',
  icon: SiX,
  fields: [
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      description: 'Twitter/X handle without the @ symbol',
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
      name: 'headerImage',
      title: 'Header Image',
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
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'joinDate',
      title: 'Join Date',
      type: 'date',
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
      name: 'tweetCount',
      title: 'Tweet Count',
      type: 'number',
    }),
    defineField({
      name: 'isVerified',
      title: 'Verified Account',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verifiedType',
      title: 'Verification Type',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Blue (X Premium)', value: 'blue' },
          { title: 'Gold (Business)', value: 'gold' },
          { title: 'Grey (Government/Organization)', value: 'grey' },
        ],
      },
      hidden: ({ parent }) => !parent?.isVerified,
    }),
    defineField({
      name: 'archivedTweets',
      title: 'Archived Tweets',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'twitterArchive' }] }],
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
      handle: 'handle',
      followers: 'followersCount',
      media: 'profilePhoto.image',
    },
    prepare({ title, handle, followers, media }) {
      const formattedFollowers = followers 
        ? followers >= 1000000 
          ? `${(followers / 1000000).toFixed(1)}M` 
          : followers >= 1000 
            ? `${(followers / 1000).toFixed(1)}K` 
            : followers.toString()
        : '0'
      return {
        title: title || 'Unnamed Profile',
        subtitle: `@${handle || 'unknown'} · ${formattedFollowers} followers`,
        media: media || SiX,
      }
    },
  },
})
