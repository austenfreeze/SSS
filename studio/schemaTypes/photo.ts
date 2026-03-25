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
      options: { 
        hotspot: true,
        metadata: ['exif', 'location', 'palette', 'lqip'] 
      },
      validation: (Rule) => Rule.required(),
    }),
  defineField({
  name: 'context',
  type: 'photoCaption',
  options: {
    aiAssist: {
      imageDescriptionField: 'caption',
      // This instruction tells the AI how to "think" like your archive
      instructions: "Analyze this image as a forensic archivist. Use the filename and metadata to determine the era. If it looks like a document, focus on text. If it's a photo, focus on the 'vibe' and lighting. Match the 'Tabloid-Noir' tone."
    }
  },
}),
   defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'image.asset.originalFilename', // Pulls the actual filename (e.g., DSC0123.jpg)
    slugify: (input) => input
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\.[^/.]+$/, "") // Removes the extension (.jpg)
  },
}),
    defineField({
      name: 'associations',
      title: 'Associations',
      type: 'object',
      fields: [
        defineField({
          name: 'dateConfig',
          type: 'object',
          options: { columns: 2 },
          fields: [
            defineField({ 
              name: 'precision', 
              type: 'string',
              options: { list: [{ title: 'Year', value: 'year' }, { title: 'Exact', value: 'exact' }] }
            }),
            defineField({ name: 'yearOnly', title: 'Year (YYYY)', type: 'number' }),
            defineField({ name: 'date', title: 'Full Date', type: 'date' })
          ]
        }),
        defineField({ 
          name: 'people', 
          type: 'array', 
          of: [{ type: 'reference', to: [{ type: 'person' }] }],
        }),
        defineField({ name: 'location', type: 'reference', to: [{ type: 'location' }] }),
        defineField({ 
          name: 'tags', 
          type: 'array', 
          of: [{ type: 'reference', to: [{ type: 'tag' }] }],
        }),
      ]
    }),
  ],
  preview: {
    select: {
      caption: 'context.caption',
      intent: 'context.intent',
      year: 'associations.dateConfig.yearOnly',
      exactDate: 'associations.dateConfig.date',
      precision: 'associations.dateConfig.precision',
      locationName: 'associations.location.name',
      filename: 'slug.current',
      media: 'image',
    },
    prepare({ caption, intent, year, exactDate, precision, locationName, filename, media }) {
      // Fixes the "one day early" bug by forcing local time parsing
      const dateDisplay = precision === 'exact' && exactDate
        ? new Date(exactDate.replace(/-/g, '/')).toLocaleDateString()
        : year;

      const segments = [
        dateDisplay,
        intent ? intent.charAt(0).toUpperCase() + intent.slice(1) : null,
        locationName
      ].filter(Boolean);

      return {
        title: caption || filename || 'Untitled Record',
        subtitle: segments.join(' • '),
        media: media || ImageIcon,
      }
    }
  }
})