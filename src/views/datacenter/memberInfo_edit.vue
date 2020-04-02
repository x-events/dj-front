<template>
  <div class="main-content flex-1 flex-col">
    <div class="member_info_edit data-edit flex-col">
        <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}</div>
        <div class="edit-content flex-row flex-1">
            <div class="left">
                <div class="content">
                    <p v-for="tab in tabs" :key="tab.name" :class="{active: currentTab.name === tab.name}" class="el" :title="tab.name"
                    @click="clicklist(tab)">
                    {{tab.name}}
                    </p>
                </div>
            </div>
            <div class="right flex-1">
                <component :is="currentTab.component" :personId="$route.query.id" :read="disabledTag"></component>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import * as datacenter from '../../api/datacenter.js'
  import datadialog from './dialog.vue'
  import * as componentsRepository from "../../components/datacenter/componentsMap.js";

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
    },
    created() {
        this.getData()
        this.getTabs()
        if(Object.keys(this.$route.query).length != 0) {
            // this.formData = this.$route.query
            if(this.$route.query.tag == 'look') {
                this.disabledTag = true
            }   
        }
        // console.log('tab',this.tabs);
        
    }
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.member_info_edit {
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
.right /deep/ .right-form { padding-top: 30px; border-top: 0; }
/* .right /deep/ .form-row .avatar-uploader { height: 183px; line-height: 140px; } */
.right /deep/ .h100 { height: 100%; }
.right /deep/ .add-table-line { text-align: center; }
</style>