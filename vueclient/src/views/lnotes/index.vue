<template>
  <div class="notes">
    <div class="side-box">
      <Side></Side>
    </div>
    <div class="content">
      <div class="top-content"  v-if="pageType === 'show'"><topContent @changePageType="changePageType"></topContent></div>

      <router-view v-if="pageType === 'show'"></router-view>

      <div class="add-edit" v-if="pageType === 'ae'">
        <blockAe ref="ae" @cancel="handleBack"></blockAe>
      </div>
    </div>
  </div>
</template>

<script>
import Side from '@/components/common/side'
import topContent from '@/components/page/notes/top-content'
import blockAe from '@/components/page/notes/block-ae'
export default {
  components: {
    Side,
    topContent,
    blockAe
  },
  data () {
    return {
      pageType: 'show'
    }
  },
  methods: {
    // 改变页面显示类型
    changePageType (type) {
      this.pageType = type
    },
    // 返回当前页面
    handleBack () {
      this.pageType = 'show'
    }
  }
}
</script>

<style lang="scss" scoped>
  .notes {
    height: 100%;
    display: flex;
    .side-box {
      background-color: #6e757b;
    }
    .content {
      padding: 20px;
      width: 100%;
    }
  }
</style>
