import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts'],
    css: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.mjs', '.js', '.mts', '.vue', '.ts', '.json'],
  },
});
