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
        <el-table-column prop="党费基数" label="党费基数">
        </el-table-column>
        <el-table-column prop="特殊党员" label="特殊党员" >
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
                    <el-form-item class="col-name" label="党费基数">
                        <el-input v-model="formData.party_dues_base" placeholder="请输入党费基数" type="number" maxlength="10" :oninput="oninput(10,'party_dues_base')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.party_dues_base" v-else>{{formData.party_dues_base || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="特殊党员">
                        <selectOpt v-model="formData.special_member" placeholder="请选择特殊党员类型" :option="specialMemberData" @input="formData.special_member=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.special_member_name" v-else>{{formData.special_member_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="参加实践锻炼服务人民群众的主要方式">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">参加实践锻炼服务人民群众的主要方式:</span>
                        </span>
                        <el-input v-model="formData.practice_way_name" readonly placeholder="请选择主要方式" 
                        @focus="treepickerDialog=true;treeType='practice_way';treeTitle='主要方式'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.practice_way_name" v-else>{{formData.practice_way_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="已享受优抚对象抚恤补助">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">已享受优抚对象抚恤补助:</span>
                        </span>
                        <el-radio-group v-model="formData.already_subsidy" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.already_subsidy=='1'?'是':'否')" v-else>{{(formData.already_subsidy=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="老党员">
                        <el-radio-group v-model="formData.old_member" v-if="!disabledTag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                        <span class="sblock" :title="(formData.old_member=='1'?'是':'否')" v-else>{{(formData.old_member=='1'?'是':'否') || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="近三年参加党组织培训次数">
                        <span class="col-name slot-form-label" slot="label">
                            <span class="sblock">近三年参加党组织培训次数:</span>
                        </span>
                        <el-input v-model="formData.situation" placeholder="请输入近三年参加党组织培训次数" type="number" maxlength="5" :oninput="oninput(5,'situation')" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.situation" v-else>{{formData.situation || ""}}</span>
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
                party_dues_base:'',
                special_member:'',
                special_member_name:'',
                practice_way:'',
                practice_way_name:'',
                already_subsidy:'0',
                old_member:'0',
                situation:''
            },
            specialMemberData: [],      // specialMemberData
            tableData: [],
            detail: null
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.member_sup_info({uid: this.personId}).then( res => {
                this.tableData = res.data.data
                this.$nextTick(() => {
                this.detail = this.tableData[0]
                this.loading = false
                })
            })
        }, */
        checkDetail(index) {
            this.detail = this.tableData[index]
            console.log(this.detail);
        },
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
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
                    datacenter.member_supplement_edit(this.formData).then( res => {
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
            // console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'practice_way') {
                field_id = 'practice_way'
                field_name = 'practice_way_name'
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
            // 特殊党员
            common.getDictData_tree({id: 'special_member'}).then( res => {
                this.specialMemberData = res.data.data
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
            datacenter['member_supplement_info']({id: uid}).then( res => {
                this.loading = false
                if(res.data.data == '' || res.data.data.length == 0) { return }
                this.formData = res.data.data || {}
                this.set0Val(['special_member'])
                this.formData['party_dues_base'] = Number(this.formData['party_dues_base'])
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
