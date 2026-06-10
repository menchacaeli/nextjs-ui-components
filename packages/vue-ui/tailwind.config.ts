import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,vue}',
    './.storybook/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
