import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8j4wco3s',
    dataset: 'production'
  },
  studioHost: 'stenofreality',
  // Fixes the warning
  deployment: {
    autoUpdates: false,
  },
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // The "Specifier" Fix: 
        // We point the resolver to the exact file location in your node_modules
        'react/jsx-runtime.js': 'react/jsx-runtime',
        'react/jsx-runtime': 'react/jsx-runtime',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
      },
    },
    build: {
      ...config.build,
      target: 'esnext',
    },
  }),
})