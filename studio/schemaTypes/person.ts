// schemaTypes/person.ts
import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ 
      name: 'name', 
      title: 'Full Name', 
      type: 'string', 
      validation: (Rule) => Rule.required() 
    }),
    defineField({
      name: 'nicknames',
      title: 'Nicknames',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ 
      name: 'roles', 
      title: 'Relationships / Roles', 
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Family', value: 'family' },
          { title: 'Friend', value: 'friend' },
          { title: 'Collaborator', value: 'collaborator' }
        ]
      }
    }),

    /* REFINED: Instead of a raw upload, we reference a 'photo' document.
       This links the person to an existing archival record.
    */
    defineField({ 
      name: 'portrait', 
      title: 'Featured Portrait',
      description: 'Select a photo already in the archive to represent this person.',
      type: 'reference', 
      to: [{ type: 'photo' }] 
    }),

    defineField({ name: 'bio', type: 'text', rows: 2 }),

    defineField({
      name: 'appearancesNote',
      title: 'Vault Appearances',
      type: 'string',
      readOnly: true,
      initialValue: '🔗 Bi-directional linking active.'
    }),
  ],
// schemaTypes/person.ts

  preview: {
    select: {
      title: 'name',
      roles: 'roles', // Select the entire array of strings
      media: 'portrait.image' // Follows the reference to grab the photo's image
    },
    prepare({ title, roles, media }) {
      // Check if roles exists and has items
      const hasRoles = roles && roles.length > 0;
      
      return {
        title,
        // Join the array into a clean string for the subtitle
        subtitle: hasRoles 
          ? roles.join(', ').toUpperCase() 
          : 'NO ROLE ASSIGNED',
        media
      }
    }
  }
})