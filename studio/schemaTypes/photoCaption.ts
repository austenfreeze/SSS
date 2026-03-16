// schemaTypes/photoCaption.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photoCaption',
  title: 'Photo Context & Caption',
  type: 'object',
  fieldsets: [
    { 
      name: 'visibility', 
      title: 'Visibility & Rights', 
      options: { columns: 2 } 
    }
  ],
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'intent',
      title: 'Primary Intent',
      type: 'string',
      options: {
        list: [
          { title: 'Personal Archive', value: 'personal' },
          { title: 'Editorial/Article', value: 'editorial' },
          { title: 'Creative Portfolio', value: 'portfolio' },
          { title: 'Social Media', value: 'social' },
          { title: 'Work/Project Asset', value: 'work' }
        ],
        layout: 'dropdown'
      }
    }),
    defineField({
      name: 'isPublic',
      title: 'Public Display',
      type: 'boolean',
      initialValue: false,
      fieldset: 'visibility'
    }),
    defineField({
      name: 'isSensitive',
      title: 'Sensitive Content',
      type: 'boolean',
      initialValue: false,
      fieldset: 'visibility'
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright/Credit',
      type: 'string',
      initialValue: '© Austen Taylor Freeze', // Your legal name from Gmail
    }),
  ]
})