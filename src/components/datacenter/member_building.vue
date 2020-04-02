<template>
  <div class="dialog-table">
    <el-row class="table-content">
      <el-col class="col-name" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
      <el-col class="col-name el" :span="5">党组织全称</el-col>
      <el-col class="col-name el" :span="7">中共北京市朝阳区委八里庄街道工作委员会</el-col>
    </el-row>

    <el-table
      :data="tableData"  stripe
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="党组织绑定楼宇"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="负责人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地点">
      </el-table-column>
    </el-table>
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
  .dialog-table .table-content {margin-bottom: 10px;}
  .dialog-table .table-content .el-row .el-col{border: 1px solid #DDDDDD;padding: 8px 16px;}
</style>
