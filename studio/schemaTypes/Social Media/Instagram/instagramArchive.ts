import { defineType, defineField } from 'sanity'
import { SiInstagram } from 'react-icons/si'

export default defineType({
  name: 'instagramArchive',
  title: 'Instagram Archive',
  type: 'document',
  icon: SiInstagram,
  fields: [
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Reel', value: 'reel' },
          { title: 'Story', value: 'story' },
          { title: 'IGTV', value: 'igtv' },
        ],
      },
      initialValue: 'photo',
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
      name: 'caption',
      title: 'Caption',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
    }),
    defineField({
      name: 'location',
      title: 'Location Tag',
      type: 'reference',
      to: [{ type: 'location' }],
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
      name: 'mentions',
      title: 'Mentions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'interactions',
      title: 'Interactions',
      type: 'object',
      fields: [
        { name: 'likesCount', title: 'Likes', type: 'number' },
        { name: 'commentsCount', title: 'Comments', type: 'number' },
        { name: 'sharesCount', title: 'Shares', type: 'number' },
        { name: 'savesCount', title: 'Saves', type: 'number' },
      ],
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original Post URL',
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
      postType: 'postType',
      caption: 'caption',
      date: 'postDate',
      media: 'media.0.image',
    },
    prepare({ postType, caption, date, media }) {
      const truncatedCaption = caption 
        ? caption.substring(0, 50) + (caption.length > 50 ? '...' : '')
        : 'No caption'
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Unknown date'
      return {
        title: truncatedCaption,
        subtitle: `${postType?.toUpperCase() || 'POST'} · ${formattedDate}`,
        media: media || SiInstagram,
      }
    },
  },
})
