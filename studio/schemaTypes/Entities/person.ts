/* File: person.ts */
import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ 
      name: 'name', 
      type: 'string', 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'name' } 
    }),
    defineField({ 
      name: 'image', 
      type: 'image', 
      options: { hotspot: true } 
    }),
    defineField({ 
      name: 'bio', 
      type: 'text', 
      rows: 3 
    }),
    defineField({
      name: 'photoGalleries',
      title: 'Photo Galleries',
      type: 'array',
      // Corrected syntax to allow referencing and creating mediaGallery documents
      of: [{ type: 'reference', to: [{ type: 'gallery' }] }]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bio',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Person',
        subtitle: subtitle || 'No bio provided',
        media: media || UserIcon
      }
    }
  }
})