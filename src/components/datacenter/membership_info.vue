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
        <el-table-column prop="入党时间" label="入党时间">
        </el-table-column>
        <el-table-column prop="批准入党日期" label="批准入党日期" >
        </el-table-column>
        <el-table-column prop="批准入党的党组织名称" label="批准入党的党组织名称">
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
                    <el-form-item class="col-name" label="入党时间">
                        <el-date-picker type="date" placeholder="请选择入党时间" value-format="yyyy-MM-dd" v-model="formData.join_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.join_time" v-else>{{formData.join_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="批准入党日期">
                        <el-date-picker type="date" placeholder="请选择批准入党日期" value-format="yyyy-MM-dd" v-model="formData.approve_join_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.approve_join_time" v-else>{{formData.approve_join_time || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="批准入党的党组织名称">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">批准入党的党组织名称:</span>
                        </span>
                        <el-input v-model="formData.approve_org" placeholder="请输入党组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.approve_org" v-else>{{formData.approve_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="加入中共组织的类别">
                        <el-input v-model="formData.join_type_name" readonly placeholder="请选择类别" 
                        @focus="treepickerDialog=true;treeType='org_rel_type';treeTitle='加入中共组织的类别'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.join_type_name" v-else>{{formData.join_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="当前党籍状态">
                        <selectOpt v-model="formData.join_status" placeholder="请选择党籍状态" :option="joinStateData" @input="formData.join_status=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.join_status_name" v-else>{{formData.join_status_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="入党时所在党支部">
                        <el-input v-model="formData.join_org" placeholder="请输入党组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.join_org" v-else>{{formData.join_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="入党时所在党支部名称补充">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">入党时所在党支部名称补充:</span>
                        </span>
                        <el-input v-model="formData.join_org_sub" placeholder="请输入党组织名称补充" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.join_org_sub" v-else>{{formData.join_org_sub || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党时学历">
                        <selectOpt v-model="formData.education" placeholder="请选择学历" :option="educationData" @input="formData.education=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.education_name" v-else>{{formData.education_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党时工作一线">
                        <selectOpt v-model="formData.situation" placeholder="请选择入党时工作一线" :option="workData" @input="formData.situation=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.situation_name" v-else>{{formData.situation_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党时工作岗位">
                        <el-input v-model="formData.work_post_name" readonly placeholder="请选择入党时工作岗位" 
                        @focus="treepickerDialog=true;treeType='work';treeTitle='入党时工作岗位'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.work_post_name" v-else>{{formData.work_post_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党时新的社会阶层">
                        <el-input v-model="formData.new_social_name" readonly placeholder="请选择入党时新的社会阶层" 
                        @focus="treepickerDialog=true;treeType='newSocial';treeTitle='入党时新的社会阶层'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.new_social_name" v-else>{{formData.new_social_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入党时职称">
                        <el-input v-model="formData.titles_name" readonly placeholder="请选择入党时职称" 
                        @focus="treepickerDialog=true;treeType='titles';treeTitle='入党时职称'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.titles_name" v-else>{{formData.titles_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="转为正式党员日期">
                        <el-date-picker type="date" placeholder="请选择转为正式党员日期" value-format="yyyy-MM-dd" v-model="formData.positive_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.positive_date" v-else>{{formData.positive_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="转正情况">
                        <el-input v-model="formData.positive_status_name" readonly placeholder="请选择入转正情况" 
                        @focus="treepickerDialog=true;treeType='positive_status';treeTitle='转正情况'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.positive_status_name" v-else>{{formData.positive_status_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="延长预备期(月)">
                        <el-input v-model="formData.extended_prepare_period" placeholder="请输入延长预备期" type="number" maxlength="5" :oninput="oninput(5,'extended_prepare_period')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.extended_prepare_period" v-else>{{formData.extended_prepare_period || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="推迟讨论转正(月)">
                        <el-input v-model="formData.postpone_discussion" placeholder="请输入推迟讨论转正" type="number" maxlength="5" :oninput="oninput(5,'postpone_discussion')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.postpone_discussion" v-else>{{formData.postpone_discussion || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="恢复党籍日期">
                        <el-date-picker type="date" placeholder="请选择恢复党籍日期" value-format="yyyy-MM-dd" v-model="formData.recovery_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.recovery_date" v-else>{{formData.recovery_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="恢复党籍原因">
                        <el-input v-model="formData.recovery_reason" placeholder="请输入恢复党籍原因" maxlength="200" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.recovery_reason" v-else>{{formData.recovery_reason || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="离开中共组织日期" prop="apply_time">
                        <el-date-picker type="date" placeholder="请选择离开中共组织日期" value-format="yyyy-MM-dd" v-model="formData.leave_org_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.leave_org_date" v-else>{{formData.leave_org_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="批准离开中共组织的党组织名称">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">批准离开中共组织的党组织名称:</span>
                        </span>
                        <el-input v-model="formData.approve_leave_org" placeholder="请输入党组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.approve_leave_org" v-else>{{formData.approve_leave_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="出党原因">
                        <el-input v-model="formData.leave_reason_name" readonly placeholder="请选择出党原因" 
                        @focus="treepickerDialog=true;treeType='leave_reason';treeTitle='出党原因'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.leave_reason_name" v-else>{{formData.leave_reason_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="离开中共组织的类别">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">离开中共组织的类别:</span>
                        </span>
                        <el-input v-model="formData.leave_type_name" readonly placeholder="请选择中共组织的类别" 
                        @focus="treepickerDialog=true;treeType='leave_rel_type';treeTitle='离开中共组织的类别'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.leave_type_name" v-else>{{formData.leave_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="批准恢复党籍的中共组织名称">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">批准恢复党籍的中共组织名称:</span>
                        </span>
                        <el-input v-model="formData.approve_recovery_org" placeholder="请输入批准恢复党籍的中共组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.approve_recovery_org" v-else>{{formData.approve_recovery_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="恢复党籍时所在的中共组织名称">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">恢复党籍时所在的中共组织名称:</span>
                        </span>
                        <el-input v-model="formData.recovery_org" placeholder="请输入恢复党籍时所在的中共组织名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.recovery_org" v-else>{{formData.recovery_org || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="共青团入党">
                        <el-radio-group v-model="formData.younth_league" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.younth_league=='1'?'是':'否')" v-else>{{(formData.younth_league=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="团员推优入党">
                        <el-radio-group v-model="formData.excellect_younth_league" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.excellect_younth_league=='1'?'是':'否')" v-else>{{(formData.excellect_younth_league=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="知名人士">
                        <el-radio-group v-model="formData.celebrity" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.celebrity=='1'?'是':'否')" v-else>{{(formData.celebrity=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="先进模范人物入党">
                        <el-radio-group v-model="formData.advanced_model" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.advanced_model=='1'?'是':'否')" v-else>{{(formData.advanced_model=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="省部级命名的先进模范人物入党">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">省部级命名的先进模范人物入党:</span>
                        </span>
                        <el-radio-group v-model="formData.advanced_model_pro" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.advanced_model_pro=='1'?'是':'否')" v-else>{{(formData.advanced_model_pro=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="本单位发展标识">
                        <el-radio-group v-model="formData.own_unit_develop" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.own_unit_develop=='1'?'是':'否')" v-else>{{(formData.own_unit_develop=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" /> -->
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
    </div> 
</template>

<script>
import * as common from '@/api/common'
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
            tableData: [],
            detail: null,
            isSave: null,
            confirmShow:false,
            disabledTag: false,
            treepickerDialog: false,        // 树弹窗
            formData: {
                join_time: '',
                approve_join_time: '',
                approve_org: '',
                join_type: '',
                join_type_name: '',
                join_status: '',
                join_status_name: '',
                join_org: '',
                join_org_sub: '',
                education: '',
                education_name: '',
                situation: '',
                situation_name: '',
                work_post: '',
                work_post_name: '',
                new_social: '',
                new_social_name: '',
                titles: '',
                titles_name: '',
                positive_date: '',
                positive_status: '',
                positive_status_name: '',
                extended_prepare_period: '',
                postpone_discussion: '',
                recovery_date: '',
                recovery_reason: '',
                leave_org_date: '',
                approve_leave_org: '',
                leave_reason: '',
                leave_reason_name: '',
                leave_type: '',
                leave_type_name: '',
                approve_recovery_org: '',
                recovery_org: '',
                younth_league: '0',
                excellect_younth_league: '0',
                celebrity: '0',
                advanced_model: '0',
                advanced_model_pro: '0',
                own_unit_develop: '0',
            },
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            joinStateData: [],  // 党籍状态
            educationData: [],  // 入党时学历
            workData: [],       // 工作一线
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.party_membership({uid: this.personId}).then( res => {
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
                    datacenter.member_ship_edit(this.formData).then( res => {
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
        getDicData() {
            // 当前党籍状态
            common.getDictData_tree({id: 'join_status'}).then( res => {
                this.joinStateData = res.data.data
            })
            // 学历
            common.getDictData_tree({id: 11}).then( res => {
                this.educationData = res.data.data
            })
            // 入党时工作一线(工作一线情况)
            common.getDictData_tree({id: 12}).then( res => {
                this.workData = res.data.data
            })
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            // console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'org_rel_type') {
                field_id = 'join_type'
                field_name = 'join_type_name'
            }else if(type == 'work') {
                field_id = 'work_post'
                field_name = 'work_post_name'
            }else if(type == 'newSocial') {
                field_id = 'new_social'
                field_name = 'new_social_name'
            }else if(type == 'titles') {
                field_id = 'titles'
                field_name = 'titles_name'
            }else if(type == 'positive_status') {
                field_id = 'positive_status'
                field_name = 'positive_status_name'
            }else if(type == 'leave_rel_type') {
                field_id = 'leave_type'
                field_name = 'leave_type_name'
            }else if(type == 'leave_reason') {
                field_id = 'leave_reason'
                field_name = 'leave_reason_name'
            }
            if(!obj) {
                this.formData[field_id] = ''
                this.formData[field_name] = ''
                return 
            }
            this.formData[field_id] = obj.id
            this.formData[field_name] = obj.value
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
            datacenter['member_ship_info']({id: uid}).then( res => {
                this.loading = false
                if(res.data.data == '' || res.data.data.length == 0) { return }
                this.formData = res.data.data || {}
                this.set0Val(['leave_reason','join_status','education','situation'])
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
