<template>
  <div id="app">
    <router-view></router-view>
    <!-- <el-button type="primary" @click="tor">dadadadadada</el-button> -->
  </div>
</template>

<script>
import router from './router/index'
export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {
    tor () {
      router.push({
        path: '/login'
      })
    }
  }
}
</script>
