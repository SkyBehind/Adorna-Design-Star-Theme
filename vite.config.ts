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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable minification (fallback to esbuild if terser unavailable)
    minify: 'esbuild',
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
      // Add caching headers for better performance
      'Cache-Control': 'public, max-age=31536000',
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
});
