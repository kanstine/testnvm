<template>
  <div class="user-box">
    <img class="head" src="../../../assets/img/bjh.jpg">
    <div class="name">YAMADA</div>
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
  .user-box {
    .head {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin: auto;
      // border: 1px solid yellowgreen;
      border-radius: 50%;
    }
  }
</style>
