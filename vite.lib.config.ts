import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/**/*'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'ReactUIComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', '@floating-ui/react'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'styles.css',
      },
    },
    minify: false,
    sourcemap: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
    // On macOS (case-insensitive FS) './Button/Button' would match 'button.ts' before 'Button.tsx'
    // because Vite tries .ts before .tsx. Putting .tsx first avoids resolving to the types file.
    extensions: ['.mjs', '.js', '.mts', '.jsx', '.tsx', '.ts', '.json'],
  },
});
