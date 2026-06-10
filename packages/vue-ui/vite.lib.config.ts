import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/**/*'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.vue'],
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'VueUIComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: 'styles.css',
      },
    },
    minify: false,
    sourcemap: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    extensions: ['.mjs', '.js', '.mts', '.vue', '.ts', '.json'],
  },
});
