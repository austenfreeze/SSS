import { defineType, defineField } from 'sanity'
import { SiYoutube } from 'react-icons/si'

export default defineType({
  name: 'youtubeVideo',
  title: 'YouTube Video',
  type: 'document',
  icon: SiYoutube,
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      description: 'YouTube video ID for embedding',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'Format: HH:MM:SS or MM:SS',
      type: 'string',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Short', value: 'short' },
          { title: 'Live Stream', value: 'live' },
          { title: 'Premiere', value: 'premiere' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Unlisted', value: 'unlisted' },
          { title: 'Private', value: 'private' },
        ],
      },
      initialValue: 'public',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'object',
      fields: [
        { name: 'viewCount', title: 'Views', type: 'number' },
        { name: 'likeCount', title: 'Likes', type: 'number' },
        { name: 'commentCount', title: 'Comments', type: 'number' },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishDate',
      views: 'stats.viewCount',
      media: 'thumbnail.image',
    },
    prepare({ title, date, views, media }) {
      const formattedViews = views 
        ? views >= 1000000 
          ? `${(views / 1000000).toFixed(1)}M views` 
          : views >= 1000 
            ? `${(views / 1000).toFixed(1)}K views` 
            : `${views} views`
        : 'No views'
      const formattedDate = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: title || 'Untitled Video',
        subtitle: `${formattedDate} · ${formattedViews}`,
        media: media || SiYoutube,
      }
    },
  },
})
