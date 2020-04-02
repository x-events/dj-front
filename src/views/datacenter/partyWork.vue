<template>
    <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入党员、党组织名称或职务"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加党务工作者</el-button>
            <exportData eType="worker" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="worker" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
        <el-table :data="tableData.data" stripe>
            <el-table-column prop="realname" label="党员姓名" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="checkDetail(scope.row.id)"
                        type="text">
                        {{scope.row.realname}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="org_name" label="任职所在党组织" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
            </el-table-column>
            <el-table-column prop="duties_name" label="任职职务" width="100px" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.duties_name || '--'}}</template>
            </el-table-column>
            <el-table-column class-name="table-name" label="操作" align="center" width="210px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                    <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                    <el-button size="mini" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-row class="pagination-content" type="flex">
            <span>共{{tableData.totalPages || "0"}}页</span>
            <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows"
                :current-page="Number(params.p)"
                :page-size="params.pagesize"
                    class="pagination">
            </el-pagination>
        </el-row>

        <datadialog title="党务工作者" :dialogVisible="dialogVisible" @dialogData="closeDialog">
            <div class="dialog_info">
                <div class="dialog-table">
                    <el-row class="table-content col-table">
                        <el-row>
                            <cname-title title="党员姓名" />
                            <el-col :title="dialogData.realname" class="col-name" :span="20"><span class="sblock">{{dialogData.realname || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type=='0'">
                            <cname-title title="任职所在党组织" />
                            <el-col :title="dialogData.org_name" class="col-name" :span="20"><span class="sblock">{{dialogData.org_name || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="党务工作" />
                            <el-col :title="dialogData.type=='1'?'是':'否'" class="col-name" :span="20"><span class="sblock">{{(dialogData.type=='1'?'党建工作指导员':'党组织班子成员') || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '0'">
                            <cname-title title="任职职务" />
                            <el-col :title="dialogData.duties_name" class="col-name" :span="8"><span class="sblock">{{dialogData.duties_name || ""}}</span></el-col>
                            <cname-title title="任职期限" />
                            <el-col :title="dialogData.stay_time" class="col-name" :span="8"><span class="sblock">{{dialogData.stay_time || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '0'">
                            <cname-title title="任职年限(年)" />
                            <el-col :title="dialogData.tenure" class="col-name" :span="20"><span class="sblock">{{dialogData.tenure || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '1'">
                            <cname-title title="派遣单位" />
                            <el-col :title="dialogData.dispatch_org_name" class="col-name" :span="20"><span class="sblock">{{dialogData.dispatch_org_name || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '1'">
                            <cname-title title="派驻单位类别" />
                            <el-col :title="dialogData.stationing_type_name" class="col-name" :span="20"><span class="sblock">{{dialogData.stationing_type_name || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '1'">
                            <cname-title title="派驻单位" />
                            <el-col :title="dialogData.stationing_org_name" class="col-name" :span="20"><span class="sblock">{{dialogData.stationing_org_name || ""}}</span></el-col>
                        </el-row>
                        <el-row v-if="dialogData.type == '1'">
                            <cname-title title="任职期限" />
                            <el-col :title="(dialogData.start_time?dialogData.start_time+' - ':'')+(dialogData.end_time?dialogData.end_time:'')" class="col-name" :span="8"><span class="sblock">{{(dialogData.start_time?dialogData.start_time+' - ':'')+(dialogData.end_time?dialogData.end_time:'') || ""}}</span></el-col>
                            <cname-title title="任职年限(年)" />
                            <el-col :title="dialogData.tenure" class="col-name" :span="8"><span class="sblock">{{dialogData.tenure || ""}}</span></el-col>
                        </el-row>
                    </el-row>
                </div>
            </div>
        </datadialog>
    </div>
  </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
import datadialog from './dialog.vue'
import cnameTitle from '@/components/datacenter/colName_title.vue'
import exportData from "@/components/datacenter/widgets/ExportData";

export default {
  data() {
    return {
      loading: false,
      params: {
        p:  this.$route.params.p || 1,
        pagesize: 8,
        keyword: this.$route.params.keyword || ''
      },
      tableData: [],
      dialogVisible:false,
      dialogData: {}
    }
  },
  components: {datadialog, cnameTitle, exportData},
  methods: {
    closeDialog(val) {
      this.dialogVisible = val
    },
    search() {
      this.params.p = 1;
      this.getData()
    },
    getData() {
      this.loading = true
      datacenter.worker_list(this.params).then( res => {
        this.loading = false
        this.tableData = res.data
      })
    },
    currentChange(value) {
        this.params.p = value
        this.getData()
    },
    checkDetail(id) {
      this.dialogVisible = true
      this.getDetailData(id)
    },
    getDetailData(id) {
        datacenter.worker_info({id: id}).then( res => {
            this.dialogData = res.data.data
        })
    },
    edit(tag,row) {
        let query = {}
        if(tag != 'add') {
            query = {
                id: row.id,
                keyword: this.params.keyword,
                p:  this.params.p,
            }
        }
        if(tag == 'add') {    // 新增
            query = {
                keyword: this.params.keyword,
                p:  this.params.p,
            }
            this.$router.push({path: 'partyWork_edit',query: query})
        }else if(tag == 'edit') {
            this.$router.push({path: 'partyWork_edit',query: query})
        }else {
            query.tag = 'look'
            this.$router.push({path: 'partyWork_edit',query: query})
        }
    },
    del(row) {
        this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
            datacenter.worker_del({id: row.id}).then( res => {
                if(res.data.status == '200') {
                    this.getData()
                    this.$message({ message: res.data.statusCode, type: 'success' });
                }else {
                    this.$message({ message: res.data.statusCode, type: 'error' });
                }
            })
        })
        .catch(() => {});
    },
    importReload() {
        this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
  .dialog-info .dialog-table {border-top: 1px solid #ddd;border-left: 1px solid #ddd;width: 100%;}
  .dialog-info .dialog-table .el-row .el-col {padding: 8px 16px;border: 1px solid #ddd;
  border-top: none;border-left: none;}
  .dialog-info .el-row.list {border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;}
  .dialog-info .el-row.list .el-col {border-bottom: none;}
  .dialog-info .el-row.list .el-col:nth-last-of-type(8) {border-right: none;}
</style>
