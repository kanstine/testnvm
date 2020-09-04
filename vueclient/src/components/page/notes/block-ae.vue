<template>
  <div class="ae-detail">
    <!-- 编辑数据 -->
    <el-form :model="form" label-width="70px">
      <el-form-item label="标题：" required>
        <el-input v-model="noteData.title" placeholder="" :disabled="pageType === 'edit'"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
         <el-input v-model="noteData.type" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input v-model="noteData.synopsis" placeholder=""></el-input>
      </el-form-item>
    </el-form>

    <!-- 内容列表 -->
    <div class="content-box">
      <dotHandle ref="aeDot"></dotHandle>
    </div>

    <div class="bottom-box">
      <el-button type="primary" plain @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>

  </div>
</template>

<script>
import dotHandle from '@/components/page/notes/dot-handle'
import { notesAdd, blockAdd } from '../../../js/api/notes'
export default {
  components: {
    dotHandle
  },
  data () {
    return {
      form: {},
      pageType: 'add',
      noteData: {
        id: -1,
        title: '',
        type: '',
        synopsis: ''
      },
      blockData: [
        { blockId: 1001, title: '', rowList: [] }
      ]
    }
  },
  methods: {
    // 取消
    handleCancel () {
      this.$emit('cancel')
    },
    // 保存判断
    handleSave () {
      this.pageType === 'add' ? this.saveAdd() : this.saveEdit()
    },
    // 保存新增
    async saveAdd () {
      console.log('smg', this.$refs.aeDot.blockList)
      try {
        if (!this.noteData.title.trim()) {
          this.$message.warning('请先填写标题')
          return
        }
        const data = {
          title: this.noteData.title,
          type: this.noteData.type,
          synopsis: this.noteData.synopsis
        }
        const res = await notesAdd(data)
        console.log('===', res)
        let dataBlock = {}
        dataBlock = this.$refs.aeDot.blockList.map((item) => {
          return {
            nid: res,
            title: item.title,
            rowList: item.rowList
          }
        })
        console.log('block', dataBlock)
        await blockAdd(dataBlock)
      } catch (err) {
        console.log(err)
      }
    },
    // 保存编辑
    saveEdit () {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
  .ae-detail {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(220, 223, 230);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    padding: 10px;

    .bottom-box {
      text-align: right;
    }
  }
</style>
