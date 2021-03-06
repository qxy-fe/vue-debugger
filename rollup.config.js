import * as path from 'path'
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const resolve = (...args) => path.resolve(__dirname, ...args)

const banner = `\
/*!
 * ${pkg.name} - ${pkg.description}
 *
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license ${pkg.license}
 * @copyright 2018-${new Date().getFullYear()} ntnyq
 */
`

export default [
  {
    input: 'index.js',
    output: 'vue-debugger.cjs.js',
    format: 'cjs',
  },
  {
    input: 'index.js',
    output: 'vue-debugger.esm.js',
    format: 'es',
  },
].map(opts => {
  const config = {
    input: resolve('src', opts.input),
    output: {
      file: resolve('dist', opts.output),
      format: opts.format,
      name: 'VueDebugger',
      globals: opts.globals,
      banner,
      exports: 'named',
    },
    external: ['vue'],
    plugins: [css({ output: 'style.css' }), vue(), nodeResolve()],
  }

  return config
})
