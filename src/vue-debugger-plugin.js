import VueDebuggerComponent from './vue-debugger.vue'

export const VueDebuggerPlugin = {
  install(Vue, options = {}) {
    Vue.component('VueDebugger', {
      functional: true,

      props: {
        options: {
          type: Object,
          default: () => ({}),
        },
      },

      render(h, { data, props }) {
        return h(VueDebuggerComponent, {
          ...data,
          props: {
            options: Object.assign({}, options, props.options),
          },
        })
      },
    })
  },
}
