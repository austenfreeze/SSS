import { defineType, defineField } from 'sanity'

// Change 'export const logType = ...' to 'export default defineType({...})'
export default defineType({
  name: 'logType',
  title: 'Log Type',
type: 'document',
  fieldsets: [
    {
      name: 'technicalAudit', 
      title: 'Technical Audit & Traceability',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: 'changeTitle',
      title: 'Change Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'timestamp',
      title: 'Execution Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Architecture & Schemas', value: 'architecture'},
          {title: 'Dependency Management', value: 'dependencies'},
          {title: 'UI & Aesthetic', value: 'ui-design'},
          {title: 'AI Skills & MCP Tooling', value: 'ai-intel'},
          {title: 'Security & Hardening', value: 'security'},
          {title: 'Archival & Sync Ops', value: 'automation'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'technicalNotes',
      title: 'Technical Notes / Command Log',
      type: 'array',
      fieldset: 'technicalAudit',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relevantLinks',
      title: 'Relevant Links & Documentation',
      type: 'array',
      fieldset: 'technicalAudit',
      of: [
        {
          type: 'object',
          name: 'linkItem',
          fields: [
            { name: 'linkTitle', title: 'Link Title', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'linkType',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Documentation', value: 'docs' },
                  { title: 'AI/MCP Reference', value: 'ai-ref' },
                  { title: 'External Resource', value: 'external' },
                ]
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'status',
      title: 'Archival Status',
      type: 'string',
      fieldset: 'technicalAudit',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Finalized & Synced', value: 'finalized' }
        ],
        layout: 'radio'
      }
    }),
  ],
  preview: {
    select: {
      title: 'changeTitle',
      category: 'category',
      status: 'status'
    },
    prepare({title, category, status}) {
      const statusPrefix = status === 'finalized' ? '[Finalized]' : '[Draft]'
      return {
        title: `${statusPrefix} ${title}`,
        subtitle: category ? category.toUpperCase() : 'NO CATEGORY'
      }
    }
  }
})