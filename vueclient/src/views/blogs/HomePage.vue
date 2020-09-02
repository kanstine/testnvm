<template>
  <div class="b-box">
    <div class="row-box">
      <div class="row" v-for="item in dataList" :key="item.aid">
        <div class="br-title">{{item.title}}</div>
        <div class="br-msg">{{item.message}}</div>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { blogsPage } from '../../js/api/blogshot'
export default {
  data () {
    return {
      dataList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
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
        const res = await blogsPage(data)
        console.log(res.data.data)
        this.dataList = res.data.data.list
        this.total = res.data.data.total
      } catch {}
    },
    // 每页条数改变
    handleSizeChange (size) {
      this.pageSize = size
      this.getData()
    },
    // 页码改变
    handleCurrentChange (page) {
      this.pageNum = page
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-box {
    height: 100%;
    // border: 1px solid greenyellow;
  }
  .row-box {
    width: 100%;
    height: 100%;
    .row {
      margin: 0 0 10px 0;
      padding: 10px;
      border: 1px solid rgb(47, 189, 255);
      border-radius: 5px;
      .br-title {
        font-size: 30px;
      }
      .br-msg {}
    }
  }
</style>
