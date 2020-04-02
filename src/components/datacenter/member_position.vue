<template>
  <div v-loading="loading">
    <div class="dialog-table scroll">
      <el-row class="right-content" v-if="dialogData">
        <div class="dialog-info">
          <div class="dialog-table">
            <el-row>
              <el-col class="col-name" :span="3">名称</el-col>
              <el-col :title="dialogData.name" class="col-name el" :span="9">{{dialogData.name || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">电话</el-col>
              <el-col :title="dialogData.tel" class="col-name el" :span="9">{{dialogData.tel || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">地址</el-col>
              <el-col :title="dialogData.addr" class="col-name el" :span="9">{{dialogData.addr || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">面积</el-col>
              <el-col :title="dialogData.area" class="col-name el" :span="9">{{dialogData.area || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">开放时间</el-col>
              <el-col :title="dialogData.open_time" class="col-name el" :span="9">{{dialogData.open_time || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">类型</el-col>
              <el-col :title="dialogData.type_name" class="col-name el" :span="9">{{dialogData.type_name || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">功能</el-col>
              <el-col class="col-name el" :span="21">
                <span v-for="(item, index) in dialogData.func" :key="item.name">
                  {{item.name}}
                  <span v-if="index < dialogData.func.length-1">、</span>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">简介</el-col>
              <el-col :title="dialogData.remark" class="col-name el" :span="21">{{dialogData.remark || "暂无"}}</el-col>
            </el-row>
            <el-row class="img-row flex-row">
              <el-col class="col-name" :span="3">图片</el-col>
              <el-col class="col-name flex-1" :span="21">
                <img v-for="item in dialogData.img" :key="item" :src="item" alt=""
                  @click="enlarge(item)">
              </el-col>
            </el-row>
            <el-row class="map-row flex-row">
              <el-col class="col-name" :span="3">详细地址</el-col>
              <el-col class="col-name flex-1 map-content" :span="21">
                <bdmap class="map" :data="dialogData.address"></bdmap>
              </el-col>
            </el-row>
          </div>  

          <el-dialog
            width="30%"
            :visible.sync="imgVisible"
            append-to-body>
            <img style="width: 100%;" :src="imgSrc" alt="">
          </el-dialog>
        </div>
      </el-row>
    </div>  
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
      loading: false,
      tableData: [],
      dialogData: null,
      imgVisible: false,
      imgSrc: '',
    }
  },
  methods: {
    getData() {
      this.loading = true
      datacenter.party_field_info({id: this.detailId}).then( res => {
        this.dialogData = res.data.data
        this.loading = false
      })
    },
    enlarge(src) {
      this.imgVisible = true
      this.imgSrc = src
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style>
  .dialog-table .table-content .el-row .el-col{border: 1px solid #DDDDDD;padding: 8px 16px;}
  .dialog-table {width: 100%;}
  .dialog-table .dialog-info {border-left: 1px solid #ddd;}
  .dialog-info .dialog-table .el-row.img-row .el-col img {height: 100px;margin-right: 10px;margin-bottom: 10px;cursor: pointer;}
  .dialog-info .dialog-table .el-row .map-content {height: 400px;}
  .dialog-info .dialog-table .el-row.map-row .map {width: 100%;height: 100%;overflow: hidden;position: relative;}
</style>
