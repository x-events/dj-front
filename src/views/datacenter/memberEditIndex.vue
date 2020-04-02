<template>
  <div class="dc_member_info_edit data-edit flex-1 flex-col">
    <!-- <div class="member_info_edit data-edit flex-col">
        <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}</div> -->
        <div class="edit-content flex-1 flex-row">
            <div class="left flex-col">
                <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}</div>
                <div class="content flex-1 scrollbar">
                    <!-- <p v-for="tab in tabs" :key="tab.name" :class="{active: currentTab.name === tab.name}" class="el" :title="tab.name"
                    @click="clicklist(tab)">
                    {{tab.name}}
                    </p> -->
                    <!-- <p v-for="(item, index) in menuData" :key="index" :class="{active: $route.path === item.path}" class="el" :title="item.name">
                        <router-link :to="{path: item.path, query:{id:$route.query.id}}">{{item.name+item.path}}</router-link>
                    </p> -->
                    <router-link :to="{path: item.path, query: $route.query}" v-for="(item, index) in menuData" :key="index" >
                        
                        <p :class="{active: $route.path === item.path}" class="el" :title="item.name" @click="clickRouter">
                            {{item.name}}
                        </p>
                    </router-link>
                </div>
            </div>
            <div class="right flex-1">
                <!-- <component :is="currentTab.component" :personId="$route.query.id" :read="disabledTag"></component> -->
                <router-view></router-view>
            </div>
        </div>
    <!-- </div> -->
  </div>
</template>

