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
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党员" prop="realname">
                            <el-input v-model="formData.realname" readonly placeholder="请选择党员" @focus="mpickerDialog=true" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.realname" v-else>{{formData.realname || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党务工作">
                            <el-radio-group v-model="formData.type" @change="changeWorkType" v-if="!disabledTag">
                                <el-radio label="0">党组织班子成员</el-radio>
                                <el-radio label="1">党建工作指导员</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="(formData.type=='0'?'党组织班子成员':'党建工作指导员')" v-else>{{(formData.type=='0'?'党组织班子成员':'党建工作指导员') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item class="col-name company" :label="formData.type=='1'?'派遣单位':'任职所在党组织'" prop="org_name">
                            <el-input v-model="formData.org_name" readonly :placeholder="formData.type=='1'?'请选择单位':'请选择党组织'" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="pickerDialog = true">党组织库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="handleClick('orgType')" v-if="formData.type=='1'">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="24" v-if="formData.type=='0'">
                        <el-form-item class="col-name company" label="任职所在党组织" prop="org_name">
                            <el-input v-model="formData.org_name" readonly placeholder="请选择党组织" @focus="pickerDialog=true" v-if="!disabledTag"></el-input>
                            <!-- <el-input v-model="formData.org_name" readonly :placeholder="formData.type=='1'?'请选择单位':'请选择党组织'" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="pickerDialog = true">党组织库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="handleClick('orgType')" v-if="formData.type=='1'">手动添加</el-button>
                            </el-input> -->
                            <span class="sblock" :title="formData.org_name" v-else>{{formData.org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="formData.type=='1'">
                        <el-form-item class="col-name company" label="派遣单位" prop="dispatch_org_name">
                            <el-input v-model="formData.dispatch_org_name" readonly placeholder="请选择单位" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="pickerDialog = true">党组织库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="handleClick('orgType')" v-if="formData.type=='1'">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.dispatch_org_name" v-else>{{formData.dispatch_org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="formData.type=='1'">
                        <el-form-item class="col-name" label="派驻单位类别" prop="stationing_type">
                            <el-radio-group v-model="formData.stationing_type" @change="changeStationType" v-if="!disabledTag">
                                <el-radio :label="item.id" v-for="(item, index) in stationTypeData" :key="index">{{item.value}}</el-radio>
                            </el-radio-group>
                            <span class="sblock" :title="formData.stationing_type_name" v-else>{{formData.stationing_type_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="formData.type=='1'">
                        <el-form-item class="col-name company" label="派驻单位" prop="stationing_org_name">
                            <el-input v-model="formData.stationing_org_name" readonly placeholder="请选择派驻单位" v-if="!disabledTag">
                                <el-button slot="suffix" size="mini" @click="unitDialogClick()" v-if="formData.stationing_type == '1'">单位库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="unitDialogClick('company')" v-if="formData.stationing_type == '2'">非公企业库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="unitDialogClick('build')" v-if="formData.stationing_type == '3'">商务楼宇服务站选择</el-button>
                                <el-button slot="suffix" size="mini" @click="unitDialogClick('social')" v-if="formData.stationing_type == '4'">社会组织库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="unitDialogClick('party')" v-if="formData.stationing_type == '5'">党建阵地库选择</el-button>
                                <el-button slot="suffix" size="mini" @click="handleClick('unitType')">手动添加</el-button>
                            </el-input>
                            <span class="sblock" :title="formData.stationing_org_name" v-else>{{formData.stationing_org_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="formData.type=='0'">
                        <el-form-item class="col-name" label="任职职务" prop="duties_name">
                            <el-input v-model="formData.duties_name" readonly placeholder="请选择任职职务" 
                            @focus="treepickerDialog=true;treeType='duty';treeTitle='任职职务'" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.duties_name" v-else>{{formData.duties_name || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="formData.type=='1'">
                        <el-form-item class="col-name" label="派驻时间">
                            <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="formData.stationing_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.stationing_time" v-else>{{formData.stationing_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="col-name" label="任职期限">
                            <el-date-picker type="monthrange" placeholder="请选择时间" format="yyyy年MM月" value-format="yyyy-MM" v-model="formData.dateArr" style="width: 100%;" @change="changeMonth" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="formData.stay_time" v-else>{{formData.stay_time || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="任职年限（年）">
                            <el-input v-model="formData.tenure" placeholder="请输入任职年限" type="text" maxlength="5" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="formData.tenure" v-else>{{formData.tenure || ""}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <div class="submit-div">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm('formForm')" v-if="!disabledTag">{{ Object.keys($route.query).length != 0 ? '保存':'添加' }}</el-button>
            </div> -->
        </div>
        <!-- 选党组织 -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
        <!-- 选党员 -->
        <member-picker :visible="mpickerDialog" :radio="true" @close="mpickerDialog=false" @choosen="memberChoosen" />
        <!-- 单位库 -->
        <unitDialog :visible="unitSDialog" :type="unitDialogType" @close="unitSDialog=false" @choosen="unitSResult" />
        <!-- 手动选择 -->
        <addInputText :visible="addDialog" :type="handleType" @close="addDialog=false" title="单位" @choosen="addResult" />
        <!-- 树级数据 -->
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
        <!-- 提交之前提示 -->
        <el-dialog title="提示" class="dc-msg-dialog data-dialog" :visible.sync="beforeSubmitDialog"
            width="600px">
            <div class="text">{{beforeSubmitText1}}</div>
            <div class="subtext">{{beforeSubmitText2}}</div>
            <div slot="footer" class="change-submit">
                <el-button @click="beforeSubmitDialog = false">取消</el-button>
                <el-button type="primary" @click="submitSync(1)">{{ resultTag == '2'?'覆盖':'确定'}}</el-button>
                <!-- <el-button type="primary" @click="beforeSubmitDialog = false;syncDialog = true">确定</el-button> -->
            </div>
        </el-dialog>
        <!-- 同步/不同步 -->
        <el-dialog title="提示" class="dc-msg-dialog data-dialog" :visible.sync="syncDialog"
            width="600px">
            <div class="text">是否在党员的党内职务中同步增加该任职记录?</div>
            <div class="subtext">(若该党员党内职务信息在该党组织下已有职务记录则会将之前职务状态改为“不在任”)</div>
            <div slot="footer" class="change-submit">
                <el-button @click="submitSync(0)">不更新</el-button>
                <el-button type="primary" @click="submitSync(1)">同步更新</el-button>
            </div>
        </el-dialog>
        <!-- 非公企业弹窗 -->
        <el-dialog title="提示" class="dc-msg-dialog data-dialog" :visible.sync="companyDialog"
            width="600px">
            <div class="text">党建工作指导员信息将同步更新到相应非公企业数据中，是否继续保存？</div>
            <div slot="footer" class="change-submit">
                <el-button @click="companyDialog = false">取消</el-button>
                <el-button type="primary" @click="submitSync(1)">同步更新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import inputUserId from '@/components/work/widgets/input_user_ids'
import unitDialog from '@/components/datacenter/widgets/unit_dialog'
import addInputText from '@/components/datacenter/widgets/add_input_text'
import orgPicker from '@/components/orgPicker_power_for_datacenter'
import treePicker from '@/components/datacenter/widgets/treePicker'

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
        treePicker,
        orgPicker,
        inputUserId,
        unitDialog,
        addInputText,
        datadialog,
        "member-picker": resolve => require(["@/components/memberPicker_power_for_datacenter"], resolve)
    },
    data() {
      return {
        isSave: null,
        confirmShow:false,
        loading: false,
        formData: {
            uid: '',
            realname: '',
            type: '0',
            dispatch_org_id:'',
            dispatch_org_name:'',
            org_id: '',
            org_name: '',
            duty_id: '',
            duties_name: '',
            tenure: '',
            dateArr: [],
            start_time: '',
            end_time: '',
            stationing_type: '1',
            stationing_org_id: '',
            stationing_org_name: '',
            stationing_time: '',
        },
        formRule: {
            realname: [ { required: true, message:'请选择党员!', trigger: 'blur' }],
            org_name: [ { required: true, message:'请选择党组织!', trigger: 'blur' }],
            dispatch_org_name: [ { required: true, message:'请选择党组织!', trigger: 'blur' }],
            duties_name: [ { required: true, message:'请选择任职职务!', trigger: 'blur' }],
            stationing_type: [ { required: true, message:'请选择派驻单位类别!', trigger: 'blur' }],
            stationing_org_name: [ { required: true, message:'请选择派驻单位!', trigger: 'blur' }],
        },
        btnTag: 0,          // 0添加 1编辑  2取消、保存
        unitDialogType: '',
        handleType: '',
        handleTitle: '',
        beforeSubmitText1:'',
        beforeSubmitText2:'',
        treeType: '',       // tree下拉框类型
        treeTitle: '',      // tree下拉框title
        resultTag: '',      // 结果type 控制按钮文字
        stationTypeData: [],
        serverTypeData: [],
        disabledTag: false,
        pickerDialog: false,
        mpickerDialog: false,
        unitSDialog: false,
        addDialog: false,
        beforeSubmitDialog: false,
        treepickerDialog: false,        // 树弹窗
        syncDialog: false,
        companyDialog: false,
      };
    },
    methods: {
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.id = this.$route.query.id
                    }else {
                        this.formData.id = ''
                    }
                    if(this.formData.type == '1') {   // 指导员提交
                        /* if(this.formData.stationing_type == '2') {      // 非公企业
                            this.companyDialog = true
                        }else {
                            this.syncDialog = true;
                        } */
                        this.submitSync(1)
                    }else {
                        this.formData.start_time = this.formData.dateArr[0]
                        this.formData.end_time =  this.formData.dateArr[1]
                        datacenter.worker_check(this.formData).then( res => {
                            if(res.data.status  == '200') {
                                //  type: 1为党组织下有书记，2为党员在该党组织下有身份，0位可以继续下一步
                                this.resultTag = res.data.data.type
                                if(res.data.data.type == '1') {
                                    this.beforeSubmitDialog = true
                                    this.beforeSubmitText1 = '该党组织已有书记，是否继续保存？'
                                    this.beforeSubmitText2 = '（若继续保存会将原书记在该党组织下的职务改为“普通党员”）'
                                    return
                                }else if(res.data.data.type == '2'){
                                    this.beforeSubmitDialog = true
                                    this.beforeSubmitText1 = '该党员在该党组织下已有职务信息，是否覆盖更新旧数据？'
                                    this.beforeSubmitText2 = '（一个党员在同一党组织下只允许任职一个职务）'
                                    return
                                }
                                // this.syncDialog = true;
                                this.submitSync(1)
                            }else {
                                this.$message({ message: res.data.statusCode, type: 'error' });
                            }
                        })
                    }
                } else {
                    if(vinfo.realname) {
                        this.$message({ message: vinfo.realname[0].message, type: 'error' });
                    } else if(vinfo.org_name) {
                        this.$message({ message: vinfo.org_name[0].message, type: 'error' });
                    } else if(vinfo.dispatch_org_name) {
                        this.$message({ message: vinfo.dispatch_org_name[0].message, type: 'error' });
                    } else if(vinfo.duties_name) {
                        this.$message({ message: vinfo.duties_name[0].message, type: 'error' });
                    } else if(vinfo.stationing_type) {
                        this.$message({ message: vinfo.stationing_type[0].message, type: 'error' });
                    } else if(vinfo.stationing_org_name) {
                        this.$message({ message: vinfo.stationing_org_name[0].message, type: 'error' });
                    }
                    return false;
                }
            });
        },
        submitSync(type) {
            // type  若同步传1，否则传0
            if(this.$route.query.id) {// 修改
                this.formData.id = this.$route.query.id
            }else {
                this.formData.id = ''
            }
            let params = this.formData
            params.synchronization = type
            this.formData.start_time = this.formData.dateArr[0]
            this.formData.end_time =  this.formData.dateArr[1]
            datacenter.worker_edit(params).then( res => {
                if(res.data.status  == '200') {
                    this.isSave = true;
                    this.syncDialog = false;
                    this.beforeSubmitDialog = false;
                    this.$message({ message: res.data.statusCode, type: 'success' });
                    this.back()
                }else {
                    this.$message({ message: res.data.statusCode, type: 'error' });
                }
            }) 
        },
        back() {
            this.$router.push({name: '党务工作者', params: this.$route.query})
        },
        // 选择党组织库 单选
        choosenPicker(obj) {
            this.formData.org_name = obj.name
            if(this.formData.type == '1') {// 指导员
                this.formData.org_id = '0'
                this.formData.org_name = ''
                this.formData.dispatch_org_id = obj.id
                this.formData.dispatch_org_name = obj.name
            }else {
                this.formData.dispatch_org_id = '0'
                this.formData.dispatch_org_name = ''
                this.formData.org_id = obj.id
                this.formData.org_name = obj.name
            }
        },
        memberChoosen(obj) {
            // console.log('member',obj);
            this.formData.realname = obj.name
            this.formData.uid = obj.uid
            
        },
        // 点击单位弹窗之前
        unitDialogClick(type) {
            this.unitSDialog = true
            this.unitDialogType = type
        },
        // 单位库选择结果
        unitSResult(item) {
            let obj_name = item.short_name
            if(!obj_name) { obj_name = item.name }
            this.formData.stationing_org_name = obj_name
            this.formData.stationing_org_id = item.id
            // this.hand_addr = false;
        },
        // 手动添加
        handleClick(type) {
            this.addDialog = true
            this.handleType = type
            return
            if(type == 'unitType') {
                this.handleTitle = '单位'
            }else if(type == 'orgType') {
                this.handleTitle = 'orgType'
            }
        },
        // 手动添加完成
        addResult(text, type) {
            // console.log('text',text,type);
            if(type == 'unitType') {
                this.formData.stationing_org_name = text
                this.formData.stationing_org_id = ''
            } else if(type == 'orgType') {
                this.formData.dispatch_org_name = text
                this.formData.dispatch_org_id = ''
            }
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            // console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'duty') {
                field_id = 'duty_id'
                field_name = 'duties_name'
            }
            if(!obj) {
                this.formData[field_id] = ''
                this.formData[field_name] = ''
                return 
            }
            this.formData[field_id] = obj.id
            this.formData[field_name] = obj.value
        },
        changeMonth(val) {
            // console.log('month',val);
            let start = new Date(val[0]).getTime();
            let end = new Date(val[1]).getTime();
            let rang = (((end - start) / 1000) / 24 / 3600 / 365).toString()
            if((rang.indexOf('.') > -1)) {
                rang = Number(rang).toFixed(1)
            }
            this.formData.tenure = rang;
        },
        // 党务工作选择 清空数据
        changeWorkType(label) {
            // setTimeout(() => {
            //     this.$refs.formForm.resetFields();
            // }, 0);
        },
        // 派驻单位类别选择 清空
        changeStationType() {
            this.formData.stationing_org_name = ''
            this.formData.stationing_org_id = ''
        },
        getDicData() {
            // 派驻单位类别
            common.getDictData_tree({id: 'stationing_type'}).then( res => {
                this.stationTypeData = res.data.data
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
                url = 'worker_info'
                datacenter[url]({id: this.$route.query.id}).then( res => {
                    this.formData = res.data.data
                    this.formData.dateArr = [this.formData.start_time,this.formData.end_time]
                    if(this.formData.type == '1') {
                        this.formData.duties_name = ''
                        this.formData.duty_id = ''
                    }
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
.dc-msg-dialog .text,
.dc-msg-dialog .subtext { text-align: center; line-height: 30px; }
.dc-msg-dialog .subtext { font-size: 12px; }
</style>