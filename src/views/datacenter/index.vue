<template>
  <div class="flex-col center-box">
    <header1 />

    <div class="flex-1 mainCont flex-col newWrap">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据中心</el-breadcrumb-item>
            <el-breadcrumb-item class="cur_page" v-if="menuData.length">{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view class="newMainCont" @menu_auth="getMenuData"></router-view>
    </div>

  </div>
</template>

<script>
  import * as datacenter from '@/api/datacenter.js'
  import datadialog from './dialog.vue'
  import * as componentsRepository from "@/components/datacenter/partyMap.js";

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
          p: 1,
          pagesize: 8,
          keyword: '',
          org_id: ''
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
        powerParams:{
          type:this.$root.user.op_type || ''
        },
        menuData:[]
      };
    },
    watch: {
      input(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      getMenuData(data){
          this.menuData = data || []
          if(!data.length){
            document.title = '数据中心'
          }
      },
      filterNode(value, data) {
        if(!value) return true
        return data.label.indexOf(value) !== -1;
      },
      closeDialog(val) {
        this.dialogVisible = val
        this.currentTab = this.tabs[0]
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
        this.loading = true
        datacenter.partyInfo(this.params).then(res => {
          this.loading = false
          this.tableData = res.data
        })
      },
      checkDetail(id) {
        console.log(id);
        this.detailId = id
        this.dialogVisible = true
      },
      edit(tag) {
          if(tag == 'add') {    // 新增
                this.$router.push({name: '党组织信息编辑'})
          }
      },
      fetchPower: function(){
            datacenter.center_auth(this.powerParams).then(res => {
                let result = res.data.data;
                this.$root.datacenter_op_auth = result.op_auth;
            })
        }
    },
    created() {
      this.getpartyInfo()
      this.getorg()
      this.getTabs()
      //数据中心权限
      this.fetchPower()
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .center-box { background: #eef4f9; }
  .el-breadcrumb { position: relative; padding-left: 15px; margin: 5px 0 20px 6px; }
  .el-breadcrumb:before { content: ''; display:block; position: absolute; width: 4px; border-radius: 20px; height: 110%; background: #147cd7; left: 0; }
  .el-breadcrumb /deep/ .el-breadcrumb__separator { margin: 0 4px; font-size: 16px; }
  .el-breadcrumb /deep/ .cur_page span { color: #187cd5!important; font-weight:normal;}
  .mainCont { background: transparent; }

  .main-content {
    width: 100%;
  }
  .el-breadcrumb__item >>> .el-breadcrumb__inner { font-weight:bold;}
</style>
<style>
.center-box .data-content > div { background-color: #fff; border-radius: 10px;}
.center-box .data-content {
    margin-right: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    /* display: flex; */
    /* min-height: 75vh; */
}
.center-box .main-content .org-tree {
box-shadow: 2px 2px 20px #e1e6ea;
border-right: 1px solid #e0e5ea;
padding: 10px;
display: flex;
flex-direction: column;
min-width:235px;
width:18%;
height: 100%;
}
.data-content .org-tree .el-input {margin-bottom: 6px;}
.center-box .data-center .toolbar{ margin-bottom: 10px; }
/* .center-box .data-center .toolbar .el-input { width: 200px; position: relative; }
.center-box .data-center .toolbar .el-input /deep/ .el-input__suffix { position: absolute; left: 210px; } */
.center-box .data-center .toolbar .left .el-input { width: 240px; }
.center-box .data-center .toolbar .el-button--primary { margin-left: 15px; }
.center-box .data-center .toolbar /deep/ .el-button--small:nth-of-type(1) { margin-left: 0px; }
.center-box .data-center .toolbar /deep/ .el-button--small,
.center-box .data-center .toolbar /deep/ .export-data .el-button--small { margin-left: 10px; }
.pagination-content {
align-items: center;
justify-content: flex-end;
}

.pagination-content .pagination {
margin: 10px 0;
}

.org-tree .el-tree-node__label {
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

/* .org-tree .is-current .el-tree-node__label {
color: #2C57D6;
} */
.org-tree .el-tree-node__content {height: 28px;}
.el-table tbody .table-name {
color: #1244D2;
cursor: pointer;
}

.el-table .hide-work,
.el-table .org-hide {
height: 57px;
}
/* 弹窗列名样式与其他样式待确认 */
/* .center-box .el-dialog .el-row .col-name:not(.el-col-24):nth-of-type(2n-1) { background: #7a9bcf; color: #fff; } */
.shadow-table > .el-table { border: 1px solid #e1e5ea; border-radius: 6px; }
.shadow-table > .el-table .el-table__header-wrapper th,
.shadow-table > .el-table .el-table__fixed-header-wrapper th  { background:linear-gradient(#fff, #e6ecf3); color: #147cd7; padding: 0; height: 42px; }
.shadow-table > .el-table .el-table--striped .el-table__body tr.el-table__row--striped td{ background: #fafdff; }
.shadow-table > .el-table .el-table td,
.shadow-table > .el-table .el-table:before,
.dialog_sim_table > .el-table .el-table td,
.dialog_sim_table > .el-table .el-table:before,
.dialog_page_table > .el-table .el-table td,
.dialog_page_table > .el-table .el-table:before { border: 0; background: transparent; }

/* 弹窗中表格样式 */
.dialog_sim_table > .el-table { border: 1px solid #e1e5ea; }
.dialog_sim_table > .el-table .el-table__header-wrapper th,
.dialog_sim_table > .el-table .el-table__fixed-header-wrapper th { background:#2671c7; color: #fff; padding: 0; height: 50px; background:linear-gradient(0deg,rgba(255,255,255,1),rgba(232,236,246,1)); color:#087AD9; }
.dialog_sim_table > .el-table .el-table__header-wrapper th,
.dialog_sim_table > .el-table td { border-right: 0 !important; }

/* 编辑页面中弹窗表格样式 */
.dialog_page_table > .el-table { border: 1px solid #e1e5ea; }
.dialog_page_table > .el-table .el-table__header-wrapper th { background:#f6f8fa; color: #187cd6; padding: 0; height: 50px;  }

/* .col-name:nth-of-type(2n-1){ background: #7a9bcf; color: #fff; text-align: center; } */
.col-name { height:50px; line-height:50px;}
.col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}

.slot-form-label.col-name { border-bottom: 0; padding: 0 8px; }

.center-box .data-edit .el-form { padding: 0 30px!important; margin-bottom: 30px; }
.center-box .data-edit .title-box { margin-bottom: 30px; }

.center-box .data-edit {
    margin-right: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #fff;
    min-height: 75vh;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #e1e6ea;
    /* border-top: 1px solid #e1e6ea; */
}
.center-box .data-edit .title-box { border-bottom: 1px solid #dce2e7; position: relative; height: 50px; line-height: 50px; color: #177cd5; font-weight: bold; width: 100%; font-size: 16px; }
.center-box .data-edit .title-box:before { content: ''; position: absolute; width: 180px; bottom: 0; border-bottom: 2px solid #177cd5; }
.center-box .data-edit .title-box .ion { margin: 0 8px 0 20px; }
.center-box .data-edit .title-box .tool { float: right; padding-right:10px;}
.center-box .data-edit .el-row.upload-row,
.center-box .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.center-box .data-edit .avatar-uploader,
.center-box .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height: 190px; text-align: center; cursor: pointer; position: relative; }
.center-box .dialog_info .avatar-uploader.no_photo { cursor: default; }
.center-box .data-edit .avatar-uploader .el-upload,
.center-box .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.center-box .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
/* .center-box .data-edit .upload-div, */
.center-box .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
/* .center-box .data-edit .avatar-uploader .el-upload__tip, */
.center-box .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.center-box .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.center-box .upload-div img.avatar { vertical-align: middle; max-height: 100%!important; position: absolute; top: 0; bottom: 0; margin: auto; left: 0;right: 0; }
.center-box .upload-div .look { cursor: default; }
.center-box .data-edit .el-row.form-row,
.center-box .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.center-box .data-edit .masking { position: absolute; left: 0;top: 0; width: 100%; height: 100%; cursor: not-allowed; }
.center-box .data-edit .el-row .el-col,
.center-box .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.center-box .data-edit .el-form .el-form-item,
.center-box .dialog_info .el-form .el-form-item { margin: 0; height: 50px; overflow: hidden; }
.center-box .data-edit .el-form .el-form-item__label, 
.center-box .data-edit .el-form .el-form-item__content,
.center-box .dialog_info .el-form .el-form-item__label,
.center-box .dialog_info .el-form .el-form-item__content { line-height: 50px; }
.center-box .data-edit .el-form .el-form-item__content .dib_bg { line-height:2; background-color:transparent;}
.center-box .dialog_info .el-form .el-form-item__content,
.center-box .data-edit .form-row .sblock { padding: 0 16px; }
.center-box .data-edit .el-form .el-form-item__label,
.center-box .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.center-box .data-edit .el-form .el-input input,
.center-box .data-edit .el-form .el-select input,
.center-box .data-edit .el-form .el-textarea textarea,
.center-box .dialog_info .el-form .el-input input,
.center-box .dialog_info .el-form .el-select input,
.center-box .dialog_info .el-form .el-textarea textarea,
.center-box .data-edit .el-form .el-range-editor { height: 50px; border-color: transparent; resize: none; }
.center-box .data-edit .el-form .el-range-editor .el-range-separator { line-height: 50px; }
.center-box .el-form .map-content {height: 400px;}
.center-box .el-form .map-content .el-form-item,
.center-box .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.center-box .el-form .map-content .el-form-item__content { padding: 0; }
.center-box .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.center-box .data-edit .submit-div { line-height: 90px; text-align: center; }
.center-box .data-edit .submit-div .el-button { width: 120px; }
.center-box .data-edit .el-radio-group { padding-left: 15px; }
.center-box .data-edit .secretary .el-form-item, 
.center-box .data-edit .secretary .el-form-item__label,
.center-box .dialog_info .secretary .el-form-item, 
.center-box .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.center-box .data-edit .secretary .heightLayout { height: 90px; border-color: transparent; }
.center-box .data-edit .secretary .heightLayout > div { line-height: 20px; height: 40px; }
.center-box .data-edit .secretary .heightLayout .scrollcont { text-align: left; padding: 5px; }
.center-box .height_auto .el-form-item {position: relative; height: auto!important; min-height: 60px;}
.center-box .height_auto .el-form-item__label { position: absolute; height: 100%; left: 0;top: 0; margin: auto;}
.center-box .height_auto .el-form-item__content { line-height: 30px !important;}
.center-box .height_auto .el-form-item__content .el-checkbox { line-height: 30px; }
.center-box .data-edit .detail-subtext,
.center-box .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.center-box .data-edit .detail-subtext:before,
.center-box .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.center-box .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
/* .center-box .detail-void:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  } */

.center-box .dialog_info .col-table .el-col { border-left: 0; }
.center-box .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.center-box .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.center-box .dialog_info { max-height: 60vh; overflow: auto;}

.center-box .hight-item,
.center-box .hight-item .el-form-item__label { height: 120px!important; line-height: 120px!important; }
.center-box .hight-item .el-form-item__content { padding-top: 10px!important; }
.center-box .hight-item .el-form-item__content .sblock { -webkit-line-clamp: 5; max-height: 120px; vertical-align: top; }
.center-box .hight-item textarea { height: auto!important; }
.center-box .el-form-item.company .el-input--suffix input { padding-right: 190px; }
.center-box .form-row .calc-w-8 { float: left; width:calc(100% - (10 / 24 * 100%) - 182px); }
.center-box .form-row .calc-w-20 { float: left; width:calc(100% - 182px); }
.dc-msgbox-style { width: auto; }
.center-box .form-row .dc-mult-select { height: 60px; overflow: hidden; }

/* 新弹窗样式-下期 */
/* .center-box .dialog_info .dialog-table .el-row .el-col { padding: 0!important;}  */
/* .center-box .data-edit .el-form /deep/ .el-form-item__label { line-height: 60px;background: red; } */
</style>
