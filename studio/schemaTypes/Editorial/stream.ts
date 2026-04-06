import { defineType, defineField } from 'sanity'
import { ActivityIcon } from '@sanity/icons'

export default defineType({
  name: 'stream',
  title: 'Stream',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Pulse Entry',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true, // Preserves the "live" aspect
    }),
  ],
  preview: {
    select: { title: 'content', subtitle: 'timestamp' },
    prepare({ title, subtitle }) {
      return {
        title: title ? title.substring(0, 50) + '...' : 'Empty Entry',
        subtitle: new Date(subtitle).toLocaleString(),
      }
    }
  }
})