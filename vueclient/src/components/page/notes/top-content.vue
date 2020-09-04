<template>
  <div>
    <div class="top">
      <div class="top-left">
        <el-input v-model="search" placeholder=""></el-input>
      </div>
      <div class="top-right">
        <el-button type="primary" @click="handleAdd('ae')">添加</el-button>
        <el-button type="primary" @click="handleAdd('write')">写</el-button>
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
    handleAdd (type) {
      this.$emit('changePageType', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    width: 100%;
    margin: 0 0 20px 0;
    padding: 5px;
    position: relative;
    border: 1px solid rgb(220, 223, 230);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    .el-input {
      width: 200px
    }
    .top-left {
      width: max-content;
    }
    .top-right {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
</style>
