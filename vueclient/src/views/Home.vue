<template>
  <div class="app-box">
    <!-- 页面外层架构 -->
    <div class="side-box">
      <el-menu
      :default-active="selectItem"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">用户</template>
          <el-menu-item index="11" @click="handleUser">用户列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">其他</el-menu-item>
      </el-menu>
    </div>

    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectItem: '1'
    }
  },
  methods: {
    handleUser () {
      this.$router.push({ path: '/user/UserPage' })
    }
  }
}
</script>

<style scoped>
  .app-box {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .side-box {
    min-width: 200px;
    overflow: hidden;
    background-color: rgb(84, 92, 100);
    border: 1px solid rgb(84, 92, 100);
    padding-right: 0px;
  }
  .page {
    width: 100%;
  }
  .el-menu {
    border: 0px
  }
</style>
