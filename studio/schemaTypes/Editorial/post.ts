import { defineType, defineField } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'text', // Standard text for medium-form speed
      rows: 10,
    }),
    defineField({
      name: 'mediaRef',
      title: 'Related Media',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'photo' }, { type: 'gallery' }, { type: 'spotifyAlbum' }] }
      ],
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
})