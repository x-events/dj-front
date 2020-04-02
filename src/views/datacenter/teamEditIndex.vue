<template>
    <div class="dc_union_info_edit data-edit flex-1 flex-col">
        <div class="edit-content flex-1 flex-row">
            <div class="left flex-col">
                <div class="title-box"><i class="ion">&#xe77a;</i>{{ $route.meta.title }}</div>
                <div class="content flex-1 scrollbar">
                    <router-link :to="{path: item.path, query: $route.query}" v-for="(item, index) in menuData" :key="index" >
                        <p :class="{active: $route.path === item.path}" class="el" :title="item.name" @click="clickRouter">
                            {{item.name}}
                        </p>
                    </router-link>
                </div>
            </div>
            <div class="right flex-1">
                <router-view></router-view>
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
            menuData: [
                {
                    path: '/datacenter/teamEdit_baseinfo',
                    name: '基本信息',
                },{
                    path: '/datacenter/teamEdit_member',
                    name: '成员信息',
                }
            ]
        }
    },
    methods: {
        // 存点击菜单标签
        clickRouter() {
            this.$root.dcTeamMenu = '1'
        }
    },
    created() {
    },
    destroyed() {
        sessionStorage.removeItem('add_team_uid')
    }
  }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.dc_union_info_edit {
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

.dc_union_info_edit .edit-content { background: #fff; }
.dc_union_info_edit /deep/ .right-form .title-box:before { display: none; }
.dc_union_info_edit .data-edit { box-shadow: none; margin-right: 0; border-radius: 0; background: transparent; }
</style>
<style>
.center-box .dc_union_info_edit .form-title-box { line-height: 40px; height: 40px; }
.center-box .dc_union_info_edit .form-title-box .tool { float: right; }
.center-box .dc_union_info_edit .member-add-form-btn { text-align: center; }
.center-box .dc_union_info_edit .member-add-form-btn i { font-size: 25px; }
.center-box .dc_union_info_edit .member-add-form-btn span { vertical-align: super; }
.center-box .dc_union_info_edit .member-add-form-btn .el-button { width: 93%; margin-right: 10px; background: #f3f7fe; color: #2670c8; }
.center-box .dc_union_info_edit .member-add-form-btn .el-button:hover { background: #e7f1fe; border: 1px solid #ddd; } 
.center-box .dc_union_info_edit .fors-item { margin-bottom: 20px; }
.center-box .dc_union_info_edit .slot-header-star { color: red; }
/* .center-box .dc_union_info_edit .form-row .avatar-uploader { line-height: 183px; } */
.center-box .dc_union_info_edit .shadow-table .el-form-item,
.center-box .dc_union_info_edit .shadow-table .el-form-item__content,
.center-box .dc_union_info_edit .shadow-table .el-input input { height: 40px; line-height: 40px; }
.center-box .dc_union_info_edit .shadow-table .el-input input { border-color: #ddd; }
.center-box .dc_union_info_edit .shadow-table { max-height: calc(100% - 140px); }
.center-box .dc_union_info_edit .add-table-line { text-align: center; margin-top: 10px; }
.center-box .dc_union_info_edit .add-table-line .el-button { width: 100%; padding: 8px; }
</style>