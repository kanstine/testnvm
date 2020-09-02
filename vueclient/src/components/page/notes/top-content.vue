<template>
  <div>
    <div class="top">
      <div class="top-left">
        <el-input v-model="search" placeholder=""></el-input>
      </div>
      <div class="top-right">
        <el-button type="primary" @click="handleAdd">写</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    handleAdd () {
      this.$emit('changePageType', 'ae')
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    margin: 0 0 20px 0;
    position: relative;
    .el-input {
      width: 200px
    }
    .top-left {
      width: max-content;
    }
    .top-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
