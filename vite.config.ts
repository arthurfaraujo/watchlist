import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/watchlist/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
