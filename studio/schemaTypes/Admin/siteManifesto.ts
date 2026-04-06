import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'
import { GoMegaphone, GoGoal, GoBeaker } from "react-icons/go"

export default defineType({
  name: 'siteManifesto',
  title: 'Site Manifesto',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: 'vision', title: 'Vision & Goals', icon: GoGoal },
    { name: 'branding', title: 'Aesthetic & DNA', icon: GoMegaphone },
    { name: 'roadmap', title: 'Timeline & Milestones', icon: GoBeaker },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Project Codename',
      type: 'string',
      group: 'vision',
      initialValue: 'SSS-MONOREPO' //
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      group: 'vision',
      description: 'The "Why" behind the Adaptive Archival Analysis.'
    }),
    defineField({
      name: 'aestheticNotes',
      title: 'Design DNA',
      type: 'text',
      group: 'branding',
      initialValue: 'Tabloid-Noir / Conspiracy Map. Palette: Black, Newsprint, Archive Red.', //
    }),
    defineField({
      name: 'goals',
      title: 'Strategic Goals',
      type: 'array',
      group: 'vision',
      of: [{
        type: 'object',
        fields: [
          { name: 'goal', type: 'string' },
          { name: 'priority', type: 'string', options: { list: ['Low', 'Medium', 'High', 'CRITICAL'] } },
          { name: 'status', type: 'boolean', title: 'Achieved' }
        ]
      }]
    }),
    defineField({
      name: 'timeline',
      title: 'Development Timeline',
      type: 'array',
      group: 'roadmap',
      of: [{
        type: 'object',
        fields: [
          { name: 'milestone', type: 'string' },
          { name: 'targetDate', type: 'date' },
          { name: 'notes', type: 'text', rows: 2 }
        ]
      }]
    }),
  ],
})