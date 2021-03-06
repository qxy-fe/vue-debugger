import Vue from 'vue'
import VueDebugger from '@qxy/vue-debugger'
import App from './App.vue'

Vue.use(VueDebugger)

Vue.prototype.$store = {
  state: {
    name: 'hello world',
    bobbits: ['foo', 'bar'],
  },
}

new Vue(App).$mount('#app')
