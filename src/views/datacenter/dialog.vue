<template>
  <div>
    <el-dialog
      :title="titleText"
      :visible.sync="openStatus"
      :close-on-click-modal="false"
      @close="doClose"
      :width="dialogWidth"
      class="data-dialog">
      <slot/>
    </el-dialog>

  </div>
</template>

<script>
import { Stats } from 'fs';
export default {
  props: {
    dialogVisible: {
      type: [Boolean, String],
      default: false
    },
    title: {
        type: String,
        default:()=> {
            return ''
        }
    },
    dialogWidth: {
        type: String,
        default:()=> {
            return '1340px'
        }
    },
  },
  data() {
    return {
        openStatus: this.dialogVisible,
        titleText: this.$route.name
    }
  },
  watch: {
    dialogVisible(val) {
        this.openStatus = val
        if(this.title == '') {return }
        this.titleText = this.title
    },
  },
  methods: {
    doClose() {
      this.$emit('dialogData', false)
    }
  },
  created() {
  }
}
</script>

<style>
.data-dialog .el-dialog {border-radius: 10px; overflow: hidden;}
.data-dialog .el-dialog__header {border-bottom: 1px solid #f3f3f3; background:linear-gradient(#fff, #e8edf6); padding-top: 15px;}
.data-dialog .el-dialog__header .el-dialog__title{padding-left: 18px; font-size: 16px; color: #595757; position: relative;} 
.data-dialog .el-dialog__header .el-dialog__title:before { content: ''; display: inline-block; position: absolute; width: 7px; height: 120%; border-radius: 5px; background:linear-gradient(0deg,rgba(17,154,241,1),rgba(0,95,197,1)); left: 0; }
.data-dialog .el-dialog__header .el-dialog__headerbtn { top: 15px; }
.data-dialog .el-dialog__header .el-dialog__headerbtn i{ font-size: 20px; font-weight: bold; }
</style>
