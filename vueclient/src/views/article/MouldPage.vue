<template>
  <div class="ya-mould-page">
    <div class="mould-block">
      {{}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { type: 1, label: '类型A' },
        { type: 2, label: '类型B' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .ya-mould-page {
    .mould-block {}
  }
</style>
