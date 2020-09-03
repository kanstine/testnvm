<template>
  <div>
    <div class="note-block" v-for="block in blockList" :key="block.blockId">
      <div class="block-handle">
        <el-dropdown @command="handleType">
          <div class="handle-item">类型</div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="cs">普通</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="handle-item-add">
          <div class="add-top" @click="handleBlockAdd(0, block.blockId)">上插入</div>
          <div class="add-bottom" @click="handleBlockAdd(1, block.blockId)">下插入</div>
        </div>
      </div>
      <div class="block-content">
        <ul>
          <div class="block-con" v-for="row in block.rowList" :key="row.rowId" @click="handleRowEditShow(row.rowId)">
            <li  v-show="rowEditId !== row.rowId">{{row.text}}</li>
            <li v-show="rowEditId === row.rowId"><el-input v-model="row.text" clearable :id="row.rowId" @blur="handleRowEdit(row.rowId)" placeholder=""></el-input></li>
          </div>
          <div class="block-con">
            <li><el-input v-model="rowAddData.text" placeholder="" clearable @blur="handleRowAdd(block.blockId)"></el-input></li>
          </div>
        </ul>
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
          rowList: [
            { rowId: 101001, type: '', text: 'dadada' },
            { rowId: 101002, type: '', text: 'awsl' }
          ]
        }
      ],
      blockMould: {
        blockId: '',
        type: '',
        rowList: []
      },
      rowEditId: '',
      rowAddData: {}
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
      if (!this.rowAddData.text) {
        return
      }
      const index = this.blockList.findIndex(x => x.blockId === blockId)
      const len = this.blockList[index].rowList.length
      let data = {
        rowId: this.blockList[index].rowList[len - 1].rowId + 1 || this.blockList[index].blockId * 100 + 1,
        text: this.rowAddData.text,
        type: ''
      }
      this.blockList[index].rowList.push(data)
      this.rowAddData.text = ''
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
    border: 1px solid yellow;
    border-radius: 10px;
    margin-bottom: 10px;
    .block-handle {
      position: relative;
      height: 42px;
      border: 1px solid aqua;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      .handle-item {
        width: 80px;
        height: 100%;
        line-height: 42px;
        padding: 0 10px;
        color: white;
        text-align: center;
        border: 1px solid #409EFF;
        background-color: rgba($color: #409EFF, $alpha: 0.8);
      }
      .handle-item:hover {
        background-color: rgba($color: #409EFF, $alpha: 1);
      }
      .handle-item-add {
        width: 80px;
        height: 100%;
        text-align: center;
        .add-top {
          height: 20px;
          line-height: 20px;
          background: rgb(225, 243, 216);
          border: 1px solid #67C23A;
          border-bottom: 0;
        }
        .add-top:hover {
          background: #67C23A;
        }
        .add-bottom {
          height: 20px;
          line-height: 20px;
          background: rgb(225, 243, 216);
          border: 1px solid #67C23A;
        }
        .add-bottom:hover {
          background: #67C23A;
        }
      }
    }
    .block-content {
      border: 1px solid aqua;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .block-con {
        margin: 5px 0;
      }
    }
  }
</style>
