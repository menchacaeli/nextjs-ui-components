import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      // ── Storybook browser tests ─────────────────────────────
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
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

      // ── Unit tests (jsdom) ──────────────────────────────────
      {
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test/setup.ts'],
          include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
          css: false,
        },
        resolve: {
          alias: { '@': path.resolve(dirname, './src') },
          // On macOS (case-insensitive FS) Vite resolves './Badge' → 'badge.ts' because .ts
          // is tried before .tsx. Putting .tsx first avoids matching the lowercase types file.
          extensions: ['.mjs', '.js', '.mts', '.jsx', '.tsx', '.ts', '.json'],
        },
      },
    ],
  },
});
