import { defineType, defineField } from 'sanity'
import { ShareIcon } from '@sanity/icons'

export default defineType({
  name: 'share',
  title: 'Share',
  type: 'document',
  icon: ShareIcon,
  fields: [
    defineField({ name: 'sourceUrl', type: 'url', title: 'Source URL' }),
    defineField({
      name: 'quotedText',
      type: 'text',
      title: 'Quoted Text',
      description: 'Quote from Pomerantsev, Penny Universities, etc.',
    }),
    defineField({
      name: 'commentary',
      type: 'text',
      title: 'Brief Commentary',
      description: 'Why is this signal relevant now?',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
  ],
})