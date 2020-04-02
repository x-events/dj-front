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
      
      <el-table :data="tableData"  stripe >
        <el-table-column prop="离退日期" label="离退日期">
        </el-table-column>
        <el-table-column prop="离退类别" label="离退类别" >
        </el-table-column>
        <el-table-column prop="离退前级别" label="离退前级别" >
        </el-table-column>
        <el-table-column class-name="table-name" label="详情">
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
                    <el-form-item class="col-name" label="离退日期">
                        <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="formData.date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.date" v-else>{{formData.date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退类别">
                        <selectOpt v-model="formData.retreat_type" placeholder="请选择离退类别" :option="retreatData" @input="formData.retreat_type=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.retreat_type_name" v-else>{{formData.retreat_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退前级别">
                        <el-input v-model="formData.former_level_name" readonly placeholder="请选择离退前级别" 
                        @focus="treepickerDialog=true;treeType='job_rank';treeTitle='离退前级别'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.former_level_name" v-else>{{formData.former_level_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退休费标准(%)">
                        <el-input v-model="formData.fee_standard" placeholder="请输入离退休费标准" type="number" maxlength="5" :oninput="oninput(5,'fee_standard')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.fee_standard" v-else>{{formData.fee_standard || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="曾任最高职务">
                        <el-input v-model="formData.highest_duty_name" readonly placeholder="请选择职务" 
                        @focus="treepickerDialog=true;treeType='job_title';treeTitle='职务'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.highest_duty_name" v-else>{{formData.highest_duty_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退后现管理单位">
                        <el-input v-model="formData.now_manage_unit" placeholder="请输入现管理单位" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.now_manage_unit" v-else>{{formData.now_manage_unit || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退干部现享受待遇">
                        <selectOpt v-model="formData.now_enjoy_treatment" placeholder="请选择现享受待遇" :option="treatmentData" @input="formData.now_enjoy_treatment=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.now_enjoy_treatment_name" v-else>{{formData.now_enjoy_treatment_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退休费支付单位">
                        <el-input v-model="formData.payment_unit" placeholder="请输入离退休费支付单位" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.payment_unit" v-else>{{formData.payment_unit || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退休后管理类别">
                        <selectOpt v-model="formData.manage_type" placeholder="请选择管理类别" :option="retreatManageData" @input="formData.manage_type=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.retreat_manage_type_name" v-else>{{formData.retreat_manage_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="离退批准文号">
                        <el-input v-model="formData.approval_num" placeholder="请输入离退批准文号" maxlength="20" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.approval_num" v-else>{{formData.approval_num || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="提前退休标识">
                        <el-radio-group v-model="formData.advance_ident" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.advance_ident=='1'?'是':'否')" v-else>{{(formData.advance_ident=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="提前退休原因">
                        <selectOpt v-model="formData.retreat_reason" placeholder="请选择提前退休原因" :option="retreatReasonData" @input="formData.retreat_reason=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.retreat_reason_name" v-else>{{formData.retreat_reason_name || ""}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import selectOpt from '@/components/datacenter/common/selectOpt'
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
  props: {
    personId: {
      type: [String, Number],
      default: '',
    //   required: true,
    },
  },
    components: {selectOpt,treePicker},
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            disabledTag: false,
            treepickerDialog: false,        // 树弹窗
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            formData: {
                date:'',
                retreat_type:'',
                retreat_type_name:'',
                former_level:'',
                former_level_name:'',
                fee_standard:'',
                highest_duty:'',
                highest_duty_name:'',
                now_manage_unit:'',
                now_enjoy_treatment:'',
                now_enjoy_treatment_name:'',
                payment_unit:'',
                manage_type:'',
                retreat_manage_type_name:'',
                approval_num:'',
                advance_ident:'0',
                retreat_reason:'',
                retreat_reason_name: ''
            },
            tableData: [],
            detail: null,
            retreatData: [],        // 离退类别
            treatmentData: [],      // 离退干部现享受待遇
            retreatManageData: [],  // 离退休后管理类别
            retreatReasonData: [],  // 提前退休原因
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.retreat({uid: this.personId}).then( res => {
                this.tableData = res.data.data
                this.$nextTick(() => {
                this.detail = this.tableData[0]
                this.loading = false
                })
            })
        }, */
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
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
                    datacenter.member_retreat_edit(this.formData).then( res => {
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
                    this.$message({ message: '* 为必填项！', type: 'error' });
                    return false;
                }
            });
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'job_title') {
                field_id = 'highest_duty'
                field_name = 'highest_duty_name'
            }else if(type == 'job_rank') {
                field_id = 'former_level'
                field_name = 'former_level_name'
            }
            if(!obj) {
                this.formData[field_id] = ''
                this.formData[field_name] = ''
                return 
            }
            this.formData[field_id] = obj.id
            this.formData[field_name] = obj.value
        },
        getDicData() {
            // 离退类别
            common.getDictData_tree({id: 'retreat_type'}).then( res => {
                this.retreatData = res.data.data
            })
            // 离退干部现享受待遇
            common.getDictData_tree({id: 'now_enjoy_treatment'}).then( res => {
                this.treatmentData = res.data.data
            })
            // 离退休后管理类别
            common.getDictData_tree({id: 'retreat_manage_type'}).then( res => {
                this.retreatManageData = res.data.data
            })
            // 提前退休原因
            common.getDictData_tree({id: 'retreat_reason'}).then( res => {
                this.retreatReasonData = res.data.data
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
            datacenter['member_retreat_info']({id: uid}).then( res => {
                this.loading = false
                if(res.data.data == '' || res.data.data.length == 0) { return }
                this.formData = res.data.data || {}
                this.set0Val(['retreat_type','now_enjoy_treatment','manage_type','retreat_reason'])
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
