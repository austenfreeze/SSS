import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'Place Name', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'Elkhart' }),
  ]
})