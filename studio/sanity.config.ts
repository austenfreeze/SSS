import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './structure' // We'll create this next

export default defineConfig({
  name: 'default',
  title: 'Sten of Reality',
  projectId: '8j4wco3s',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: myStructure, // This is the secret sauce for your "Archive"
    }), 
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})