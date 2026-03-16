// schemaTypes/photo.ts
import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'photo',
  title: 'Archive Photo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true, metadata: ['exif', 'location', 'palette', 'lqip'] },
      validation: (Rule) => Rule.required(),
    }),
defineField({
  name: 'slug',
  type: 'slug',
  title: 'URL Slug',
  description: 'Generated from the original local filename.',
  options: {
    source: async (doc: any, context: any) => {
      // 1. Get the client from context to fetch the asset data
      const { getClient } = context;
      const client = getClient({ apiVersion: '2024-03-15' });

      // 2. If no image is selected yet, fallback to a placeholder
      if (!doc.image?.asset?._ref) {
        return doc.context?.caption || 'processing-asset';
      }

      // 3. Fetch the actual original filename from the Sanity asset store
      const asset = await client.fetch(
        `*[_id == $ref][0]{originalFilename}`, 
        { ref: doc.image.asset._ref }
      );

      // 4. Return the filename (minus the extension) or the hash if missing
      return asset?.originalFilename 
        ? asset.originalFilename.replace(/\.[^/.]+$/, "") 
        : `photo-${doc.image.asset._ref.split('-')[1]}`;
    },
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
}),
    defineField({
      name: 'context',
      title: 'Contextual Data',
      type: 'photoCaption',
    }),
    defineField({
      name: 'associations',
      type: 'object',
      fieldsets: [{ name: 'metadata', title: 'Archive Metadata' }],
      fields: [
        { name: 'capturedDate', title: 'Date Taken', type: 'datetime' },
        { 
          name: 'people', 
          type: 'array', 
          of: [{ type: 'reference', to: [{ type: 'person' }] }] 
        },
        { name: 'location', type: 'reference', to: [{ type: 'location' }] },
        { 
          name: 'tags', 
          type: 'array', 
          of: [{ type: 'reference', to: [{ type: 'tag' }] }] 
        },
        // Direct Gallery Reference (Manual add from here)
        {
          name: 'galleries',
          title: 'Manual Gallery Assignment',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'gallery' }] }],
          description: 'Manually add this photo to galleries.'
        }
      ]
    }),
    // Virtual Field: Shows where this photo appears
    defineField({
      name: 'referencedIn',
      title: 'Appears In (Automated)',
      type: 'array',
      readOnly: true,
      of: [{ type: 'reference', to: [{ type: 'gallery' }] }],
      description: 'Galleries that have included this photo via the Gallery manager.',
      // In a real Sanity Studio, we'd use a Custom Input component to fetch this list via GROQ.
    })
  ],
  preview: {
    select: {
      title: 'context.caption',
      media: 'image',
      intent: 'context.intent',
      date: 'associations.capturedDate'
    },
    prepare({ title, media, intent, date }) {
      const year = date ? new Date(date).getFullYear() : 'No Date';
      return {
        title: title || 'Untitled Record',
        subtitle: `${intent?.toUpperCase() || 'ARCHIVE'} — ${year}`,
        media
      }
    }
  }
})