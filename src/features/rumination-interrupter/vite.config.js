import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/rumination-interrupter/',
  build: {
    outDir: 'dist',
  },
})
