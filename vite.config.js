import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = resolve(__dirname, 'src');

export default defineConfig({
  root,
  publicDir: resolve(__dirname, 'public'),
  plugins: [react()],
  base: '/grapesjs-sample/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        '': resolve(root, 'index.html'),
        GettingStarted: resolve(root, 'GettingStarted', 'index.html'),
        React: resolve(root, 'React', 'index.html'),
      },
    },
  },
});