import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const extensions = ['.ts', '.js'];

export default {
  input: './src/app.ts',
  output: {
    file: 'dist/sub-tv.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  external: Object.keys(pkg.dependencies),
  plugins: [
    resolve({
      preferBuiltins: true,
      extensions,
    }),
    babel({
      extensions,
    }),
    terser({
      sourcemap: true,
      output: {
        comments: false,
      },
    }),
    replace({
      __SERVER_URL__: process.env.ROLLUP_WATCH
        ? 'http://localhost:3000'
        : 'http://service.subtvapi.app',
    }),
  ],
};
