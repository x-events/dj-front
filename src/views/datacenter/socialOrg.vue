<template>
    <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入组织名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加社会组织</el-button>
            <exportData eType="social" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="social" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="name" label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="add" label="办公地址" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.add || '--'}}</template>
        </el-table-column>
        <el-table-column prop="employmee_num" label="员工总数" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.employmee_num || '0'}}</template>
        </el-table-column>
        <el-table-column prop="party_member_num" label="党员数" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.party_member_num || '0'}}</template>
        </el-table-column>
        <el-table-column prop="float_party_member_num" label="流动党员数" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.float_party_member_num || '0'}}</template>
        </el-table-column>
        <el-table-column prop="is_branch" label="是否建立党组织" width="150px" align="center">
            <template slot-scope="scope">{{scope.row.is_branch || '--'}}</template>
        </el-table-column>
        <el-table-column prop="org_name" label="党组织名称" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="leader_name" label="党组织书记" show-overflow-tooltip width="120px">
            <template slot-scope="scope">{{scope.row.leader_name || '--'}}</template>
        </el-table-column> -->
        <el-table-column class-name="table-name" label="操作" align="center" width="210px">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                <el-button size="mini" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">删除</el-button>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="org_name" label="所属党组织" show-overflow-tooltip></el-table-column>
        <el-table-column prop="leader_name" label="党支部书记" show-overflow-tooltip width="120px"></el-table-column> -->
      </el-table>
      
      <el-row class="pagination-content" type="flex">
        <span>共{{tableData.totalPages || "0"}}页</span>
        <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows"
            :current-page="Number(params.p)"
            :page-size="params.pagesize"
                class="pagination">
        </el-pagination>
      </el-row>

      <datadialog :dialogVisible=dialogVisible @dialogData="closeDialog">
        <div class="dialog_info">
          <!-- <div class="dialog-table">
            <el-row class="flex-row">
              <el-col class="col-name" :span="4"><span class="sblock">组织名称</span></el-col>
              <el-col :title="dialogData.name" class="col-name" :span="8"><span class="sblock">{{dialogData.name || "暂无"}}</span></el-col>
              <el-col class="col-name" :span="4"><span class="sblock">办公地址</span></el-col>
              <el-col :title="dialogData.add" class="col-name" :span="8"><span class="sblock">{{dialogData.add || "暂无"}}</span></el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4"><span class="sblock">服务类别</span></el-col>
              <el-col :title="dialogData.service_category_name" class="col-name" :span="8"><span class="sblock">{{dialogData.service_category_name || "暂无"}}</span></el-col>
              <el-col class="col-name" :span="4"><span class="sblock">员工总数</span></el-col>
              <el-col :title="dialogData.employmee_num" class="col-name" :span="8"><span class="sblock">{{dialogData.employmee_num || "暂无"}}</span></el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4"><span class="sblock">党员总数</span></el-col>
              <el-col :title="dialogData.party_member_num" class="col-name" :span="8"><span class="sblock">{{dialogData.party_member_num || "暂无"}}</span></el-col>
              <el-col class="col-name" :span="4"><span class="sblock">流动党员数</span></el-col>
              <el-col :title="dialogData.float_party_member_num" class="col-name" :span="8"><span class="sblock">{{dialogData.float_party_member_num || "暂无"}}</span></el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4"><span class="sblock">是否建立党组织</span></el-col>
              <el-col class="col-name" :span="8" v-if="dialogData.party_branch == 1">是</el-col>
              <el-col class="col-name" :span="8" v-if="dialogData.party_branch == 0">否</el-col>
              <el-col class="col-name" :span="4"><span class="sblock">党支部书记</span></el-col>
              <el-col :title="dialogData.branch_leader_name" class="col-name" :span="8"><span class="sblock">{{dialogData.branch_leader_name || "暂无"}}</span></el-col>
            </el-row>
            <el-row class="flex-row"> -->
              <!-- 20190219 去掉 lxr -->
              <!-- <el-col class="col-name" :span="3">隶属上级党组织</el-col>
              <el-col :title="dialogData.org_parent_name" class="col-name el" :span="9">{{dialogData.org_parent_name || "暂无"}}</el-col> -->
              <!-- <el-col class="col-name" :span="4"><span class="sblock">所属党组织</span></el-col>
              <el-col :title="dialogData.org_name" class="col-name" :span="20"><span class="sblock">{{dialogData.org_name || "暂无"}}</span></el-col>
            </el-row>
          </div> -->
            <div class="dialog-table">
                <el-row class="table-content col-table">
                    <el-row>
                        <cname-title title="组织名称" />
                        <el-col :title="dialogData.name" class="col-name" :span="8"><span class="sblock">{{dialogData.name || ""}}</span></el-col>
                        <cname-title title="办公地址" />
                        <el-col :title="dialogData.add" class="col-name" :span="8"><span class="sblock">{{dialogData.add || ""}}</span></el-col>
                    </el-row>
                    <el-row>
                        <cname-title title="服务类别" />
                        <el-col :title="dialogData.service_category_name" class="col-name" :span="8"><span class="sblock">{{dialogData.service_category_name || ""}}</span></el-col>
                        <cname-title title="员工总数" />
                        <el-col :title="dialogData.employmee_num" class="col-name" :span="8"><span class="sblock">{{dialogData.employmee_num || ""}}</span></el-col>
                    </el-row>
                    <el-row>
                        <cname-title title="党员总数" />
                        <el-col :title="dialogData.party_member_num" class="col-name" :span="8"><span class="sblock">{{dialogData.party_member_num || ""}}</span></el-col>
                        <cname-title title="流动党员数" />
                        <el-col :title="dialogData.float_party_member_num" class="col-name" :span="8"><span class="sblock">{{dialogData.float_party_member_num || ""}}</span></el-col>
                    </el-row>
                    <el-row>
                        <cname-title title="是否建立党组织" />
                        <el-col :title="dialogData.party_branch=='1'?'是':'否'" class="col-name" :span="8"><span class="sblock">{{(dialogData.party_branch=='1'?'是':'否') || ""}}</span></el-col>
                        <cname-title title="党支部书记" />
                        <el-col :title="dialogData.leader_name" class="col-name" :span="8"><span class="sblock">{{dialogData.leader_name || ""}}</span></el-col>
                    </el-row>
                    <el-row>
                        <cname-title title="所属党组织" />
                        <el-col :title="dialogData.org_name" class="col-name" :span="20"><span class="sblock">{{dialogData.org_name || ""}}</span></el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
      </datadialog>
    </div>
  </div>
</template>

<script>
import * as datacenter from '../../api/datacenter.js'
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
        keyword: this.$route.params.keyword || '',
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
      datacenter.org_social_list(this.params).then( res => {
        this.loading = false
        this.tableData = res.data
      })
    },
    currentChange(value) {
      this.params.p = value
      this.loading = true
      datacenter.org_social_list(this.params).then( res => {
        this.loading = false
        this.tableData = res.data
      })
    },
    checkDetail(id) {
      this.dialogVisible = true
      this.getDetailData(id)
    },
    getDetailData(id) {
        datacenter.org_social_info({id: id}).then( res => {
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
            this.$router.push({path: 'socialOrg_edit',query: query})
        }else if(tag == 'edit') {
            this.$router.push({path: 'socialOrg_edit',query: query})
        }else {
            query.tag = 'look'
            this.$router.push({path: 'socialOrg_edit',query: query})
        }
    },
    del(row) {
        this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
            datacenter.social_del({id: row.id}).then( res => {
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
