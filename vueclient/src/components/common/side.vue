<template>
  <div class="side">
    <el-menu
      :default-active="selectItem"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
        <template slot="title">{{item.title}}</template>
        <el-menu-item v-for="item2 in item.list" index="11" :key="item2.id" @click="handleRouter(item2.url)">{{item2.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        { title: 'JS', type: '1', id: '1', list: [{ title: 'JC', id: '1-1', url: '/notes/Base' }] }
      ],
      selectItem: '1'
    }
  },
  methods: {
    handleRouter (url) {
      this.$router.push({ path: url })
    }
  }
}
</script>

<style lang="scss" scoped>
  .side {
    width: 200px;
  }
  .el-menu {
    border: 0px
  }
</style>
