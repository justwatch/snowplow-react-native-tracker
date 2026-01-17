// rollup.config.js
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: './dist/tmp/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
    external: ['react-native'],
  },
  {
    input: './dist/tmp/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;
