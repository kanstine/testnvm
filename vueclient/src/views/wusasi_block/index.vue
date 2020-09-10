<template>
  <div class="block-box outline">
    <div class="">
      <div class="row">
        <div class="block"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Block } from './js/data_modul'
export default {
  data () {
    return {
      nowBlock: Block.concat(),
      nextBlock: Block.concat()
    }
  },
  created () {
    console.log(this.nowBlock[0][0])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .block-box {
    width: 400px;
    height: 600px;
  }
  .outline {
    outline: 2px solid chocolate;
  }
  .row {
    width: 100%;
    height: 60px;
  }
  .block {
    width: 50px;
    height: 100%;
  }
</style>
