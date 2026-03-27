import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/c3-single-action/',
  server: {
    port: 3105,
  },
  build: {
    outDir: 'dist',
  },
});
