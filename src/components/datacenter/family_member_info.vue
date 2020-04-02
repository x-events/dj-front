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
      
      <el-table :data="tableData"  stripe>
        <el-table-column prop="姓名" label="姓名">
        </el-table-column>
        <el-table-column prop="与该人关系" label="与该人关系" >
        </el-table-column>
        <el-table-column prop="出生日期" label="出生日期">
        </el-table-column>
        <el-table-column prop="政治面貌" label="政治面貌">
        </el-table-column>
        <el-table-column prop="工作单位及职务" label="工作单位及职务">
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
  </div>  --> 
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
				<el-table-column label="姓名" min-width="125" align="center">
                    <template slot="header" slot-scope="scope"><span class="slot-header-star">*</span>姓名</template>
					<template slot-scope="scope" >
						<el-form-item class="col-name" :prop="'g.' + scope.$index + '.name'" :rules="formRule.name">
                            <el-input v-model="scope.row.name" placeholder="请输入姓名" maxlength="10" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="scope.row.name" v-else>{{scope.row.name || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="与该人关系" min-width="150" align="center">
                    <template slot="header" slot-scope="scope"><span class="slot-header-star">*</span>与该人关系</template>
					<template slot-scope="scope" >
						<el-form-item class="col-name" :prop="'g.' + scope.$index + '.relation'" :rules="formRule.relation">
                            <selectOpt v-model="scope.row.relation" placeholder="请选择关系" :option="relationData" @input="scope.row.relation=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="scope.row.relation_name" v-else>{{scope.row.relation_name || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="政治面貌" min-width="165" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <selectOpt v-model="scope.row.political_status" placeholder="请选择政治面貌" :option="politicalData" @input="scope.row.political_status=$event" v-if="!disabledTag" />
                            <span class="sblock" :title="scope.row.political_name" v-else>{{scope.row.political_name || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="出生日期" min-width="155" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-date-picker type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" v-model="scope.row.birth" style="width: 100%;" v-if="!disabledTag"></el-date-picker>
                            <span class="sblock" :title="scope.row.birth" v-else>{{scope.row.birth || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="联系电话" min-width="150" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-input v-model="scope.row.cellphone" placeholder="请输入联系电话" maxlength="20" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="scope.row.cellphone" v-else>{{scope.row.cellphone || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="工作单位及职务" min-width="200" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-input v-model="scope.row.employer_position" placeholder="请输入工作单位及职务" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="scope.row.employer_position" v-else>{{scope.row.employer_position || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="工作单位地址" min-width="200" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-input v-model="scope.row.employer_addr" placeholder="请输入工作单位地址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="scope.row.employer_addr" v-else>{{scope.row.employer_addr || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="家庭住址" min-width="200" align="center">
					<template slot-scope="scope" >
						<el-form-item class="col-name">
                            <el-input v-model="scope.row.address" placeholder="请输入家庭住址" maxlength="50" v-if="!disabledTag"></el-input>
                            <span class="sblock" :title="scope.row.address" v-else>{{scope.row.address || ""}}</span>
			       		</el-form-item>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="80" fixed="right">
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
  },
  components: {
      selectOpt
  },
    data() {
        return {
            loading: false,
            isSave: null,
            confirmShow:false,
            disabledTag: false,
            tableData: [],
            detail: null,
            formData: {
                g: []
            },
            formRule: {
                name: [ { required: true, message: '请输入姓名!', trigger: 'blur' } ],
                relation: [ { required: true, message: '请选择关系!', trigger: 'blur' }],
            },
            btnTag: 0,          // 0添加 1编辑  2取消、保存
            relationData: [],
            politicalData: [],
        }
    },
    methods: {
        /* getData() {
            this.loading = true
            datacenter.familyUser({uid: this.personId}).then( res => {
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
                    datacenter.member_family_edit(params).then( res => {
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
                        if(key.indexOf('name') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                            return
                        } else if(key.indexOf('relation') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                        }
                    }
                    return false;
                }
            });
        },
        getDicData() {
            // 与该人关系
            common.getDictData_tree({id: 'family_relation'}).then( res => {
                this.relationData = res.data.data
            })
            // 政治面貌
            common.getDictData_tree({id: 6}).then( res => {
                this.politicalData = res.data.data
            })
        },
        // 本地删除
        handleClose(data, tag) {
            data.splice(data.indexOf(tag), 1);
        },
        // 添加配置
        addItem(formName){
            this.$refs[formName].validate((valid, vinfo) => {
                if (valid) {
                    this.formData.g.push({});
                } else {
                    for (const key in vinfo) {
                        if(key.indexOf('name') != -1) {
                            this.$message({ message: vinfo[key][0].message, type: 'error' });
                            return
                        } else if(key.indexOf('relation') != -1) {
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
            datacenter['member_family_info']({id: uid}).then( res => {
                this.loading = false
                this.formData.g = res.data.data || {}
                this.set0Val(['political_status'])
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
        // this.getData()
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
