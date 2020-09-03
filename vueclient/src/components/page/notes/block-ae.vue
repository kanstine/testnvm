<template>
  <div class="show-detail">
    <!-- 编辑数据 -->
    <el-form :model="form" label-width="60px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" placeholder="" :disabled="pageType === 'edit'"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
         <el-input v-model="form.type" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input v-model="form.synopsis" placeholder=""></el-input>
      </el-form-item>
    </el-form>

    <!-- 内容列表 -->
    <div class="content-box">
      <dotHandle></dotHandle>
    </div>

  </div>
</template>

<script>
import dotHandle from '@/components/page/notes/dot-handle'
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
  }
}
</script>

<style lang="scss" scoped>
  .show-detail {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(220, 223, 230);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    padding: 10px;
  }
</style>
