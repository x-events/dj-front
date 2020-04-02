<template>
    <div class="data-edit right-form flex-col h100" v-if="formData" :class="{'editStatus':!disabledTag}">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
            </div>
        </div>
        <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
            <el-row class="form-row fix" v-loading="loading">
                <el-col :span="24">
                    <el-form-item class="col-name" label="队伍名称" prop="work_name">
                        <el-input v-model="formData.work_name" placeholder="请输入队伍名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.work_name" v-else>{{formData.work_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="隶属党组织">
                        <el-input v-model="formData.org_name" readonly placeholder="请选择党组织" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="muit-org">
                    <org-input-ids labelname="参与党组织" :labelwidth="190" :disabled="disabledTag" :propvalue="formData.org_list" @change="chooseOrgs" />
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="成立时间">
                        <el-date-picker type="date" placeholder="请选择成立时间" value-format="yyyy-MM-dd" v-model="formData.end_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.end_time" v-else>{{formData.end_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="服务范围" prop="company">
                        <el-input v-model="formData.content" placeholder="请输入服务范围" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.content" v-else>{{formData.content || ""}}</span>
                    </el-form-item>
                </el-col>
                <div class="detail-subtext">负责人信息</div>
                <el-col :span="24">
                    <div class="member-picker">
                        <el-button slot="suffix" size="mini" :disabled="disabledTag" @click="mpickerDialog=true">党员库选择</el-button>
                        <el-button slot="suffix" size="mini" :disabled="disabledTag" @click="handleDialog = true;formData2 = {}">手动添加</el-button>
                    </div>
                </el-col>
                <div class="shadow-table">
                    <el-table :data="formData.team_leader" style="width: 100%;">
                        <el-table-column prop="leader_name" label="姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="leader_sex" label="性别" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.leader_sex == '1'?'女':(scope.row.leader_sex == '0'?'男':'--') }}</template>
                        </el-table-column>
                        <el-table-column prop="leader_birth" label="出生年月" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.leader_birth || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="leader_is_party" label="是否党员" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.leader_is_party == '1'?'是':(scope.row.leader_is_party == '0'?'否':'--') || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="member_source_name" label="添加方式" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.member_source_name || '--'}}</template>
                        </el-table-column>
                        <el-table-column class-name="table-name" label="操作" align="center" width="80px">
                            <template slot-scope="scope">
                                <el-button size="mini" :disabled="disabledTag" @click="del(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>
        </el-form>
        <!-- 党组织 -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
        <!-- 选党员 -->
        <member-picker :visible="mpickerDialog" :radio="true" @close="mpickerDialog=false" @choosen="memberChoosen" />
        <!-- 新增修改党员信息 -->
        <datadialog title="党员信息" :dialogVisible="handleDialog" @dialogData="closeDialog">
            <el-form class="flex-1 scrollbar" :model="formData2" :rules="formRule2" ref="formForm2" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row fix" v-loading="loading">
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党员姓名" prop="leader_name">
                            <el-input v-model="formData2.leader_name" placeholder="请输入姓名" maxlength="10"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="性别">
                            <el-select v-model="formData2.leader_sex" placeholder="请选择性别" style="width:100%;">
                                <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in sexData"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="出生年月">
                            <el-date-picker type="date" placeholder="请选择" value-format="yyyy-MM-dd" v-model="formData2.leader_birth" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="是否党员">
                            <el-select v-model="formData2.leader_is_party" placeholder="请选择" style="width:100%;">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="change-submit">
                <el-button type="primary" @click="handleDialog = false">取消</el-button>
                <el-button type="primary" @click="handleAdd(formData2)">确认</el-button>
            </div>
        </datadialog>
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import datadialog from './dialog.vue'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import selectOpt from '@/components/datacenter/common/selectOpt'
import * as componentsMap from '@/components/work/widgets/componentsMap.js'
export default {
    beforeRouteLeave (to, from, next) {
        if(this.disabledTag == false && this.isSave == null) {
            if(!this.confirmShow){
                this.confirmShow = true
                let sessionUid = sessionStorage.getItem('add_team_uid') || ''
                if(!this.$route.query.id && !sessionUid && this.isBack == null && this.$root.dcTeamMenu == '1') {
                    this.$alert('请先保存基本信息！', '提示', {
                    confirmButtonText: '确定', type: 'warning',
                        callback: action => {
                            this.confirmShow = false
                            history.pushState(null, null, document.URL);
                            this.$root.dcTeamMenu = null
                            next(false)
                        }
                    });
                }else {
                    this.$confirm('当前页面数据未保存，确定要离开？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                        next()
                    }).catch(() => {
                        this.isBack = null
                        this.confirmShow = false
                        history.pushState(null, null, document.URL);
                        next(false)
                    });
                }
            }else{
                next()
            }
        }else {
            next()
        }
    },
    components: {
        selectOpt,
        orgPicker,
        datadialog,
        'org-input-ids': componentsMap.widget_input_organization_ids_input,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve),
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            isBack: null,
            disabledTag: false,
            pickerDialog: false,            // 党组织弹窗
            pickerDialog: false,            // 党组织弹窗
            mpickerDialog: false,           // 党员库弹窗
            handleDialog: false,            // 党员手动添加
            formData: {
                work_name: '', 
                org_id: '',
                org_name: '',
                member_ids: '',
                end_time: '',
                content: '',
                team_leader: []
            },
            formRule: {
                work_name: [ { required: true, message:'请选择队伍名称!', trigger: 'blur' }],
            },
            formData2: {
                leader_name: '', 
                leader_sex: '',
                leader_birth: '',
                leader_is_party: '',
                member_source_name:''
            },
            formRule2: {
                leader_name: [ { required: true, message:'请输入党员姓名！', trigger: 'blur' } ],
            },
            sexData: [
                {
                    id: '0',
                    value: '男'
                },{
                    id: '1',
                    value: '女'
                }
            ],
            centerPoint: this.$root.mapcenter,
            communityData: [],
            regTypeData: [],        // 登记类型
            btnTag: 0,          // 0添加 1编辑  2取消、保存
        }
    },
    watch: {
        personId: function () {
            this.getData()
        }
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        back() {
            this.isBack = true
            this.$router.push({name: '特色队伍', params: this.$route.query})
        },
        closeDialog(val) {
            this.handleDialog = val
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.uid = this.$route.query.id
                    }else {
                        let sessionUid = sessionStorage.getItem('add_team_uid') || ''
                        this.formData.uid = sessionUid
                    }
                    datacenter.team_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.btnTag = 1;
                            // this.disabledTag = true
                            if(!this.$route.query.id) {
                                sessionStorage.setItem('add_team_uid', res.data.data.id)
                            }
                            this.getData();
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    if(vinfo.work_name) {
                        this.$message({ message: vinfo.work_name[0].message, type: 'error' });
                    }
                    return false;
                }
            });
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            if(!obj) {
                this.formData.org_name = ''
                this.formData.org_id = ''
                return 
            }
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        },
        // 党组织库 多选
        chooseOrgs(arr) {
            // console.log('chooseOrg',arr);
            let idsArr = []
            arr.map(org=> {
                if(+org.id != 0) {
                    idsArr.push(org.id)
                }else {
                    idsArr.push(org.name)
                }
            })
            this.formData.organization_id = idsArr.join(',')
        },  
        // 党员库选择之后
        memberChoosen(obj) {
            // console.log('member',obj);
            this.$set(this.formData,'team_leader',[{
                uid: obj.uid,
                leader_name: obj.name,
                leader_sex: obj.sex,
                leader_birth: obj.birth,
                leader_is_party: 1,
                member_source_name: '党员库',
            }])
        },
        handleAdd(data) {
            this.$refs['formForm2'].validate((valid, vinfo) => {
                if (valid) {
                    this.$set(this.formData,'team_leader',[{
                        uid: 0,
                        leader_name: data.leader_name,
                        leader_sex: data.leader_sex,
                        leader_birth: data.leader_birth,
                        leader_is_party: data.leader_is_party,
                        member_source_name: '手动添加',
                    }])
                    this.handleDialog = false;
                }else{
                    if(vinfo.leader_name) {
                        this.$message({ message: vinfo.leader_name[0].message, type: 'error' });
                    }
                    return false;
                }
            })
        },
        del(row) {
            this.formData.team_leader.splice(this.formData.team_leader.indexOf(row), 1);
        },
        // 点击编辑按钮
        editOpt() {
            this.btnTag = 2;
            this.isSave = null;
            // this.disabledTag = false
            this.getData();
        },
        // 点击取消按钮
        cancelOpt() {
            this.btnTag = 1;
            this.disabledTag = true
            this.getData();
        },
        getData() {
            let sessionUid = sessionStorage.getItem('add_team_uid') || ''
            let uid = ''
            if(this.$route.query.id) {
                uid = this.$route.query.id
            }else {
                uid = sessionUid
                if(uid == '') {
                    return
                }
            }
            if(this.btnTag == 1 || this.btnTag == 0) {
                this.btnTag = 1;
                this.disabledTag = true
            }else {
                this.btnTag = 2;
                this.disabledTag = false
            }
            this.loading = true
            datacenter['team_info']({id: uid}).then( res => {
                this.loading = false
                this.formData = res.data.data
                // this.formData.member_ids
                this.formData.team_leader = this.formData.team_leader==''?[]:this.formData.team_leader;
                return
                this.set0Val(['community_id','registration_type'])
            }) 
        },
        // 清空为0的数据
        set0Val(fieldArr) {
            for (const key in fieldArr) {
                this.formData[fieldArr[key]] = this.formData[fieldArr[key]] == '0'?'':this.formData[fieldArr[key]];
            }
        }
    },
    created() {
        // this.getData();
        // return
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
        }
        this.getData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
}
</script>

<style scoped>
 /* .right-content .dialog-info .dialog-table {width: 100%;border-left: 1px solid #ddd;}
 .right-content .dialog-info .dialog-table img {cursor: pointer;}
.dialog-table { width: 100%; border-top: 1px solid #ddd; border-left: 1px solid #ddd; }
.dialog-table .col-name { padding: 8px; } */
.muit-org .el-form-item,
.muit-org .el-form-item /deep/ .el-form-item__label { height: 126px !important; line-height: 126px; }
.muit-org /deep/ .el-form-item__content { line-height: 40px !important; }
.muit-org /deep/ .heightLayout { border: 0; }
.shadow-table .el-table { border-left: 0; border-top: 0; border-radius: 0; } 
.member-picker { text-align: right; line-height: 50px; padding-right: 10px; }
.change-submit { text-align: center; }
</style>
