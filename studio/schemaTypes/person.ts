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
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'roles',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'bio', 
      type: 'text', 
      rows: 2 
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'roles',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Person',
        subtitle: subtitle ? subtitle.join(', ') : 'No roles assigned',
        media: media || UserIcon,
      }
    }
  }
})