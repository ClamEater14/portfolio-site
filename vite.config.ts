import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~bootstrap': 'node_modules/bootstrap'
    }
  },
  server: {
    port: 8080
  },
  plugins: [react()]
})
