import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use('/api', (_, __, next) => next())
        server.middlewares.use((req, _, next) => {
          if (req.url && !req.url.includes('.') && req.url !== '/') {
            req.url = '/index.html'
          }
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
