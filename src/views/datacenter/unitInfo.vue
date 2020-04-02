<template>
  <div class="data-center scrollbar">
    <header class="toolbar">
        <div class="left">
            <el-input v-model="params.keyword" placeholder="请输入单位名称"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-row type="flex" class="search-input">
            <el-button size="small" @click="edit('add')" v-if="$root.datacenter_op_auth.add == 1">添加单位</el-button>
            <exportData eType="unit" @reload="importReload" v-if="$root.datacenter_op_auth.add == 1" />
            <ExportOutData expType="unit" :keyword="params.keyword" v-if="$root.datacenter_op_auth.check == 1" />
        </el-row>
    </header>
    <div class="shadow-table" v-loading="loading">
      <el-table :data="tableData.data" stripe>
        <el-table-column prop="short_name" label="单位名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="checkDetail(scope.row.id)"
              type="text">
              {{scope.row.short_name || '--'}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="单位类别" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.category || '--'}}</template>
        </el-table-column>
        <!-- <el-table-column prop="category" label="组织类别" width="200px"></el-table-column> -->
        <!-- <el-table-column prop="sub_rel" label="单位隶属关系" width="200px"></el-table-column> -->
        <el-table-column prop="party_org_situation" label="建立党组织情况" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.party_org_situation || '--'}}</template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人" width="110px" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.contact || '--'}}</template>
        </el-table-column>
        <el-table-column prop="contact_phone" label="联系电话" width="120px" show-overflow-tooltip>
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

      <datadialog :dialogVisible=dialogVisible @dialogData="closeDialog">
        <div class="dialog_info">
          <div class="dialog-table">
            <!-- <el-row class="table-content">
              <el-col class="col-name" :span="4">单位全称</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.name || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位地址</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.address || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位电话</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.phone || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位简称</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.short_name || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位隶属关系</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.sub_rel || "暂无"}}</el-col>

              <el-col class="col-name" :span="4">隶属单位</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.category || "暂无"}}</el-col>

              <el-col class="col-name" :span="4">单位编码</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.code || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位性质类别</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.category || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位所属行业</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.industry || "暂无"}}</el-col>
              <el-col class="col-name" :span="4">单位类型</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.type || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">单位级别</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.level || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">单位所在政区</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.own_district || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">单位工作职能</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.duty || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">单位负责人</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.principal || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">法人单位</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.legal_entity || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">法人单位代码	</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.legal_entity_code || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">企业登记注册类型	</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.reg_type || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">企业规模</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.com_scale || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">控制（控股）情况</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.holding_situation || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">建立党基层组织情况</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.party_org_situation || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">基金会</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.foundation || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">律师事务所</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.low_office || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">所属（党委）辖区</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.own_org || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">建立党员服务机构</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.party_service_agency || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">建立党员服务机构情况</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.party_service_agency_situation || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">法人代表</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.legal_deputy || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">成立时间</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.setup_time || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">注册资金</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.reg_capital || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">营业范围</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.business_scope || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">联系人</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.contact || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">联系人电话</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.contact_phone || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">工会</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.trade_union || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">团委</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.org_youth || "暂无"}}</el-col>
              <el-col class="col-name el" :span="4">妇联</el-col>
              <el-col class="col-name el" :span="8">{{dialogData.org_women || "暂无"}}</el-col>
            </el-row> -->
            <el-row class="table-content col-table">
                <el-row>
                    <cname-title title="单位名称" />
                    <el-col :title="dialogData.short_name" class="col-name" :span="8"><span class="sblock">{{dialogData.short_name || ""}}</span></el-col>
                    <cname-title title="单位类别" />
                    <el-col :title="dialogData.category" class="col-name" :span="8"><span class="sblock">{{dialogData.category || ""}}</span></el-col>
                </el-row>
                <el-row>
                    <cname-title title="单位地址" />
                    <el-col :title="dialogData.address" class="col-name" :span="8"><span class="sblock">{{dialogData.address || ""}}</span></el-col>
                    <cname-title title="单位规模" />
                    <el-col :title="dialogData.com_scale" class="col-name" :span="8"><span class="sblock">{{dialogData.com_scale || ""}}</span></el-col>
                </el-row>
                <el-row>
                    <cname-title title="联系人" />
                    <el-col :title="dialogData.contact" class="col-name" :span="8"><span class="sblock">{{dialogData.contact || ""}}</span></el-col>
                    <cname-title title="联系电话" />
                    <el-col :title="dialogData.contact_phone" class="col-name" :span="8"><span class="sblock">{{dialogData.contact_phone || ""}}</span></el-col>
                </el-row>
                <el-row>
                    <cname-title title="资源清单" />
                    <el-col :title="dialogData.recource" class="col-name" :span="20"><span class="sblock">{{dialogData.recource || ""}}</span></el-col>
                </el-row>
                <el-row>
                    <cname-title title="建立党组织情况" />
                    <el-col :title="dialogData.party_org_situation" class="col-name" :span="20"><span class="sblock">{{dialogData.party_org_situation || ""}}</span></el-col>
                </el-row>
            </el-row>
          </div>  
        </div>
      </datadialog>
    </div>
  </div>
</template>

<script>
import * as datacenter from '../../api/datacenter.js'
import datadialog from './dialog.vue'
import cnameTitle from '@/components/datacenter/colName_title.vue'
import exportData from "@/components/datacenter/widgets/ExportData";

export default {
    data() {
        return {
        loading: false,
        params: {
            p:this.$route.params.p || 1,
            pagesize: 8,
            keyword: this.$route.params.keyword || '',
        },
        tableData: [],
        dialogVisible:false,
        dialogData: {}
        }
    },
    components: {datadialog, cnameTitle, exportData},
    methods: {
        closeDialog(val) {
            this.dialogVisible = val
        },
        search() {
            this.params.p = 1;
            this.getunitInfo()
        },
        getunitInfo() {
            this.loading = true
            datacenter.unitinfo(this.params).then( res => {
                this.loading = false
                this.tableData = res.data
            })
        },
        currentChange(value) {
            this.params.p = value
            this.getunitInfo()
        },
        checkDetail(id) {
            this.dialogVisible = true
            datacenter.unitDetail({id: id}).then( res => {
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
                this.$router.push({path: 'unitInfo_edit',query: query})
            }else if(tag == 'edit') {
                this.$router.push({path: 'unitInfo_edit',query: query})
            }else {
                query.tag = 'look'
                this.$router.push({name: '单位信息编辑',query: query})
            }
        },
        del(row) {
            this.$confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
                datacenter.unit_del({id: row.id}).then( res => {
                    if(res.data.status == '200') {
                        this.getunitInfo()
                        this.$message({ message: res.data.statusCode, type: 'success' });
                    }else {
                        this.$message({ message: res.data.statusCode, type: 'error' });
                    }
                })
            }).catch(() => {});
        },
        importReload() {
            this.getunitInfo()
        }
    },
    created() {
        this.getunitInfo()
    }
}
</script>

<style scoped>
.dialog-table { width: 100%; }
</style>

