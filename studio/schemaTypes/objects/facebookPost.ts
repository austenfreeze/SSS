import { defineField, defineType } from 'sanity'
import { SiFacebook } from 'react-icons/si'

export const facebookPost = defineType({
  name: 'facebookPost',
  type: 'object',
  title: 'Facebook Archive Item',
  icon: SiFacebook,
  fields: [
    defineField({ name: 'postDate', type: 'datetime', title: 'Forensic Timestamp' }),
    defineField({ 
      name: 'author', 
      type: 'reference', 
      to: [{ type: 'person' }] 
    }),
    defineField({ name: 'content', type: 'text', title: 'Post Body' }),
    defineField({ 
      name: 'media', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }], 
      title: 'Attached Evidence/Photos' 
    }),
    defineField({
      name: 'interactions',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ 
          name: 'reactions', 
          type: 'array', 
          of: [{
            type: 'object',
            fields: [
              { name: 'type', type: 'string', options: { list: ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'] } },
              { name: 'user', type: 'reference', to: [{ type: 'person' }] }
            ],
            preview: {
              select: { title: 'user.name', subtitle: 'type' }
            }
          }]
        }),
        defineField({ 
          name: 'comments', 
          type: 'array', 
          of: [{
            type: 'object',
            fields: [
              { name: 'author', type: 'reference', to: [{ type: 'person' }] },
              { name: 'text', type: 'text' },
              { name: 'timestamp', type: 'datetime' }
            ],
            preview: {
              select: { title: 'author.name', subtitle: 'text' }
            }
          }]
        })
      ]
    }),
    defineField({ name: 'originalUrl', type: 'url', title: 'Source URL' }),
  ],
  preview: {
    select: { title: 'content', subtitle: 'postDate' },
    prepare({ title, subtitle }) {
      return {
        title: title ? title.substring(0, 30) + '...' : 'Untitled Post',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No Date'
      }
    }
  }
})