<template>
  <div class="wss-block-box">
    <div class="title">WSSFK</div>

    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .wss-block-box {
    padding: 20px;
    position: relative;
    height: 100%;
  }
  .title {
    margin: 20px 0;
  }
  .content {
    height: 100%;
  }
</style>
