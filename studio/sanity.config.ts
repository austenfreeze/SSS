import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import { contentGraphView } from 'sanity-plugin-graph-view'
import { codeInput } from '@sanity/code-input'
import { SyncFilenameAction } from './actions/syncFilenameAction'

import { schemaTypes } from './schemaTypes'
import { myStructure } from './structure'
import { DashboardTool } from './components/DashboardTool'

export default defineConfig({
  name: 'default',
  title: 'THE STEN OF REALITY',
  projectId: '8j4wco3s',
  dataset: 'production',

  plugins: [
    structureTool({ structure: myStructure }),
    visionTool(),
    assist(),
    media(),
codeInput(),
    colorInput(),
    contentGraphView({
      query: `*[_type in ["person", "photo", "location", "tag"]]`,
      apiVersion: '2023-01-01', 
    }),
  ],

document: {
    actions: (prev, context) => {
      // Apply the Sync action specifically to the 'photo' type
      return context.schemaType === 'photo' 
        ? prev.map((a) => (a.action === 'publish' ? SyncFilenameAction : a)) 
        : prev
    }
},

  tools: (prev) => [
    ...prev,
    { 
      name: 'dashboard', 
      title: 'Control Center', 
      component: DashboardTool 
    },
  ],

  schema: { 
    types: schemaTypes 
  },
})