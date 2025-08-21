import { defineConfig } from 'vite';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import fs from 'fs';

// Отримати всі HTML-файли у src
const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src'))
  .filter(file => file.endsWith('.html'))
  .map(file => path.resolve(__dirname, 'src', file));

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: htmlFiles, // <--- масив існуючих HTML
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js',
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});
