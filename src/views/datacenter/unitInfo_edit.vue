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
                <el-row class="form-row fix">
                    <el-col :span="24">
                        <el-form-item class="col-name" label="单位名称" prop="short_name">
                            <el-input v-model="formData.short_name" placeholder="请输入单位名称" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.short_name" v-else>{{formData.short_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <!-- <el-form-item class="col-name" label="党组织">
                            <el-input v-model="formData.org_name" readonly placeholder="党组织库选择" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item> -->
                        <org-input-ids labelname="党组织" :labelwidth="190" :disabled="disabledTag" :propvalue="formData.org_list" @change="chooseOrgs" :power="true" />
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="单位全称">
                            <el-input v-model="formData.name" placeholder="请输入单位全称" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="单位地址">
                            <el-input v-model="formData.address" placeholder="请输入单位地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.address" v-else>{{formData.address || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="隶属单位">
                            <el-input v-model="formData.sub_unit" placeholder="请输入隶属单位" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.sub_unit" v-else>{{formData.sub_unit || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="单位规模">
                            <selectOpt v-model="formData.com_scale" placeholder="请选择单位规模" :option="comScaleData" @input="formData.com_scale=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.com_scale" v-else>{{formData.com_scale || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="单位编码">
                            <el-input v-model="formData.code" placeholder="请输入单位编码" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.code" v-else>{{formData.code || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="单位级别">
                            <selectOpt v-model="formData.level" placeholder="请选择单位级别" :option="leavelData" @input="formData.level=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.level" v-else>{{formData.level || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="单位所在行政区">
                            <selectOpt v-model="formData.own_district" placeholder="请选择单位所在行政区" :option="unitAreaData" @input="formData.own_district=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.own_district" v-else>{{formData.own_district || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="单位电话">
                            <el-input v-model="formData.phone" placeholder="请输入单位电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.phone" v-else>{{formData.phone || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="单位类别">
                            <selectOpt v-model="formData.category" placeholder="请选择单位类别" :option="unitTypeData" @input="formData.category=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.category" v-else>{{formData.category || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="单位隶属关系">
                            <selectOpt v-model="formData.sub_rel" placeholder="请选择单位隶属关系" :option="unitRelData" @input="formData.sub_rel=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.sub_rel" v-else>{{formData.sub_rel || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="联系人">
                            <el-input v-model="formData.contact" placeholder="请输入联系人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.contact" v-else>{{formData.contact || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="联系电话">
                            <el-input v-model="formData.contact_phone" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.contact_phone" v-else>{{formData.contact_phone || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="单位负责人">
                            <el-input v-model="formData.principal" placeholder="请输入单位负责人" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.principal" v-else>{{formData.principal || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="企业登记注册类型">
                            <selectOpt v-model="formData.reg_type" placeholder="请选择企业登记注册类型" :option="unitRegData" @input="formData.reg_type=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.reg_type" v-else>{{formData.reg_type || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-row class="upload-row">
                        <el-row>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="单位法人">
                                    <el-input v-model="formData.legal_entity" placeholder="请输入法人姓名" maxlength="10" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.legal_entity" v-else>{{formData.legal_entity || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="单位法人代码">
                                    <el-input v-model="formData.legal_entity_code" placeholder="请输入单位法人代码" maxlength="20" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.legal_entity_code" v-else>{{formData.legal_entity_code || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <uploadIcon :image="formData.legal_img_url" :lookTag="disabledTag" imgText="单位法人照片" @on-Success="uploadSuccess" />
                            <el-col :span="20" class="calc-w-20">
                                <el-form-item class="col-name" label="控制控股情况">
                                    <selectOpt v-model="formData.holding_situation" placeholder="请选择控制控股情况" :option="holdStatusData" @input="formData.holding_situation=$event" v-if="!disabledTag" />
                                    <span class="sblock" :title="formData.holding_situation" v-else>{{formData.holding_situation || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="基金会">
                                    <el-radio-group v-model="formData.foundation" v-if="!disabledTag">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="2">否</el-radio>
                                    </el-radio-group>
                                    <span class="sblock" :title="(formData.foundation=='1'?'是':'否')" v-else>{{(formData.foundation=='1'?'是':'否') || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="律师事务所">
                                    <el-radio-group v-model="formData.low_office" v-if="!disabledTag">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="2">否</el-radio>
                                    </el-radio-group>
                                    <span class="sblock" :title="(formData.low_office=='1'?'是':'否')" v-else>{{(formData.low_office=='1'?'是':'否') || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item class="col-name" label="所属(党委)辖区">
                                    <!-- <selectOpt v-model="formData.own_org" placeholder="请选择所属(党委)辖区" :option="areaData" @input="formData.own_org=$event" v-if="!disabledTag" /> -->
                                    <el-input v-model="formData.own_org" placeholder="请输入所属(党委)辖区" maxlength="10" v-if="!disabledTag"></el-input>
                                    <span class="sblock" :title="formData.own_org" v-else>{{formData.own_org || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" class="calc-w-8">
                                <el-form-item class="col-name" label="建立党员服务机构">
                                    <el-radio-group v-model="formData.party_service_agency" v-if="!disabledTag">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="2">否</el-radio>
                                    </el-radio-group>
                                    <span class="sblock" :title="(formData.party_service_agency=='1'?'是':'否')" v-else>{{(formData.party_service_agency=='1'?'是':'否') || ""}}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-row>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党员服务机构情况">
                            <el-input v-model="formData.party_service_agency_situation" placeholder="请输入建立党员服务机构情况" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.party_service_agency_situation" v-else>{{formData.party_service_agency_situation || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="法人代表">
                            <el-input v-model="formData.legal_deputy" placeholder="请输入法人代表" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.legal_deputy" v-else>{{formData.legal_deputy || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item class="col-name" label="成立时间">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择成立时间" v-model="formData.setup_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.setup_time" v-else>{{formData.setup_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item class="col-name" label="注册资金">
                            <el-input v-model="formData.reg_capital" placeholder="请输入注册资金" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.reg_capital" v-else>{{formData.reg_capital || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="营业范围">
                            <el-input v-model="formData.business_scope" placeholder="请输入营业范围" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.business_scope" v-else>{{formData.business_scope || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="资源清单">
                            <el-input v-model="formData.recource" placeholder="请输入资源清单内容" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.recource" v-else>{{formData.recource || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="建立党组织情况">
                            <selectOpt v-model="formData.party_org_situation" placeholder="请选择建立党组织情况" :option="buildOrgStatusData" @input="formData.party_org_situation=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.party_org_situation" v-else>{{formData.party_org_situation || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="单位工作职能">
                            <el-input v-model="formData.duty" placeholder="请输入单位工作职能" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.duty" v-else>{{formData.duty || ""}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <!-- <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" /> -->
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import uploadIcon from '@/components/datacenter/widgets/uploadIcon'
import selectOpt from '@/components/datacenter/common/selectOpt'
import router from '@/router'
import * as componentsMap from '@/components/work/widgets/componentsMap.js'
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
        selectOpt,
        uploadIcon,
        orgPicker,
        inputUserId,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker"], resolve),
        'org-input-ids': componentsMap.widget_input_organization_ids,
    },
    data() {
      return {
        isSave: null,
        confirmShow:false,
        loading: false,
        formData: {
            short_name: '',
            name: '',
            address: '',
            org_id: '',
            org_list:[],
            org_name: '',
            sub_unit: '',
            com_scale: '',
            code: '',
            level: '',
            own_district: '',
            phone: '',
            category: '',
            sub_rel: '',
            contact: '',
            contact_phone: '',
            principal: '',
            reg_type: '',
            legal_entity: '',
            legal_entity_code: '',
            legal_img: '',
            legal_img_url: '',
            holding_situation: '',
            foundation: '1',
            low_office: '1',
            own_org: '',
            party_service_agency: '1',
            party_service_agency_situation: '',
            legal_deputy: '',
            setup_time: '',
            reg_capital: '',
            business_scope: '',
            recource: '',
            party_org_situation: '',
            duty: '',
        },
        formRule: {
            short_name: [ { required: true, trigger: 'blur' } ],
            name: [ { required: true, trigger: 'blur' }],
        },
        disabledTag: false,
        pickerDialog: false,
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        leavelData: [],
        unitRelData: [],
        unitRegData: [],
        comScaleData: [],
        buildOrgStatusData: [],
        holdStatusData: [],
        areaData: [],
        unitAreaData: [],
        unitTypeData: []
      };
    },
    watch: {
        'formData.org_id'(new_val){
            console.log(new_val,'org_id');
        }
    },
    methods: {
        chooseOrgs(arr) {
            this.formData.org_id = arr.join(',')
        }, 
        submitForm(formName) {
            this.isSave = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    datacenter.unit_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请输入单位名称！', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '单位信息', params: this.$route.query})
        },
        // 党组织库选择 单选
        // choosenPicker(obj) {
        //     if(!obj) {
        //         this.formData.org_name = ''
        //         this.formData.org_id = ''
        //         return 
        //     }
        //     this.formData.org_name = obj.name
        //     this.formData.org_id = obj.id
        // },
        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.formData.legal_img_url = res.data.url
            this.formData.legal_img = res.data.id
        },
        getDicData() {
            // 单位级别
            common.getDictData_tree({id: 'unit_level'}).then( res => {
                this.leavelData = res.data.data
            })
            // 企业规模 单位规模
            common.getDictData_tree({id: 'com_scale'}).then( res => {
                this.comScaleData = res.data.data
            })
            // 单位隶属关系 
            common.getDictData_tree({id: 21}).then( res => {
                this.unitRelData = res.data.data
            })
            // 企业登记注册类型 
            common.getDictData_tree({id: 'unit_reg_type'}).then( res => {
                this.unitRegData = res.data.data
            })
            // 单位建立党组织情况
            common.getDictData_tree({id: 22}).then( res => {
                this.buildOrgStatusData = res.data.data
            })
            // 控制控股情况
            common.getDictData_tree({id: 'holding_situation'}).then( res => {
                this.holdStatusData = res.data.data
            })
            // 所属(党委)辖区
            common.getDictData_tree({id: 'unit_own_org'}).then( res => {
                this.areaData = res.data.data
            })
            // 单位所在行政区
            common.getDictData_tree({id: 'unit_own_district'}).then( res => {
                this.unitAreaData = res.data.data
            })
            // 单位类别 20
            common.getDictData_tree({id: 20}).then( res => {
                this.unitTypeData = res.data.data
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
                if(this.btnTag == 1) {  // 编辑按钮（查看）
                    url = 'unitDetail'
                }else if(this.btnTag == 2){
                    url = 'unit_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    // this.formData.org_list = [
                    //     {
                    //         "id": "5",
                    //         "name": "（机关支部）功夫二爷简称--小伙子，长高高，乐哈哈"
                    //     },
                    //     {
                    //         "id": "80",
                    //         "name": "213123"
                    //     }
                    // ]
                }) 
            }
        }
    },
    created() {
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        this.getDicData();
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
/* .form-row { position: relative; }
.masking { position: absolute; left: 0;top: 0; width: 100%; height: 100%; cursor: not-allowed; } */
.avatar-uploader { height: 243px; line-height: 200px; }
</style>