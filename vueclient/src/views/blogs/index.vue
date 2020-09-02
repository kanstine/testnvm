<template>
  <div class="blogs-box">
    <!-- 顶部菜单 -->
    <div class="top-b">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu v-for="item in meunlist" :index="item.id" :key="item.id">
          <template slot="title">{{item.title}}</template>
          <el-menu-item v-for="item2 in item.submenuList" :index="item2.id" :key="item2.id">{{item2.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <!-- 内容区 -->
    <div class="content-b">
      <!-- 左侧菜单 -->
      <el-tabs class="content" tabPosition="left" v-model="activeName">
        <el-tab-pane label="热门" name="hot">
        </el-tab-pane>
      </el-tabs>
      <!-- 内容 -->
      <div class="page-b"><router-view></router-view></div>
      <!-- 用户信息 -->
      <div class="user-msg">
        <uerCard></uerCard>
      </div>
    </div>
  </div>
</template>

<script>
import uerCard from '../../components/page/blogs/uer-card'
export default {
  components: {
    uerCard
  },
  data () {
    return {
      meunlist: [
        { title: '首页', id: '1', type: 'menu', submenuList: [{ title: '首页', id: '1-1' }] },
        { title: '我的', id: '2', type: 'submenu', submenuList: [{ title: '用户信息', id: '2-1' }] }
      ],
      activeIndex: '1-1',
      activeName: 'hot',
      tabText: 'hot'
    }
  },
  computed: {

  },
  methods: {
    handleSelect () {}
  }
}
</script>

<style lang="scss" scoped>
  .blogs-box {
    height: 100%;
    position: relative;
  }
  .top-b {
    margin: 0 0 20px 0;
  }
  .content-b {
    display: flex;
    max-width: 1000px;
    padding: 0 0 20px 0;
    height: 100%;
    .content {
      width: 90px;
    }
    .page-b {
      min-height: 100%;
    }
    .user-msg {
      padding: 10px;
      margin: 0 0 0 10px;
      width: 20%;
      height: 300px;
      text-align: center;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
  }
</style>
