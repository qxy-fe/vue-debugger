import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  root: resolve(__dirname, 'dev'),

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@qxy/vue-debugger': resolve(__dirname, 'src'),
    },
  },

  plugins: [createVuePlugin()],
})
