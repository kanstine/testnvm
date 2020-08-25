<template>
  <div class="page-box" v-loading="pageLoading">
    <div class="top-box">
      <el-input v-model="searchList.id" placeholder="请输入id"></el-input>
      <el-input v-model="searchList.name" placeholder="请输入名称"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>

    <div>
      <el-table :data="tableData" border>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pageLoading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      searchList: {
        id: ''
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取数据
    async getTableData () {
      try {
        this.pageLoading = true
        const res = await this.$api.user.getUserPage()
        console.log(res.data)
        this.tableData = res.data.data
      } catch {

      } finally {
        this.pageLoading = false
      }
    },
    // 查询
    search () {
      this.pageNum = 1
      this.getTableData()
    },
    // 页码变化
    handleSizeChange (size) {
      this.pageSize = size
      this.getTableData()
    },

    handleCurrentChange (page) {
      this.pageNum = page
      this.getTableData()
    }
  }
}
</script>
