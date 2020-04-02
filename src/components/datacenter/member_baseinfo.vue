<template>
  <div v-loading="loading">
    <div class="dialog-table scroll">
      <el-row class="right-content" v-if="detail">
        <el-col class="content" :span="12" v-for="(item, key) in detail" :key="key">
          <el-row>
            <el-col :title="key" class="col-name" :span="8"><span class="sblock">{{key}}</span></el-col>
            <el-col :title="item"  class="col-name" :span="16"><span class="sblock">{{item}}</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>  
  </div>  
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
import * as window from "@/api/window";
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
      detail: null
    }
  },
  methods: {
    getData() {
      this.loading = true
      /* datacenter.org_info({org_id: this.detailId}).then( res => {
        this.detail = res.data.data
        this.loading = false
      }) */
      window.org_detail({org_id: this.detailId}).then( res => {
        this.detail = res.data.data
        this.loading = false
      })
    },
  },
  watch: {
    detailId: function () {
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
  .dialog-table .table-content .el-row .el-col{border: 1px solid #DDDDDD; padding:8px 16px;}
  .col-name:nth-of-type(2n-1){ background: #f9f9f9; color: #828b92; text-align: center; }
  /* .col-name { height:62px; line-height:46px;}
  .col-name .sblock { display: inline-block; max-height:46px; line-height:23px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;} */
</style>
