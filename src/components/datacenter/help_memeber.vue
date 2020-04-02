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
        <el-table-column prop="享受帮扶起始时间" label="享受帮扶起始时间">
        </el-table-column>
        <el-table-column prop="享受帮扶截止时间" label="享受帮扶截止时间" >
        </el-table-column>
        <el-table-column prop="享受帮扶形式" label="享受帮扶形式">
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
  </div>   -->
    <div class="data-edit right-form flex-col h100" v-if="formData">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <div class="member-add-form-btn">
            <el-button type="default" icon="el-icon-circle-plus-outline" @click="addItem('form')">添加困难党员享受帮扶信息</el-button>
        </div>
        <div class="form-content flex-1 scrollbar">
            <el-form :ref="'form'" :model="formData" label-width="190px" label-suffix=":">
                <div class="fors-item" v-for="(item, index) in formData.g" :key="index" :class="{'editStatus':item.isEdit}">
                    <div class="form-title-box">
                        困难党员享受帮扶信息{{ formData.g.length - index }}
                        <div class="tool">
                            <el-button type="text" @click="editOpt(item,index)">{{ item.isEdit==true?'保存':'编辑' }}</el-button>
                            <el-button type="text" @click="del(item)">删除</el-button>
                        </div>
                    </div>
                    <el-row class="form-row">
                        <el-col :span="12">
                            <el-form-item class="col-name" label="享受帮扶起始时间" :prop="'g.'+index+'.start_time'" :rules="permissGroupRules.start_time">
                                <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="item.start_time" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.start_time" v-else>{{item.start_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="享受帮扶截止时间">
                                <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="item.end_time" style="width: 100%;" v-if="item.isEdit"></el-date-picker>  
                                <span class="sblock" :title="item.end_time" v-else>{{item.end_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="享受帮扶形式">
                                <selectOpt v-model="item.helped_type" placeholder="请选择享受帮扶形式" :option="helpedTypeData" @input="item.helped_type=$event" v-if="item.isEdit" /> 
                                <span class="sblock" :title="item.helped_type_name" v-else>{{item.helped_type_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="享受帮扶的金额(元)">
                                <el-input v-model="item.helped_money" placeholder="请输入享受帮扶的金额" type="number" maxlength="10" :oninput="oninput(10,'helped_money',index)" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.helped_money" v-else>{{item.helped_money || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="享受帮扶的级别">
                                <el-input v-model="item.helped_level_name" readonly placeholder="请选择享受帮扶级别" 
                                @focus="treepickerDialog=true;treeType='helped_level';treeTitle='享受帮扶级别'" v-if="item.isEdit"></el-input>  
                                <span class="sblock" :title="item.helped_level_name" v-else>{{item.helped_level_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="享受帮扶具体情况说明">
                                <span class="col-name slot-form-label" slot="label">
                                    <span class="sblock">享受帮扶具体情况说明:</span>
                                </span>
                                <el-input v-model="item.helped_description" type="textarea" :rows="3" placeholder="请输入享受帮扶具体情况说明" maxlength="300" v-if="item.isEdit"></el-input>
                                <span class="sblock" :title="item.helped_description" v-else>{{item.helped_description || ""}}</span>
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
            formData: {                 // form model
                g: []
            },
            permissGroupRules: {    // form (循环)rule
                start_time: [{required: true, message: '请选择享受帮扶起始时间!', trigger: 'blur'}],
            },
            editIndex: 0,      // 记住添加哪一条form
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            treeType: '',       // tree下拉框类型
            treeTitle: '',      // tree下拉框title
            helpedTypeData: [],     // 享受帮扶形式
            tableData: [],
            detail: null
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.member_helped({uid: this.personId}).then( res => {
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
        oninput(len,field,index) {
            if(this.formData.g[index][field] && this.formData.g[index][field].length> len) this.formData.g[index][field]=this.formData.g[index][field].slice(0, len)
        },
        back() {
            this.$router.push({name: '党员信息', params: this.$route.query})
        },
        getDicData() {
            // 享受帮扶形式
            common.getDictData_tree({id: 'helped_type'}).then( res => {
                this.helpedTypeData = res.data.data
            })
        },
        // 树下拉列表
        treechoosenPicker(type, obj) {
            // console.log('obj',obj);
            let field_id = '';
            let field_name = '';
            if(type == 'helped_level') {
                field_id = 'helped_level'
                field_name = 'helped_level_name'
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
                        datacenter.member_helped_edit(this.formData.g[this.editIndex]).then( res => {
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
                        if(vinfo['g.'+this.editIndex+'.start_time']) {
                            this.$message({ message: vinfo['g.'+this.editIndex+'.start_time'][0].message, type: 'error' });
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
                datacenter.member_helped_info({id: row.id}).then( res => {
                    if(res.data.status  == '200') {
                        this.$set(this.formData.g[index], {}, res.data.data)
                        this.$set(this.formData.g[index], 'isEdit', false)
                        this.set0ValObj(['helped_type'], this.formData.g[index])
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
                    datacenter.member_helped_del({id: row.id}).then( res => {
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
            datacenter['member_helped_list']({id: uid}).then( res => {
                this.loading = false
                this.formData.g = res.data.data
                this.formData.g.map(item => {
                    this.$set(item, 'isEdit', false)
                })
                this.set0Val(['helped_type'])
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