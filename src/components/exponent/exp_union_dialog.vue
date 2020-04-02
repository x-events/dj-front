<template>
    <el-dialog class="comDialog unionBox" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData()" @close="$emit('close')">
        <div class="dialog_info" v-loading="loading">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix=":">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位名称">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="经营地址">
                                        <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name hight-item" label="经营范围">
                                        <span class="sblock" :title="dialogData.business_scope">{{dialogData.business_scope || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">单位法人照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="单位法人">
                                        <span class="sblock" :title="dialogData.legal_person">{{dialogData.legal_person || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="申请建会时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="工会主席">
                                        <span class="sblock" :title="dialogData.chairman">{{dialogData.chairman || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="联系电话">
                                        <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="是否建立党组织">
                                        <span class="sblock" :title="(dialogData.party_branch==
                                        '1'?'是':'否')">{{(dialogData.party_branch==
                                        '1'?'是':'否') || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="职工数">
                                        <span class="sblock" :title="dialogData.employee_num">{{dialogData.employee_num || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="会员数">
                                        <span class="sblock" :title="dialogData.member_num">{{dialogData.member_num || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.chairman_img_url" :src="dialogData.chairman_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">工会主席照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <div class="detail-subtext">工会党员</div>
                    </el-row>
                    <div class="worklist">
                        <el-table :data="personData.data" style="width: 100%;">
                            <el-table-column prop="realname" label="姓名"></el-table-column>
                            <el-table-column prop="sex" label="性别"></el-table-column>
                            <el-table-column prop="type_name" label="职务"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                        </el-table>

                        <div class="page-div fix" v-if="personData.totalRows > 0">
                            <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(personData.totalRows)"></el-pagination>
                            <span class="pageNum">共 {{ personData.totalPages }} 页</span>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
  </el-dialog>
</template>

<script>
import * as datacenter from '@/api/datacenter'

export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false
        },
        category_name: {
            type: String,
            required: true
        },
        dataid: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            queryParam: {
                p:1,
                pagesize:8,
                id:this.dataid,
            },
            dialogData:{},
            personData:{
                data:[],
                totalRows:0,
                totalPages:0
            }
        }
    },
    watch: {
        dataid(new_val){
            this.queryParam.id = new_val;
        }
    },
    methods: {
        pageChange(p){
            this.queryParam.p = p;
            this.fetchData();
        },
        fetchData: function() {
            this.loading = true;
            if (this.dataid) {
                datacenter.union_info({id:this.dataid}).then(res => {
                    this.loading = false;
                    this.dialogData = res.data.data
                })
                // 人员列表
                datacenter.union_member_list(this.queryParam).then( res => {
                    this.personData = res.data
                })
            }else{
                console.warn('参数错误')
            }
        }
    },
    created() {}
};
</script>

<style scoped>
.worklist { background-color:#ffffff;}
.worklist .el-table >>> td,.worklist .el-table >>> th { padding:12px 0;}
.page-div { padding:10px 0 0 0; line-height:28px;}
.page-div > span { color:#333333;}
</style>

<style>
.unionBox .col-name { height:58px; line-height:40px;}
.unionBox .col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}
.unionBox .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.unionBox .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height:180px; text-align: center; cursor: pointer; position: relative; font-size:0;}
.unionBox .dialog_info .avatar-uploader.no_photo { cursor: default; }
.unionBox .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.unionBox .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
.unionBox .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
.unionBox .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.unionBox .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.unionBox .upload-div img { vertical-align: middle; max-height: 100%!important; }
.unionBox .upload-div .look { cursor: default; }
.unionBox .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.unionBox .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.unionBox .dialog_info .el-form .el-form-item { margin: 0; height: 60px; overflow: hidden; }
.unionBox .dialog_info .el-form .el-form-item__label,
.unionBox .dialog_info .el-form .el-form-item__content { line-height: 60px; }
.unionBox .dialog_info .el-form .el-form-item__content{ padding: 0 16px; }
.unionBox .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.unionBox .dialog_info .el-form .el-input input,
.unionBox .dialog_info .el-form .el-select input,
.unionBox .dialog_info .el-form .el-textarea textarea,
.unionBox .el-form .map-content {height: 400px;}
.unionBox .el-form .map-content .el-form-item,
.unionBox .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.unionBox .el-form .map-content .el-form-item__content { padding: 0; }
.unionBox .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.unionBox .dialog_info .secretary .el-form-item, 
.unionBox .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.unionBox .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 0px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.unionBox .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.unionBox .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
.unionBox .dialog_info .col-table .el-col { border-left: 0; }
.unionBox .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.unionBox .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.unionBox .dialog_info { max-height: 60vh; overflow: auto;}

.unionBox .hight-item,
.unionBox .hight-item .el-form-item__label { height: 120px!important; line-height: 120px!important; }
.unionBox .hight-item .el-form-item__content { padding-top: 10px!important; }
.unionBox .hight-item .el-form-item__content .sblock { -webkit-line-clamp: 5; max-height: 120px; vertical-align: top; }
.unionBox .hight-item textarea { height: auto!important; }
</style>
