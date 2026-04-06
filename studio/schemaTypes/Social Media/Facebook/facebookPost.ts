/* File: facebookPost.ts */
import { defineField } from 'sanity'
import { SiFacebook } from 'react-icons/si'

export const facebookPost = {
  name: 'facebookPost',
  type: 'object',
  title: 'Facebook Archive Item',
  icon: SiFacebook,
  fields: [
    defineField({ name: 'postDate', type: 'datetime' }),
    defineField({ 
      name: 'author', 
      type: 'reference', 
      to: [{ type: 'person' }] // Links to core Person entities
    }),
    defineField({ name: 'content', type: 'text', title: 'Post Body' }),
    defineField({ name: 'media', type: 'array', of: [{ type: 'image' }], title: 'Attached Photos' }),
    defineField({
      name: 'interactions',
      type: 'object',
      fields: [
        { 
          name: 'reactions', 
          type: 'array', 
          of: [{
            type: 'object',
            fields: [
              { name: 'type', type: 'string', options: { list: ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'] } },
              { name: 'user', type: 'reference', to: [{ type: 'person' }] } // Tracks who reacted
            ]
          }]
        },
        { 
          name: 'comments', 
          type: 'array', 
          of: [{
            type: 'object',
            fields: [
              { name: 'author', type: 'reference', to: [{ type: 'person' }] }, // Relational comments
              { name: 'text', type: 'text' },
              { name: 'timestamp', type: 'datetime' }
            ]
          }]
        }
      ]
    }),
    defineField({ name: 'originalUrl', type: 'url' }),
  ]
}