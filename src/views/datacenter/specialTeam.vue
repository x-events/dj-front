<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入队伍名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加特色队伍</el-button>
            <exportData eType="team" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="team" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table
        :data="tableData.data"
        stripe>
        <el-table-column prop="work_name" label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.work_name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="org_name" label="隶属党组织" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
        </el-table-column>
        <el-table-column prop="team_leader_name" label="负责人" width="120px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.team_leader_name || '--'}}</template>
        </el-table-column>
        <el-table-column prop="member_count" label="成员数" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.member_count || '--'}}</template>
        </el-table-column>
        <el-table-column prop="active_count" label="活动记录数" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.active_count || '--'}}</template>
        </el-table-column>
        <el-table-column class-name="table-name" label="操作" align="center" width="215px">
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

      <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog" v-if="dialogData">
        <div class="dialog_info">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium">
                    <el-row class="form-row fix">
                        <el-col :span="12">
                            <el-form-item class="col-name" label="队伍名称">
                                <span class="sblock" :title="dialogData.work_name">{{dialogData.work_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="隶属党组织">
                                <span class="sblock" :title="dialogData.org_name">{{dialogData.org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <div class="detail-subtext">负责人信息</div>
                        <div class="dialog_sim_table">
                            <el-table :data="dialogData.team_leader" style="width: 100%;">
                                <el-table-column prop="leader_name" label="姓名" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="leader_sex" label="性别" show-overflow-tooltip>
                                    <template slot-scope="scope">{{ scope.row.leader_sex == '1'?'女':(scope.row.leader_sex == '0'?'男':'--') }}</template>
                                </el-table-column>
                                <el-table-column prop="leader_birth" label="出生年月" show-overflow-tooltip>
                                    <template slot-scope="scope">{{scope.row.leader_birth || '--'}}</template>
                                </el-table-column>
                                <el-table-column prop="leader_is_party" label="是否党员">
                                    <template slot-scope="scope">{{(scope.row.leader_is_party=='1'?'是':scope.row.leader_is_party=='0'?'否':'--') || '--'}}</template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="detail-subtext">成员信息</div>
                        <div class="dialog_sim_table">
                            <el-table :data="personData.data" style="width: 100%;">
                                <el-table-column prop="realname" label="姓名"></el-table-column>
                                <el-table-column prop="sex" label="性别">
                                    <template slot-scope="scope">{{ scope.row.sex == '1'?'女':(scope.row.sex == '0'?'男':'--') }}</template>
                                </el-table-column>
                                <el-table-column prop="birth" label="出生年月">
                                    <template slot-scope="scope">{{scope.row.birth || '--'}}</template>
                                </el-table-column>
                                <el-table-column prop="is_party" label="是否党员">
                                    <template slot-scope="scope">{{(scope.row.is_party=='1'?'是':scope.row.is_party=='0'?'否':'--') || '--'}}</template>
                                </el-table-column>
                            </el-table>
                            <el-row class="pagination-content" type="flex" v-if="dialogVisible">
                                <span>共{{personData.totalPages || "0"}}页</span>
                                <el-pagination background @current-change="personData_currentChange" layout="prev, pager, next" :total="personData.totalRows"
                                    :current-page="personParams.p"
                                    :page-size="personParams.pagesize"
                                        class="pagination">
                                </el-pagination>
                            </el-row>
                        </div>
                        <div class="detail-subtext">活动记录</div>
                        <div class="dialog_sim_table">
                            <el-table :data="activeData.data" style="width: 100%;">
                                <el-table-column type="index" width="100" label="序号" align="center" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="work_name" label="名称" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">{{scope.row.work_name || '--'}}</template>
                                </el-table-column>
                                <el-table-column prop="end_time" label="时间" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">{{scope.row.end_time || '--'}}</template>
                                </el-table-column>
                            </el-table>
                            <el-row class="pagination-content" type="flex" v-if="dialogVisible">
                                <span>共{{activeData.totalPages || "0"}}页</span>
                                <el-pagination background @current-change="activeData_currentChange" layout="prev, pager, next" :total="activeData.totalRows"
                                    :current-page="activeParams.p"
                                    :page-size="activeParams.pagesize"
                                        class="pagination">
                                </el-pagination>
                            </el-row>
                        </div>
                    </el-row>
                </el-form>
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
            dialogData: {},
            personData: {},
            personParams: {
                p:1,
                pagesize: 10,
            },
            activeData: {
                data: []
            },
            activeParams: {
                p:1,
                pagesize: 10,
            },
        }
    },
    components: {datadialog, cnameTitle, exportData},
    methods: {
        closeDialog(val) {
            this.dialogVisible = val
            this.dialogData = {}
            this.personData = []
        },
        search() {
            this.params.p = 1;
            this.getData()
        },
        getData() {
            this.loading = true
            datacenter.team_list(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        checkDetail(id) {
            this.params.p = 1
            this.dialogVisible = true
            datacenter.team_info({id: id}).then( res => {
                res.data.data.team_leader = res.data.data.team_leader==''?[]:res.data.data.team_leader
                this.dialogData = res.data.data
            })
            this.personParams.id = id
            this.activeParams.id = id
            this.getPerson();
            this.getActive();
        },
        // 成员列表
        getPerson() {
            datacenter.team_member_list(this.personParams).then( res => {
                this.personData = res.data
            })
        },
        // 活动记录
        getActive() {
            datacenter.team_active_list(this.activeParams).then( res => {
                this.activeData = res.data
            })
        },
        personData_currentChange(value) {
            this.personParams.p = value
            this.getPerson();
        },
        activeData_currentChange(value) {
            this.activeParams.p = value
            this.getActive();
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
                this.$router.push({path: 'teamEditIndex',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'teamEditIndex',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({path: 'teamEditIndex',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.team_del({id: row.id}).then( res => {
                    if(res.data.status == '200') {
                        this.getData()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
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

.dialog_sim_table .el-table { border-left: 0; border-top: 0; } 
.dialog_sim_table .pagination-content { border-left: 1px solid #fff; margin-left: -1px; }
</style>
<style>
  .dialog-info .dialog-table .el-table--border td,
  .dialog-info .el-table td,
  .dialog-table  .el-table th.is-leaf {border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;}
  .dialog-info .el-table td {border-bottom: 1px solid #ddd;}
</style>
