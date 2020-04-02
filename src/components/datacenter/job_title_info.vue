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
        <el-table-column prop="专业技术任职资格" label="专业技术任职资格">
        </el-table-column>
        <el-table-column prop="取得资格日期" label="取得资格日期" >
        </el-table-column>
        <el-table-column prop="取得资格途径" label="取得资格途径">
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
    <div class="data-edit right-form flex-col h100" v-if="formData" :class="{'editStatus':!disabledTag}">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
                <el-button type="primary" v-if="btnTag == 0" @click="submitForm('formForm')">添加</el-button>
                <el-button type="primary" v-if="btnTag == 1 && $root.datacenter_op_auth.edit == 1" @click="editOpt">编辑</el-button>
                <!-- <el-button type="primary" v-if="btnTag == 2" @click="cancelOpt">取消</el-button> -->
                <el-button type="primary" v-if="btnTag == 2" @click="submitForm('formForm')">保存</el-button>
            </div>
        </div>
        <el-form :model="formData"  :rules="formRule" ref="formForm" class="shadow-table flex-1" v-loading="loading">		
			<el-table :data="formData.g" stripe border height="100%" style="width: 100%">
				<el-table-column label="uid" prop="uid" v-if="false">
					<template slot-scope="scope" >
                        <input :value="scope.row.professional==''?$route.query.id:''">
					</template>
                </el-table-column>
				<el-table-column label="专业技术任职资格" min-width="50" align="center">
                    <template slot="header" slot-scope="scope"><span class="slot-header-star">*</span>专业技术任职资格</template>
					<template slot-scope="scope" >
						<el-form-item class="col-name" :prop="'g.' + scope.$index + '.professional'" :rules='formRule.professional'>
                            <selectOpt v-model="scope.row.professional" placeholder="请选择任职资格名称" :option="takeQuaData" @input="scope.row.professional=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="scope.row.professional_name" v-else>{{scope.row.professional_name || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="取得资格日期" min-width="50" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="scope.row.obtain_time" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="scope.row.obtain_time" v-else>{{scope.row.obtain_time || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="取得资格途径" min-width="50" align="center">
                    <template slot="header" slot-scope="scope"><span class="slot-header-star">*</span>取得资格途径</template>
					<template slot-scope="scope" >
						<el-form-item class="col-name" :prop="'g.' + scope.$index + '.obtain_way'" :rules='formRule.obtain_way'>
				       		<!-- <el-input  v-model="scope.row.professional" size="small" :maxlength="30" v-if="!disabledTag"></el-input> -->
                            <selectOpt v-model="scope.row.obtain_way" placeholder="请选择任职资格名称" :option="gainWayData" @input="scope.row.obtain_way=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="scope.row.obtain_way_name" v-else>{{scope.row.obtain_way_name || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="80">
					<template slot-scope="scope">
						<el-button type="default" :disabled="disabledTag" @click="handleClose(formData.g,scope.row)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
            <div class="add-table-line member-add-form-btn" v-if="!disabledTag">
                <el-button icon="el-icon-circle-plus-outline" @click="addItem('formForm')">添加</el-button>
            </div>
		</el-form>
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
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
    props: {
        personId: {
        type: [String, Number],
        default: '',
        //   required: true,
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    components: {
        selectOpt
    },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            tableData: [],
            detail: null,
            disabledTag: false,
            formData: {
                g: []
            },
            formRule: {
                professional: [ { required: true, message: '请选择任职资格名称!', trigger: 'blur' } ],
                // obtain_time: [ { required: true, trigger: 'blur' }],
                obtain_way: [ { required: true, message: '请选择请选择途径内容!', trigger: 'blur' }],
            },
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            removeSealDescriptionIdArray:[],//要删除的table每一行 的SealDescriptionId数组
            takeQuaData: [],                // 专业技术任职资格
            gainWayData: [],                // 取得资格途径
        }
    },
    methods: {
        checkDetail(index) {
            this.detail = this.tableData[index]
            console.log(this.detail);
        },
        back() {
            this.$router.push({name: '党员信息', params: this.$route.query})
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid,vinfo) => {
                if (valid) {
                    if(this.$route.query.id) {// 修改
                        this.formData.uid = this.$route.query.id
                    }else {
                        let sessionUid = sessionStorage.getItem('add_m_uid') || ''
                        this.formData.uid = sessionUid
                    }
                    let params = {
                        uid: this.formData.uid,
                        data: this.formData.g
                    }
                    datacenter.member_title_edit(params).then( res => {
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
                    for (const key in vinfo) {
                        if(key.indexOf('professional') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                            return
                        } else if(key.indexOf('obtain_way') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                        }
                    }
                    return false;
                }
            });
        },
        getDicData() {
            // 专业技术任职资格
            common.getDictData_tree({id: 'job_title_profession'}).then( res => {
                this.takeQuaData = res.data.data
            })
            // 取得资格途径
            common.getDictData_tree({id: 'job_obtain_way'}).then( res => {
                this.gainWayData = res.data.data
            })
        },
        /* getData() {
            this.loading = true
            datacenter.jobTitleInfo({uid: this.personId}).then( res => {
                this.tableData = res.data.data
                this.$nextTick(() => {
                this.detail = this.tableData[0]
                this.loading = false
                })
            })
        }, */
        // 本地删除
        handleClose(data, tag) {
            data.splice(data.indexOf(tag), 1);
        },
        // 添加配置
        addItem(formName){
            this.$refs[formName].validate((valid, vinfo) => {
               /*  if(this.getIsEditState() == false) {
                    this.$message({ message: '请先保存!', type: 'warning' });
                    return
                } */
                if (valid) {
                    this.formData.g.push({});
                    // this.editIndex = this.formData.g.length - 1
                    // this.formData.g.unshift({});
                    // this.editIndex = 0
                    // this.disabledTag = true
                } else {
                    for (const key in vinfo) {
                        if(key.indexOf('professional') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                            return
                        } else if(key.indexOf('obtain_way') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                        }
                    }
                    return false;
                }
            });
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
            datacenter['member_title_info']({id: uid}).then( res => {
                this.loading = false
                this.formData.g = res.data.data || {}
                this.set0Val(['professional'])
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
    },
    created() {
        /* if(!this.personId) {
            this.formData = {}
        }else {
            this.getData()
        } */
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
