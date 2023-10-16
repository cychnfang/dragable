import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'es'
  },
  plugins: [typescript(), babel(), terser()]
})
