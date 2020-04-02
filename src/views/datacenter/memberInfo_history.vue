<template>
    <div>
        <header class="toolbar">
            <div class="filter">
                <el-date-picker v-model="params.del_time" value-format="yyyy" type="year" placeholder="按年份筛选" style="width:140px;"></el-date-picker>
                <el-select v-model="params.del_reason" placeholder="请选择删除原因" style="width:150px;">
                    <el-option value="">请选择</el-option>
                    <el-option v-for="item in del_reason" :key="item.value" :label="item.value" :value="item.id"></el-option>
                </el-select>
                <el-input v-model="params.keyword" placeholder="请输入姓名" style="width:210px;"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </div>
        </header>
        <div class="shadow-table">
            <el-table :data="tableData.data" stripe>
                <el-table-column prop="realname" label="姓名" width="80px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="card" label="身份证号" width="180px" align="center">
                    <template slot-scope="scope">{{scope.row.card || '--'}}</template>
                </el-table-column>
                <el-table-column prop="sex_name" label="性别" width="60px" align="center">
                    <template slot-scope="scope">{{scope.row.sex_name || '--'}}</template>
                </el-table-column>
                <el-table-column prop="org_name" label="原所在党支部" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
                </el-table-column>
                <el-table-column prop="del_time" label="离开党组织日期" align="center" width="120px">
                    <template slot-scope="scope">{{scope.row.del_time || '--'}}</template>
                </el-table-column>
                <el-table-column prop="del_reason" label="删除原因" width="100px" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.del_reason_name || '--'}}</template>
                </el-table-column>
                <el-table-column prop="del_remark" label="备注" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.del_remark || '--'}}</template>
                </el-table-column>
                <el-table-column class-name="table-name" label="操作" width="160px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" class="miniButton" @click="recovery(scope.row)" v-if="$root.datacenter_op_auth.add == 1">恢复</el-button>
                        <el-button size="mini" class="miniButton" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">彻底删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row class="pagination-content" type="flex">
                <span>共{{tableData.totalPages}}页</span>
                <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows" :current-page="Number(params.p)" :page-size="params.pagesize" class="pagination">
                </el-pagination>
            </el-row>
        </div>
        <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog">
            <!-- <div class="dialog-info">
            <div class="left">
                <h3>人员组</h3>
                <div class="content scrollbar">
                <p v-for="tab in tabs" :key="tab.name" :class="{active: currentTab.name === tab.name}" class="el" :title="tab.name"
                    @click="currentTab = tab">
                    {{tab.name}}
                </p>
                </div>
            </div>
            <div class="right scrollbar">
                <component :is="currentTab.component" :personId="detailId">
                </component>
            </div>
            </div> -->
            <div class="dialog_info">
                <div class="dialog-table">
                    <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                        <el-row class="form-row fix">
                            <el-row class="upload-row">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="姓名">
                                            <span class="sblock" :title="dialogData.realname">{{dialogData.realname || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item class="col-name" label="性别">
                                            <span class="sblock" :title="(dialogData.sex=='1'?'女':'男')">{{(dialogData.sex=='1'?'女':'男') || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="所在支部">
                                            <span class="sblock" :title="dialogData.org_name">{{dialogData.org_name || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item class="col-name" label="民族">
                                            <span class="sblock" :title="dialogData.nation_name">{{dialogData.nation_name || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="身份证号">
                                            <span class="sblock" :title="dialogData.card">{{dialogData.card || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item class="col-name" label="出生日期">
                                            <span class="sblock" :title="dialogData.birth">{{dialogData.birth || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4" class="upload-div">
                                        <div class="avatar-uploader">
                                            <img v-if="dialogData.portrait_url" :src="dialogData.portrait_url" class="avatar">
                                        </div>
                                        <!-- <div class="upload-text">党员头像</div> -->
                                    </el-col>
                                </el-row>
                            </el-row>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="籍贯">
                                    <span class="sblock" :title="dialogData.native_place_name">{{dialogData.native_place_name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="入党时间">
                                    <span class="sblock" :title="dialogData.join_time">{{dialogData.join_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="家庭住址">
                                    <span class="sblock" :title="dialogData.address">{{dialogData.address || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="联系电话">
                                    <span class="sblock" :title="dialogData.cellphone">{{dialogData.cellphone || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="专业特长">
                                    <span class="sblock" :title="dialogData.majorthey_name">{{dialogData.majorthey_name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="12">
                                <el-form-item class="col-name" label="是否困难">
                                    <span class="sblock" :title="(dialogData.unnnn=='1'?'是':'否')">{{(dialogData.unnnn=='1'?'是':'否') || ""}}</span>
                                </el-form-item>
                            </el-col> -->
                            <el-col :span="12">
                                <el-form-item class="col-name" label="所在支部党内职务">
                                    <span class="sblock" :title="dialogData.duties_name">{{dialogData.duties_name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="党务工作经验(年)">
                                    <span class="sblock" :title="dialogData.experience">{{dialogData.experience || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="是否为企业高管">
                                    <span class="sblock" :title="(dialogData.high=='1'?'是':'否')">{{(dialogData.high=='1'?'是':'否') || ""}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </datadialog>
    </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
import * as account from '@/api/account.js'
import datadialog from './dialog.vue'
import * as componentsRepository from "@/components/datacenter/componentsMap.js";
import * as util from "@/assets/util";

export default {
    data() {
        return {
            loading: false,
            tabs: [],
            currentTab: {},
            detailId: '',
            params: {
                del_time:'2019',
                del_reason:'',
                p:  this.$route.params.p || 1,
                pagesize: 8,
                keyword: this.$route.params.keyword || '',
                org_id:  this.$route.params.org_id
            },
            dialogVisible:false,
            tableData: {},
            data: [],
            expandData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dialogData: {
                org_id: ''
            },
            del_reason:[]
        }
    },
    components: {datadialog},
    methods: {
        closeDialog(val) {
            this.dialogVisible = val
            this.currentTab = this.tabs[0]
            // this.detailId = ''
        },
        search() {
            this.params.p = 1;
            this.getData()
        },
        getTabs() {
            componentsRepository.map.forEach( item => {
                this.tabs.push({name: item.name, component: item.component})
            })
            this.currentTab = this.tabs[0]
        },
        getData() {
            this.loading = true
            datacenter.mem_list(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        getDictData(){
            //获取删除党员删除原因数据字典
            account.kvp({id:'del_reason'}).then( res => {
                this.del_reason = res.data.data;
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        checkDetail(id) {
            console.log(id);
            // this.detailId = id
            this.dialogData = {}
            this.dialogVisible = true
            datacenter.member_info({id: id}).then( res => {
                this.dialogData = res.data.data
            })
        },
        edit(tag,row) {
            let query = {}
            query = {
                org_id: this.params.org_id,
                keyword: this.params.keyword,
                p:  this.params.p,
            }
            if(tag == 'add') {    // 新增
                this.$router.push({path: 'memberEditIndex',query: query})
            }else if(tag == 'edit') {
                query.id = row.uid
                this.$router.push({path: 'memberEditIndex',query: query})
            }else {
                query.id = row.uid
                query.tag = 'look'
                this.$router.push({path: 'memberEditIndex',query: query})
            }
        },
        recovery(row) {
            this.$confirm("是否恢复党员至正常状态，恢复后该党员将从历史党员列表中恢复至正常党员状态，请在党员信息维护列表中对该人员进行维护操作", "恢复党员", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.mem_recover({id: row.uid}).then( res => {
                    if(res.data.status == '200') {
                        if(res.data.data.type == '0'){
                            this.getData()
                            this.$message({ message: res.data.statusCode, type: 'success' });
                        }else{
                            console.log('type:1,需要弹出选择恢复组织的弹窗');
                        }
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        },
        del(row) {
            this.$confirm("是否彻底删除党员，删除后不能被恢复。", "彻底删除党员", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.mem_del({id: row.uid}).then( res => {
                    if(res.data.status == '200') {
                        this.getData()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        }
    },
    created() {
        this.getData()
        this.getTabs()
        this.getDictData()
        util.on("member_info_org_id",(org_id) =>{
            this.params.org_id = org_id
            this.$nextTick(()=>{
                if(this.$route.name == '历史党员管理'){
                    this.getData();
                }
            })
        });
    }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.dialog-info .left {
  width: 180px;
  background-color: #F3F5FA;
  color: #333;
  margin-right: 10px;
  flex-shrink: 0;
}
.dialog_info .avatar-uploader { line-height: 182px; }
.filter > div { margin-right:10px;}
.filter > .el-button { margin-left:0!important;}
.miniButton { width:60px; padding-left:0; padding-right:0;}

.dialog_info .el-row .el-col { border-right:0;}
.dialog_info .el-row .upload-div { border-right:1px solid #ddd;}
</style>