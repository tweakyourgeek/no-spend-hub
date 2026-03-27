import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/subscription-analyzer/',
  server: {
    port: 3101,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
});
