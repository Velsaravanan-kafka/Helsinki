import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This is the key part.
      // Any requests to '/api' will be proxied to the target.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  }
})