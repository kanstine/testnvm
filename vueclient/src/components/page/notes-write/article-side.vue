<template>
  <div class="ya-side">
    <div class="side-box">
      <!-- 文件夹 -->
      <div class="folder-box">
        <el-menu
            :default-active="selectFolder"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse">
          <!-- 显示 -->
          <el-menu-item index="title" disabled>文件夹</el-menu-item>
          <!-- 列表 -->
          <el-menu-item v-for="item in listData" :key="item.folderId" :index="String(item.folderId)" @click="getFileData(item.folderId)">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="file-box">
        <el-menu
            :default-active="selectFile"
            background-color="#909399"
            text-color="#000000"
            active-text-color="#fff">
          <!-- 操作 -->
          <el-menu-item index="handleFile">
            <i class="el-icon-circle-plus-outline" @click="handleAddFile"></i>
          </el-menu-item>
          <!-- 搜索 -->
          <el-menu-item index="search">
            <el-input v-model="searchData.folderName" placeholder=""></el-input>
          </el-menu-item>
          <!-- 列表 -->
          <el-menu-item v-for="item in fileList" :key="item.fileId" :index="String(item.fileId)">{{item.name}}</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { folderList, fileList } from '../../../js/api/article'
export default {
  data () {
    return {
      userId: 0,
      folderId: 0,
      listData: [],
      fileList: [],
      selectFolder: '1',
      selectFile: '1',
      searchData: {},
      isCollapse: true
    }
  },
  methods: {
    // 获取文件夹信息
    async getData (id) {
      try {
        this.userId = id
        const data = {
          userId: this.userId
        }
        const res = await folderList(data)
        this.listData = res
        await this.getFileData(res[0].folderId)
      } catch (err) {
        console.log('err', err)
      }
    },
    // 获取文件信息
    async getFileData (id) {
      try {
        this.folderId = id
        const data = {
          folderId: this.folderId
        }
        const res = await fileList(data)
        console.log('res', res)
        this.fileList = res
      } catch {

      }
    },
    //
    handleSelectFolder () {},
    //
    handleAddFile () {
      this.$emit('handleRouter', 'Mould')
    }
  }
}
</script>

<style lang="scss" scoped>
  .ya-side {
    width: 400px;
    height: 100%;
    background: #545c64;
    .side-box {
      display: flex;
      height: 100%;
    }
    .folder-box {
      width: 200px;
      height: 100%;
    }
    .file-box {
      width: 200px;
      height: 100%;
      background: #909399;
    }
  }
  .el-menu {
    border: 0;
  }
</style>
