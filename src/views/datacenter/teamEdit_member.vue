<template>
    <div class="data-edit right-form flex-col h100" v-if="formData">
        <div class="title-box">
            <div class="tool">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
        </div>
        <el-form class="flex-1 scrollbar" label-width="190px" :show-message="false" size="medium" label-suffix=":">
            <div class="detail-subtext">成员信息</div>
            <el-row class="form-row fix" v-loading="loading">
                <el-col :span="24">
                    <el-form-item label="成员数" prop="company">
                        <el-input v-model="personData.totalRows" readonly placeholder="">
                            <el-button slot="suffix" size="mini" @click="mpickerDialog=true;formData = {}">党员库选择</el-button>
                            <el-button slot="suffix" size="mini" @click="handleDialog = true;formData = {sex: '0',is_party:'0'}">手动添加</el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
                <div class="shadow-table">
                    <el-table :data="personData.data" style="width: 100%;">
                        <el-table-column prop="realname" label="姓名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sex" label="性别" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.sex == '1'?'女':(scope.row.sex == '0'?'男':'--') }}</template>
                        </el-table-column>
                        <el-table-column prop="birth" label="出生年月" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.birth || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="is_party" label="是否党员" show-overflow-tooltip>
                            <template slot-scope="scope">{{(scope.row.is_party=='1'?'是':scope.row.is_party=='0'?'否':'--') || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="member_source_name" label="添加方式" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.member_source_name || '--'}}</template>
                        </el-table-column>
                        <el-table-column class-name="table-name" label="操作" align="center" width="150px">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleDialog = true;formData = scope.row" v-if="+scope.row.member_source!=1">编辑</el-button>
                                <el-button size="mini" @click="del(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="pagination-content" type="flex">
                        <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="personData.totalRows"
                            :current-page="params.p"
                            :page-size="params.pagesize"
                                class="pagination">
                        </el-pagination>
                    </el-row>
                </div>
            </el-row>
        </el-form>
        <!-- 选党员 -->
        <member-picker :visible="mpickerDialog" :radio="false" @close="mpickerDialog=false" @choosen="memberChoosen" />
        <!-- 新增修改党员信息 -->
        <datadialog title="党员信息" :dialogVisible="handleDialog" @dialogData="closeDialog">
            <el-form class="flex-1 scrollbar" :model="formData" :rules="formRule" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                <el-row class="form-row fix" v-loading="loading">
                    <el-col :span="24">
                        <el-form-item class="col-name" label="党员姓名" prop="realname">
                            <el-input v-model="formData.realname" placeholder="请输入姓名" maxlength="10" v-if="formData.member_source != '1'"></el-input>
                            <span class="sblock" :title="formData.realname" v-else>{{formData.realname || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="性别">
                            <el-select v-model="formData.sex" placeholder="请选择性别" style="width:100%;" v-if="formData.member_source != '1'">
                                <el-option :label="item.value" :value="item.id" :key="index" v-for="(item, index) in sexData"></el-option>
                            </el-select>
                            <span class="sblock" :title="(formData.sex=='1'?'女':'男')" v-else>{{(formData.sex=='1'?'女':'男') || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="出生年月">
                            <el-date-picker type="date" placeholder="请选择" value-format="yyyy-MM-dd" v-model="formData.birth" style="width: 100%;" v-if="formData.member_source != '1'"></el-date-picker>
                            <span class="sblock" :title="formData.birth" v-else>{{formData.birth || ""}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item class="col-name" label="是否党员">
                            <el-select v-model="formData.is_party" placeholder="请选择" style="width:100%;">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="change-submit">
                <el-button type="primary" @click="handleDialog = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit(formData.uid)">确认</el-button>
            </div>
        </datadialog>
    </div>
</template>

<script>
import * as common from '../../api/common.js'
import * as datacenter from '@/api/datacenter.js'
import datadialog from './dialog.vue'
export default {
    props: {
        personId: {
            type: [String, Number],
            default: '',
            //   required: true,
        },
        /* read: {
            type: Boolean,
            default: false
        } */
    },
    components: {
        "member-picker": resolve => require(["@/components/memberPicker"], resolve),
        datadialog,
    },
    data() {
        return {
            loading: false,
            disabledTag: false,
            hand_addr: false,
            mpickerDialog: false,           // 党员库弹窗
            handleDialog: false,            // 党员手动添加
            personData: [],
            params: {
                p: 1,
                pagesize: 8,
                keyword: '',
            },
            formData: {
                realname: '', 
                sex: '',
                tel: '',
                type: ''
            },
            formRule: {
                realname: [ { required: true, message:'请输入党员姓名！', trigger: 'blur' } ],
            },
            sexData: [
                {
                    id: '0',
                    value: '男'
                },{
                    id: '1',
                    value: '女'
                }
            ],
            unionDutyData: [],  // 工会职务
            dialogData: {
                org_id: ''
            }
        }
    },
    /* watch: {
        personId: function () {
            this.getData()
        }
    }, */
    methods: {
        /* enlarge(src) {
            this.imgVisible = true
            this.imgSrc = src
        }, */
        oninput(len,field) {
            if(this.formData[field].length> len) this.formData[field]=this.formData[field].slice(0, len)
        },
        back() {
            this.$router.push({name: '特色队伍', params: this.$route.query})
        },
        closeDialog(val) {
            this.handleDialog = val
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        // 党员库选择之后(多选)
        memberChoosen(arr) {
            // console.log('member',obj);
            let uids = []
            arr.map(a=> {
                uids.push(a.uid)
            })
            this.memberSubmit(uids.join(','))
        },
        // 添加人员
        memberSubmit(uid) {
            let sessionUid = sessionStorage.getItem('add_team_uid') || ''
            let team_id = ''
            if(this.$route.query.id) {
                team_id = this.$route.query.id
                this.formData.team_id = this.$route.query.id
            }else {
                team_id = sessionUid
                this.formData.team_id = sessionUid
                if(team_id == '') {
                    return
                }
            }
            this.formData.uid = uid
            datacenter.team_member_edit(this.formData).then( res => {
                this.loading = false
                if(res.data.status  == '200') {
                    this.params.p = 1
                    this.handleDialog = false;
                    this.$message({ message: res.data.statusCode, type: 'success' });
                    this.getData();
                }else {
                    this.$message({ message: res.data.statusCode, type: 'error' });
                }
            })
        },
        handleSubmit(uid) {
            this.$refs['formForm'].validate((valid, vinfo) => {
                if (valid) {
                    this.memberSubmit(uid)
                } else {
                    this.$message({ message: '请输入党员姓名！', type: 'error' });
                    return false;
                }
            });
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.team_member_del({id: row.id}).then( res => {
                    if(res.data.status == '200') {
                        this.getData()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        },
        getData() {
            let sessionUid = sessionStorage.getItem('add_team_uid') || ''
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
            this.params.id = uid
            // 人员列表
            datacenter.team_member_list(this.params).then( res => {
                this.personData = res.data
                this.loading = false
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
        // return
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.back, false);
        }
        this.getData();
    },
    destroyed(){
        window.removeEventListener('popstate', this.back, false);
    }
}
</script>

<style scoped>
 /* .right-content .dialog-info .dialog-table {width: 100%;border-left: 1px solid #ddd;}
 .right-content .dialog-info .dialog-table img {cursor: pointer;}
.dialog-table { width: 100%; border-top: 1px solid #ddd; border-left: 1px solid #ddd; }
.dialog-table .col-name { padding: 8px; } */
.title-box { margin-bottom: 0px !important; }
.detail-subtext { border-bottom: 0 !important; float: none !important; }
.change-submit { text-align: center; }
.shadow-table .el-table { border-left: 0; border-top: 0; border-radius: 0; } 
.pagination-content { border-left: 1px solid #fff; margin-left: -1px; }
</style>
