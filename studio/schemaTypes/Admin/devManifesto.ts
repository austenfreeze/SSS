import { defineType, defineField } from 'sanity'
import { TerminalIcon } from '@sanity/icons'

export default defineType({
  name: 'devManifesto',
  title: 'Dev Manifesto',
  type: 'document',
  icon: TerminalIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      initialValue: 'Infrastructure & Ops'
    }),
    defineField({
      name: 'github',
      title: 'GitHub Repository',
      type: 'url',
      description: 'Link to the SSS-MONOREPO main branch.' //
    }),
    defineField({
      name: 'vercel',
      title: 'Vercel Deployment',
      type: 'url',
      description: 'Production dashboard and toggle-api routes.' //
    }),
    defineField({
      name: 'sanityProject',
      title: 'Sanity Project ID',
      type: 'string',
    }),
    defineField({
      name: 'techStack',
      title: 'Current Stack Documentation',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Details on Next.js, Sanity.io, and middleware setup.' //
    }),
    defineField({
      name: 'versionHistory',
      title: 'Major Version History',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'version', title: 'Version Number', type: 'string' },
          { name: 'releaseDate', type: 'date' },
          { name: 'changelog', type: 'text' },
          { name: 'screenshots', type: 'array', of: [{ type: 'reference', to: [{ type: 'photo' }] }] }
        ]
      }]
    }),
  ],
})