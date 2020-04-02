<template>
    <div class="main-content flex-1 flex-row">
        <div class="org-tree scrollbar">
            <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input"></el-input>
            <el-tree :data="data" :props="defaultProps" @node-click="treeClick" :filter-node-method="filterNode" ref="tree" class="comTreeGray" node-key="id" :default-expanded-keys="expandData"></el-tree>
        </div>

        <div class="flex-1 flex-col">
            <ul class="dcTab fix">
                <li :class="{'active':$route.name == '党员信息'}" @click="$router.push({name:'党员信息',params:{org_id:params.org_id}})">党员信息维护</li>
                <li :class="{'active':$route.name == '历史党员管理'}" @click="$router.push({name:'历史党员管理',params:{org_id:params.org_id}})">历史党员管理</li>
            </ul>
            <div class="data-center scrollbar flex-1" v-loading="loading">

                <template v-if="$route.path.split('/').length>3">
                    <router-view />
                </template>
                <template v-else>
                    <header class="toolbar">
                        <div class="left">
                            <el-input v-model="params.keyword" placeholder="请输入党员名称"></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                        </div>
                        <el-row type="flex" class="search-input">
                            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加党员</el-button>
                            <exportData eType="member" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1"/>
                            <ExportOutData expType="member" :keyword="params.keyword" :org_id="params.org_id" v-if="$root.datacenter_op_auth.check == 1" />
                        </el-row>
                    </header>
                    <div class="shadow-table">
                        <el-table :data="tableData.data" stripe>
                            <el-table-column class-name="table-name" prop="name" label="姓名" min-width="150px" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="checkDetail(scope.row.uid)" type="text">{{scope.row.realname}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sex" label="性别" min-width="80px" align="center">
                                <template slot-scope="scope">{{scope.row.sex || '--'}}</template>
                            </el-table-column>
                            <el-table-column prop="nation" label="民族" min-width="100px" show-overflow-tooltip>
                                <template slot-scope="scope">{{scope.row.nation || '--'}}</template>
                            </el-table-column>
                            <el-table-column prop="birth" label="出生日期" min-width="100px" show-overflow-tooltip>
                                <template slot-scope="scope">{{scope.row.birth || '--'}}</template>
                            </el-table-column>
                            <el-table-column prop="join_time" label="入党日期" min-width="110px" show-overflow-tooltip>
                                <template slot-scope="scope">{{scope.row.join_time || '--'}}</template>
                            </el-table-column>
                            <el-table-column class-name="org-hide" prop="cellphone" label="联系电话" min-width="120px" show-overflow-tooltip>
                                <template slot-scope="scope">{{scope.row.cellphone || '--'}}</template>
                            </el-table-column>
                            <!-- <el-table-column prop="politics" label="政治面貌" width="120px"></el-table-column> -->
                            <!-- <el-table-column class-name="hide-work" prop="work_post" label="工作岗位名称" min-width="110px" show-overflow-tooltip></el-table-column> -->
                            <el-table-column class-name="table-name" label="操作" align="center" width="210px">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                                    <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                                    <el-button size="mini" @click="delDialogVisible = !delDialogVisible; delForm.id = scope.row.uid" v-if="$root.datacenter_op_auth.del == 1">删除</el-button>
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

                    <el-dialog class="comDialog" title="删除党员" :append-to-body="true" :visible="delDialogVisible" width="630px" @close="delDialogClose()">
                        <el-form :model="delForm" :rules="delRules" ref="delForm" label-width="130px">
                            <el-form-item label="删除原因" prop="del_reason" class="del_reason">
                                <el-radio-group v-model="delForm.del_reason">
                                    <el-radio :label="e.id" v-for="(e,i) in del_reason" :key="i">{{e.value}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="离开党组织日期" prop="del_time">
                                <el-date-picker v-model="delForm.del_time" align="right" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="del_timeOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="备注" prop="del_remark">
                                <el-input type="textarea" placeholder="" v-model="delForm.del_remark" maxlength="50" :rows="4" show-word-limit></el-input>
                            </el-form-item>
                        </el-form>

                        <div class="buttons tc">
                            <el-button type="primary" @click="del('delForm')"><i class="ion">&#xe645;</i> 确定</el-button>
                            <el-button @click="delDialogClose()"><i class="ion">&#xe6ff;</i> 取消</el-button>
                        </div>
                    </el-dialog>
                </template>


            </div>
        </div>
    </div>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
import * as account from '@/api/account.js'
import datadialog from './dialog.vue'
import * as componentsRepository from "@/components/datacenter/componentsMap.js";
import exportData from "@/components/datacenter/widgets/ExportData";
import * as util from "@/assets/util";

export default {
    data() {
        return {
            loading: false,
            tabs: [],
            currentTab: {},
            detailId: '',
            params: {
                p:  this.$route.params.p || 1,
                pagesize: 8,
                keyword: this.$route.params.keyword || '',
                org_id:  this.$route.params.org_id || ''
            },
            dialogVisible:false,
            tableData: {},
            input: '',
            data: [],
            expandData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dialogData: {
                org_id: ''
            },
            //删除党员
            delDialogVisible:false,
            del_reason:[],
            del_timeOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            delForm:{
                id:'',
                del_reason:'',
                del_time:'',
                del_remark:''
            },
            delRules:{
                del_reason: [
                    { required: true, message: '请选择删除原因', trigger: 'blur' }
                ],
                del_time: [
                    { required: true, message: '请选择离开党组织日期', trigger: 'blur' }
                ],
            }
        }
    },
    components: {datadialog,exportData},
    watch: {
        input(val) {
            this.$refs.tree.filter(val);
        },
        $route(to,from){
            if(to.name == '党员信息'){
                this.getData()
            }
        }
    },
    methods: {
        filterNode(value, data) {
            if(!value) return true
            return data.label.indexOf(value) !== -1;
        },
        treeClick(data) {
            this.params.p = 1
            //console.log(this.params.p);
            
            if(data.id){
                this.params.org_id = data.id;
                this.$route.params.org_id = data.id;
                util.emit('member_info_org_id',data.id);
                this.$nextTick(()=>{
                    this.getData()
                })
            }
            
        },
        getorg() {
            datacenter.org().then(res => {
                let data = res.data.data;
                this.data = data;
                this.$nextTick(()=>{
                    this.expandData = [];
                    if(data){
                        for (let i = 0; i < data.length; i++) {
                            const e = data[i];
                            this.expandData.push(e.id)
                        }
                    }
                })
            })
        },
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
            datacenter.person(this.params).then( res => {
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
            //console.log(id);
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
        del(formName) {
            //console.log(this.delForm);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    datacenter.member_del(this.delForm).then( res => {
                        if(res.data.status == '200') {
                            this.delDialogClose()
                            this.getData()
                            this.$message({ message: res.data.statusCode, type: 'success' });
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        delDialogClose(){
            this.delDialogVisible = false;
            this.resetForm('delForm');
            this.delForm = {
                id:'',
                del_reason:'',
                del_time:'',
                del_remark:''
            }
        },
        importReload() {
            this.getorg()
            this.getData()
        }
    },
    created() {
        this.getorg()
        if(this.$route.name=='党员信息'){
            this.getData()
        }
        this.getTabs()
        this.getDictData()
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

.del_reason >>> .el-form-item__content { line-height:0;}
.del_reason .el-radio-group .el-radio { display:inline-block; padding-top:0px; padding-bottom:5px; margin-top:13px;}

.buttons { border-top:#dce2e7 1px solid; margin-left:-20px; margin-right:-20px; padding-top:15px; margin-bottom:-15px;}

.dialog_info .el-row .el-col { border-right:0;}
.dialog_info .el-row .upload-div { border-right:1px solid #ddd;}

/* .dialog_info .el-form .el-form-item__label { background-color:#f9f9f9;}
.dialog_info .dialog-table .col-name.el-form-item { background-color:transparent!important;} */
.col-name { border-right:#ddd 1px solid;}
</style>