<template>
  <VueDebugger
    :options="{ store: { include: ['name'] } }"
    :after-copy="afterCopy"
  />
</template>

<script>
export default {
  methods: {
    afterCopy() {
      console.log('Copy successfully!')
    },
  },
}
</script>
