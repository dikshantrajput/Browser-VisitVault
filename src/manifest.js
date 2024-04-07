import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/favicon-16x16.png',
    32: 'img/favicon-32x32.png',
    96: 'img/apple-touch-icon.png'
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
  },
  background: {
    service_worker: 'src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/favicon-16x16.png', 'img/favicon-32x32.png', 'img/apple-touch-icon.png'],
      matches: [],
    },
  ],
  permissions: ['activeTab', 'storage'],
})
