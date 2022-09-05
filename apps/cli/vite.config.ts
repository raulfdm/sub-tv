import { isAbsolute, resolve } from 'path';
import { defineConfig } from 'vite';

const libsToBundle = ['@sub-tv/open-subtitle'];

function isExternal(id: string) {
  if (libsToBundle.includes(id)) {
    return false;
  }

  return !id.startsWith('.') && !isAbsolute(id) && !id.startsWith('~/');
}

export default defineConfig({
  build: {
    target: 'node16',
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
