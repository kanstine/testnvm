<template>
  <div class="page-box" v-loading="pageLoading">
    <div class="top-box">
      <div class="top-left">
        <el-input v-model="searchList.id" placeholder="请输入id"></el-input>
        <el-input v-model="searchList.name" placeholder="请输入名称"></el-input>
        <el-button type="primary" plain @click="search">查询</el-button>
      </div>
      <div class="top-right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </div>
    </div>

    <div>
      <el-table :data="tableData" border>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="操作" prop="" width="180px" align="center">
          <template slot-scope="scopes">
            <el-button type="primary" size="mini" @click="handleEdit(scopes.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scopes.row)">删除</el-button>
          </template>
        </el-table-column>
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

    <el-dialog :title="titleText" :visible.sync="visibleDialog" width="600px">
      <el-form :model="form" label-width="100px">
        <!-- <el-form-item label="ID：">
          <el-input v-model="form.id" placeholder=""></el-input>
        </el-form-item> -->
        <el-form-item label="名称：">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="form.type" placeholder="">
            <el-option v-for="item in typeList" :label="item.label" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="visibleDialog = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      form: {},
      pageLoading: false,
      visibleDialog: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isEdit: '',
      typeList: [
        { value: 1, label: 'msz' },
        { value: 2, label: 'csz' },
        { value: 3, label: 'cxz' },
        { value: 4, label: 'jxz' },
        { value: 5, label: 'lwz' },
        { value: 6, label: 'wj' }
      ],
      searchList: {
        id: ''
      }
    }
  },
  created () {
    this.getTableData()
  },
  computed: {
    titleText () {
      return this.isEdit ? '编辑' : '新增'
    }
  },
  methods: {
    // 获取数据
    async getTableData () {
      try {
        this.pageLoading = true
        const data = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        const res = await this.$api.user.getUserPage(data)
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

    // 编辑
    handleEdit (row) {
      this.isEdit = true
      this.visibleDialog = true
      this.form = {
        id: row.id,
        name: row.name,
        type: row.type
      }
    },

    // 新增
    handleAdd () {
      this.isEdit = false
      this.visibleDialog = true
      this.form = {}
    },

    // 保存新增
    async save () {
      try {
        this.pageLoading = true
        const data = {
          id: this.form.id,
          name: this.form.name,
          type: this.form.type
        }
        this.isEdit ? await this.$api.user.editUser(data) : await this.$api.user.addUser(data)
        this.$message.success(this.isEdit ? '修改成功' : '添加成功')
        this.visibleDialog = false
        this.getTableData()
      } catch {

      } finally {
        this.pageLoading = false
      }
    },

    // 删除
    async handleDelete (row) {
      try {
        this.pageLoading = true
        const data = {
          id: row.id
        }
        await this.$api.user.delete(data)
        this.$message.success('删除成功')
        this.getTableData()
      } catch {

      } finally {
        this.pageLoading = false
      }
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
