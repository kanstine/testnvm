<template>
  <div class="ae-page">
    <div class="title">
      SAHAQIMEMASIO
    </div>
    <div>
      <el-form :model="form" label-width="100px">
        <el-form-item label="标题：">
          <el-input class="input-limit" v-model="form.notes" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <el-input v-model="form.type" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="简介：">

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .ae-page {
    padding: 10px;
    border: 1px solid yellowgreen;
    border-radius: 10px;
    .title {
      margin-bottom: 10px;
    }
    .input-limit {
      v-deep .el-input {
        width: 200px;
      }
    }
  }
</style>
