import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({ name: 'subhead', type: 'string', title: 'Subhead' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'headline' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'portableText', // Uses your rich text schema
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'person' }],
      initialValue: { _ref: 'adminProfile' }, // Links to your anchor
    }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
})