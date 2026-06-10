import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import vue from '@vitejs/plugin-vue';

const __dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      // Storybook browser tests
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(__dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },

      // Unit tests (jsdom)
      {
        plugins: [vue()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          include: ['src/**/*.test.ts'],
          css: false,
        },
        resolve: {
          alias: { '@': path.resolve(__dirname, './src') },
          extensions: ['.mjs', '.js', '.mts', '.vue', '.ts', '.json'],
        },
      },
    ],
  },
});