<script>
  import * as datacenter from '@/api/datacenter.js'
  import datadialog from './dialog.vue'
  import * as componentsRepository from "@/components/datacenter/componentsMap.js";

  export default {
    data() {
        return {
            loading: false,
            tabs: [],
            currentTab: {},
            detailId: '',
            params: {
            p: 1,
            pagesize: 8,
            keyword: ''
            },
            dialogVisible:false,
            tableData: {},
            input: '',
            data: [],
            expandData:[],
            defaultProps: {
            children: 'children',
            label: 'label'
            },
            disabledTag: false,
            menuData: [
                {
                    path: '/datacenter/mem_baseinfo',
                    name: '基本信息',
                },{
                    path: '/datacenter/mem_applyParty',
                    name: '申请入党信息',
                },{
                    path: '/datacenter/mem_jobTitle',
                    name: '职称信息',
                },{
                    path: '/datacenter/mem_family_info',
                    name: '家庭成员信息',
                },{
                    path: '/datacenter/mem_degree_info',
                    name: '学历学位信息',
                },{
                    path: '/datacenter/mem_ship_info',
                    name: '党籍信息',
                },{
                    path: '/datacenter/mem_partyDuty',
                    name: '党内职务信息',
                },{
                    path: '/datacenter/mem_admin_duty',
                    name: '行政职务信息',
                },{
                    path: '/datacenter/mem_oran_relation',
                    name: '组织关系信息',
                },{
                    path: '/datacenter/mem_abroad',
                    name: '出国党员信息',
                },{
                    path: '/datacenter/mem_commendation',
                    name: '表彰信息',
                },{
                    path: '/datacenter/mem_discipline',
                    name: '惩戒信息',
                },{
                    path: '/datacenter/mem_retreat',
                    name: '离退信息',
                },{
                    path: '/datacenter/mem_difficult',
                    name: '困难党员信息',
                },{
                    path: '/datacenter/mem_help',
                    name: '困难党员享受帮扶信息',
                },{
                    path: '/datacenter/mem_alleviation',
                    name: '困难党员脱贫脱困信息',
                },{
                    path: '/datacenter/mem_supplement',
                    name: '党员补充信息',
                }
            ]
        }
    },
    components: {datadialog},
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
        componentsRepository.map.forEach( item => {
          this.tabs.push({name: item.name, component: item.component})
        })
        
        let curLeftMenu = sessionStorage.getItem('info-left-menu');
        if(!curLeftMenu) {
            this.currentTab = this.tabs[0]
        }else {
            let cur 
            for (const key in this.tabs) {
                if (this.tabs[key].component.name == curLeftMenu) {
                    cur = this.tabs[key]
                }
            }
            this.currentTab = cur
        }
      },
      getData() {
        this.loading = true
        datacenter.person(this.params).then( res => {
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
      clicklist(tab) {
           this.currentTab = tab
           sessionStorage.setItem('info-left-menu', tab.component.name);
        //    this.$route.query.lk = tab.component.name
        //    window.location.href = `/datacenter/memberInfo_edit?lk=${tab.component.name}`
      },
        del(row) {
            this.$confirm("确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.getData()
            })
            .catch(() => {});
        },
        // 存点击菜单标签
        clickRouter() {
            this.$root.dcMemberMenu = '1'
        }
    },
    created() {
        this.getData()
        this.getTabs()
        /* if(Object.keys(this.$route.query).length != 0) {
            // this.formData = this.$route.query
            if(this.$route.query.tag == 'look') {
                this.disabledTag = true
            }   
        } */
    },
    destroyed() {
        sessionStorage.removeItem('add_m_uid')
    }
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.dc_member_info_edit {
  box-shadow: 0px 0px 5px #dee5e9;
}
.title-box { margin: 0 !important; }
.left {
  width: 240px;
  background-color: #fff;
  color: #7f8a93;
  overflow: auto;
  border-right: 1px solid #dce2e7;
  box-shadow: 2px 2px 20px #e1e6ea;
  flex-shrink: 0;
}
.left p { line-height: 50px; padding-left: 45px; position: relative; cursor: pointer; }
.left p:before { content: '.'; position: absolute; left: 30px; top: 0;bottom: 0; margin: auto; height: 34px; line-height: 15px; font-size: 30px; }
.left p.active { color: #087ad9; background: #edf4f8; }
/* .right /deep/ .right-form { padding-top: 30px; border-top: 0; } */
.right /deep/ .h100 { height: 100%; }

.dc_member_info_edit .edit-content { background: #fff; }
.dc_member_info_edit /deep/ .right-form .title-box:before { display: none; }
.dc_member_info_edit .data-edit { box-shadow: none; margin-right: 0; border-radius: 0; background: transparent; }
</style>
<style>
.center-box .dc_member_info_edit .form-title-box { line-height: 40px; height: 40px; }
.center-box .dc_member_info_edit .form-title-box .tool { float: right; }
.center-box .dc_member_info_edit .member-add-form-btn { text-align: center; }
.center-box .dc_member_info_edit .member-add-form-btn i { font-size: 25px; }
.center-box .dc_member_info_edit .member-add-form-btn span { vertical-align: super; }
.center-box .dc_member_info_edit .member-add-form-btn .el-button { width: 93%; margin-right: 10px; background: #f3f7fe; color: #2670c8; }
.center-box .dc_member_info_edit .member-add-form-btn .el-button:hover { background: #e7f1fe; border: 1px solid #ddd; } 
.center-box .dc_member_info_edit .fors-item { margin-bottom: 20px; }
.center-box .dc_member_info_edit .slot-header-star { color: red; }
.center-box .dc_member_info_edit .form-row .upload-div { height: 153px; }
/* .center-box .dc_member_info_edit .form-row .avatar-uploader { line-height: 183px; } */
.center-box .dc_member_info_edit .shadow-table .el-form-item,
.center-box .dc_member_info_edit .shadow-table .el-form-item__content,
.center-box .dc_member_info_edit .shadow-table .el-input input { height: 40px; line-height: 40px; }
.center-box .dc_member_info_edit .shadow-table .el-input input { border-color: #ddd; }
.center-box .dc_member_info_edit .shadow-table { max-height: calc(100% - 140px); }
.center-box .dc_member_info_edit .add-table-line { text-align: center; margin-top: 10px; }
.center-box .dc_member_info_edit .add-table-line .el-button { width: 100%; padding: 8px; }
</style>