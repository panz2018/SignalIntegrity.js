import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/SignalIntegrity.js/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(file) {
          if (file.includes('node_modules')) {
            if (file.includes('primevue')) {
              return 'primevue'
            } else if (file.includes('vue-flow')) {
              return 'vueflow'
            } else {
              return 'package'
            }
          } else {
            return 'index'
          }
        }
      }
    }
  }
})
