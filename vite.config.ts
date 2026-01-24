import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REPLACE '/REPO_NAME/' with your actual repository name, e.g., '/okinawa-trip/'
  base: '/REPO_NAME/', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})