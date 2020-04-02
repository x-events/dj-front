<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入党建阵地名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加党建阵地</el-button>
            <exportData eType="party" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="party" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="name" label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.type || '--'}}</template>
        </el-table-column>
        <el-table-column prop="addr" label="单位地址" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.addr || '--'}}</template>
        </el-table-column>
        <el-table-column prop="area" label="面积（m²）" width="150px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.area || '--'}}</template>
        </el-table-column>
        <el-table-column prop="open_time" label="开放时间" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.open_time || '--'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="联系电话" width="120px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.tel || '--'}}</template>
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

      <datadialog :dialogVisible=dialogVisible @dialogData="closeDialog">
        <!-- <div class="dialog-info">
          <div class="dialog-table scrollbar">
            <el-row>
              <el-col class="col-name" :span="3">名称</el-col>
              <el-col :title="dialogData.name" class="col-name el" :span="9">{{dialogData.name || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">联系电话</el-col>
              <el-col :title="dialogData.tel" class="col-name el" :span="9">{{dialogData.tel || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">单位地址</el-col>
              <el-col :title="dialogData.addr" class="col-name el" :span="9">{{dialogData.addr || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">面积（㎡）</el-col>
              <el-col :title="dialogData.area" class="col-name el" :span="9">{{dialogData.area || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">开放时间</el-col>
              <el-col :title="dialogData.open_time" class="col-name el" :span="9">{{dialogData.open_time || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">类型</el-col>
              <el-col :title="dialogData.type_name" class="col-name el" :span="9">{{dialogData.type_name || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">所属党组织</el-col>
              <el-col :title="dialogData.org_name" class="col-name el" :span="9">{{dialogData.org_name || "暂无"}}</el-col>
              <el-col class="col-name" :span="3">所属社区</el-col>
              <el-col :title="dialogData.community_name" class="col-name el" :span="9">{{dialogData.community_name || "暂无"}}</el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">功能</el-col>
              <el-col class="col-name el" :span="21">
                <span v-for="(item, index) in dialogData.func" :key="item.name">
                  {{item.name}}
                  <span v-if="index < dialogData.func.length-1">、</span>
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="col-name" :span="3">简介</el-col>
              <el-col :title="dialogData.remark" class="col-name el" :span="21">{{dialogData.remark || "暂无"}}</el-col>
            </el-row>
            <el-row class="img-row flex-row">
              <el-col class="col-name" :span="3">图片</el-col>
              <el-col class="col-name flex-1" :span="21">
                <img v-for="item in dialogData.img" :key="item" :src="item" alt=""
                  @click="enlarge(item)">
              </el-col>
            </el-row>
            <el-row class="map-row flex-row">
              <el-col class="col-name" :span="3">位置</el-col>
              <el-col class="col-name flex-1 map-content" :span="21">
                <bdmap class="map" :data="dialogData.address"></bdmap>
              </el-col>
            </el-row>
          </div>  

          <el-dialog
            width="30%"
            :visible.sync="imgVisible"
            append-to-body>
            <img style="width: 100%;" :src="imgSrc" alt="">
          </el-dialog>
        </div> -->
        <div class="dialog_info">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="名称" prop="name">
                                            <span class="sblock" :title="dialogData.name">{{dialogData.name || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="地址">
                                            <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="联系电话">
                                            <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item class="col-name" label="开放时间">
                                            <span class="sblock" :title="dialogData.open_time">{{dialogData.open_time || ""}}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <swiper3List :data="dialogData.img_url" />
                            </el-row>
                        </el-row>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="面积（m²）">
                                <span class="sblock" :title="dialogData.area">{{dialogData.area || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="类型">
                                <span class="sblock" :title="dialogData.type_name">{{dialogData.type_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="所属党组织">
                                <span class="sblock" :title="dialogData.org_name">{{dialogData.org_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="所属社区">
                                <span class="sblock" :title="dialogData.community_name">{{dialogData.community_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="简介">
                                <span class="sblock" :title="dialogData.remark">{{dialogData.remark || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="img_p_div height_auto" v-if="dialogData.func.length != 0">
                            <el-form-item label="功能">
                                <div class="img_text_div">
                                    <dl v-for="(item, index) in dialogData.func" :key="index">
                                        <dt><img :src="item.url"></dt>
                                        <dd>{{ item.name }}</dd>
                                    </dl>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-else>
                            <el-form-item class="col-name" label="功能">
                                <span class="sblock"></span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="map-content">
                            <el-form-item label="位置">
                                <bdmap class="map" :data="dialogData.address"></bdmap>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
      </datadialog>
    </div>
  </div>
</template>

<script>
import { baseURL} from '@/api/index';
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import swiper3List from '@/components/datacenter/widgets/swiper3List'
import exportData from "@/components/datacenter/widgets/ExportData";

export default {
  data() {
    return {
      loading: false,
      params: {
        p:  this.$route.params.p || 1,
        pagesize: 8,
        keyword: this.$route.params.keyword || '',
      },
      tableData: [],
      dialogVisible:false,
      dialogData: {
          img_url: [],
          func: []
      },
      imgVisible: false,
      imgSrc: '',
    }
  },
  components: {datadialog, swiper3List, exportData},
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
            this.getList()
        },
        getList() {
            this.loading = true
            datacenter.party_field_list(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getList()
        },
        checkDetail(id) {
            this.dialogVisible = true
            datacenter.party_field_info({id: id}).then( res => {
                this.dialogData = res.data.data
            })
        },
        edit(tag,row) {
            let query = {}
            if(tag != 'add') {
                query = {
                    id: row.id,
                    keyword: this.params.keyword,
                    p:  this.params.p,
                }
            }
            if(tag == 'add') {    // 新增
                query = {
                    keyword: this.params.keyword,
                    p:  this.params.p,
                }
                this.$router.push({path: 'partyBuild_edit',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'partyBuild_edit',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({path: 'partyBuild_edit',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.party_del({id: row.id}).then( res => {
                    if(res.data.status == '200') {
                        this.getList()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        },
        importReload() {
            this.getList()
        }
    },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
  .dialog-info .dialog-table {border-top: 1px solid #ddd;border-left: 1px solid #ddd;width: 100%;}
  .dialog-info .dialog-table .el-row .el-col {padding: 8px 16px;border: 1px solid #ddd;
  border-top: none;border-left: none;}
  .dialog-info .dialog-table .el-row.img-row .el-col img {height: 100px;margin-right: 10px;margin-bottom: 10px;cursor: pointer;}
  .dialog-info .dialog-table .el-row .map-content {height: 400px;}
  .dialog-info .dialog-table .el-row.map-row .map {width: 100%;height: 100%;overflow: hidden;position: relative;}

.img_text_div { padding: 10px 0; }
.img_text_div dl { display: inline-block; width: 100px; vertical-align: bottom; padding: 5px 0; }
.img_text_div dl dt,.img_text_div dl dd { display: inline-block; vertical-align: middle; }
.img_text_div dl dt,
.img_text_div dl dd { height: 20px; line-height: 20px; }
.img_text_div dl dt img { height: 100%; }

.leftBtn, .rightBtn { width: 30px; position: relative; }
.leftBtn i, .rightBtn i { position: absolute; top: 0;bottom: 0; margin: auto; }

/* .dialog_info .el-form .el-form-item__label { background-color:#f9f9f9;}
.dialog_info .dialog-table .col-name.el-form-item { background-color:transparent!important;} */
</style>