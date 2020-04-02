<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入工会名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加工会</el-button>
            <exportData eType="union" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="union" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table
        :data="tableData.data"
        stripe>
        <el-table-column prop="company" label="单位名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.company}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addr" label="经营地址" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.addr || '--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="120px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.tel || '--'}}</template>
        </el-table-column>
        <el-table-column prop="setup_time" label="申请建会时间" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.setup_time || '--'}}</template>
        </el-table-column>
        <el-table-column prop="chairman" label="工会主席姓名" width="120px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.chairman || '--'}}</template>
        </el-table-column>
        <el-table-column prop="employee_num" label="职工人数" width="100px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.employee_num || '0'}}</template>
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

      <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog" v-if="dialogData">
        <!-- <div class="dialog-info dialog_info">
          <div class="dialog-table">
            <el-row>
              <el-col class="col-name" :span="3">单位名称</el-col>
              <el-col :title="dialogData.company" class="col-name el" :span="21">{{dialogData.company || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">经营地址</el-col>
              <el-col :title="dialogData.addr" class="col-name el" :span="21">{{dialogData.addr || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">经营范围</el-col>
              <el-col :title="dialogData.business_scope" class="col-name el" :span="21">{{dialogData.business_scope || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">公司法人</el-col>
              <el-col :title="dialogData.legal_person" class="col-name el" :span="9">{{dialogData.legal_person || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">登记类型</el-col>
              <el-col :title="dialogData.nature" class="col-name el" :span="9">{{dialogData.nature || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="3">申请建会时间</el-col>
              <el-col :title="dialogData.change_time" class="col-name el" :span="9">{{dialogData.change_time || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">联系电话</el-col>
              <el-col :title="dialogData.tel" class="col-name el" :span="9">{{dialogData.tel || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4">职工数</el-col>
              <el-col :title="dialogData.employee_num" class="col-name el" :span="2">{{dialogData.employee_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">使用劳务派遣人数</el-col>
              <el-col :title="dialogData.labor_dispatch" class="col-name el" :span="2">{{dialogData.labor_dispatch || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">女职工数</el-col>
              <el-col :title="dialogData.women_employee_num" class="col-name el" :span="2">{{dialogData.women_employee_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">职工代表数</el-col>
              <el-col :title="dialogData.employee_representative" class="col-name el" :span="2">{{dialogData.employee_representative || "暂无"}}</el-col>
            </el-row>
            <el-row  class="flex-row">
              <el-col class="col-name" :span="4">会员数</el-col>
              <el-col :title="dialogData.member_num" class="col-name el" :span="2">{{dialogData.member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">劳务派遣会员数</el-col>
              <el-col :title="dialogData.labor_dispatch_member" class="col-name el" :span="2">{{dialogData.labor_dispatch_member || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">女会员数</el-col>
              <el-col :title="dialogData.women_member_num" class="col-name el" :span="2">{{dialogData.women_member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">会员代表数</el-col>
              <el-col :title="dialogData.member_representtive" class="col-name el" :span="2">{{dialogData.member_representtive || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4">党员数</el-col>
              <el-col :title="dialogData.party_member_num" class="col-name el" :span="2">{{dialogData.party_member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">是否建立党支部</el-col>
              <el-col :title="dialogData.party_branch" class="col-name el" :span="2">{{dialogData.party_branch || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">是否签订集体合同</el-col>
              <el-col :title="dialogData.collective_contract" class="col-name el" :span="2">{{dialogData.collective_contract || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">是否建立职代会制度</el-col>
              <el-col :title="dialogData.workers_congress" class="col-name el" :span="2">{{dialogData.workers_congress || "暂无"}}</el-col>
            </el-row>

            <el-table
              :data="dialogData.leader_list"
              border
              style="width: 100%;border-color:#ddd;">
              <el-table-column
                prop="post"
                label="职务"
                >
              </el-table-column>
              <el-table-column
                prop="realname"
                label="姓名"
                >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生年月">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历">
              </el-table-column>
              <el-table-column
                prop="tel"
                label="联系电话">
              </el-table-column>
            </el-table>
            <el-row>
              <el-col :span="24" style="text-align:center;">
                工会委员会其他委员名单（女性注性别）
              </el-col>
            </el-row>
            <el-row class="list" v-if="dialogData.member_list">
              <el-col class="col-name" :span="3" v-for="item in dialogData.member_list" :key="item">{{item}}</el-col>
            </el-row>
            <el-row v-else>
              <el-col class="col-name" :span="24" style="text-align:center;">暂无数据</el-col>
            </el-row>

            <el-table
              :data="dialogData.committee_list"
              border
              style="width: 100%;border-color:#ddd;">
              <el-table-column
                prop="name"
                label="工会委员会专门委员会"
                width="180">
              </el-table-column>
              <el-table-column
                prop="director"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生年月">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历">
              </el-table-column>
              <el-table-column
                prop="tel"
                label="联系电话">
              </el-table-column>
            </el-table>

            <el-table
              :data="dialogData.group_list"
              border
              style="width: 100%;border-color:#ddd;">
              <el-table-column
                prop="name"
                label="本工会分会（小组）名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="employee_num"
                label="职工数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="member_num"
                label="会员数">
              </el-table-column>
              <el-table-column
                prop="leader"
                label="工会分会主席（小组长）姓名">
              </el-table-column>
            </el-table>
          </div> 
        </div>  -->
        <div class="dialog_info">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位名称">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="经营地址">
                                        <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name hight-item" label="经营范围">
                                        <span class="sblock" :title="dialogData.business_scope">{{dialogData.business_scope || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">单位法人照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="单位法人">
                                        <span class="sblock" :title="dialogData.legal_person">{{dialogData.legal_person || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="申请建会时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="工会主席">
                                        <span class="sblock" :title="dialogData.chairman">{{dialogData.chairman || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期(年)">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="联系电话">
                                        <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="是否建立党组织">
                                        <span class="sblock" :title="(dialogData.party_branch==
                                        '1'?'是':'否')">{{(dialogData.party_branch==
                                        '1'?'是':'否') || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="职工数">
                                        <span class="sblock" :title="dialogData.employee_num">{{dialogData.employee_num || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="会员数">
                                        <span class="sblock" :title="dialogData.member_num">{{dialogData.member_num || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.chairman_img_url" :src="dialogData.chairman_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">工会主席照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <div class="detail-subtext">工会党员</div>
                    </el-row>
                    <div class="dialog_sim_table">
                        <el-table :data="personData.data" style="width: 100%;">
                            <el-table-column prop="realname" label="姓名"></el-table-column>
                            <el-table-column prop="sex" label="性别">
                                <template slot-scope="scope">{{ scope.row.sex == '1'?'女':(scope.row.sex == '0'?'男':'--') }}</template>
                            </el-table-column>
                            <el-table-column prop="type_name" label="职务"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                        </el-table>
                        <el-row class="pagination-content" type="flex" v-if="dialogVisible">
                            <span>共{{personData.totalPages || "0"}}页</span>
                            <el-pagination background @current-change="dialog_currentChange" layout="prev, pager, next" :total="personData.totalRows"
                                :current-page="dialogParams.p"
                                :page-size="dialogParams.pagesize"
                                    class="pagination">
                            </el-pagination>
                        </el-row>
                    </div>
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
      personData: [],
      dialogParams: {
        p: 1,
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
            this.dialogParams.p = 1;
        },
        search() {
            this.params.p = 1;
            this.getData()
        },
        getData() {
            this.loading = true
            datacenter.org_union_list(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        dialog_currentChange(value) {
            this.dialogParams.p= value
            this.getPersonData()
        },
        checkDetail(id) {
            this.dialogVisible = true
            datacenter.union_info({id: id}).then( res => {
                this.dialogData = res.data.data
            })
            this.dialogParams.id = id
            this.getPersonData()
        },
        getPersonData() {
            // 人员列表
            datacenter.union_member_list(this.dialogParams).then( res => {
                this.personData = res.data
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
                this.$router.push({path: 'unionEditIndex',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'unionEditIndex',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({path: 'unionEditIndex',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.union_del({id: row.id}).then( res => {
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

</style>
<style>
  .dialog-info .dialog-table .el-table--border td,
  .dialog-info .el-table td,
  .dialog-table  .el-table th.is-leaf {border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;}
  .dialog-info .el-table td {border-bottom: 1px solid #ddd;}
</style>
