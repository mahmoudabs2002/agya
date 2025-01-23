import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom','@mui/material','primereact/toast','lucide-react'],
          // Add other libraries that you want to be separate chunks
        }
      }
    }
  }
})
