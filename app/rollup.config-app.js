import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import css from 'rollup-plugin-css-only';

import typescript from '@rollup/plugin-typescript';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

// import { terser } from 'rollup-plugin-terser';

export default {
  external: [
    'react', 
    'react-dom',
    'redux',
    'redux-thunk',
    'react-redux'
  ],
  input: './src/app/index.tsx',
  output: {
    file: './build/app/app.js',
    format: 'iife',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'redux': 'Redux',
      'redux-thunk': 'ReduxThunk',
      'react-redux': 'ReactRedux'
    }
  },
  plugins: [
    json(),
    url({
      limit: 0,
      fileName: '[name][extname]'
    }),
    css({
      output: 'index.css'
    }),
    typescript({
      'tsconfig': './src/app/tsconfig.json',
      'include': ['./src/app/**/*']
    }),
    resolve({
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      }
    }),
    // terser()
  ]
};
