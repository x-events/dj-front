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
        <el-table-column prop="进入该基层党组织日期" label="进入该基层党组织日期">
        </el-table-column>
        <el-table-column prop="进入基层党组织名称" label="进入基层党组织名称" >
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
    <div class="data-edit right-form flex-col h100" v-if="formData">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <div class="member-add-form-btn">
            <el-button type="default" icon="el-icon-circle-plus-outline" @click="addItem('form')">添加新组织关系</el-button>
        </div>
        <div class="form-content flex-1 scrollbar">
            <el-form :ref="'form'" :model="formData" label-width="190px" label-suffix=":">
                <div class="fors-item" v-for="(item, index) in formData.g" :key="index" :class="{'editStatus':item.isEdit}">
                    <div class="form-title-box">
                        组织关系信息{{ formData.g.length - index }}
                        <div class="tool">
                            <el-button type="text" @click="editOpt(item,index)">{{ item.isEdit==true?'保存':'编辑' }}</el-button>
                            <el-button type="text" @click="del(item)">删除</el-button>
                        </div>
                    </div>
                    <el-row class="form-row">
                        <el-col :span="24">
                            <el-form-item class="col-name" label="进入基层党组织名称" :prop="'g.'+index+'.basic_org_name'" :rules="permissGroupRules.basic_org_name">
                                <el-input v-model="item.basic_org_name" placeholder="请输入基层党组织名称" maxlength="50" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.basic_org_name" v-else>{{item.basic_org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="进入该基层党组织日期">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">进入该基层党组织日期:</span>
                                </span>
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.basic_org_date" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.basic_org_date" v-else>{{item.basic_org_date || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="接收该党员组织关系类别">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">接收该党员组织关系类别:</span>
                                </span>
                                <selectOpt v-model="item.receive_org_category" placeholder="请选择组织关系类别" :option="orgReceiveData" @input="item.receive_org_category=$event" v-if="item.isEdit" />   
                                <span class="sblock" :title="item.receive_org_category_name" v-else>{{item.receive_org_category_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="进入该基层组织变动类别">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">进入该基层组织变动类别:</span>
                                </span>
                                <el-input v-model="item.org_change_category_name" readonly placeholder="请选择组织变动类别" 
                                @focus="treepickerDialog=true;treeType='org_change_category';treeTitle='组织变动类别'" v-if="item.isEdit"></el-input> 
                                <span class="sblock" :title="item.org_change_category_name" v-else>{{item.org_change_category_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="转往新单位基层党组织名称">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">转往新单位基层党组织名称:</span>
                                </span>
                                <el-input v-model="item.to_basic_org_name" placeholder="请输入党组织名称" maxlength="50" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.to_basic_org_name" v-else>{{item.to_basic_org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="转离该基层党组织变动类别">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">转离该基层党组织变动类别:</span>
                                </span>
                                <el-input v-model="item.leave_org_category_name" readonly placeholder="请选择组织变动类别" 
                                @focus="treepickerDialog=true;treeType='leave_org_category';treeTitle='组织变动类别'" v-if="item.isEdit"></el-input> 
                                <span class="sblock" :title="item.leave_org_category_name" v-else>{{item.leave_org_category_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="转离该基层党组织日期">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">转离该基层党组织日期:</span>
                                </span>
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.leave_basic_org_date" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.leave_basic_org_date" v-else>{{item.leave_basic_org_date || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="党员组织关系有效日期">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">党员组织关系有效日期:</span>
                                </span>
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.party_member_effective_date" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.party_member_effective_date" v-else>{{item.party_member_effective_date || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="转移该党员组织关系类别">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">转移该党员组织关系类别:</span>
                                </span>
                                <selectOpt v-model="item.transfer_org_type" placeholder="请选择组织关系类别" :option="orgReceiveData" @input="item.transfer_org_type=$event" v-if="item.isEdit" />    
                                <span class="sblock" :title="item.transfer_org__name" v-else>{{item.transfer_org__name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="党费缴纳截止日期">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">党费缴纳截止日期:</span>
                                </span>
                                <el-date-picker type="date" placeholder="请选择时间" value-format="yyyy-MM-dd" v-model="item.org_pay_enddate" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.org_pay_enddate" v-else>{{item.org_pay_enddate || ""}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <nodata v-if="formData.g.length == 0" />
        </div>
        <!-- 树级数据 -->
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
    //   required: true,
    },
  },
    components: {selectOpt,treePicker},
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            treepickerDialog: false,        // 树弹窗
            tableData: [],
            detail: null,
            formData: {                 // form model
                g: []
            },
            permissGroupRules: {    // form (循环)rule
                basic_org_name: [{required: true, message: '请输入基层党组织名称!', trigger: 'blur'}],
                // job_name: [{required: true, message: '请选择职务名称!', trigger: 'blur'}],
            },
            editIndex: 0,      // 记住添加哪一条form
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            orgReceiveData: [],
        }
    },
    methods: {
        oninput(len,field,index) {
            if(this.formData.g[index][field] && this.formData.g[index][field].length> len) this.formData.g[index][field]=this.formData.g[index][field].slice(0, len)
        },
        /* getData() {
            this.loading = true
            datacenter.OrgRelationInfo({uid: this.personId}).then( res => {
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
        getDicData() {
            // 接收该党员组织关系类别
            common.getDictData_tree({id: 'receive_org_category'}).then( res => {
                this.orgReceiveData = res.data.data
            })
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            // console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'org_change_category') {
                field_id = 'basic_org_change_category'
                field_name = 'org_change_category_name'
            } else if(type == 'leave_org_category') {
                field_id = 'leave_basic_org_category'
                field_name = 'leave_org_category_name'
            } 
            if(!obj) {
                this.$set(this.formData.g[this.editIndex], field_id, '')
                this.$set(this.formData.g[this.editIndex], field_name, '')
                return 
            }
            this.$set(this.formData.g[this.editIndex], field_id, obj.id)
            this.$set(this.formData.g[this.editIndex], field_name, obj.value)
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
                        datacenter.member_relation_edit(this.formData.g[this.editIndex]).then( res => {
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
                        if(vinfo['g.'+this.editIndex+'.basic_org_name']) {
                            this.$message({ message: vinfo['g.'+this.editIndex+'.basic_org_name'][0].message, type: 'error' });
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
                datacenter.member_relation_info({id: row.id}).then( res => {
                    if(res.data.status  == '200') {
                        this.$set(this.formData.g[index], {}, res.data.data)
                        this.$set(this.formData.g[index], 'isEdit', false)
                        this.set0ValObj(['receive_org_category','transfer_org_type'], this.formData.g[index])
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
                    datacenter.member_relation_del({id: row.id}).then( res => {
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
            datacenter['member_relation_list']({id: uid}).then( res => {
                this.loading = false
                this.formData.g = res.data.data
                this.formData.g.map(item => {
                    this.$set(item, 'isEdit', false)
                    this.$set(item, 'dateArr', [item.start_time, item.end_time])
                    this.$set(item, 'stay_time', item.dateArr.join('-'))
                })
                // this.set0Val(['source','appoint_way','position_status'])
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
        // this.getData();
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
