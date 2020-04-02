<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入单位名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加妇联</el-button>
            <exportData eType="women" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="women" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="company" label="单位名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.company}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addr" label="单位地址" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.addr || '--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.tel || '--'}}</template>
        </el-table-column>
        <el-table-column prop="chairman" label="妇联主席姓名" width="110px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.chairman || '--'}}</template>
        </el-table-column>
        <el-table-column prop="women_num" label="妇女人口数" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.women_num || '0'}}</template>
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
              <el-col class="col-name" :span="3">单位名称</el-col>
              <el-col :title="dialogData.company" class="col-name el" :span="21">{{dialogData.company || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">单位地址</el-col>
              <el-col :title="dialogData.addr" class="col-name el" :span="21">{{dialogData.addr || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="4">妇联建立（换届）时间</el-col>
              <el-col :title="dialogData.change_time" class="col-name el" :span="4">{{dialogData.change_time || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">妇联主席</el-col>
              <el-col :title="dialogData.chairman" class="col-name el" :span="4">{{dialogData.chairman || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">联系电话</el-col>
              <el-col :title="dialogData.tel" class="col-name el" :span="4">{{dialogData.tel || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="4">人口总数</el-col>
              <el-col :title="dialogData.user_num" class="col-name el" :span="2">{{dialogData.user_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">妇女人口数</el-col>
              <el-col :title="dialogData.women_num" class="col-name el" :span="2">{{dialogData.women_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">是否建立党支部</el-col>
              <el-col :title="dialogData.party_branch" class="col-name el" :span="2">{{dialogData.party_branch || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">女党员人数</el-col>
              <el-col :title="dialogData.women_party_num" class="col-name el" :span="2">{{dialogData.women_party_num || "暂无"}}</el-col>
            </el-row>

            <el-table
              :data="dialogData.leader_list"
              border
              style="width: 100%;border-color:#ddd;">
              <el-table-column
                prop="post"
                label="职务">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="姓名">
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
                prop="part_time"
                label="是否兼职">
              </el-table-column>
              <el-table-column
                prop="tel"
                label="联系电话">
              </el-table-column>
            </el-table>

            <el-row style="text-align:center;">
              <el-col :span="24" style="text-align:center;">
                妇联其他工作人员名单              
              </el-col>
            </el-row>
            <el-row class="list" v-if="dialogData.member_list">
              <el-col class="col-name" :span="3" v-for="item in dialogData.member_list" :key="item">{{item}}</el-col>
            </el-row>
            <el-row v-else>
              <el-col class="col-name" :span="24" style="text-align:center;">暂无数据</el-col>
            </el-row>

            <el-row class="flex-row" style="border-top: 1px solid #ddd;">
              <el-col class="col-name" :span="6">妇联编制情况</el-col>
              <el-col class="col-name" :span="3">行政事业编制（人）</el-col>
              <el-col :title="dialogData.temporary_num" class="col-name el" :span="3">{{dialogData.temporary_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">无编聘用（人）</el-col>
              <el-col :title="dialogData.regular_num" class="col-name el" :span="3">{{dialogData.regular_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">其他（人）</el-col>
              <el-col :title="dialogData.other_member_num" class="col-name el" :span="3">{{dialogData.other_member_num || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="6">“两代一委员”情况</el-col>
              <el-col class="col-name" :span="3">女党代表数</el-col>
              <el-col :title="dialogData.party_representative_num" class="col-name el" :span="3">{{dialogData.party_representative_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">女人大代表数</el-col>
              <el-col :title="dialogData.npc_deputy_num" class="col-name el" :span="3">{{dialogData.npc_deputy_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">女政协委员数</el-col>
              <el-col :title="dialogData.cppcc_member_num" class="col-name el" :span="3">{{dialogData.cppcc_member_num || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="6">妇联工作经费</el-col>
              <el-col class="col-name" :span="3">2千元以下</el-col>
              <el-col :title="dialogData.working_expenses1" class="col-name el" :span="3">{{dialogData.working_expenses1 || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">3-5千元</el-col>
              <el-col :title="dialogData.working_expenses2" class="col-name el" :span="3">{{dialogData.working_expenses2 || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">5千元以上</el-col>
              <el-col :title="dialogData.working_expenses3" class="col-name el" :span="3">{{dialogData.working_expenses3 || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="6">妇联活动场地情况</el-col>
              <el-col class="col-name" :span="3">有无活动场所</el-col>
              <el-col :title="dialogData.avtivity_venue" class="col-name el" :span="6">{{dialogData.avtivity_venue || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">活动场地面积</el-col>
              <el-col :title="dialogData.avtivity_area" class="col-name el" :span="6">{{dialogData.avtivity_area || "暂无"}}</el-col>
            </el-row>

            <el-row style="text-align:center;">
              <el-col :span="24" style="text-align:center;">
                各类妇女工作阵地情况              
              </el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="3">有无“妇女之家”</el-col>
              <el-col :title="dialogData.women_house" class="col-name el" :span="3">{{dialogData.women_house || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">有无妇女学校</el-col>
              <el-col :title="dialogData.women_school" class="col-name el" :span="3">{{dialogData.women_school || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">有无妇女就业指导中心</el-col>
              <el-col :title="dialogData.employment_guidance_center" class="col-name el" :span="3">{{dialogData.employment_guidance_center || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">妇女群众性协会数量</el-col>
              <el-col :title="dialogData.mass_group_num" class="col-name el" :span="3">{{dialogData.mass_group_num || "暂无"}}</el-col>
            </el-row>
            <el-row class="flex-row">
              <el-col class="col-name" :span="3">妇女群众性文艺团体数量</el-col>
              <el-col :title="dialogData.art_group_num" class="col-name el" :span="3">{{dialogData.art_group_num || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">有无巾帼志愿者服务队及人数</el-col>
              <el-col :title="dialogData.volunteer_team" class="col-name el" :span="3">{{dialogData.volunteer_team || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">有无妇女儿童公益岗位及数量</el-col>
              <el-col :title="dialogData.public_posts" class="col-name el" :span="3">{{dialogData.public_posts || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">有无妇女维权站</el-col>
              <el-col :title="dialogData.rights_protect_station" class="col-name el" :span="3">{{dialogData.rights_protect_station || "暂无"}}</el-col>
            </el-row>
            <el-row style="text-align:center;">
              <el-col :span="24" style="text-align:center;">
                其他组织             
              </el-col>
            </el-row>
            <el-row class="other-list" v-if="dialogData.other_group_list">
              <el-col class="col-name" :span="12" v-for="item in dialogData.other_group_list" :key="item">{{item}}</el-col>
            </el-row>
          </div>  
        </div> -->
        <div class="dialog_info">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位名称">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位地址">
                                        <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="妇联主席">
                                        <span class="sblock" :title="dialogData.chairman">{{dialogData.chairman || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期(年)">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="妇联建立时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="妇联换届时间">
                                        <span class="sblock" :title="dialogData.change_time">{{dialogData.change_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader no_photo">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">妇联主席照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="地区人口总数">
                                <span class="sblock" :title="dialogData.user_num">{{dialogData.user_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="妇女人口总数">
                                <span class="sblock" :title="dialogData.women_num">{{dialogData.women_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="妇联党员数">
                                <span class="sblock" :title="dialogData.party_num">{{dialogData.party_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="是否建立党组织">
                                <span class="sblock" :title="(dialogData.party_branch=='1'?'是':'否')">{{(dialogData.party_branch=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="联系电话">
                                <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
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
    components: {datadialog, exportData},
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
            datacenter.org_women_list(this.params).then( res => {
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
            datacenter.women_detail({id: id}).then( res => {
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
                this.$router.push({path: 'womenOrg_edit',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'womenOrg_edit',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({path: 'womenOrg_edit',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.women_del({id: row.id}).then( res => {
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
.dialog-info .el-row.list, 
.dialog-info .el-row.other-list{border-right: 1px solid #ddd;}
.dialog-info .el-row.other-list {border-bottom: 1px solid #ddd;}
.dialog-info .el-row.list .el-col,
.dialog-info .el-row.other-list .el-col {border-bottom: 1px solid #ddd;}
.dialog-info .el-row.list .el-col:nth-of-type(8) {border-right: none;}
.dialog-info .el-row.other-list .el-col:nth-of-type(2) {border-right: none;}
.dialog-info .el-row.list .el-col:nth-last-child(1),.dialog-info .el-row.list .el-col:nth-last-child(2),
.dialog-info .el-row.list .el-col:nth-last-child(3),.dialog-info .el-row.list .el-col:nth-last-child(4),
.dialog-info .el-row.list .el-col:nth-last-child(5),.dialog-info .el-row.list .el-col:nth-last-child(6),
.dialog-info .el-row.list .el-col:nth-last-child(7),.dialog-info .el-row.list .el-col:nth-last-child(8),
.dialog-info .el-row.other-list .el-col:nth-last-child(1),.dialog-info .el-row.other-list .el-col:nth-last-child(2){border-bottom: none;}

.dialog_info .el-row .el-col { border-right:0;}
.dialog_info .el-row .upload-div { border-right:1px solid #ddd;}

.col-name { border-right:#ddd 1px solid;}
</style>