import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'


export default defineType({
  name: 'photo',
  title: 'Archival Photo',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'content', title: 'Content & Narrative' },
    { name: 'metadata', title: 'Faceted Tags' },
  ],
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      group: 'content',
      options: { 
        hotspot: true, 
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif'] 
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({ 
      name: 'title', 
      title: 'Display Title', 
      type: 'string', 
      group: 'content',
      description: 'Leave blank to use the original filename.',
    }),
    defineField({
      name: 'context',
      title: 'Archival Context',
      type: 'photoCaption', 
      group: 'content'
    }),
    
    // --- Faceted Metadata & Collections ---
    defineField({
      name: 'galleries',
      title: 'Appear in Galleries',
      description: 'Add this photo to one or more curated galleries.',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'gallery' }] }],
      options: { layout: 'tags' } 
    }),
    defineField({
      name: 'years',
      title: 'Associated Years',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'year' }] }]
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'location' }] }]
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'person' }] }]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    }),
  ],
  preview: {
    select: {
      media: 'image',
      customTitle: 'title',
      fileName: 'image.asset.originalFilename', 
      year: 'years.0.title',
      galleryName: 'galleries.0.title'
    },
    prepare({ media, customTitle, fileName, year, galleryName }) {
      const cleanFileName = fileName ? fileName.replace(/\.[^/.]+$/, "") : 'Untitled Asset';
      const yearLabel = year ? `[${year}]` : '';
      const galleryLabel = galleryName ? ` in ${galleryName}` : '';
      
      return {
        title: customTitle || cleanFileName,
        subtitle: `${yearLabel}${galleryLabel}` || 'No Metadata Linked',
        media
      }
    }
  }
})