import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

import packageJson from './package.json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/subtv.js',
    banner: '#!/usr/bin/env node',
    format: 'cjs',
  },
  external: ['path', 'https', 'fs'].concat(Object.keys(packageJson.dependencies)),
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      exclude: 'node_modules/**',
      ignore: ['conditional-runtime-dependency'], //https://github.com/rollup/rollup-plugin-commonjs/issues/131
    }),
    json(),
  ],
};
