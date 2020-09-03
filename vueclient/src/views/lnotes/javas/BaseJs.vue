<template>
  <div class="page">
    <!-- 展示列表 -->
    <div class="note-row" v-show="showType === 'list'">
      <div class="row" v-for="item in noteList" :key="item.id" @click="handleShow(item)">
        <div class="row-title">{{item.title}}</div>
        <div class="row-synopsis">{{item.synopsis}}</div>
      </div>
    </div>

    <!-- 展示页面 -->
    <blockHandle ref="detailPage" v-show="showType === 'detail'" @back="handleBack"></blockHandle>
  </div>
</template>

<script>
import { notesPage } from '../../../js/api/notes'
import blockHandle from '@/components/page/notes/block-handle'
export default {
  components: {
    blockHandle
  },
  data () {
    return {
      noteList: [],
      pageNum: 1,
      pageSize: 10,
      totle: 0,
      search: '',
      showType: 'list'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        const res = await notesPage(data)
        this.noteList = res
      } catch {}
    },
    handleShow (item) {
      // 展示详情
      console.log('item', item)
      this.showType = 'detail'
      this.$nextTick(() => {
        this.$refs.detailPage.noteData = item
        this.$refs.detailPage.getData()
      })
    },
    handleBack () {
      this.showType = 'list'
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
  }

  .note-row {
    width: 100%;
    max-width: 1000px;
    // border: 1px solid yellowgreen;
    .row {
      padding: 10px;
      margin: 5px 0;
      border: 1px solid yellowgreen;
      border-radius: 10px;
      .row-title {
        font-size: 20px;
      }
    }
  }
</style>
