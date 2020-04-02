<template>
    <el-dialog class="comDialog youthBox" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData()" @close="$emit('close')">
        <div class="dialog_info" v-loading="loading">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="团组织名称" prop="name">
                                        <span class="sblock" :title="dialogData.name">{{dialogData.name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="所在单位">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="所属社区">
                                        <span class="sblock" :title="dialogData.community_name">{{dialogData.community_name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="团组织建立时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期(年)">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="团组织书记">
                                        <span class="sblock" :title="dialogData.secretary">{{dialogData.secretary || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="联系电话">
                                        <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">团组织书记照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="地址">
                                <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="团员总数">
                                <span class="sblock" :title="dialogData.member_num">{{dialogData.member_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="保留团籍的党员数">
                                <span class="sblock" :title="dialogData.own_youth_party_member_num">{{dialogData.own_youth_party_member_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
            dialogData:{}
        }
    },
    methods: {
        fetchData: function() {
            this.loading = true;
            if (this.dataid) {
                datacenter.youth_detail({id:this.dataid}).then( res => {
                    this.loading = false;
                    this.dialogData = res.data.data
                })
            }else{
                console.warn('参数错误')
            }
        }
    },
    created() {}
};
</script>

<style>
.youthBox .col-name { height:58px; line-height:40px;}
.youthBox .col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}
.youthBox .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.youthBox .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height:180px; text-align: center; cursor: pointer; position: relative; font-size:0;}
.youthBox .dialog_info .avatar-uploader.no_photo { cursor: default; }
.youthBox .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.youthBox .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
.youthBox .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
.youthBox .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.youthBox .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.youthBox .upload-div img { vertical-align: middle; max-height: 100%!important; }
.youthBox .upload-div .look { cursor: default; }
.youthBox .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.youthBox .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.youthBox .dialog_info .el-form .el-form-item { margin: 0; height: 60px; overflow: hidden; }
.youthBox .dialog_info .el-form .el-form-item__label,
.youthBox .dialog_info .el-form .el-form-item__content { line-height: 60px; }
.youthBox .dialog_info .el-form .el-form-item__content{ padding: 0 16px; }
.youthBox .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.youthBox .dialog_info .el-form .el-input input,
.youthBox .dialog_info .el-form .el-select input,
.youthBox .dialog_info .el-form .el-textarea textarea,
.youthBox .el-form .map-content {height: 400px;}
.youthBox .el-form .map-content .el-form-item,
.youthBox .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.youthBox .el-form .map-content .el-form-item__content { padding: 0; }
.youthBox .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.youthBox .dialog_info .secretary .el-form-item, 
.youthBox .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.youthBox .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.youthBox .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.youthBox .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
.youthBox .dialog_info .col-table .el-col { border-left: 0; }
.youthBox .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.youthBox .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.youthBox .dialog_info { max-height: 60vh; overflow: auto;}
</style>
