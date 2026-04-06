import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'photoCaption',
  title: 'Photo Context',
  type: 'object',
  fieldsets: [
    { name: 'governance', title: 'Privacy & Intent', options: { columns: 3 } }
  ],
  fields: [
    defineField({
      name: 'caption',
      title: 'Short Caption',
      type: 'string',
      description: 'A brief summary for list views.'
    }),
    defineField({
      name: 'narrative',
      title: 'The Full Story',
      type: 'text',
      rows: 6,
      description: 'The deep-dive archival context.'
    }),
    defineField({
      name: 'isPublic',
      title: 'Public',
      type: 'boolean',
      initialValue: false,
      fieldset: 'governance'
    }),
    defineField({
      name: 'isSensitive',
      title: 'Sensitive',
      type: 'boolean',
      initialValue: false,
      fieldset: 'governance'
    }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      options: {
        list: [
          { title: 'Personal Archive', value: 'personal' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Research', value: 'research' },
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Selfie', value: 'selfie' },
          { title: 'Profile Photo', value: 'profile' },
          { title: 'Candid', value: 'candid' },
        ],
        layout: 'dropdown'
      }
    }),
  ],
})