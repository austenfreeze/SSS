/* File: documents/facebookProfile.ts */
import { defineType, defineField } from 'sanity'
import { SiFacebook } from 'react-icons/si'

export default defineType({
  name: 'facebookProfile',
  title: 'Facebook Profile',
  type: 'document',
  icon: SiFacebook,
  fields: [
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      type: 'string'
    }),
    defineField({
      name: 'url',
      title: 'Surface URL',
      type: 'url'
    }),
    defineField({
      name: 'forensicPosts',
      title: 'Archived Posts',
      description: 'References to specific forensic post records.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'facebookArchive' }] }]
    }),
    defineField({
      name: 'contextNote',
      title: 'Archival Context',
      type: 'text'
    })
  ]
})