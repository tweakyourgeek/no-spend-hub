import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/testing-lab/',
  server: {
    port: 3120,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
});
