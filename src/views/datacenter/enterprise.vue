<template>
    <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入非公企业名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加非公企业</el-button>
            <exportData eType="company" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="company" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
        <el-table :data="tableData.data" stripe>
            <el-table-column prop="name" label="企业名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="checkDetail(scope.row.id)"
                        type="text">
                        {{scope.row.name}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="办公地址" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.address || '--'}}</template>
            </el-table-column>
            <el-table-column prop="logo_attributes" label="标志属性" width="80px" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.logo_attributes_name || '--'}}</template>
            </el-table-column>
            <el-table-column prop="total_num" label="职工总数" width="100px" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.total_num || '0'}}</template>
            </el-table-column>
            <el-table-column prop="party_num" label="党员数" width="100px" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.party_num || '0'}}</template>
            </el-table-column>
            <el-table-column prop="flow_party_num" label="流动党员数" width="100px" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.flow_party_num || '0'}}</template>
            </el-table-column>
            <el-table-column prop="is_party_org" label="是否建立党组织" width="150px" align="center">
                <template slot-scope="scope">{{scope.row.is_party_org || '--'}}</template>
            </el-table-column>
            <el-table-column prop="org_name" label="党组织名称" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
            </el-table-column>
            <el-table-column class-name="table-name" label="操作" align="center" width="210px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                    <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                    <el-button size="mini" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">删除</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="username" label="书记" width="100px"></el-table-column> -->
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
            <!-- <div class="dialog-info">
            <div class="dialog-table">
                <el-row class="flex-row">
                <el-col class="col-name" :span="3">企业名称</el-col>
                <el-col :title="dialogData.name" class="col-name el" :span="21">{{dialogData.name || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="3">办公地址</el-col>
                <el-col :title="dialogData.address" class="col-name el" :span="21">{{dialogData.address || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="3">标志属性</el-col>
                <el-col :title="dialogData.type" class="col-name el" :span="3">{{dialogData.type || "暂无"}}</el-col>
                <el-col class="col-name" :span="3">职工总数</el-col>
                <el-col :title="dialogData.total_num" class="col-name el" :span="3">{{dialogData.total_num || "暂无"}}</el-col>
                <el-col class="col-name" :span="3">党员数</el-col>
                <el-col :title="dialogData.party_num" class="col-name el" :span="3">{{dialogData.party_num || "暂无"}}</el-col>
                <el-col class="col-name" :span="3">流动党员数</el-col>
                <el-col :title="dialogData.flow_party_num" class="col-name el" :span="3">{{dialogData.flow_party_num || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="6">是否建立党组织</el-col>
                <el-col :title="dialogData.is_party_org" class="col-name el" :span="6">{{dialogData.is_party_org || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">是否建立“功能型”党组织</el-col>
                <el-col :title="dialogData.is_function_party_org" class="col-name el" :span="6">{{dialogData.is_function_party_org || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="6">党组织名称</el-col>
                <el-col :title="dialogData.org_id" class="col-name el" :span="6">{{dialogData.org_id || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">隶属的上一级党组织名称</el-col>
                <el-col :title="dialogData.upper_org_id" class="col-name el" :span="6">{{dialogData.upper_org_id || "暂无"}}</el-col>
                </el-row>

                <el-row class="flex-row">
                <el-col class="col-name" :span="24" style="text-align:center;">
                    党组织书记情况
                </el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="4">姓名</el-col>
                <el-col :title="dialogData.username" class="col-name el" :span="4">{{dialogData.username || "暂无"}}</el-col>
                <el-col class="col-name" :span="4">性别</el-col>
                <el-col :title="dialogData.sex" class="col-name el" :span="4">{{dialogData.sex || "暂无"}}</el-col>
                <el-col class="col-name" :span="4">年龄</el-col>
                <el-col :title="dialogData.age" class="col-name el" :span="4">{{dialogData.age || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="6">行政职务</el-col>
                <el-col :title="dialogData.job" class="col-name el" :span="6">{{dialogData.job || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">近三年参加上级党组织培训次数</el-col>
                <el-col :title="dialogData.develop_org_train_num" class="col-name el" :span="6">{{dialogData.develop_org_train_num || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="6">专职党务工作者人数</el-col>
                <el-col :title="dialogData.party_work_num" class="col-name el" :span="2">{{dialogData.party_work_num || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">近三年发展党员数</el-col>
                <el-col :title="dialogData.develop_party_num" class="col-name el" :span="2">{{dialogData.develop_party_num || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">是否选派党建工作指导员</el-col>
                <el-col :title="dialogData.is_party_work_instructor" class="col-name el" :span="2">{{dialogData.is_party_work_instructor || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="6">党组织年度活动经费（万元）</el-col>
                <el-col :title="dialogData.org_activity_funds" class="col-name el" :span="6">{{dialogData.org_activity_funds || "暂无"}}</el-col>
                <el-col class="col-name" :span="6">党组织活动场所面积（平方米）</el-col>
                <el-col :title="dialogData.org_activity_area" class="col-name el" :span="6">{{dialogData.org_activity_area || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                <el-col class="col-name" :span="4">备注</el-col>
                <el-col :title="dialogData.remark" class="col-name el" :span="21">{{dialogData.remark || "暂无"}}</el-col>
                </el-row>
            </div>
            </div> -->
            <div class="dialog_info">
                <div class="dialog-table">
                    <el-row class="table-content col-table">
                        <el-row>
                            <cname-title title="企业名称" />
                            <el-col :title="dialogData.name" class="col-name" :span="8"><span class="sblock">{{dialogData.name || ""}}</span></el-col>
                            <cname-title title="办公地址" />
                            <el-col :title="dialogData.address" class="col-name" :span="8"><span class="sblock">{{dialogData.address || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="标志属性" />
                            <el-col :title="dialogData.logo_attributes_name" class="col-name" :span="8"><span class="sblock">{{dialogData.logo_attributes_name || ""}}</span></el-col>
                            <cname-title title="职工总数" />
                            <el-col :title="dialogData.total_num" class="col-name" :span="8"><span class="sblock">{{dialogData.total_num || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="党员数" />
                            <el-col :title="dialogData.party_num" class="col-name" :span="8"><span class="sblock">{{dialogData.party_num || ""}}</span></el-col>
                            <cname-title title="流动党员数" />
                            <el-col :title="dialogData.flow_party_num" class="col-name" :span="8"><span class="sblock">{{dialogData.flow_party_num || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="是否建立党组织" />
                            <el-col :title="(dialogData.is_party_org=='1'?'是':'否')" class="col-name" :span="8"><span class="sblock">{{(dialogData.is_party_org=='1'?'是':'否') || ""}}</span></el-col>
                            <cname-title title="是否建立“功能型”党组织" />
                            <el-col :title="(dialogData.is_function_party_org=='1'?'是':'否')" class="col-name" :span="8"><span class="sblock">{{(dialogData.is_function_party_org=='1'?'是':'否') || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="党组织名称" />
                            <el-col :title="dialogData.org_name" class="col-name" :span="8"><span class="sblock">{{dialogData.org_name || ""}}</span></el-col>
                            <cname-title title="上级党组织名称" />
                            <el-col :title="dialogData.org_pid_name" class="col-name" :span="8"><span class="sblock">{{dialogData.org_pid_name || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="企业法人" />
                            <el-col :title="dialogData.legal_person" class="col-name" :span="8"><span class="sblock">{{dialogData.legal_person || ""}}</span></el-col>
                            <cname-title title="联系电话" />
                            <el-col :title="dialogData.tel" class="col-name" :span="8"><span class="sblock">{{dialogData.tel || ""}}</span></el-col>
                        </el-row>
                        <div v-if="dialogData.is_party_org=='1'">
                            <div class="detail-subtext">党组织书记情况</div>
                            <el-row>
                                <cname-title title="书记姓名" />
                                <el-col :title="dialogData.username" class="col-name" :span="8"><span class="sblock">{{dialogData.username || ""}}</span></el-col>
                                <cname-title title="书记性别" />
                                <el-col :title="(dialogData.sex=='1'?'女':'男')" class="col-name" :span="8"><span class="sblock">{{(dialogData.sex=='1'?'女':'男') || ""}}</span></el-col>
                            </el-row>
                            <el-row>
                                <cname-title title="书记年龄" />
                                <el-col :title="dialogData.age" class="col-name" :span="8"><span class="sblock">{{dialogData.age || ""}}</span></el-col>
                                <cname-title title="书记行政职务" />
                                <el-col :title="dialogData.job" class="col-name" :span="8"><span class="sblock">{{dialogData.job || ""}}</span></el-col>
                            </el-row>
                            <el-row>
                                <cname-title title="书记联系电话" />
                                <el-col :title="dialogData.tel" class="col-name" :span="8"><span class="sblock">{{dialogData.tel || ""}}</span></el-col>
                                <cname-title title="近三年参加上级党组织培训次数" />
                                <el-col :title="dialogData.develop_org_train_num" class="col-name" :span="8"><span class="sblock">{{dialogData.develop_org_train_num || ""}}</span></el-col>
                            </el-row>
                            <div class="detail-void"></div>
                        </div>
                        <el-row>
                            <cname-title title="专职党务工作者人数" />
                            <el-col :title="dialogData.party_work_num" class="col-name" :span="8"><span class="sblock">{{dialogData.party_work_num || ""}}</span></el-col>
                            <cname-title title="近三年发展党员数" />
                            <el-col :title="dialogData.develop_party_num" class="col-name" :span="8"><span class="sblock">{{dialogData.develop_party_num || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="是否选派党建工作指导员" />
                            <el-col :title="(dialogData.is_party_work_instructor=='1'?'是':'否')" class="col-name" :span="20"><span class="sblock">{{(dialogData.is_party_work_instructor=='1'?'是':'否') || ""}}</span></el-col>
                        </el-row>
                        <div v-if="dialogData.is_party_work_instructor=='1'">
                            <div class="detail-subtext">党建工作指导员</div>
                            <el-row>
                                <cname-title title="指导员姓名" />
                                <el-col :title="dialogData.user_name" class="col-name" :span="8"><span class="sblock">{{dialogData.user_name || ""}}</span></el-col>
                                <cname-title title="指导员性别" />
                                <el-col :title="(dialogData.user_sex=='1'?'女':'男')" class="col-name" :span="8"><span class="sblock">{{(dialogData.user_sex=='1'?'女':'男') || ""}}</span></el-col>
                            </el-row>
                            <el-row>
                                <cname-title title="指导员出生日期" />
                                <el-col :title="dialogData.user_birth" class="col-name" :span="8"><span class="sblock">{{dialogData.user_birth || ""}}</span></el-col>
                                <cname-title title="党务工作经验（年）" />
                                <el-col :title="dialogData.user_experience" class="col-name" :span="8"><span class="sblock">{{dialogData.user_experience || ""}}</span></el-col>
                            </el-row>
                            <el-row>
                                <cname-title title="指导员联系电话" />
                                <el-col :title="dialogData.user_cellphone" class="col-name" :span="20"><span class="sblock">{{dialogData.user_cellphone || ""}}</span></el-col>
                            </el-row>
                            <div class="detail-void"></div>
                        </div>
                        <!-- <div class="dialog_sim_table">
                            <el-table :data="dialogData.group_list" style="width: 100%;">
                                <el-table-column prop="director" label="姓名"></el-table-column>
                                <el-table-column prop="sex" label="性别"></el-table-column>
                                <el-table-column prop="sex" label="出生日期"></el-table-column>
                                <el-table-column prop="post" label="党务工作经验(年)"></el-table-column>
                                <el-table-column prop="tel" label="联系电话"></el-table-column>
                            </el-table>
                            <el-row class="pagination-content" type="flex">
                                <span>共{{dialogData.totalPages || "0"}}页</span>
                                <el-pagination background @current-change="dialog_currentChange" layout="prev, pager, next" :total="dialogData.totalRows"
                                    :current-page="1"
                                    :page-size="params.pagesize"
                                        class="pagination">
                                </el-pagination>
                            </el-row>
                        </div> -->
                        <el-row>
                            <cname-title title="党组织年度活动经费(万元)" />
                            <el-col :title="dialogData.org_activity_funds" class="col-name" :span="8"><span class="sblock">{{dialogData.org_activity_funds || ""}}</span></el-col>
                            <cname-title title="党组织活动场所面积(㎡)" />
                            <el-col :title="dialogData.org_activity_area" class="col-name" :span="8"><span class="sblock">{{dialogData.org_activity_area || ""}}</span></el-col>
                        </el-row>
                        <el-row>
                            <cname-title title="备注" />
                            <el-col :title="dialogData.remark" class="col-name" :span="20"><span class="sblock">{{dialogData.remark || ""}}</span></el-col>
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
  components: {datadialog, cnameTitle,exportData},
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
      datacenter.nonPublicEnterprises(this.params).then( res => {
        this.loading = false
        this.tableData = res.data
      })
    },
    currentChange(value) {
      this.params.p = value
      this.loading = true
      this.getData()
    },
    checkDetail(id) {
        this.dialogVisible = true
        this.dialogData = []
    //   datacenter.nonPublicEnterprisesDetail({id: id}).then( res => {
        datacenter.company_info({id: id}).then( res => {
            this.dialogData = res.data.data
        })
    },
    dialog_currentChange() {
        let cur_page = value
        // this.getData()
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
            this.$router.push({path: 'enterprise_edit',query: query})
        }else if(tag == 'edit') {
            this.$router.push({path: 'enterprise_edit',query: query})
        }else {
            query.tag = 'look'
            this.$router.push({path: 'enterprise_edit',query: query})
        }
    },
    del(row) {
        this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
            datacenter.company_del({id: row.id}).then( res => {
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
