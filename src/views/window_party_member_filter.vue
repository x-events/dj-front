<template>
    <el-container class="digistBlock">
        <el-header height="250px" class="flex-col">
            <div class="block_wrap_opc flex-1 flex-col">
                <div class="channelBar">
                    <div class="_title"><i class="ion">&#xe62b;</i><strong>筛选条件</strong></div>
                    <div class="_ext">共 {{tableData.totalRows}} 个结果</div>
                </div>
                <div class="flex-col flex-1">
                    <el-form :model="queryParam" ref="ruleForm">
                        <el-row :gutter="40">
                            <el-col :span="6">
                                <el-form-item label="党组织" label-width="80px" prop="currentOrg" class="window_form">
                                    <el-cascader :options="orgData" :change-on-select="true" :show-all-levels="false" :props="{value: 'id',label:'name',children:'children',checkStrictly: true}" v-model="currentOrg" popper-class="window_form"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="党员性别" label-width="80px" prop="sex" class="window_form">
                                    <el-select v-model="queryParam.sex" placeholder="全部" popper-class="window_form">
                                        <el-option v-for="e in sex" :key="e.value" :label="e.label" :value="e.value" :disabled="e.disabled"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="党员民族" label-width="80px" prop="nation" class="window_form">
                                    <el-select v-model="queryParam.nation" placeholder="全部" multiple collapse-tags filterable popper-class="window_form">
                                        <el-option v-for="e in nation" :key="e.id" :label="e.value" :value="e.id" :disabled="e.disabled"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="党员党龄" label-width="80px" class="window_form window_input">
                                    <div class="flex-1">
                                        <el-input placeholder="起始党龄" v-model="queryParam.standing_start" type="number" @change="check_standing('standing_start')"></el-input>
                                    </div>
                                    <div class="split">-</div>
                                    <div class="flex-1">
                                        <el-input placeholder="结束党龄" v-model="queryParam.standing_end" type="number" @change="check_standing('standing_end')"></el-input>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="最高学历" label-width="80px" prop="education" class="window_form">
                                    <el-select v-model="queryParam.education" placeholder="全部" multiple collapse-tags popper-class="window_form">
                                        <el-option v-for="e in education" :key="e.id" :label="e.value" :value="e.id" :disabled="e.disabled"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="发展状态" label-width="80px" prop="develop_status" class="window_form">
                                    <el-select v-model="queryParam.develop_status" placeholder="全部" multiple collapse-tags popper-class="window_form">
                                        <el-option v-for="e in develop_status" :key="e.value" :label="e.label" :value="e.value" :disabled="e.disabled"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="流动党员" label-width="80px" prop="floating" class="window_form">
                                    <el-select v-model="queryParam.floating" placeholder="全部" popper-class="window_form">
                                        <el-option v-for="e in floating" :key="e.value" :label="e.label" :value="e.value" :disabled="e.disabled"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="党员年龄" label-width="80px" class="window_form window_input">
                                    <div class="flex-1">
                                        <el-input placeholder="起始年龄" v-model="queryParam.age_start" type="number" @change="check_age('age_start')"></el-input>
                                    </div>
                                    <div class="split">-</div>
                                    <div class="flex-1">
                                        <el-input placeholder="结束年龄" v-model="queryParam.age_end" type="number" @change="check_age('age_end')"></el-input>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <div class="btns tc">
                                    <el-button size="mini" round @click="resetForm('ruleForm')">重置</el-button>
                                    <el-button size="mini" type="primary" round @click="getData(true)">确认</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </el-header>
        <el-main class="table-div flex-1 flex-row">
            <div class="table-left t_blue flex-1 flex-col block_wrap_opc" style="margin-right:6px">
                <div class="channelBar">
                    <div class="_title"><i class="ion">&#xe625;</i><strong>党员列表</strong></div>
                    <!-- <div class="_ext" @click="manualToggle"><i class="ion">&#xe62a;</i></div> -->
                </div>
                <div class="flex-1 flex-col">
                    <el-table :data="tableData.data" height="100%" stripe v-loading="loading">
                        <el-table-column prop="realname" label="姓名" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sex" label="性别" width="120" align="center">
                            <template slot-scope="scope">
                                <template v-if="scope.row.sex == '0'">男</template>
                                <template v-if="scope.row.sex == '1'">女</template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="nation_name" label="民族" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cellphone" label="联系电话" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button class="colorBtn" @click.native.prevent="showDetail(scope.row)" round>查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-div fix" v-if="Number(tableData.totalRows) > 0">
                        <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(tableData.totalRows)"></el-pagination>
                        <span class="pageNum">共 {{ tableData.totalPages }} 页</span>
                    </div>
                </div>
            </div>
        </el-main>


        <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog" :title="'党员信息'" class="memberBox">
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
                                        <div class="upload-text">党员头像</div>
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
                                    <span class="sblock" :title="dialogData.cellphone ">{{dialogData.cellphone  || ""}}</span>
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


    </el-container>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";
