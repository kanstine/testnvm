<template>
  <div>
    <div class="note-block" v-for="block in blockList" :key="block.blockId">
      <div class="block-handle">
        <el-dropdown @command="handleType">
          <div class="handle-item">类型</div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1_textarea">文本</el-dropdown-item>
            <el-dropdown-item command="2_dot">知识点</el-dropdown-item>
            <el-dropdown-item command="3_table">表格</el-dropdown-item>
            <el-dropdown-item command="4_image">图片</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="add-top" @click="handleBlockAdd(0, block.blockId)">上插入</div>
        <div class="add-bottom" @click="handleBlockAdd(1, block.blockId)">下插入</div>
        <!-- <div class="handle-item-add">
          <div class="add-top" @click="handleBlockAdd(0, block.blockId)">上插入</div>
          <div class="add-bottom" @click="handleBlockAdd(1, block.blockId)">下插入</div>
        </div> -->
      </div>
      <div class="block-content">
        <!-- 块标题 -->
        <div class="block-title">
          <div v-if="blockEditId !== block.blockId" @click="handleBlockTitleEdit(block.blockId)">标题：{{block.title}}</div>
          <el-input v-model="block.title" v-if="blockEditId === block.blockId" :id="block.blockId" @blur="handleEditBlock()" placeholder="请输入标题"></el-input>
        </div>
        <!-- 行 -->
        <div class="block-con" v-for="row in block.rowList" :key="row.rowId" @click="handleRowEditShow(row.rowId)">
          <!-- 显示 -->
          <div  v-show="rowEditId !== row.rowId">
            {{row.text}}
            <!-- 操作 -->
            <div class="row-handle">
              <i class="el-icon-download"></i>
              <i class="el-icon-upload2"></i>
              <i class="el-icon-rank"></i>
            </div>
          </div>
          <!-- 编辑 -->
          <div v-show="rowEditId === row.rowId"><el-input v-model="row.text" clearable :id="row.rowId" @blur="handleRowEdit(row.rowId)" placeholder="请输入"></el-input></div>
        </div>
        <div class="block-con">
          <div><el-input v-model="block.newRowText" placeholder="请输入" clearable @blur="handleRowAdd(block.blockId)"></el-input></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blockList: [
        { blockId: 101,
          type: '',
          title: '测试块',
          rowList: [
            { rowId: 101001, type: '', text: 'dadada' },
            { rowId: 101002, type: '', text: 'awsl' }
          ]
        }
      ],
      blockMould: {
        blockId: '',
        title: '',
        type: '',
        rowList: []
      },
      blockEditId: '',
      rowEditId: '',
      textareaData: ''
    }
  },
  methods: {
    //
    handleType (type) {
      console.log(type)
    },
    // 显示编辑
    handleRowEditShow (rowId) {
      this.rowEditId = rowId
      this.$nextTick(() => {
        const input = document.getElementById(rowId)
        input.focus()
      })
    },
    // 编辑行
    handleRowEdit () {
      this.rowEditId = ''
    },
    // 添加行
    handleRowAdd (blockId) {
      const index = this.blockList.findIndex(x => x.blockId === blockId)
      const len = this.blockList[index].rowList.length
      if (!this.blockList[index].newRowText) {
        return
      }

      let data = {
        rowId: this.blockList[index].rowList.length > 0 ? this.blockList[index].rowList[len - 1].rowId + 1 : this.blockList[index].blockId * 100 + 1,
        text: this.blockList[index].newRowText,
        type: ''
      }
      this.blockList[index].rowList.push(data)
      this.blockList[index].newRowText = ''
    },
    // 编辑块
    handleBlockTitleEdit (blockId) {
      this.blockEditId = blockId
      this.$nextTick(() => {
        const input = document.getElementById(blockId)
        input.focus()
      })
    },
    //
    handleEditBlock () {
      this.blockEditId = ''
    },
    // 添加块
    handleBlockAdd (loc, blockId) {
      const index = this.blockList.findIndex(x => x.blockId === blockId)
      let data = JSON.parse(JSON.stringify(this.blockMould))
      const len = this.blockList.length
      data.blockId = this.blockList[len - 1].blockId + 1
      this.blockList.splice(index + loc, 0, data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .note-block {
    border-radius: 10px;
    margin-bottom: 10px;
    .block-handle {
      opacity: 0;
      position: relative;
      height: 32px;
      line-height: 30px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      .handle-item {
        padding: 0 10px;
        height: 31px;
        padding: 0 10px;
        color: white;
        text-align: center;
        border: 1px solid #409EFF;
        border-bottom: 0;
        background-color: rgba($color: #409EFF, $alpha: 1);
      }
      .handle-item:hover {
        background-color: rgba($color: #409EFF, $alpha: 0.8);
      }
      .add-top {
        padding: 0 10px;
        height: 31px;
        color: white;
        background: #67C23A;
        border: 1px solid #67C23A;
        border-bottom: 0;
      }
      .add-top:hover {
        background: rgba($color: #67C23A, $alpha: 0.8);
      }
      .add-bottom {
        padding: 0 10px;
        height: 31px;
        color: white;
        background: #67C23A;
        border: 1px solid #67C23A;
        border-bottom: 0;
      }
      .add-bottom:hover {
        background: rgba($color: #67C23A, $alpha: 0.8);
      }
    }
    .block-content {
      border: 1px solid #409EFF;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 0 0 20px 0;
      .block-con {
        position: relative;
        margin: 0 10px;
        padding: 10px;
        border: 1px solid #DCDFE6;
        .row-handle {
          display: block;
          float: right;
        }
      }
      .block-title {
        padding: 10px;
        font-size: 20px;
      }
    }
  }
  .note-block:hover {
    .block-handle {
      opacity: 1;
    }
  }
</style>
