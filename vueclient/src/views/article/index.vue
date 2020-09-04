<template>
  <div class="ya-page">
    <!-- 写文章 -->
    <div>
      <articleSide ref="aside" @handleRouter="handleRouter"></articleSide>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import articleSide from '@/components/page/notes-write/article-side'
export default {
  components: {
    articleSide
  },
  data () {
    return {
      userId: 1001
    }
  },
  created () {
    this.$nextTick(() => {
      this.$refs.aside.getData(this.userId)
    })
  },
  methods: {
    // 路径操作
    handleRouter (router) {
      this.$router.push({ path: router })
    }
  }
}
</script>

<style lang="scss" scoped>
  .ya-page {
    height: 100%;
    display: flex;
  }
</style>
