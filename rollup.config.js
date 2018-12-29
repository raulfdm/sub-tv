import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'

import packageJson from './package.json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/subtv.js',
    banner: '#!/usr/bin/env node',
    format: 'cjs',
  },
  external: Object.keys(packageJson.dependencies),
  plugins: [
    builtins(),
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
}
