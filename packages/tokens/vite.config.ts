import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true }) as any,
  ],
  build: {
    target: 'es2022',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        variables: resolve(__dirname, 'src/variables.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: false,
      },
    },
    cssCodeSplit: false,
  },
});
