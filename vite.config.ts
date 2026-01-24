import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base must match your GitHub repository name
  base: '/trip_art/', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
})