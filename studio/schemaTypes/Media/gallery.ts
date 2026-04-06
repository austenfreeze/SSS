import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Gallery Description', type: 'text' }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'photos',
      title: 'Photos in Gallery',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
      options: {
        layout: 'grid' 
      }
    }),
  ],
})