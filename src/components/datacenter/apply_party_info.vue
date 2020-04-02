<template>
  <!-- <div v-loading="loading">
    <div class="dialog-table scroll">
      <el-row class="right-content" v-if="detail">
        <el-col class="content" span="12" v-for="(item, key) in detail" :key="key">
          <el-row>
            <el-col :title="key" class="col-name el" :span="10">{{key}}</el-col>
            <el-col :title="item"  class="col-name el" :span="14">{{item || "暂无"}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      
      <el-table :data="tableData"  stripe>
        <el-table-column prop="申请入党时间" label="申请入党时间">
        </el-table-column>
        <el-table-column prop="接受入党申请的党支部名称" label="接受入党申请的党支部名称" >
        </el-table-column>
        <el-table-column prop="具备入党条件成熟程度" label="具备入党条件成熟程度">
        </el-table-column>
        <el-table-column class-name="table-name" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="checkDetail(scope.$index)" type="text" size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>  
  </div> -->  
    <div class="data-edit right-form flex-col h100" :class="{'editStatus':!disabledTag}">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
            </div>
        </div>
        <el-form class="flex-1 scrollbar" :model="formData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
            <el-row class="form-row" v-loading="loading">
                <el-col :span="12">
                    <el-form-item class="col-name" label="申请入党时间" prop="apply_time">
                        <el-date-picker type="date" placeholder="请选择申请入党时间" value-format="yyyy-MM-dd" v-model="formData.apply_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.apply_time" v-else>{{formData.apply_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="接受入党申请的党支部名称">
                        <el-input v-model="formData.accept_apply_org" placeholder="请输入党支部名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.accept_apply_org" v-else>{{formData.accept_apply_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="接受入党申请的党支部名称补充">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">接受入党申请的党支部名称补充:</span>
                        </span>
                        <el-input v-model="formData.accept_apply_org_sup" placeholder="请输入党支部名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.accept_apply_org_sup" v-else>{{formData.accept_apply_org_sup || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="经过推优的共青团员">
                        <el-radio-group v-model="formData.great_youth_communist" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.great_youth_communist=='1'?'是':'否')" v-else>{{(formData.great_youth_communist=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="先进模范人物">
                        <el-radio-group v-model="formData.advanced_model" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.advanced_model=='1'?'是':'否')" v-else>{{(formData.advanced_model=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="省部级命名的先进模范人物">
                        <el-radio-group v-model="formData.advanced_model_pro" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.advanced_model_pro=='1'?'是':'否')" v-else>{{(formData.advanced_model_pro=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="最近培训日期" prop="join_time">
                        <el-date-picker type="date" placeholder="请选择最近培训日期" value-format="yyyy-MM-dd" v-model="formData.recent_training_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.recent_training_date" v-else>{{formData.recent_training_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="最近培训结果合格">
                        <el-radio-group v-model="formData.recent_training_result" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.recent_training_result=='1'?'是':'否')" v-else>{{(formData.recent_training_result=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="具备入党条件成熟程度">
                        <selectOpt v-model="formData.condition_maturity" placeholder="请选择具备入党条件成熟程度" :option="joinPartyState" @input="formData.condition_maturity=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.condition_maturity_name" v-else>{{formData.condition_maturity_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="列为入党积极分子日期" prop="activist_date">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.activist_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.activist_date" v-else>{{formData.activist_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="列为发展对象日期" prop="dev_target_date">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.dev_target_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.dev_target_date" v-else>{{formData.dev_target_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="支部大会通过该申请入党人入党日期" prop="join_date">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">支部大会通过该申请入党人入党日期:</span>
                        </span>
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.join_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.join_date" v-else>{{formData.join_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="培养联系人1">
                        <el-input v-model="formData.training_catact_o" placeholder="请输入联系人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.training_catact_o" v-else>{{formData.training_catact_o || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="培养联系人2">
                        <el-input v-model="formData.training_catact_t" placeholder="请输入联系人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.training_catact_t" v-else>{{formData.training_catact_t || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党介绍人1">
                        <el-input v-model="formData.introducer_o" placeholder="请输入介绍人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.introducer_o" v-else>{{formData.introducer_o || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党介绍人2">
                        <el-input v-model="formData.introducer_t" placeholder="请输入介绍人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.introducer_t" v-else>{{formData.introducer_t || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="吸收入党的党支部名称">
                        <el-input v-model="formData.join_org" placeholder="请输入党支部名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.join_org" v-else>{{formData.join_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="培养培训情况">
                        <el-input v-model="formData.training_situation" placeholder="请输入培养培训情况" maxlength="200" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.training_situation" v-else>{{formData.training_situation || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="政治审查情况">
                        <selectOpt v-model="formData.political_review" placeholder="请选择政治审查情况" :option="politicalExamData" @input="formData.political_review=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.political_review_name" v-else>{{formData.political_review_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="申请情况（历次入党申请情况及思想汇报）">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">申请情况（历次入党申请情况及思想汇报）:</span>
                        </span>
                        <el-input v-model="formData.apply_situation" type="textarea" :rows="3" placeholder="请输入申请情况" maxlength="200" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.apply_situation" v-else>{{formData.apply_situation || ""}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- <div class="submit-div">
            <el-button type="primary" @click="back">返回</el-button>
            <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
        </div> -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import selectOpt from '@/components/datacenter/common/selectOpt'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
export default {
    beforeRouteLeave (to, from, next) {
        if(this.disabledTag == false && this.isSave == null) {
            if(!this.confirmShow){
                this.confirmShow = true
                this.$confirm('当前页面数据未保存，确定要离开？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                    next()
                }).catch(() => {
                    this.confirmShow = false
                    history.pushState(null, null, document.URL);
                    next(false)
                });
            }else{
                next()
            }
        }else {
            next()
        }
    },
    props: {
        /* personId: {
        type: [String, Number],
        default: '',
        required: true,
        },
        read: {
            type: Boolean,
            default: false
        } */
    },
    components: {
        selectOpt,
        orgPicker,
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            tableData: [],
            detail: null,
            disabledTag: false,
            formData: {
                apply_time:'',
                accept_apply_org:'',
                accept_apply_org_sup:'',
                great_youth_communist:'',
                advanced_model:'',
                advanced_model_pro:'',
                recent_training_date:'',
                recent_training_result:'',
                condition_maturity:'',
                activist_date:'',
                dev_target_date:'',
                join_date:'',
                training_catact_o:'',
                training_catact_t:'',
                introducer_o:'',
                introducer_t:'',
                join_org:'',
                join_org_name:'',
                training_situation:'',
                political_review:'',
                apply_situation:'',
                aaaaaa:'',
                aaaaaa:'',
            },
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            pickerDialog: false,            // 党组织弹窗
            joinPartyState: [],     // 具备入党条件成熟程度
            politicalExamData: [],  // 政治审查情况
        }
    },
    methods: {
        checkDetail(index) {
            this.detail = this.tableData[index]
            console.log(this.detail);
        },
        back() {
            this.$router.push({name: '党员信息', params: this.$route.query})
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid,aa) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.uid = this.$route.query.id
                    }else {
                        let sessionUid = sessionStorage.getItem('add_m_uid') || ''
                        this.formData.uid = sessionUid
                    }
                    datacenter.member_apply_party_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.getData();
                            this.btnTag = 1
                            this.disabledTag = true
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
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
        getDicData() {
            // 具备入党条件成熟程度
            common.getDictData_tree({id: 23}).then( res => {
                this.joinPartyState = res.data.data
            })
            // 政治审查情况
            common.getDictData_tree({id: 24}).then( res => {
                this.politicalExamData = res.data.data
            })
        },
        // 点击编辑按钮
        editOpt() {
            this.btnTag = 2;
            this.disabledTag = false
            this.isSave = null;
            this.getData();
        },
        // 点击取消按钮
        cancelOpt() {
            this.btnTag = 1;
            this.disabledTag = true
            this.getData();
        },
        // getData() {
        //     this.loading = true
        //     datacenter.joinInfo({uid: this.personId}).then( res => {
        //             this.formData = res.data.data
        //         /* this.tableData = res.data.data
        //         this.$nextTick(() => {
        //         this.detail = this.tableData[0]
        //         this.loading = false
        //         }) */
        //     })
        // },
        getData() {
            let sessionUid = sessionStorage.getItem('add_m_uid') || ''
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
            datacenter['member_apply_party_info']({id: uid}).then( res => {
                this.loading = false
                if(res.data.data == '' || res.data.data.length == 0) { return }
                this.formData = res.data.data || {}
                this.set0Val(['activist_date','apply_time','condition_maturity','dev_target_date','join_date','political_review','recent_training_date'])
            }) 
            return
            this.loading = true
            if(this.$route.query.id) {
                let url = ''   
                let param = {} 
                if(this.btnTag == 1) {  // 编辑按钮（查看）
                    url = 'member_apply_party_info'
                    param = {uid: this.$route.query.id}
                }else if(this.btnTag == 2){
                    url = 'joinInfo'
                    param = {uid: this.$route.query.id}
                }
                datacenter[url](param).then( res => {
                    // this.formData = res.data.data
                    this.loading = false
                }) 
            }
        },
        // 清空为0的数据
        set0Val(fieldArr) {
            for (const key in fieldArr) {
                this.formData[fieldArr[key]] = this.formData[fieldArr[key]] == '0'?'':this.formData[fieldArr[key]];
            }
        }
    },
    created() {
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
        this.getDicData();
        this.getData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
}
</script>

<style>

</style>
