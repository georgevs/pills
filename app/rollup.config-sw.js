import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/sw/index.ts',
  output: {
    file: './build/sw/sw.js',
    format: 'iife'
  },
  plugins: [
    typescript({
      'tsconfig': './src/sw/tsconfig.json',
      'include': ['./src/sw/**/*']
    }),
  ]
};
