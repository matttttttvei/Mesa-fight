import { defineConfig } from 'vite';
import { cpSync } from 'node:fs';
import { resolve, extname } from 'node:path';

export default defineConfig({
  base: './',
  publicDir: false,
  server: {
    watch: {
      // Сборка копирует большие модели; не наблюдаем выходные каталоги.
      // Иначе параллельный build на Windows может завершить dev-сервер с EBUSY.
      ignored: ['**/dist/**', '**/проекты2/**'],
    },
  },
  plugins: [{
    name: 'copy-original-game-assets',
    closeBundle() {
      cpSync('assets', 'dist/assets', {
        recursive: true,
        filter: (source) => extname(source) !== '.import',
      });
      cpSync('README_Credits_section.md', 'dist/README_Credits_section.md');
    },
  }],
  build: {
    rollupOptions: {
      input: { game: resolve('index.html'), credits: resolve('credits.html') },
      output: {
        manualChunks: { three: ['three', 'three/addons/loaders/GLTFLoader.js', 'three/addons/loaders/FBXLoader.js'] },
      },
    },
  },
});
