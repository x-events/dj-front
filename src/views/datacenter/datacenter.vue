<template>
    <div class="data-content flex-row flex-1">
        <div class="main-content flex-1 flex-row">
            <div class="org-tree scrollbar">
                <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input"></el-input>
                <el-tree :data="data" :props="defaultProps" @node-click="treeClick" :filter-node-method="filterNode" ref="tree" class="comTreeGray" node-key="id" :default-expanded-keys="expandData"></el-tree>
            </div>
            <div class="data-center scrollbar flex-1" v-loading="loading">
                <header class="toolbar">
                    <div class="left">
                        <el-input v-model="params.keyword" placeholder="请输入党组织名称"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    </div>
                    <el-row type="flex" class="search-input">
                        <el-button size="small" @click="edit('add')" v-if="$root.user.org_type != 3 && $root.datacenter_op_auth.add == 1">添加党组织</el-button>
                        <exportData eType="org" @reload="importReload" v-if="$root.user.org_type != 3 && $root.datacenter_op_auth.add == 1" />
                        <ExportOutData expType="org" :keyword="params.keyword" :org_id="params.org_id" v-if="$root.datacenter_op_auth.check == 1" />
                        <el-button size="small" @click="rescindList">查看已撤销党组织</el-button>
                    </el-row>
                </header>
                <div class="shadow-table">
                    <el-table :data="tableData.data" stripe>
                        <el-table-column class-name="table-name" prop="short_name" label="党组织简称" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="checkDetail(scope.row.id)"
                                type="text">
                                {{scope.row.short_name}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit_name" label="单位名称" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.unit_name || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="member_num" label="党员数" width="120px" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.member_num || '0'}}</template>
                        </el-table-column>
                        <el-table-column prop="type" label="党组织类别" width="150px" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.type || '--'}}</template>
                        </el-table-column>
                        <el-table-column prop="secretary" label="书记" width="150px" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.secretary || '--'}}</template>
                        </el-table-column>
                        <el-table-column class-name="table-name" label="操作" align="center" width="210px">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                                <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                                <el-button size="mini" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">撤销</el-button>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="com_type_name" label="单位类别" width="150px" show-overflow-tooltip></el-table-column> -->
                        <!-- <el-table-column prop="unit_name" label="单位" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="relation" label="党组织隶属关系" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="pid_name" label="上级党组织名称" show-overflow-tooltip></el-table-column> -->
                    </el-table>

                    <el-row class="pagination-content" type="flex">
                        <span>共{{tableData.totalPages}}页</span>
                        <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows"
                            :current-page="Number(params.p)"
                            :page-size="params.pagesize" class="pagination">
                        </el-pagination>
                    </el-row>
                </div>
                <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog">
                    <div class="dialog-info">
                        <div class="right scrollbar">
                            <component :is="currentTab.component" :detailId="detailId"></component>
                        </div>
                    </div>
                </datadialog>
            </div>
        </div>
        <datadialog :dialogVisible="delOptDialog" @dialogData="closeDialog2" class="del-dialog">
            <div class="del-text">请将该组织下党员或下级党组织转到其他党组织下，历史党员也需转移或彻底删除后操作</div>
            <div class="dialog-info">
                <el-input class="col-name" v-model="change_org_name" readonly placeholder="请选择党组织">
                    <el-button slot="suffix" size="mini" @click="pickerDialog = true">党组织选择</el-button>
                </el-input>
            </div>
            <div class="change-submit">
                <el-button type="primary" @click="delOptDialog = false">取消</el-button>
                <el-button type="primary" @click="changeSubmit" :loading="changeBtnLoading">确认转入并撤销</el-button>
            </div>
        </datadialog>
        <org-picker :visible="pickerDialog" :ableOpt="changeOrgStatus" :ableIds="changeOrgIds" @close="pickerDialog=false" @choosen="choosenPicker" />
    </div>
</template>

<script>
  import * as datacenter from '../../api/datacenter.js'
  import datadialog from './dialog.vue'
  import * as componentsRepository from "../../components/datacenter/partyMap.js";
  import exportData from "@/components/datacenter/widgets/ExportData";
