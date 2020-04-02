<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入团组织名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加团组织</el-button>
            <exportData eType="youth" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="youth" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="name" label="团组织名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addr" label="单位地址" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.addr || '--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.tel || '--'}}</template>
        </el-table-column>
        <el-table-column prop="secretary" label="团组织负责人" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.secretary || '--'}}</template>
        </el-table-column>
        <el-table-column prop="member_num" label="团员数" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.member_num || '0'}}</template>
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

      <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog">
        <!-- <div class="dialog-info">
          <div class="dialog-table">
            <el-row>
              <el-col class="col-name" :span="3">团组织名称</el-col>
              <el-col :title="dialogData.name" class="col-name el" :span="9">{{dialogData.name || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">团组织负责人</el-col>
              <el-col :title="dialogData.secretary" class="col-name el" :span="9">{{dialogData.secretary || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">单位全称</el-col>
              <el-col :title="dialogData.company" class="col-name el" :span="9">{{dialogData.company || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">所属社区</el-col>
              <el-col :title="dialogData.community_id" class="col-name el" :span="9">{{dialogData.community_id || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">单位地址</el-col>
              <el-col :title="dialogData.addr" class="col-name el" :span="21">{{dialogData.addr || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="6">团组织建立（换届）时间</el-col>
              <el-col :title="dialogData.change_time" class="col-name el" :span="6">{{dialogData.change_time || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">联系电话</el-col>
              <el-col :title="dialogData.tel" class="col-name el" :span="9">{{dialogData.tel || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="4">团员数（人）</el-col>
              <el-col class="col-name" :span="5">18周岁以下</el-col>
              <el-col :title="dialogData.lt18_member_num" class="col-name el" :span="5">{{dialogData.lt18_member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="5">19-28周岁</el-col>
              <el-col :title="dialogData.gt18_member_num" class="col-name el" :span="5">{{dialogData.gt18_member_num || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="4">青年数（人）</el-col>
              <el-col class="col-name" :span="5">14-28周岁</el-col>
              <el-col :title="dialogData.lt28_youth_num" class="col-name el" :span="5">{{dialogData.lt28_youth_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="5">29-35周岁</el-col>
              <el-col :title="dialogData.gt28_youth_num" class="col-name el" :span="5">{{dialogData.gt28_youth_num || "暂无"}}</el-col>
            </el-row>
            <el-row  class="flex-row">
              <el-col class="col-name" :span="4">发展团员数</el-col>
              <el-col :title="dialogData.developed_member_num" class="col-name el" :span="4">{{dialogData.developed_member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">28周岁以下青年入党人数</el-col>
              <el-col :title="dialogData.lt28_party_member_num" class="col-name el" :span="4">{{dialogData.lt28_party_member_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">保留团籍的党员数</el-col>
              <el-col :title="dialogData.own_youth_party_member_num" class="col-name el" :span="4">{{dialogData.own_youth_party_member_num || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="6" style="text-align:center;">团委核定编制人数（人）</el-col>
              <el-col class="col-name" :span="6" style="text-align:center;">实际配备人数（人）</el-col>
              <el-col class="col-name" :span="12" style="text-align:center;">工作经费（元）</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="2">书 记</el-col>
              <el-col class="col-name" :span="2">副书记</el-col>
              <el-col class="col-name" :span="2">一般人员</el-col>
              <el-col class="col-name" :span="2">书 记</el-col>
              <el-col class="col-name" :span="2">副书记</el-col>
              <el-col class="col-name" :span="2">一般人员</el-col>
              <el-col class="col-name" :span="3">所在单位拨款</el-col>
              <el-col class="col-name" :span="3">团费</el-col>
              <el-col class="col-name" :span="3">自筹</el-col>
              <el-col class="col-name" :span="3">合计</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="2">{{dialogData.approved_secretray_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="2">{{dialogData.approved_secondary_secretray_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="2">{{dialogData.approved_general_staff_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="2">{{dialogData.secretray_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="2">{{dialogData.secondary_secretray_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="2">{{dialogData.general_staff_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">{{dialogData.unit_grant || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">{{dialogData.group_fee || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">{{dialogData.self_raising || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">{{dialogData.total_fee}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="12" style="text-align:center;">团委是否独立设置</el-col>
              <el-col class="col-name" :span="12" style="text-align:center;">阵地建设情况</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4">独立设置</el-col>
              <el-col class="col-name" :span="8">与何部门合署</el-col>
              <el-col class="col-name" :span="6">是否建有独立活动室（面积）</el-col>
              <el-col class="col-name" :span="6">是否建立独立网站或网页（网址）</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="4">{{dialogData.independent || "暂无"}}</el-col>
              <el-col class="col-name" :span="8">{{dialogData.with_other_depart || "暂无"}}</el-col>
              <el-col class="col-name" :span="6">{{dialogData.activity_room_area || "暂无"}}</el-col>
              <el-col class="col-name" :span="6">{{dialogData.web_url || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center;">
                团干部配备的基本情况（含书记、副书记、团委工作人员）
              </el-col>
            </el-row>

            <el-table
              :data="dialogData.member_list"
              border
              style="width: 100%;border-color:#ddd;">
              <el-table-column
                prop="post"
                label="职务"
                width="180">
              </el-table-column>
              <el-table-column
                prop="realname"
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
                prop="working_time"
                label="任职时间">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历">
              </el-table-column>
              <el-table-column
                prop="part_time"
                label="是否兼职团干部">
              </el-table-column>
              <el-table-column
                prop="tel"
                label="联系电话">
              </el-table-column>
            </el-table>
          </div>  
        </div> -->
        <div class="dialog_info">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="团组织名称" prop="name">
                                        <span class="sblock" :title="dialogData.name">{{dialogData.name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="所在单位">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="所属社区">
                                        <span class="sblock" :title="dialogData.community_name">{{dialogData.community_name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="团组织建立时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期(年)">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="团组织书记">
                                        <span class="sblock" :title="dialogData.secretary">{{dialogData.secretary || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="联系电话">
                                        <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">团组织书记照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="地址">
                                <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="团员总数">
                                <span class="sblock" :title="dialogData.member_num">{{dialogData.member_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="保留团籍的党员数">
                                <span class="sblock" :title="dialogData.own_youth_party_member_num">{{dialogData.own_youth_party_member_num || ""}}</span>
                            </el-form-item>
                        </el-col>
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
            datacenter.org_youth_list(this.params).then( res => {
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
            datacenter.youth_detail({id: id}).then( res => {
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
                this.$router.push({path: 'groupOrg_edit',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'groupOrg_edit',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({path: 'groupOrg_edit',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.group_del({id: row.id}).then( res => {
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
/* .el-row.upload-row { position: relative; }
.avatar-uploader { height: 190px; line-height: 190px; text-align: center; cursor: pointer; }
.upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; }
.upload-div { position: absolute; right: 0; } */
.avatar-uploader { height: 244px; line-height: 200px; }

.dialog_info .el-row .el-col { border-right:0;}
.dialog_info .el-row .upload-div { border-right:1px solid #ddd;}

.col-name { border-right:#ddd 1px solid;}
</style>