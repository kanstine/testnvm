<template>
  <div class="show-detail">
    <!-- 展示数据 -->
    <!-- 标题 -->
    <div class="title">{{noteData.title}}</div>
    <div class="classify">分类： <el-tag type="primary" plain>{{noteData.type}}</el-tag></div>
    <div class="synopsis">简介： {{noteData.synopsis}}</div>

    <!-- 内容列表 -->
    <div class="content-box">
      <div class="block" v-for="item in blockData" :key="item.blockId">
        <div class="b-title">{{item.title}}</div>
        <div class="b-row" v-for="row in item.rowList" :key="row.rowId">
          <li>{{row.rowText}}</li>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    noteData: {
      type: Object,
      default () {
        return {}
      }
    },
    blockData: {
      type: Array,
      default () {
        return []
      }
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
    .title {
      font-size: 30px;
    }
    .classify {
      margin: 10px;
    }
    .synopsis {
      margin: 10px;
    }
    .content-box {
      margin: 20px 10px;
      .block {
        padding: 10px;
        margin: 10px;
        background: rgb(225, 243, 216);
        border-radius: 10px;
        .b-title {
          font-size: 20px;
        }
        .b-row {
          margin: 5px;
        }
      }
    }
  }
</style>
