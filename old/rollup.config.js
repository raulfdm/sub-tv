import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: './src/app.ts',
  output: {
    file: 'dist/sub-tv.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },

  external: Object.keys(pkg.dependencies),

  plugins: [
    typescript({
      inlineSourceMap: true,
    }),
    json(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({ sourceMap: true, exclude: ['node_modules'] }),
    builtins(),
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
