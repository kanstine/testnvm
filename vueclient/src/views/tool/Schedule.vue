<template>
  <div class="page-box">
    <div class="qh-box">
      <div class="first-page">
        <div class="tag-1"></div>
      </div>
      <div class="second-page"></div>
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
  .qh-box {
    width: 700px;
    height: 800px;
    display: flex;
    position: relative;
    .first-page {
      width: 100%;
      height: 100%;
      border: 1px solid gold;
      border-radius: 10px;
    }
    .second-page {
      width: 700px;
      height: 800px;
      border: 1px solid greenyellow;
      border-radius: 10px;
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
</style>