import orgPicker from '@/components/orgPicker'

  export default {
    components: {
      datadialog, exportData, orgPicker
    },
    data() {
      return {
        loading: false,
        tabs: [],
        currentTab: {},
        detailId: '',
        params: {
          p:  this.$route.params.p || 1,
          pagesize: 8,
          keyword: this.$route.params.keyword || '',
          org_id:  this.$route.params.org_id
        },
        dialogVisible: false,
        tableData: [],
        input: '',
        data: [],
        expandData:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // orgChangeId: '',
        changeOrgStatus: '',
        changeOrgIds: [],
        changeForm: {
            change_org_id: ''
        },
        old_org_id: '',
        change_org_id: '',
        change_org_name: '',
        pickerDialog: false,
        delOptDialog: false,
        changeBtnLoading: false
      };
    },
    watch: {
      input(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
        filterNode(value, data) {
            if(!value) return true
            return data.label.indexOf(value) !== -1;
        },
        closeDialog(val) {
            this.dialogVisible = val
            this.currentTab = this.tabs[0]
        },
        // 删除二次操作 关闭按钮
        closeDialog2(val) {
            this.delOptDialog = val
            // this.currentTab = this.tabs[0]
        },
        search() {
            this.params.p = 1;
            this.getpartyInfo()
        },
        getTabs() {
            componentsRepository.memberMap.forEach(item => {
                this.tabs.push({
                    name: item.name,
                    component: item.component
                })
            })
            this.currentTab = this.tabs[0]
        },
        treeClick(data) {
            //console.log(data);
            this.params.p = 1
            this.params.org_id = data.id
            this.getpartyInfo()
        },
        getpartyInfo() {
            this.loading = true
            datacenter.partyInfo(this.params).then(res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        getorg() {
            datacenter.org().then(res => {
                let data = res.data.data;
                this.data = data;
                this.$nextTick(()=>{
                    this.expandData = [];
                    if(data){
                        for (let i = 0; i < data.length; i++) {
                            const e = data[i];
                            this.expandData.push(e.id)
                        }
                    }
                })
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getpartyInfo()
        },
        checkDetail(id) {
            console.log(id);
            this.detailId = id
            this.dialogVisible = true
        },
        edit(tag,row) {
            let query = {}
            if(tag == 'add') {    // 新增
                query = {
                    org_id: this.params.org_id,
                    keyword: this.params.keyword,
                    p:  this.params.p,
                }
                datacenter.add_first_org({id: this.params.org_id}).then( res => {
                    if(res.data.status == '200') {
                        this.$router.push({name: '党组织信息编辑',query: query})
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }else if(tag == 'edit') {
                query = {
                    id: row.id,
                    org_id: this.params.org_id,
                    keyword: this.params.keyword,
                    p:  this.params.p,
                }
                this.$router.push({name: '党组织信息编辑',query: query})
            }else {
                query = {
                    id: row.id,
                    org_id: this.params.org_id,
                    keyword: this.params.keyword,
                    p:  this.params.p,
                    tag: 'look'
                }
                this.$router.push({name: '党组织信息编辑',query: query})
            }
        },
        del(row) {
            this.old_org_id = '';
            this.change_org_id = ''
            this.change_org_name = ''
            this.$confirm("确认撤销?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning", 
            }).then(() => {
                this.old_org_id = row.id;
                datacenter.org_del({id: row.id}).then( res => {
                    /* 该党组织下有党员信息对应type=1;
                    该党组织下有下属党组织对应type=0;
                    删除成功type=2 */
                    if(res.data.status == '200') {
                        if(res.data.data.type == 2) {
                            this.getpartyInfo()
                            this.getorg()
                            this.$message({ message: res.data.statusCode, type: 'success' });
                        } else if(res.data.data.type == 1) {
                            this.delOptDialog = true;
                            this.changeOrgStatus = 1
                            this.changeOrgIds = res.data.data.ids
                        } else if(res.data.data.type == 0) {
                            this.delOptDialog = true;
                            this.changeOrgStatus = 0
                            this.changeOrgIds = res.data.data.ids
                        }
                        
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            })
            .catch(() => {});
        },
        // 党组织库选择 单选
        choosenPicker(obj) {
            console.log('sess',obj);
            if(!obj) {
                this.change_org_id = ''
                this.change_org_name = ''
                return 
            }
            this.change_org_id = obj.id
            this.change_org_name = obj.name
        },
        // 变更
        changeSubmit() {
            if(!this.change_org_id) {
                this.$message({ message: '请选择党组织！', type: 'error' });
            }else {
                // this.changeBtnLoading = true;
                datacenter.org_change({ org_id: this.old_org_id, change_org_id: this.change_org_id }).then( res => {
                    if(res.data.status == '200') {
                        this.delOptDialog = false;
                        this.getpartyInfo()
                        this.getorg()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }
        },
        rescindList() {
            this.$router.push({name:'已撤销党组织'})
        },
        importReload() {
            this.getpartyInfo()
            this.getorg()
        }
    },
    created() {
      this.getpartyInfo()
      this.getorg()
      this.getTabs()
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .main-content {
    width: 100%;
    border-radius: 10px;
    /* display: flex; */
  }

  .dialog-info {
    display: flex;
  }

  .dialog-info .right {
    flex-grow: 1;
    width:100%;
  }
.toolbar .left .el-input { width: 200px!important; }
.toolbar /deep/ .el-button--small { padding: 9px 3px; }
.del-dialog /deep/ .el-dialog__body { padding-top: 10px; }
.del-dialog .del-text { line-height: 40px; text-align: center; }
.del-dialog .change-submit { text-align: center; }
</style>