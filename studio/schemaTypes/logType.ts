import {defineType, defineField} from 'sanity'

export const logType = defineType({
  name: 'systemLog',
  title: 'System Log',
  type: 'document',
  fields: [
    defineField({
      name: 'changeTitle',
      title: 'Change Title',
      type: 'string',
      description: 'e.g., "Flattened Directory Structure" or "Fixed React Hook Conflict"',
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Architecture', value: 'architecture'},
          {title: 'Dependencies', value: 'dependencies'},
          {title: 'UI/Frontend', value: 'ui'},
          {title: 'Sanity Schema', value: 'schema'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      description: 'What was broken, and how did we fix it?',
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical Notes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Specific commands or version changes (e.g., React 19.2.3 override).',
    }),
  ],
})