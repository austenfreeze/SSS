/* File: facebookArchive.ts */
import { defineType, defineField } from 'sanity'
import { SiFacebook } from 'react-icons/si'

export default defineType({
  name: 'facebookArchive',
  title: 'Facebook Archives',
  type: 'document',
  icon: SiFacebook,
  fields: [
    defineField({ 
      name: 'author', 
      type: 'reference', 
      to: [{ type: 'person' }] 
    }),
    defineField({ name: 'postDate', type: 'datetime' }),
    defineField({ name: 'content', type: 'text' }),
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
              { name: 'type', type: 'string', options: { list: ['Like', 'Love', 'Haha', 'Wow'] } },
              { name: 'user', type: 'reference', to: [{ type: 'person' }] } // Tracks who reacted
            ]
          }]
        }
      ]
    })
  ]
})