import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'adminProfile',
  title: 'Admin Profile',
  type: 'document',
  icon: UserIcon,
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'portals', title: 'Platform Portals' },
  ],
  fields: [
    defineField({
      name: 'userHandle',
      title: 'System Alias',
      type: 'string',
      group: 'identity',
    }),
    defineField({
      name: 'idenity', // Preserved typo for database continuity
      title: 'Core Person Anchor',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'identity',
    }),
    defineField({
      name: 'portals',
      title: 'Social Portals',
      description: 'Unified mapping of live URLs and deep archives.',
      type: 'array',
      group: 'portals',
      of: [{ type: 'socialLink' }],
    }),
  ],
  preview: {
    select: {
      title: 'userHandle',
      personName: 'idenity.name', // Dot notation reaches into the referenced 'person'
      personImage: 'idenity.image', // Grabs the avatar from the 'person' document
    },
    prepare({ title, personName, personImage }) {
      return {
        title: title || 'Admin Profile',
        subtitle: personName ? ` ${personName}` : 'No Person Linked',
        media: personImage || UserIcon, // Uses the person's photo or a default icon
      }
    }
  }
})