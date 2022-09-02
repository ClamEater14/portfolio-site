import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { dependencies } from "./package.json";

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ["react", "react-dom", "react-router-dom"];

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies)
        }
      }
    }
  },
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
