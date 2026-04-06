import { defineType, defineField } from 'sanity'
import { SiYoutube } from 'react-icons/si'

export default defineType({
  name: 'youtubePlaylist',
  title: 'YouTube Playlist',
  type: 'document',
  icon: SiYoutube,
  fields: [
    defineField({
      name: 'title',
      title: 'Playlist Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playlistId',
      title: 'Playlist ID',
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
      title: 'Playlist URL',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'youtubeVideo' }] }],
    }),
    defineField({
      name: 'videoCount',
      title: 'Video Count',
      type: 'number',
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
      count: 'videoCount',
      media: 'thumbnail.image',
    },
    prepare({ title, count, media }) {
      return {
        title: title || 'Untitled Playlist',
        subtitle: `${count || 0} videos`,
        media: media || SiYoutube,
      }
    },
  },
})
