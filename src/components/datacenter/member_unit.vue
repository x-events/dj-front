<template>
  <div class="dialog-table">
    <el-row class="table-content">
      <el-col class="col-name" :span="5">单位信息</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
    </el-row>
  </div>  
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
export default {
  props: {
    detailId: {
      type: String,
      default: '',
      required: true,
    }
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    getData() {
      
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
  .dialog-table .table-content .el-row .el-col{border: 1px solid #DDDDDD;padding: 8px 16px;}
</style>
