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
        <el-table-column prop="学历" label="学历">
        </el-table-column>
        <el-table-column prop="入学日期" label="入学日期" >
        </el-table-column>
        <el-table-column prop="毕(肄)业日期" label="毕(肄)业日期">
        </el-table-column>
        <el-table-column prop="学校(单位)名称" label="学校(单位)名称">
        </el-table-column>
        <el-table-column prop="学制" label="学制">
        </el-table-column>
        <el-table-column prop="所学专业名称" label="所学专业名称">
        </el-table-column>
        <el-table-column prop="所学专业类别" label="所学专业类别">
        </el-table-column>
        <el-table-column prop="学历教育类别" label="学历教育类别">
        </el-table-column>
        <el-table-column prop="学位" label="学位">
        </el-table-column>
        <el-table-column prop="学位授予单位" label="学位授予单位">
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
                    <el-form-item class="col-name" label="学历">
                        <selectOpt v-model="formData.education_id" placeholder="请选择学历" :option="educationData" @input="formData.education_id=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.education_name" v-else>{{formData.education_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学历补充">
                        <el-input v-model="formData.education_add" placeholder="请输入学历补充" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.education_add" v-else>{{formData.education_add || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="入学日期">
                        <el-date-picker type="date" placeholder="请选择入学日期" value-format="yyyy-MM-dd" v-model="formData.entry_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.entry_date" v-else>{{formData.entry_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="毕(肄)业日期">
                        <el-date-picker type="date" placeholder="请选择毕(肄)业日期" value-format="yyyy-MM-dd" v-model="formData.graduation_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.graduation_date" v-else>{{formData.graduation_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学校(单位)名称">
                        <el-input v-model="formData.school_name" placeholder="请输入名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.school_name" v-else>{{formData.school_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学习完成情况">
                        <selectOpt v-model="formData.learning_situation_id" placeholder="请选择学历" :option="learnFinshData" @input="formData.learning_situation_id=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.learning_situation_name" v-else>{{formData.learning_situation_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="毕业院校类型">
                        <el-input v-model="formData.graduate_school_type_name" readonly placeholder="请选择毕业院校类型" 
                        @focus="treepickerDialog=true;treeType='graduate_school_type';treeTitle='毕业院校类型'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.graduate_school_type_name" v-else>{{formData.graduate_school_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学制">
                        <el-input v-model="formData.school_system" placeholder="请输入学制" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.school_system" v-else>{{formData.school_system || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="所学专业名称">
                        <el-input v-model="formData.profession_name" placeholder="请输入所学专业名称" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.profession_name" v-else>{{formData.profession_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="所学专业类别">
                        <el-input v-model="formData.profession_type_name" readonly placeholder="请选择专业类别" 
                        @focus="treepickerDialog=true;treeType='profession_type';treeTitle='专业类别'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.profession_type_name" v-else>{{formData.profession_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学历教育类别">
                        <selectOpt v-model="formData.education_type" placeholder="请选择学历教育类别" :option="educationTypeData" @input="formData.education_type=$event" v-if="!disabledTag" />
                        <span class="sblock" :title="formData.education_type_name" v-else>{{formData.education_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学位">
                        <el-input v-model="formData.degree_name" readonly placeholder="请选择学位" 
                        @focus="treepickerDialog=true;treeType='education_degree';treeTitle='学位'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.degree_name" v-else>{{formData.degree_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学位补充">
                        <el-input v-model="formData.degree_add" placeholder="请输入学位补充" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.degree_add" v-else>{{formData.degree_add || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="学位授予日期">
                        <el-date-picker type="date" placeholder="请选择学位授予日期" value-format="yyyy-MM-dd" v-model="formData.degree_date" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                        <span class="sblock" :title="formData.degree_date" v-else>{{formData.degree_date || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="第二学位">
                        <el-input v-model="formData.two_degree_name" readonly placeholder="请选择第二学位" 
                        @focus="treepickerDialog=true;treeType='two_education_degree';treeTitle='第二学位'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.two_degree_name" v-else>{{formData.two_degree_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="col-name" label="第二学位所学专业类别">
                        <el-input v-model="formData.two_degree_type_name" readonly placeholder="请选择专业类别" 
                        @focus="treepickerDialog=true;treeType='two_profession_type';treeTitle='专业类别'" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.two_degree_type_name" v-else>{{formData.two_degree_type_name || ""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="col-name" label="学位授予单位">
                        <el-input v-model="formData.degree_awarding_unit" placeholder="请输入学位授予单位" maxlength="50" v-if="!disabledTag"></el-input>
                        <span class="sblock" :title="formData.degree_awarding_unit" v-else>{{formData.degree_awarding_unit || ""}}</span>
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
  props: {
    personId: {
      type: [String, Number],
      default: '',
    //   required: true,
    },
  },
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
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            formData: {
                education_id:'',
                education_add:'',
                entry_date:'',
                graduation_date:'',
                school_name:'',
                learning_situation_id:'',
                graduate_school_type:'',
                graduate_school_type_name:'',
                school_system:'',
                profession_name:'',
                profession_type:'',
                profession_type_name: '',
                education_type:'',
                degree_id:'',
                degree_name:'',
                degree_add:'',
                degree_date:'',
                two_degree:'',
                two_degree_name:'',
                two_degree_type:'',
                two_degree_type_name:'',
                degree_awarding_unit:'',
            },
            educationData: [],
            learnFinshData: [],
            majorTypeData: [],
            educationTypeData: [],
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.educationInfo({uid: this.personId}).then( res => {
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
                    datacenter.member_education_edit(this.formData).then( res => {
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
            if(type == 'profession_type') {
                field_id = 'profession_type'
                field_name = 'profession_type_name'
            }else if(type == 'two_profession_type') {
                field_id = 'two_degree_type'
                field_name = 'two_degree_type_name'
            }else if(type == 'education_degree') {
                field_id = 'degree_id'
                field_name = 'degree_name'
            }else if(type == 'two_education_degree') {
                field_id = 'two_degree'
                field_name = 'two_degree_name'
            }else if(type == 'graduate_school_type') {
                field_id = 'graduate_school_type'
                field_name = 'graduate_school_type_name'
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
            // 学历
            common.getDictData_tree({id: 11}).then( res => {
                this.educationData = res.data.data
            })
            // 学习完成情况
            common.getDictData_tree({id: 'learning_situation'}).then( res => {
                this.learnFinshData = res.data.data
            })
            // 所学专业类别
            common.getDictData_tree({id: 'profession_type'}).then( res => {
                this.majorTypeData = res.data.data
            })
            // 学历教育类别 
            common.getDictData_tree({id: 'education_type'}).then( res => {
                this.educationTypeData = res.data.data
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
            datacenter['member_education_info']({id: uid}).then( res => {
                this.loading = false
                if(res.data.data == '' || res.data.data.length == 0) { return }
                this.formData = res.data.data || {}
            }) 
        },
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