import * as common from "@/api/common";
import datadialog from '@/views/datacenter/dialog.vue'

export default {
    components: {datadialog},
    data() {
        return {
            loading:false,
            animate:false,

            orgData:[],
            currentOrg:[],
            sex:[
                {
                    value:0,
                    label:'男'
                },
                {
                    value:1,
                    label:'女'
                }
            ],
            nation:[],
            education:[],
            develop_status:[
                {
                    value:1,
                    label:'党员'
                },
                {
                    value:2,
                    label:'预备党员'
                },
                {
                    value:3,
                    label:'积极分子'
                },
                {
                    value:4,
                    label:'发展对象'
                }
            ],
            floating:[
                {
                    value:0,
                    label:'否'
                },
                {
                    value:1,
                    label:'是'
                }
            ],

            dialogVisible:false,
            dialogData:{},

            queryParam:{
                org_id:"",
                p:1,
                pagesize:10,
                sex:"",
                nation:[],
                education:[],
                develop_status:[],
                floating:"",
                age_start:"",
                age_end:"",
                standing_start:"",
                standing_end:""
            },
            tableData:{
                data:[],
                totalRows:0,
                totalPages:0
            }
        };
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        },
        currentOrg(new_val) {
            if (Array.isArray(this.currentOrg)) {
                let currentOrg = util.deepcopy(this.currentOrg);
                this.queryParam.org_id = currentOrg.pop();
            }
        }
    },
    methods: {
        check_standing(type){
            if(this.queryParam.standing_start && this.queryParam.standing_end){
                if(Number(this.queryParam.standing_start) > Number(this.queryParam.standing_end)){
                    switch (type) {
                        case 'standing_start':
                            this.queryParam.standing_start = ''
                            break;
                        case 'standing_end':
                            this.queryParam.standing_end = ''
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        check_age(type){
            if(this.queryParam.age_start && this.queryParam.age_end){
                if(Number(this.queryParam.age_start) > Number(this.queryParam.age_end)){
                    switch (type) {
                        case 'age_start':
                            this.queryParam.age_start = ''
                            break;
                        case 'age_end':
                            this.queryParam.age_end = ''
                            break;
                        default:
                            break;
                    }
                }
            }
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.currentOrg = [];
            this.queryParam.standing_start = ''
            this.queryParam.standing_end = ''
            this.queryParam.age_start = ''
            this.queryParam.age_end = ''

            this.$nextTick(()=>{
                this.getData(true)
            })
        },
        closeDialog(val) {
            this.dialogVisible = val
            //this.currentTab = this.tabs[0]
            // this.detailId = ''
        },
        showDetail(e){
            //console.log(e);
            this.dialogData = {}
            this.dialogVisible = true;
            home.member_info({id: e.uid}).then( res => {
                let data = res.data.data;
                this.dialogData = data;
            })
        },
        pageChange(p){
            this.queryParam.p = p
            this.getData();
        },
        getSelect(){
            common.getRoleTree().then(res => {
                this.loading = false;
                let data = res.data.data;
                this.orgData = data;
                //console.log(this.orgData);
            })
            //民族
            common.getDictData_tree({id:4}).then(res => {
                this.nation = res.data.data;
            })
            //学历
            common.getDictData_tree({id:11}).then(res => {
                this.education = res.data.data;
            })
        },
        getData(init){
            if(init){
                this.queryParam.p = 1
            }
            this.loading = true;
            home.partymem_list(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data;
                this.tableData = data.data.member;
                this.currentOrg = data.data.sel_id || [];
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData();
        this.getSelect();
        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        }); 
    }
};
</script>

<style scoped>
.el-header { margin-bottom: 15px; padding-left:0; padding-right:0;}
.block,.block::after { background:url(../assets/img/window_blocl_bg.png) no-repeat;}
.block { height:102px; width: 240px; position:relative; }
.block::after { content:''; display:block; width:23px; height:75px; background-position:right -11px; position:absolute; right:0; top:11px;}
.channelBar { margin-bottom: 15px; cursor: default; background:linear-gradient(to right, rgba(13,58,105,1) 0%,rgba(13,58,105,0.4) 100%); }
.table-div { padding: 0; }
.table-div .el-button { line-height: 10px; }
.table-left { margin-right:15px;}
.page-div { margin-top: 5px; padding-right: 15px; line-height: 40px; }
.page-div > span, .page-div .el-pagination { float: right; } 
.page-div > span { color: #fff; margin-right: 5px; }

.min-height { min-height:698px;}
.table-div /deep/ .col_g:not(.is-leaf) { color: #72fd30; }
.table-div /deep/ .col_y:not(.is-leaf) { color: #efde34; }
.table-div /deep/ .col_r:not(.is-leaf) { color: #fc722d; }

.el-form { margin:20px 5% 0;}
.el-cascader,.el-select { width:100%;}
.window_input >>> .el-form-item__content { display:flex; overflow:hidden;}
.window_input >>> .el-input__inner { padding-right:0;}
.split { width:20px; position:relative; text-align:center; font-size:0;}
.split::after { content:''; display:block; width:60%; height:1px; overflow:hidden; background-color:#01e3f4; position:absolute; left:20%; top:50%;}
.el-form-item { margin-bottom:12px;}

.btns .el-button { padding-left:25px; padding-right:25px;}

.dialog_info .el-form { margin:0;}
._ext { color:#00ecfc;}
</style>

<style>
.memberBox .col-name { height:58px; line-height:40px;}
.memberBox .col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}
.memberBox .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.memberBox .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height:180px; text-align: center; cursor: pointer; position: relative; font-size:0;}
.memberBox .dialog_info .avatar-uploader.no_photo { cursor: default; }
.memberBox .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.memberBox .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
/* .memberBox .data-edit .upload-div, */
.memberBox .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
/* .memberBox .data-edit .avatar-uploader .el-upload__tip, */
.memberBox .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.memberBox .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.memberBox .upload-div img { vertical-align: middle; max-height: 100%!important; }
.memberBox .upload-div .look { cursor: default; }
.memberBox .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.memberBox .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.memberBox .dialog_info .el-form .el-form-item { margin: 0; height: 60px; overflow: hidden; }
.memberBox .dialog_info .el-form .el-form-item__label,
.memberBox .dialog_info .el-form .el-form-item__content { line-height: 60px; }
.memberBox .dialog_info .el-form .el-form-item__content{ padding: 0 16px; }
.memberBox .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.memberBox .dialog_info .el-form .el-input input,
.memberBox .dialog_info .el-form .el-select input,
.memberBox .dialog_info .el-form .el-textarea textarea,
.memberBox .el-form .map-content {height: 400px;}
.memberBox .el-form .map-content .el-form-item,
.memberBox .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.memberBox .el-form .map-content .el-form-item__content { padding: 0; }
.memberBox .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.memberBox .dialog_info .secretary .el-form-item, 
.memberBox .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.memberBox .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.memberBox .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.memberBox .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
.memberBox .dialog_info .col-table .el-col { border-left: 0; }
.memberBox .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.memberBox .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.memberBox .dialog_info { max-height: 60vh; overflow: auto;}
</style>