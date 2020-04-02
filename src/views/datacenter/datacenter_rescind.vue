<template>
    <div class="data-content flex-row flex-1">
        <div class="main-content flex-1 flex-row">
            <div class="data-center scrollbar flex-1" v-loading="loading">
                <header class="toolbar">
                    <div class="left">
                        <el-input v-model="params.keyword" placeholder="请输入党组织名称"></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    </div>
                </header>
                <div class="shadow-table">
                    <el-table :data="tableData.data" stripe>
                        <el-table-column class-name="table-name" prop="short_name" label="党组织简称" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <p class="el" @click="checkDetail(scope.row.id)">{{scope.row.short_name}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cancel_time" label="撤销时间" align="center" width="150px"></el-table-column>
                        <el-table-column prop="type" label="组织类别" show-overflow-tooltip></el-table-column>
                        <el-table-column class-name="table-name" label="操作" align="center" width="80px">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="edit('edit',scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-row class="pagination-content" type="flex">
                        <span>共{{tableData.totalPages}}页</span>
                        <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows"
                            :current-page="params.p"
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
    </div>
</template>

<script>
  import * as datacenter from '../../api/datacenter.js'
  import datadialog from './dialog.vue'
  import * as componentsRepository from "../../components/datacenter/partyMap.js";

  export default {
    components: {
      datadialog,
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
          org_id:  this.$route.params.org_id || ''
        },
        dialogVisible: false,
        tableData: [],
        input: '',
        // data: [],
        // expandData:[],
        // defaultProps: {
        //   children: 'children',
        //   label: 'label'
        // }
      };
    },
    watch: {
      input(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
        closeDialog(val) {
            this.dialogVisible = val
            this.currentTab = this.tabs[0]
        },
        search() {
            this.params.p = 1;
            this.getData()
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
        getData() {
            this.loading = true
            datacenter.cancel_org_list(this.params).then(res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getData()
        },
        checkDetail(id) {
            console.log(id);
            this.detailId = id
            this.dialogVisible = true
        },
        edit(tag,row) {
            let query = {
                id: row.id,
                org_id: this.params.org_id,
                keyword: this.params.keyword,
                p:  this.params.p,
                tag: 'slook'
            }
            this.$router.push({name: '党组织信息编辑',query: query})
        },
    },
    created() {
      this.getData()
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
  }
</style>