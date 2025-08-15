import { resolve } from 'path';

// vite.config.js
export default {
  base: '/LEOREYES/',
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // especificar cada HTML como entrada
      input: {
        main: resolve(__dirname, 'index.html'),
        music: resolve(__dirname, 'music.html')
      }
    }
  },
  server: {
    host: true
  }
}; 