<template>
  <div class="data-center scrollbar" v-loading="loading"> 
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入商务楼宇服务站名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加服务站</el-button>
            <exportData eType="building" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="building" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="name" label="商务楼宇服务站全称" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="org_name" label="所属党组织" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.org_name || '--'}}</template>
        </el-table-column>
        <el-table-column prop="address" label="服务站地址" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.address || '--'}}</template>
        </el-table-column>
        <el-table-column prop="setup_time" label="建立时间" show-overflow-tooltip width="150px">
            <template slot-scope="scope">{{scope.row.setup_time || '--'}}</template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" show-overflow-tooltip width="90px">
            <template slot-scope="scope">{{scope.row.contact || '--'}}</template>
        </el-table-column>
        <el-table-column prop="contact_phone" label="联系人电话" show-overflow-tooltip width="120px">
            <template slot-scope="scope">{{scope.row.contact_phone || '--'}}</template>
        </el-table-column>
        <el-table-column class-name="table-name" label="操作" align="center" width="210px">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit('look',scope.row)" v-if="$root.datacenter_op_auth.check == 1">查看</el-button>
                <el-button size="mini" @click="edit('edit',scope.row)" v-if="$root.datacenter_op_auth.edit == 1">编辑</el-button>
                <el-button size="mini" @click="del(scope.row)" v-if="$root.datacenter_op_auth.del == 1">删除</el-button>
            </template>
        </el-table-column>
      </el-table>

      <el-row class="pagination-content" type="flex">
        <span>共{{tableData.totalPages || "0"}}页</span>
        <el-pagination background @current-change="currentChange" layout="prev, pager, next" :total="tableData.totalRows"
            :current-page="Number(params.p)"
            :page-size="params.pagesize"
                class="pagination">
        </el-pagination>
      </el-row>
    </div>
        <datadialog :dialogVisible="dialogVisible" @dialogData="closeDialog">
            <!-- <div class="dialog-info">
                <div class="dialog-table">
                <el-row>
                    <el-col class="col-name" :span="3">楼宇全称</el-col>
                    <el-col :title="dialogData.name" class="col-name el" :span="9">{{dialogData.name || "暂无"}}</el-col>
                    <el-col class="col-name" :span="3">服务站地址</el-col>
                    <el-col :title="dialogData.address" class="col-name el" :span="9">{{dialogData.address || "暂无"}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="col-name" :span="3">建立时间</el-col>
                    <el-col :title="dialogData.setup_time" class="col-name el" :span="5">{{dialogData.setup_time || "暂无"}}</el-col>
                    <el-col class="col-name" :span="3">联系人</el-col>
                    <el-col :title="dialogData.contact" class="col-name el" :span="5">{{dialogData.contact || "暂无"}}</el-col>
                    <el-col class="col-name" :span="3">联系人电话</el-col>
                    <el-col :title="dialogData.contact_phone" class="col-name el" :span="5">{{dialogData.contact_phone || "暂无"}}</el-col>
                </el-row>
                <el-row class="flex-row">
                    <el-col class="col-name" :span="3">站长照片</el-col>
                    <el-col class="col-name el tc" :span="5">
                    <img @click="enlarge(dialogData.manager_pic)" :src="dialogData.manager_pic" class="boximg50" />
                    </el-col>
                    <el-col class="col-name" :span="3">指导员照片</el-col>
                    <el-col class="col-name el tc" :span="5">
                    <img @click="enlarge(dialogData.deputy_manager_pic)" :src="dialogData.deputy_manager_pic" class="boximg50" />                
                    </el-col>
                    <el-col class="col-name" :span="3">党务专干照片</el-col>
                    <el-col class="col-name el tc" :span="5">
                    <img @click="enlarge(dialogData.full_time_manager_pic)" :src="dialogData.full_time_manager_pic" class="boximg50" />                
                    </el-col>
                </el-row>
                <el-row class="flex-row">
                    <el-col class="col-name" :span="3">开展的活动数</el-col>
                    <el-col class="col-name el" :span="5">{{dialogData.activity_num || "暂无"}}</el-col>
                    <el-col class="col-name" :span="3">活动照片</el-col>
                    <el-col class="col-name el" :span="5">
                    <img @click="enlarge(dialogData.activity_pic)" :src="dialogData.activity_pic" />
                    </el-col>
                    <el-col class="col-name" :span="3">楼宇照片</el-col>
                    <el-col class="col-name el" :span="5">
                    <img @click="enlarge(dialogData.building_pic)" :src="dialogData.building_pic" />
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="col-name map-content" :span="3">位置</el-col>
                    <el-col :span="21" class="map-content">
                    <bdmap class="map" :data="dialogData.map_location"></bdmap>
                    </el-col>
                </el-row>
                </div>
            </div> -->
            <div class="dialog_info">
                <div class="dialog-table">
                    <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                        <el-row class="form-row fix">
                            <el-col :span="24">
                                <el-form-item class="col-name" label="楼宇全称">
                                    <span class="sblock" :title="dialogData.name">{{dialogData.name || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="服务站地址">
                                    <span class="sblock" :title="dialogData.address">{{dialogData.address || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="建立时间">
                                    <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="联系人">
                                    <span class="sblock" :title="dialogData.contact">{{dialogData.contact || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item class="col-name" label="联系电话">
                                    <span class="sblock" :title="dialogData.contact_phone">{{dialogData.contact_phone || ""}}</span>
                                </el-form-item>
                            </el-col>
                            <el-row class="image-list-header">
                                <el-col :span="4" class="upload-div">站长风范</el-col>
                                <el-col :span="10" class="calc-w-10">指导员风范</el-col>
                                <el-col :span="10" class="calc-w-10">党务专干风范</el-col>
                            </el-row>
                            <el-row class="images-list">
                                <el-col :span="4" class="upload-div managerPic">
                                    <div class="avatar-uploader no_photo">
                                        <img v-if="dialogData.manager_pic_url" :src="dialogData.manager_pic_url" class="avatar">
                                    </div>
                                    <div class="upload-text">{{ dialogData.building_leader }}</div>
                                </el-col>
                                <el-col :span="10" class="managerPic calc-w-10">
                                    <swiper3List class="swiper" :span="10" :data="dialogData.deputy_manager_pic" :slidesPerView="2" :isText="true" :isAutoplay="true" :field="swiperTextObj" />
                                </el-col>
                                <el-col :span="10" class="managerPic calc-w-10">
                                    <swiper3List class="swiper" :span="10" :data="dialogData.full_time_manager_pic" :slidesPerView="2" :numIndex="1" :isText="true" :isAutoplay="true" :field="swiperTextObj" />
                                </el-col>
                            </el-row>
                            <div class="detail-subtext">活动照片</div>
                            <swiper3List class="swiper3-list" :span="24" :data="dialogActData" :numIndex="2" :isText="true" :isAutoplay="true" :field="swiperTextObj2" />
                            <div class="detail-subtext">开展活动情况</div>
                            <div class="dialog_sim_table">
                                <el-table :data="activeList.data" style="width: 100%;">
                                    <el-table-column type="index" label="序号"></el-table-column>
                                    <el-table-column prop="work_name" label="名称" align="center" show-overflow-tooltip>
                                        <template slot-scope="scope">{{scope.row.work_name || '--'}}</template>
                                    </el-table-column>
                                    <el-table-column prop="end_time" label="时间" align="center" show-overflow-tooltip>
                                        <template slot-scope="scope">{{scope.row.end_time || '--'}}</template>
                                    </el-table-column>
                                    <el-table-column prop="form_name" label="形式" align="center" show-overflow-tooltip>
                                        <template slot-scope="scope">{{scope.row.form_name || '--'}}</template>
                                    </el-table-column>
                                </el-table>
                                <el-row class="pagination-content" type="flex" v-if="activeList.totalRows > 0">
                                    <span>共{{activeList.totalPages || "0"}}页</span>
                                    <el-pagination background @current-change="changeActiveList" layout="prev, pager, next" :total="activeList.totalRows"
                                        :current-page="activeParams.p"
                                        :page-size="activeParams.pagesize"
                                            class="pagination">
                                    </el-pagination>
                                </el-row>
                            </div>
                            <el-col :span="24" class="map-content">
                                <el-form-item label="位置">
                                    <bdmap class="map" :data="dialogData.map_address"></bdmap>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <el-dialog
                width="40%"
                :visible.sync="imgVisible"
                append-to-body>
                <img :src="imgSrc" alt="">
            </el-dialog>
        </datadialog>
  </div>
</template>

<script> 
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import exportData from "@/components/datacenter/widgets/ExportData";
import swiper3List from '@/components/datacenter/widgets/swiper3List'

export default {
    data() {
        return {
            loading: false,
            params: {
                p:  this.$route.params.p || 1,
                pagesize: 8,
                keyword: this.$route.params.keyword || '',
            },
            detailId: '',
            dialogVisible:false,
            imgVisible: false,
            imgSrc: '',
            tableData: [],
            dialogActData: [],
            activeList: {},
            activeParams: {
                p:1,
                pagesize: 10,
            },
            dialogData: {
                deputy_manager_pic: [],
                full_time_manager_pic: []
            },
            swiperTextObj: {
                url:'url',
                text: 'realname'
            },
            swiperTextObj2: {
                url:'img',
                text: 'work_name'
            }
        }
    },
    components: {datadialog,exportData,swiper3List},
    methods: {
        closeDialog(val) {
            this.dialogVisible = val
        },
        enlarge(src) {
            this.imgVisible = true
            this.imgSrc = src
        },
        search() {
            this.params.p = 1;
            this.getBuilding()
        },
        getBuilding() {
            this.loading = true
            datacenter.building(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.loading = true
            datacenter.building(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        checkDetail(id) {
            this.dialogVisible = true
            datacenter.building_info({id: id}).then( res => {
                res.data.data.map_address = res.data.data.map_address==''?[]:res.data.data.map_address
                this.dialogData = res.data.data
            })
            datacenter.building_active_img({id: id}).then( res => {
                this.dialogActData = res.data.data
            })
            this.activeParams.id = id
            this.getActive();
        },
        changeActiveList(p){
            this.activeParams.p = p
            this.getActive(true);
        },
        getActive(page) {
            if(!page){
                this.activeParams.p = 1
            }
            datacenter.building_active_list(this.activeParams).then( res => {
                this.activeList = res.data
            })
        },
        activeData_currentChange(value) {
            this.activeParams.p = value
            this.getActive();
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
                        this.$router.push({path: 'businessBuild_edit',query: query})
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
                this.$router.push({path: 'businessBuild_edit',query: query})
            }else {
                query = {
                    id: row.id,
                    org_id: this.params.org_id,
                    keyword: this.params.keyword,
                    p:  this.params.p,
                    tag: 'look'
                }
                this.$router.push({path: 'businessBuild_edit',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.building_del({id: row.id}).then( res => {
                    if(res.data.status == '200') {
                        this.getBuilding()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        },
        importReload() {
            this.getBuilding()
            this.getorg()
        }
    },
    created() {
        this.getBuilding()
    }
}
</script>

<style scoped>
  /* .dialog-info .dialog-table .el-row {border: 1px solid #ddd;} */
  /* .dialog-info .dialog-table {border-top: 1px solid #ddd;border-left: 1px solid #ddd;width: 100%;}
  .dialog-info .dialog-table .el-row .el-col {padding: 8px 16px;border: 1px solid #ddd; */
  /* border-top: none;border-left: none;} */
  /* .dialog-info .dialog-table .el-row .el-col img {cursor: pointer;}
  .dialog-info .dialog-table .el-row .el-col.map-content {height: 400px;}
  .dialog-info .dialog-table .el-row .el-col.map-content .map {width: 100%;height: 100%;overflow: hidden;position: relative;} */
  .images-list { border-bottom: 1px solid #ddd; }
  .images-list,.images-list > .el-row { height: 240px; }
  .images-list .managerPic { position: relative; height: 100%; border-bottom: 0 !important; }
  .images-list .managerPic > div { width: 100%; position: absolute; left: 0;right: 0;margin: auto; }
  .image-list-header { width: 100%; float: left; background: #206eca; color: #fff; height:40px; line-height: 40px; text-align: center; }
  .images-list { width: 100%; float: left; position: relative; }
  .images-list /deep/ .avatar-uploader { height: 240px; }
  .swiper { border-right: 0 !important; width: 430px!important; }
  .upload-div { position: relative; }
  .swiper3-list { width: 100%!important; border-bottom: 1px solid #ddd!important; }
  /* .no_photo { border-bottom: 1px solid #ddd; } */
  .calc-w-10 { float: left; width:calc((100% - 190px) / 2); }

.center-box .dialog_info .upload-div { width: 190px; border-bottom: 0; }
/* .center-box .dialog_info */
 /deep/ .el-dialog  { min-width: 1100px; }
</style>
