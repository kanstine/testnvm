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
        <el-submenu index="2">
          <template slot="title">工具</template>
          <el-menu-item index="21" @click="handleRouter('/tool/Schedule')">RC</el-menu-item>
        </el-submenu>
        <el-menu-item index="8">其他</el-menu-item>
        <el-menu-item index="9">COC</el-menu-item>
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
    },
    handleRouter (rou) {
      this.$router.push({ path: rou })
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
