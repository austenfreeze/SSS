// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './structure'
import {DashboardTool} from './components/DashboardTool'
import { assist } from '@sanity/assist'

export default defineConfig({
  name: 'default',
  title: 'THE STEN OF REALITY',
  projectId: '8j4wco3s',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
assist(),
  ],

tools: (prev) => [
    ...prev,
    {
      name: 'dashboard',
      title: 'Control Center',
      component: DashboardTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },
})