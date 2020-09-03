<template>
  <!-- note块操作主页 -->
  <div class="block-box">
    <div class="back">
      <el-button type="primary" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
    </div>
    <!-- 展示 -->
    <div class="show-box" v-if="pageType === 'show'">
      <blockShow :noteData="noteData" :blockData="blockDataList"></blockShow>
    </div>

    <!-- 新增 / 编辑 -->
    <div class="ae-box" v-if="pageType === 'edit'">
      <blockAe></blockAe>
    </div>
  </div>
</template>

<script>
import blockShow from '@/components/page/notes/block-show'

import blockAe from '@/components/page/notes/block-ae'
import { notesBlockPage } from '../../../js/api/notes'
export default {
  components: {
    blockShow,
    blockAe
  },
  data () {
    return {
      noteData: {},
      blockDataList: [],
      pageType: 'show' // show / edit
    }
  },
  created () {
  },
  methods: {
    async getData () {
      try {
        let data = {
          nid: this.noteData.id
        }
        const res = await notesBlockPage(data)
        console.log('block', res)
        this.blockDataList = res
      } catch {

      }
    },
    handleBack () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>
  .back {
    margin: 0 0 10px 0;
  }
</style>
