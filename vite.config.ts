import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    cors: true,
    host: '0.0.0.0',
    port: 6464,
    allowedHosts: ['all', 'adornadesign.art', 'www.adornadesign.art'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
});
