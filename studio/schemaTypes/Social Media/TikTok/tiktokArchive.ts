import { defineType, defineField } from 'sanity'
import { SiTiktok } from 'react-icons/si'

export default defineType({
  name: 'tiktokArchive',
  title: 'TikTok Archive',
  type: 'document',
  icon: SiTiktok,
  fields: [
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Video', value: 'video' },
          { title: 'Duet', value: 'duet' },
          { title: 'Stitch', value: 'stitch' },
          { title: 'Live', value: 'live' },
          { title: 'Story', value: 'story' },
        ],
      },
      initialValue: 'video',
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
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
    }),
    defineField({
      name: 'sound',
      title: 'Sound',
      type: 'object',
      fields: [
        { name: 'name', title: 'Sound Name', type: 'string' },
        { name: 'artist', title: 'Artist', type: 'string' },
        { name: 'isOriginal', title: 'Original Sound', type: 'boolean' },
      ],
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
      name: 'effects',
      title: 'Effects Used',
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
        { name: 'viewsCount', title: 'Views', type: 'number' },
        { name: 'likesCount', title: 'Likes', type: 'number' },
        { name: 'commentsCount', title: 'Comments', type: 'number' },
        { name: 'sharesCount', title: 'Shares', type: 'number' },
        { name: 'savesCount', title: 'Saves', type: 'number' },
      ],
    }),
    defineField({
      name: 'duetWith',
      title: 'Duet With',
      type: 'reference',
      to: [{ type: 'tiktokArchive' }],
      hidden: ({ parent }) => parent?.videoType !== 'duet',
    }),
    defineField({
      name: 'stitchedFrom',
      title: 'Stitched From',
      type: 'reference',
      to: [{ type: 'tiktokArchive' }],
      hidden: ({ parent }) => parent?.videoType !== 'stitch',
    }),
    defineField({
      name: 'originalUrl',
      title: 'Original Video URL',
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
      videoType: 'videoType',
      caption: 'caption',
      date: 'postDate',
      views: 'interactions.viewsCount',
      media: 'thumbnail.image',
    },
    prepare({ videoType, caption, date, views, media }) {
      const truncatedCaption = caption 
        ? caption.substring(0, 50) + (caption.length > 50 ? '...' : '')
        : 'No caption'
      const formattedViews = views 
        ? views >= 1000000 
          ? `${(views / 1000000).toFixed(1)}M views` 
          : views >= 1000 
            ? `${(views / 1000).toFixed(1)}K views` 
            : `${views} views`
        : ''
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Unknown date'
      return {
        title: truncatedCaption,
        subtitle: `${videoType?.toUpperCase() || 'VIDEO'} · ${formattedDate}${formattedViews ? ` · ${formattedViews}` : ''}`,
        media: media || SiTiktok,
      }
    },
  },
})
