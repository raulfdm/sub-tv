import { isAbsolute, resolve } from 'path';
import { defineConfig } from 'vite';

function isExternal(id: string): boolean {
  return !id.startsWith('.') && !isAbsolute(id) && !id.startsWith('~/');
}

export default defineConfig(({ mode, command }) => {
  /**
   * In `build --watch` (for libs), mode is always set to production and
   * command is set to `build`.
   *
   * I had to use a custom environment variable to know if I'm running dev command
   * or building for production
   */
  const isDevMode = process.env.DEV_MODE === 'true';

  return {
    build: {
      minify: isDevMode === false,
      emptyOutDir: isDevMode === false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: isExternal,
      },
    },
  };
});
