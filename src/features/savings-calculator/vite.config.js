import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/no-spend-hub/savings-calculator/',
  server: {
    port: 3100, // Avoiding 3000, 3001, 3002, 5175, 5143
  },
  build: {
    outDir: 'dist',
  },
});
