# Design: Storybook for packages/vue-ui/

**Date:** 2026-06-10  
**Scope:** Add a standalone Storybook instance to `packages/vue-ui/`, matching the dev experience of `packages/react-ui/`.

---

## Goal

Give the Vue component library the same Storybook setup as the React library: visual component browser, a11y checks, docs, and Vitest story-test integration. Vue Storybook runs separately on port 6008.

---

## Package Changes

### New devDependencies in `packages/vue-ui/package.json`

| Package | Purpose |
|---|---|
| `@storybook/vue3-vite` | Vue 3 Storybook framework |
| `@storybook/addon-vitest` | Story/unit test integration |
| `@storybook/addon-a11y` | Accessibility checks |
| `@storybook/addon-docs` | Auto-generated docs from stories |
| `@chromatic-com/storybook` | Visual regression (Chromatic) |
| `storybook` | Storybook CLI |
| `playwright` | Browser test runner |
| `@vitest/browser-playwright` | Playwright provider for Vitest |

### New scripts in `packages/vue-ui/package.json`

```json
"storybook": "storybook dev -p 6008",
"build-storybook": "storybook build",
"test:all": "vitest run"
```

---

## New Files

### `packages/vue-ui/.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
  staticDirs: [],
};
export default config;
```

### `packages/vue-ui/.storybook/preview.ts`

```typescript
import type { Preview } from '@storybook/vue3-vite';
import '@em-ui/tokens/styles';
import '@em-ui/tokens/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
```

Note: No theme decorator needed yet (Vue doesn't have the dark mode toggle the React preview has — can be added later).

### `packages/vue-ui/src/components/Button/Button.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'gradient', 'outlined', 'ghost'] },
    color: { control: 'select', options: ['primary', 'secondary', 'danger', 'warning', 'success'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['default', 'rounded', 'pill', 'sharp'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { text: 'Button', variant: 'filled', color: 'primary', size: 'md' },
};

export const Outlined: Story = {
  args: { text: 'Button', variant: 'outlined', color: 'primary', size: 'md' },
};

export const Loading: Story = {
  args: { text: 'Loading', loading: true },
};

export const Disabled: Story = {
  args: { text: 'Disabled', disabled: true },
};
```

---

## Updated Files

### `packages/vue-ui/vitest.config.ts`

Add a `storybook` Vitest project alongside the existing `unit` project, mirroring `packages/react-ui/vitest.config.ts`:

```typescript
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import vue from '@vitejs/plugin-vue';

const __dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

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
```

---

## Verification

1. `pnpm install` from workspace root resolves all new packages
2. `cd packages/vue-ui && pnpm storybook` — browser opens on http://localhost:6008, Button story visible with controls
3. `pnpm test` — unit tests still pass (6/6)
4. `pnpm test:all` — both unit and storybook projects run
