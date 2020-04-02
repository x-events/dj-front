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
                        <el-form-item class="col-name" label="组织名称" prop="name">
                            <el-input v-model="formData.name" placeholder="请输入组织名称" maxlength="100" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.name" v-else>{{formData.name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="办公地址">
                            <el-input v-model="formData.add" placeholder="请输入办公地址" maxlength="100" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.add" v-else>{{formData.add || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="服务类别">
                            <selectOpt v-model="formData.service_category" placeholder="请选择服务类别" :option="serverTypeData" @input="formData.service_category=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="formData.service_category_name" v-else>{{formData.service_category_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="员工总数">
                            <el-input v-model="formData.employmee_num" placeholder="请输入员工总数" type="number" maxlength="10" :oninput="oninput(10,'employmee_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.employmee_num" v-else>{{formData.employmee_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="党员总数">
                            <el-input v-model="formData.party_member_num" placeholder="请输入党员总数" type="number" maxlength="10" :oninput="oninput(10,'party_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.party_member_num" v-else>{{formData.party_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="流动党员数">
                            <el-input v-model="formData.float_party_member_num" placeholder="请输入流动党员数" type="number" maxlength="10" :oninput="oninput(10,'float_party_member_num')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.float_party_member_num" v-else>{{formData.float_party_member_num || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="是否建立党组织">
                            <el-radio-group v-model="formData.party_branch" @change="changeRadio" v-if="!disabledTag">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.party_branch=='1'?'是':'否')" v-else>{{(formData.party_branch=='1'?'是':'否') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="formData.party_branch == '1'">
                        <el-form-item class="col-name" label="所属党组织">
                            <el-input v-model="formData.org_name" readonly placeholder="党组织库选择" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import selectOpt from '@/components/datacenter/common/selectOpt'

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
        orgPicker,
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
            add: '',
            service_category: '',
            employmee_num: '',
            party_member_num: '',
            float_party_member_num: '',
            party_branch: '1',
            org_id: '',
            org_name: '',
        },
        formRule: {
            name: [ { required: true, trigger: 'blur' }],
        },
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        user_list: [],
        serverTypeData: [],
        disabledTag: false,
        pickerDialog: false,
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
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
                    datacenter.social_edit(this.formData).then( res => {
                        if(res.data.status  == '200') {
                            this.$message({ message: res.data.statusCode, type: 'success' });
                            this.back()
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                } else {
                    this.$message({ message: '请输入组织名称！', type: 'error' });
                    return false;
                }
            });
        },
        back() {
            this.$router.push({name: '社会组织', params: this.$route.query})
        },
        // 选择党组织库 单选
        choosenPicker(obj) {
            this.formData.org_name = obj.name
            this.formData.org_id = obj.id
        },
        // 单位选择
        changeRadio(label) {
            if(label == '2') {
                this.formData.org_name = ''
                this.formData.org_id = ''
            }
        },
        getDicData() {
            // 服务类别
            common.getDictData_tree({id: 'service_category'}).then( res => {
                this.serverTypeData = res.data.data
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
                    url = 'org_social_info'
                }else if(this.btnTag == 2){
                    url = 'social_edit_info'
                }
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
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
</style>