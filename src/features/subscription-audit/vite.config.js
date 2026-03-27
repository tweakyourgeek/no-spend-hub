import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/subscription-audit/',
  build: {
    outDir: 'dist',
  },
})
