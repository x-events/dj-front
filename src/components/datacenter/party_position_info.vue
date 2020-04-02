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
        <el-table-column prop="任职党组织名称" label="任职党组织名称">
        </el-table-column>
        <el-table-column prop="任职党组织名称补充" label="任职党组织名称补充" >
        </el-table-column>
        <el-table-column prop="任职方式" label="任职方式">
        </el-table-column>
        <el-table-column prop="职务名称" label="职务名称">
        </el-table-column>
        <el-table-column prop="任职开始日期" label="任职起始日期">
        </el-table-column>
        <el-table-column prop="当前任职状态" label="当前任职状态">
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
  </div>  --> 
    <div class="data-edit right-form flex-col h100" v-if="formData">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <!-- <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":" v-loading="loading">
            <el-row class="form-row">
            </el-row>
        </el-form> -->
        <div class="member-add-form-btn">
            <el-button type="default" icon="el-icon-circle-plus-outline" @click="addItem('form')">添加新职务信息</el-button>
        </div>
        <div class="form-content flex-1 scrollbar">
            <el-form :ref="'form'" :model="formData" :rules="rules" label-width="190px" label-suffix=":">
                <div class="fors-item" v-for="(item, index) in formData.g" :key="index" :class="{'editStatus':item.isEdit}">
                    <div class="form-title-box">
                        党内职务信息{{ formData.g.length - index }}
                        <div class="tool">
                            <el-button type="text" @click="editOpt(item,index)">{{ item.isEdit==true?'保存':'编辑' }}</el-button>
                            <el-button type="text" @click="del(item)">删除</el-button>
                        </div>
                    </div>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item class="col-name" label="任职党组织" :prop="'g.'+index+'.org_name'" :rules="permissGroupRules.org_name">
                                <el-input v-model="item.org_name" readonly placeholder="请选择党组织" v-if="item.isEdit">
                                    <el-button slot="suffix" size="mini" @click="pickerDialog=true;editIndex=index">党组织库选择</el-button>
                                    <el-button slot="suffix" size="mini" @click="handleClick('org')">手动添加</el-button>
                                </el-input>
                                <span class="sblock" :title="item.org_name" v-else>{{item.org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="任职党组织名称补充">
                                <el-input v-model="item.org_sub" placeholder="请输入任职党组织名称补充" maxlength="50" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.org_sub" v-else>{{item.org_sub || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="任职方式">
                                <selectOpt v-model="item.appoint_way" placeholder="请选择任职方式" :option="takeWayData" @input="item.appoint_way=$event" v-if="item.isEdit" /> 
                                <span class="sblock" :title="item.appoint_way_name" v-else>{{item.appoint_way_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="职务" :prop="'g.'+index+'.party_position_name'" :rules="permissGroupRules.party_position_name">
                                <el-input v-model="item.party_position_name" readonly placeholder="请选择职务" 
                                @focus="treepickerDialog=true;treeType='duty';treeTitle='职务'" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.party_position_name" v-else>{{item.party_position_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item class="col-name" label="任职开始时间">
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.start_time" style="width: 100%;" v-if="item.isEdit"></el-date-picker>
                                <span class="sblock" :title="item.start_time" v-else>{{item.start_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="任职结束时间">
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.end_time" style="width: 100%;" v-if="item.isEdit"></el-date-picker>
                                <span class="sblock" :title="item.end_time" v-else>{{item.end_time || ""}}</span>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="12">
                            <el-form-item class="col-name" label="任职期限">
                                <el-date-picker type="monthrange" placeholder="请选择时间" format="yyyy年MM月" value-format="yyyy-MM" v-model="item.dateArr" style="width: 100%;" @change="changeMonth" :readonly="!item.isEdit"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="任职年限(年)">
                                <el-input v-model="item.tenure" placeholder="请输入任职年限" type="number" maxlength="5" :oninput="oninput(5,'tenure',index)" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.tenure" v-else>{{item.tenure || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="连续任职起始日期">
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.continue_start_time" style="width: 100%;" v-if="item.isEdit"></el-date-picker>
                                <span class="sblock" :title="item.continue_start_time" v-else>{{item.continue_start_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="连任届次">
                                <el-input v-model="item.continue_times" placeholder="请输入连任届次" type="number" maxlength="5" :oninput="oninput(5,'continue_times',index)" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.continue_times" v-else>{{item.continue_times || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item class="col-name" label="党内职务排序">
                                <el-input v-model="item.position_order" placeholder="请输入党内职务排序" type="number" maxlength="10" :oninput="oninput(10,'position_order',index)" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.position_order" v-else>{{item.position_order || ""}}</span>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="24">
                            <el-form-item class="col-name" label="当前任职状态">
                                <selectOpt v-model="item.position_status" placeholder="请选择当前任职状态" :option="takeStateData" @input="item.position_status=$event" v-if="item.isEdit" /> 
                                <span class="sblock" :title="item.position_status_name" v-else>{{item.position_status_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="来源(非公企业填写)">
                                <selectOpt v-model="item.source" placeholder="请选择来源" :option="sourceData" @input="item.source=$event" v-if="item.isEdit" /> 
                                <span class="sblock" :title="item.source_name" v-else>{{item.source_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="在居委会兼职情况">
                                <el-input v-model="item.neighborhood_committee_status" placeholder="请输入兼职情况" maxlength="50" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.neighborhood_committee_status" v-else>{{item.neighborhood_committee_status || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="分管(人事)工作">
                                <el-input v-model="item.managed_work" placeholder="请输入分管工作" maxlength="50" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.managed_work" v-else>{{item.managed_work || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="兼职">
                                <el-radio-group v-model="item.part_time" v-if="item.isEdit">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                                <span class="sblock" :title="(item.part_time=='1'?'是':'否')" v-else>{{(item.part_time=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="递补标识">
                                <el-radio-group v-model="item.fill_in_proper_order" v-if="item.isEdit">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                                <span class="sblock" :title="(item.fill_in_proper_order=='1'?'是':'否')" v-else>{{(item.fill_in_proper_order=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <nodata v-if="formData.g.length == 0" />
        </div>
        <!-- 党组织 -->
        <org-picker :visible="pickerDialog" @close="pickerDialog=false" @choosen="choosenPicker" />
        <!-- 手动选择 -->
        <addInputText :visible="addDialog" :type="handleType" @close="addDialog=false" title="党组织" @choosen="addResult" />
        <!-- 树级数据 -->
        <treePicker :visible="treepickerDialog" @close="treepickerDialog=false" :typeId="treeType" :title="treeTitle" @choosen="treechoosenPicker" />
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import orgPicker from '@/components/orgPicker'
import selectOpt from '@/components/datacenter/common/selectOpt'
import addInputText from '@/components/datacenter/widgets/add_input_text'
import treePicker from '@/components/datacenter/widgets/treePicker'
import { log } from 'util';
export default {
    beforeRouteLeave (to, from, next) {
        if(this.getIsEditState() == false) {
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
            // required: true,
        },
    },
    components: {
        orgPicker,selectOpt,addInputText,treePicker
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            tableData: [],
            detail: null,
            formData: {                 // form model
                g: [
                    /* {
                        org_id:'',
                        org_name:'',
                        org_sub:'',
                        appoint_way: '',
                        party_position:'',
                        start_time:'',
                        end_time:'',
                        tenure:'',
                        continue_start_time: '',
                        continue_times:'',
                        position_order:'',
                        position_status:'',
                        source:'',
                        neighborhood_committee_status: '',
                        managed_work:'',
                        part_time:'',
                        fill_in_proper_order:'',
                    } */
                ]
            },
            // formData: [],
            rules: {},              // form rule
            permissGroupRules: {    // form (循环)rule
                org_name: [{required: true, message: '请选择党组织!', trigger: 'blur'}],
                // appoint_way: [{required: true, message: '请选择任职方式!', trigger: 'blur'}],
                party_position_name: [{required: true, message: '请选择职务!', trigger: 'blur'}],
            },
            editIndex: 0,      // 记住添加哪一条form
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            handleType: '',
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            disabledTag: null,
            pickerDialog: false,
            addDialog: false,
            treepickerDialog: false,        // 树弹窗
            takeWayData: [],        // 任职方式
            sourceData: [],
            takeStateData:[],
        }
    },
    methods: {
        oninput(len,field,index) {
            if(this.formData.g[index][field] && this.formData.g[index][field].length> len) this.formData.g[index][field]=this.formData.g[index][field].slice(0, len)
        },
        /* checkDetail(index) {
            this.detail = this.tableData[index]
            console.log(this.detail);
        }, */
        back() {
            this.$router.push({name: '党员信息', params: this.$route.query})
        },
        changeMonth(val) {
            // console.log('month',val);
            let start = new Date(val[0]).getTime();
            let end = new Date(val[1]).getTime();
            let rang = (((end - start) / 1000) / 24 / 3600 / 365).toString()
            if((rang.indexOf('.') > -1)) {
                rang = Number(rang).toFixed(1)
            }
            this.$set(this.formData.g[this.editIndex], 'tenure', rang)
            this.$set(this.formData.g[this.editIndex], 'start_time', val[0])
            this.$set(this.formData.g[this.editIndex], 'end_time', val[1])
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'duty') {
                field_id = 'party_position'
                field_name = 'party_position_name'
            }
            if(!obj) {
                // this.formData[field_id] = ''
                // this.formData[field_name] = ''
                this.$set(this.formData.g[this.editIndex], field_id, '')
                this.$set(this.formData.g[this.editIndex], field_name, '')
                return 
            }
            // this.formData[field_id] = obj.id
            // this.formData[field_name] = obj.value

            this.$set(this.formData.g[this.editIndex], field_id, obj.id)
            this.$set(this.formData.g[this.editIndex], field_name, obj.value)
        },
        getDicData() {
            // 任职方式
            common.getDictData_tree({id: 'appoint_way'}).then( res => {
                this.takeWayData = res.data.data
            })
            // 来源(非公企业填写)
            common.getDictData_tree({id: 'source'}).then( res => {
                this.sourceData = res.data.data
            })
            // 任职状态
            common.getDictData_tree({id: 'position_status'}).then( res => {
                this.takeStateData = res.data.data
            })
        },
        // 本地删除
        handleClose(data, tag) {
            data.splice(data.indexOf(tag), 1);
        },
        // 获取是否有正在编辑状态，是则return
        getIsEditState() {
            let idE = []
            this.formData.g.map(g=>{idE.push(g.isEdit)})
            if(idE.indexOf(true) != -1) { 
                // this.$message({ message: '请先保存!', type: 'warning' });
                return false; 
            }
        },
        // 添加配置
        addItem(formName){
            this.$refs[formName].validate((valid, vinfo) => {
                if(this.getIsEditState() == false) {
                    this.$message({ message: '请先保存!', type: 'warning' });
                    return
                }
                if (valid) {
                    // this.formData.g.push({});
                    // this.editIndex = this.formData.g.length - 1
                    this.formData.g.unshift({
                        isEdit: true
                    });
                    this.editIndex = 0
                    this.disabledTag = true
                } else {
                    return false;
                }
            });
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            if(!obj) {
                this.formData.g[this.editIndex].org_name = ''
                this.formData.g[this.editIndex].org_id = ''
                return 
            }
            this.$set(this.formData.g[this.editIndex], 'org_name', obj.name)
            this.$set(this.formData.g[this.editIndex], 'org_id', obj.id)
        },
        // 手动添加
        handleClick(type) {
            this.addDialog = true
            this.handleType = type
        },
        // 手动添加完成
        addResult(text, type) {
            if(type == 'org') {
                this.$set(this.formData.g[this.editIndex], 'org_name', text)
                this.$set(this.formData.g[this.editIndex], 'org_id', '')
            }
        },
        // 点击编辑按钮
        editOpt(row,index) {
            this.editIndex = index
            if(row.isEdit) {
                this.$refs['form'].validate((valid, vinfo) => {
                    if (valid) {
                        if(this.$route.query.id) {// 修改
                            this.formData.g[this.editIndex].uid = this.$route.query.id
                        }else {
                            let sessionUid = sessionStorage.getItem('add_m_uid') || ''
                            this.formData.g[this.editIndex].uid = sessionUid
                        }
                        datacenter.member_duty_edit(this.formData.g[this.editIndex]).then( res => {
                            if(res.data.status  == '200') {
                                row.isEdit = !row.isEdit
                                this.$message({ message: res.data.statusCode, type: 'success' });
                                // this.btnTag = 1;
                                this.getData();
                                this.disabledTag = null
                            }else {
                                this.$message({ message: res.data.statusCode, type: 'error' });
                            }
                        })
                    } else {
                        if(vinfo['g.'+this.editIndex+'.org_name']) {
                            this.$message({ message: vinfo['g.'+this.editIndex+'.org_name'][0].message, type: 'error' });
                        }else if(vinfo['g.'+this.editIndex+'.party_position_name']) {
                            this.$message({ message: vinfo['g.'+this.editIndex+'.party_position_name'][0].message, type: 'error' });
                        }
                        return false;
                    }
                });
            }else{
                if(this.getIsEditState() == false) {
                    this.$message({ message: '请先保存!', type: 'warning' });
                    return
                }
                // 获取当前编辑新数据
                datacenter.member_duty_info({id: row.id}).then( res => {
                    if(res.data.status  == '200') {
                        this.$set(this.formData.g[index], {}, res.data.data)
                        this.$set(this.formData.g[index], 'isEdit', false)
                        this.set0ValObj(['source','appoint_way','position_status'], this.formData.g[index])
                        this.disabledTag = false
                        row.isEdit = !row.isEdit
                    }
                })
            }
            return
            this.btnTag = 2;
            this.disabledTag = false
            this.getData();
        },
        del(row) {
            if(!row.id) {
                // 本地删除
                this.handleClose(this.formData.g, row)
            }else {
                this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                    datacenter.member_duty_del({id: row.id}).then( res => {
                        if(res.data.status == '200') {
                            this.getData()
                            this.$message({ message: res.data.statusCode, type: 'success' });
                        }else {
                            this.$message({ message: res.data.statusCode, type: 'error' });
                        }
                    })
                })
                .catch(() => {});
            }
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
            this.loading = true
            datacenter['member_duty_list']({id: uid}).then( res => {
                this.loading = false
                this.formData.g = res.data.data
                this.formData.g.map(item => {
                    this.$set(item, 'isEdit', false)
                    this.$set(item, 'dateArr', [item.start_time, item.end_time])
                    this.$set(item, 'stay_time', item.dateArr.join('-'))
                })
                this.set0Val(['source','appoint_way','position_status'])
                /* if(this.formData.g.length == 0) {
                    this.formData.g = [{isEdit:true}]
                    this.disabledTag = false
                } */
            }) 
            return
            this.loading = true
            datacenter.party_position({uid: this.personId}).then( res => {
                this.tableData = res.data.data
                this.$nextTick(() => {
                this.detail = this.tableData[0]
                this.loading = false
                })
            })
        },
        // 清空为0的数据 全局formData
        set0Val(fieldArr) {
            this.formData.g.map((item,index)=> {
                for (const key in fieldArr) {
                    item[fieldArr[key]] = item[fieldArr[key]] == '0'?'':item[fieldArr[key]]
                }
            })
        },
        // 清空为0的数据 对象形式
        set0ValObj(fieldArr, obj) {
            for (const key in fieldArr) {
                obj[fieldArr[key]] = obj[fieldArr[key]] == '0'?'':obj[fieldArr[key]];
            }
        }
  },
    created() {
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        this.getDicData()
        this.getData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
}
</script>

<style scoped>
.title-box { margin-bottom: 10px !important; }
.el-form { margin-bottom: 0 !important; }
</style>
