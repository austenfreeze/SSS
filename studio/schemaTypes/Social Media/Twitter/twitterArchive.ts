import { defineType, defineField } from 'sanity'
import { SiX } from 'react-icons/si'

export default defineType({
  name: 'twitterArchive',
  title: 'Twitter/X Archive',
  type: 'document',
  icon: SiX,
  fields: [
    defineField({
      name: 'tweetType',
      title: 'Tweet Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tweet', value: 'tweet' },
          { title: 'Reply', value: 'reply' },
          { title: 'Quote Tweet', value: 'quote' },
          { title: 'Retweet', value: 'retweet' },
          { title: 'Thread', value: 'thread' },
        ],
      },
      initialValue: 'tweet',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'postDate',
      title: 'Post Date',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Tweet Content',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: 'Media Attachments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
    }),
    defineField({
      name: 'replyTo',
      title: 'Reply To',
      description: 'Reference to the tweet this is replying to',
      type: 'reference',
      to: [{ type: 'twitterArchive' }],
      hidden: ({ parent }) => parent?.tweetType !== 'reply',
    }),
    defineField({
      name: 'quotedTweet',
      title: 'Quoted Tweet',
      description: 'Reference to the quoted tweet',
      type: 'reference',
      to: [{ type: 'twitterArchive' }],
      hidden: ({ parent }) => parent?.tweetType !== 'quote',
    }),
    defineField({
      name: 'threadPosts',
      title: 'Thread Posts',
      description: 'Array of tweets in this thread',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'twitterArchive' }] }],
      hidden: ({ parent }) => parent?.tweetType !== 'thread',
    }),
    defineField({
      name: 'mentions',
      title: 'Mentions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'interactions',
      title: 'Interactions',
      type: 'object',
      fields: [
        { name: 'likesCount', title: 'Likes', type: 'number' },
        { name: 'retweetsCount', title: 'Retweets', type: 'number' },
        { name: 'repliesCount', title: 'Replies', type: 'number' },
        { name: 'quotesCount', title: 'Quotes', type: 'number' },
        { name: 'bookmarksCount', title: 'Bookmarks', type: 'number' },
        { name: 'viewsCount', title: 'Views', type: 'number' },
      ],
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original Tweet URL',
      type: 'url',
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      tweetType: 'tweetType',
      content: 'content',
      date: 'postDate',
      media: 'media.0.image',
    },
    prepare({ tweetType, content, date, media }) {
      const truncatedContent = content 
        ? content.substring(0, 60) + (content.length > 60 ? '...' : '')
        : 'No content'
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Unknown date'
      return {
        title: truncatedContent,
        subtitle: `${tweetType?.toUpperCase() || 'TWEET'} · ${formattedDate}`,
        media: media || SiX,
      }
    },
  },
})
