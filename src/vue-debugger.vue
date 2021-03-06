<template>
  <button
    @click="copy"
    class="vue-debugger-trigger"
    type="button"
    role="button"
  >
    <svg
      class="vue-debugger-trigger-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path
        v-if="hasCopied"
        d="M512 0C229.216 0 0 229.248 0 512c0 282.784 229.216 512 512 512 282.752 0 512-229.216 512-512 0-282.752-229.248-512-512-512z m292.608 357.024l-320 384c-12.128 14.56-30.08 23.008-49.024 23.072h-0.128a63.936 63.936 0 0 1-48.992-22.88l-167.52-199.488a64 64 0 1 1 97.952-82.368l118.336 140.96 271.04-325.248a64.032 64.032 0 0 1 98.336 81.952z"
      />
      <template v-else>
        <path
          d="M878.25 981.333H375.34a104.661 104.661 0 01-104.662-104.661V375.339A104.661 104.661 0 01375.34 270.677H878.25A104.661 104.661 0 01982.912 375.34V878.25c-1.579 56.234-48.427 103.082-104.661 103.082zM375.34 364.373a10.667 10.667 0 00-10.923 10.966V878.25c0 6.229 4.693 10.922 10.923 10.922H878.25a10.667 10.667 0 0010.922-10.922V375.339a10.667 10.667 0 00-10.922-10.923H375.339z"
        />
        <path
          d="M192.597 753.323h-45.269A104.661 104.661 0 0142.667 648.66V147.328A104.661 104.661 0 01147.328 42.667H650.24a104.661 104.661 0 01104.619 104.661v49.963c0 26.538-20.31 46.848-46.848 46.848a46.037 46.037 0 01-46.848-46.848v-49.963a10.667 10.667 0 00-10.923-10.965H147.328a10.667 10.667 0 00-10.965 10.965V650.24c0 6.23 4.693 10.923 10.965 10.923h45.27c26.538 0 46.847 20.309 46.847 46.848 0 26.538-21.845 45.312-46.848 45.312z"
        />
      </template>
    </svg>
  </button>
</template>

<script>
import copy from 'copy-text-to-clipboard'

export default {
  computed: {
    rawDebugData() {
      const data = { url: window.location.href }
      const { store } = this.options
      const state = this.$store?.state ?? {}

      if (store?.include) {
        if (!Array.isArray(store.include)) return

        data.state = Object.fromEntries(
          Object.entries(state).filter(v => store.include.includes(v[0])),
        )
      } else if (store?.exclude) {
        if (!Array.isArray(store.exclude)) return

        data.state = Object.fromEntries(
          Object.entries(state).filter(v => !store.exclude.includes(v[0])),
        )
      } else {
        data.state = state
      }

      return JSON.stringify(data)
    },
  },

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },

    afterCopy: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      hasCopied: false,
    }
  },

  methods: {
    copy() {
      if (this.hasCopied) return
      this.hasCopied = true

      const done = copy(this.rawDebugData)

      if (done) this.afterCopy()

      setTimeout(() => {
        this.hasCopied = false
      }, 300)
    },
  },
}
</script>

<style>
.vue-debugger-trigger {
  position: fixed;
  right: 0;
  top: 65vh;
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0;
  background-color: rgb(24, 144, 255);
  background-color: var(--vue-debugger-bg-color, rgb(24, 144, 255));
  border-radius: 8px 0 0 8px;
  pointer-events: auto;
  appearance: none;
  border: none;
  box-shadow: none;
  outline: none;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.2s cubic-bezier(0.3, 0, 0.5, 1);
}

.vue-debugger-trigger:hover {
  opacity: 0.8;
}

.vue-debugger-trigger-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
