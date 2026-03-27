import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/digital-declutter/',
  build: {
    outDir: 'dist',
  },
})
