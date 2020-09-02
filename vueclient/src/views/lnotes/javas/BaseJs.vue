<template>
  <div class="page">
    <div class="note-row">
      <div class="row" v-for="item in dataList" :key="item.id">
        <div class="row-title">{{item.title}}</div>
        <div class="row-synopsis">{{item.synopsis}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { notesPage } from '../../../js/api/notes'
export default {
  data () {
    return {
      dataList: [],
      pageNum: 1,
      pageSize: 10,
      totle: 0,
      search: ''
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
        console.log(res)
        this.dataList = res
      } catch {}
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
