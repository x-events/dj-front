<template>
    <div class="flex-1 flex-col">
        <div class="data-edit flex-col flex-1" :class="{'editStatus':!disabledTag}">
            <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}
                <div class="tool">
                    <el-button type="primary" @click="back">返回</el-button>
                    <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                    <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                    <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                    <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
                </div>
            </div>
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row">
                    <el-col :span="12">
                        <el-form-item class="col-name" label="企业名称" prop="name">
                            <el-input v-model="formData.name" placeholder="请输入企业名称" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="办公地址">
                            <el-input v-model="formData.address" placeholder="请输入办公地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.address" v-else>{{formData.address || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="标志属性">
                            <selectOpt v-model="formData.logo_attributes" placeholder="请选择标志属性" :option="idePropData" @input="formData.logo_attributes=$event" v-if="!disabledTag" /> 
                            <span class="sblock" :title="formData.logo_attributes_name" v-else>{{formData.logo_attributes_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="职工总数">
                            <el-input v-model="formData.total_num" placeholder="请输入职工总数" type="number" maxlength="10" :oninput="oninput(10,'total_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.total_num" v-else>{{formData.total_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党员数">
                            <el-input v-model="formData.party_num" placeholder="请输入党员数" type="number" maxlength="10" :oninput="oninput(10,'party_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.party_num" v-else>{{formData.party_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="流动党员数">
                            <el-input v-model="formData.flow_party_num" placeholder="请输入流动党员数" type="number" maxlength="10" :oninput="oninput(10,'flow_party_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.flow_party_num" v-else>{{formData.flow_party_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="企业法人">
                            <el-input v-model="formData.legal_person" placeholder="请输入企业法人" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.legal_person" v-else>{{formData.legal_person || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="联系电话">
                            <el-input v-model="formData.legal_phone" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.legal_phone" v-else>{{formData.legal_phone || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="是否建立党组织">
                            <el-radio-group v-model="formData.is_party_org" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.is_party_org=='1'?'是':'否')" v-else>{{(formData.is_party_org=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="是否建立“功能型”党组织">
                            <el-radio-group v-model="formData.is_function_party_org" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.is_function_party_org=='1'?'是':'否')" v-else>{{(formData.is_function_party_org=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党组织">
                            <el-input v-model="formData.org_name" readonly placeholder="请选择党组织" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="pickerDialog = true">党组织库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="addDialog = true">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div>
                        <div class="detail-subtext">党组织书记情况</div>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="书记姓名">
                                <el-input v-model="formData.username" placeholder="请输入书记姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.username" v-else>{{formData.username || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="书记性别
                            ">
                                <el-select v-model="formData.sex" placeholder="请选择书记性别" style="width:100%;" v-if="!disabledTag">
                                    <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in sexData"></el-option>
                                </el-select>
                                <span class="sblock" :title="(formData.sex=='1'?'女':'男')" v-else>{{(formData.sex=='1'?'女':'男') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="书记年龄">
                                <el-input v-model="formData.age" placeholder="请输入书记年龄" type="number" maxlength="10" :oninput="oninput(10,'age')" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.age" v-else>{{formData.age || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="书记行政职务">
                                <el-input v-model="formData.job" placeholder="请输入书记行政职务" maxlength="50" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.job" v-else>{{formData.job || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="书记联系电话">
                                <el-input v-model="formData.tel" placeholder="请输入书记联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.tel" v-else>{{formData.tel || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="近三年参加上级党组织培训次数">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">近三年参加上级党组织培训次数:</span>
                                </span>
                                <el-input v-model="formData.develop_org_train_num" placeholder="请输入次数" type="number" maxlength="10" :oninput="oninput(10,'develop_org_train_num')" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.develop_org_train_num" v-else>{{formData.develop_org_train_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <div class="detail-void"></div>
                    </div>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="专职党务工作者人数">
                            <el-input v-model="formData.party_work_num" placeholder="请输入专职党务工作者人数" type="number" maxlength="10" :oninput="oninput(10,'party_work_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.party_work_num" v-else>{{formData.party_work_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="近三年发展党员数">
                            <el-input v-model="formData.develop_party_num" placeholder="请输入近三年发展党员数" type="number" maxlength="10" :oninput="oninput(10,'develop_party_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.develop_party_num" v-else>{{formData.develop_party_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="是否选派党建工作指导员">
                            <el-radio-group v-model="formData.is_party_work_instructor" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.is_party_work_instructor=='1'?'是':'否')" v-else>{{(formData.is_party_work_instructor=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="formData.is_party_work_instructor == '1'">
                        <el-form-item class="col-name" label="党建工作指导员">
                            <el-input v-model="formData.user_name" readonly placeholder="请选择党员" @focus="mpickerDialog=true" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.user_name" v-else>{{formData.user_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <div v-if="formData.is_party_work_instructor == '1' && disabledTag">
                        <div class="detail-subtext">党建工作指导员</div>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="指导员姓名">
                                <el-input v-model="formData.user_name" placeholder="请输入指导员姓名" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.user_name" v-else>{{formData.user_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="指导员性别">
                                <el-input v-model="formData.user_sex" placeholder="请输入指导员性别" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="(formData.user_sex=='1'?'女':'男')" v-else>{{(formData.user_sex=='1'?'女':'男') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="指导员出生日期">
                                <el-input v-model="formData.user_birth" placeholder="请输入书记年龄" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.user_birth" v-else>{{formData.user_birth || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="党务工作经验（年）">
                                <el-input v-model="formData.user_experience" placeholder="请输入书记行政职务" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.user_experience" v-else>{{formData.user_experience || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="指导员联系电话">
                                <el-input v-model="formData.user_cellphone" placeholder="请输入书记联系电话" v-if="!disabledTag"></el-input>
                                <span class="sblock" :title="formData.user_cellphone" v-else>{{formData.user_cellphone || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <div class="detail-void"></div>
                    </div>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织年度活动经费(万元)">
                            <el-input v-model="formData.org_activity_funds" placeholder="请输入年度活动经费" type="number" maxlength="10" :oninput="oninput(10,'org_activity_funds')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_activity_funds" v-else>{{formData.org_activity_funds || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党组织活动场所面积(㎡)">
                            <el-input v-model="formData.org_activity_area" placeholder="请输入党组织活动场所面积" type="number" maxlength="10" :oninput="oninput(10,'org_activity_area')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_activity_area" v-else>{{formData.org_activity_area || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="备注">
                            <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注" maxlength="200" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.remark" v-else>{{formData.remark || ""}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <!-- 党组织 -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
        <!-- 选党员 -->
        <member-picker :visible="mpickerDialog" :radio="true" @close="mpickerDialog=false" @choosen="memberChoosen" />
        <!-- 手动添加 -->
        <addInputText :visible="addDialog" @close="addDialog=false" title="党组织" @choosen="addResult" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import selectOpt from '@/components/datacenter/common/selectOpt'
import addInputText from '@/components/datacenter/widgets/add_input_text'

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
    components: {
        addInputText,
        orgPicker,
        selectOpt,
        inputUserId,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve)
    },
    data() {
      return {
        isSave: null,
        confirmShow:false,
        loading: false,
        formData: {
            name: '',
            address: '',
            logo_attributes: '',
            logo_attributes_name:'',
            total_num: '',
            party_num: '',
            flow_party_num: '',
            legal_person:'',        // 企业法人
            username: '',
            sex:'',
            age:'',
            job:'',
            legal_phone:'',
            tel: '',
            is_party_org: '1',
            is_function_party_org: '1',
            org_name: '',
            develop_org_train_num:'',
            party_work_num: '',
            develop_party_num: '',
            is_party_work_instructor: '1',
            user_id:'',
            user_name:'',
            org_activity_funds: '',
            org_activity_area: '',
            remark: ''
        },
        formRule: {
            name: [ { required: true, trigger: 'blur' }],
        },
        idePropData: [],
        sexData: [
            {
                id: '0',
                value: '男'
            },{
                id: '1',
                value: '女'
            }
        ],
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        disabledTag: false,
        pickerDialog: false,
        mpickerDialog: false,
        addDialog: false,
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    this.formData.synchronization = '1'
                    datacenter.company_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.isSave = true;
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请输入企业名称！', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '非公企业', params: this.$route.query})
        },
        // 手动添加
        addResult(text) {
            // console.log('text',text);
            this.formData.org_name = text
            this.formData.org_id = ''
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
        memberChoosen(obj) {
            // console.log('member',obj);
            this.formData.user_name = obj.name
            this.formData.user_id = obj.uid
        },
        getDicData() {
            // 标志属性
            common.getDictData_tree({id: 'logo_attributes'}).then( res => {
                this.idePropData = res.data.data
            })
        },
        // 点击编辑按钮
        editOpt() {
            this.btnTag = 2;
            this.disabledTag = false
            this.getData();
        },
        // 点击取消按钮
        cancelOpt() {
            this.btnTag = 1;
            this.disabledTag = true
            this.getData();
        },
        getData() {
            if(this.$route.query.id) {
                let url = ''    
                url = 'company_info'
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    this.set0Val([''])
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
        this.getDicData()
        if(this.$route.query.id) {
            if(this.$route.query.tag == 'look') {
                this.btnTag = 1
                this.disabledTag = true
            }else{
                this.btnTag = 2
            }
            this.getData();
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
  }
</script>

<style scoped>
* {
box-sizing: border-box;
}
</style>