import { isAbsolute, resolve } from 'path';
import { defineConfig } from 'vite';

function isExternal(id: string) {
  return !id.startsWith('.') && !isAbsolute(id) && !id.startsWith('~/');
}

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'sub-tv',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
    },
  },
});
