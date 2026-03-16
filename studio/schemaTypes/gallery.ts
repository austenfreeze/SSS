// schemaTypes/gallery.ts
import { ImagesIcon } from '@sanity/icons'

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    { name: 'title', title: 'Gallery Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'photos',
      title: 'Photos in Gallery',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'photo' }] }],
      description: 'Add and reorder photos directly in this gallery.'
    },
  ],
}