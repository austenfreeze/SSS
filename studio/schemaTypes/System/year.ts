import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'year',
  title: 'Archive Year',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^\d{4}$/, { name: 'YYYY format' })
    }),
  ]
})