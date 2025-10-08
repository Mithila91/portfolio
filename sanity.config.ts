import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { iconPicker } from 'sanity-plugin-icon-picker'

// Import your schemas here
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: 'gksldqzz',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
    iconPicker(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio', 
})
