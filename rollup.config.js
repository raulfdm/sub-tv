import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

import pkg from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/sub-tv.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },

  external: [].concat(Object.keys(pkg.dependencies)),

  plugins: [
    typescript(),
    json(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({ exclude: ['node_modules'] }),
    builtins(),
  ],
};
