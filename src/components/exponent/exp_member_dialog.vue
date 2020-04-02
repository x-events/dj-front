<template>
    <el-dialog class="comDialog memberBox" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData()" @close="$emit('close')">
        <div class="dialog_info" v-loading="loading">
            <div class="dialog-table">
                <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="姓名">
                                        <span class="sblock" :title="dialogData.realname">{{dialogData.realname || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="性别">
                                        <span class="sblock" :title="(dialogData.sex=='1'?'女':'男')">{{(dialogData.sex=='1'?'女':'男') || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="所在支部">
                                        <span class="sblock" :title="dialogData.org_name">{{dialogData.org_name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="民族">
                                        <span class="sblock" :title="dialogData.nation_name">{{dialogData.nation_name || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="身份证号">
                                        <span class="sblock" :title="dialogData.card">{{dialogData.card || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="出生日期">
                                        <span class="sblock" :title="dialogData.birth">{{dialogData.birth || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader">
                                        <img v-if="dialogData.portrait_url" :src="dialogData.portrait_url" class="avatar">
                                    </div>
                                    <div class="upload-text">党员头像</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="籍贯">
                                <span class="sblock" :title="dialogData.native_place_name">{{dialogData.native_place_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="入党时间">
                                <span class="sblock" :title="dialogData.join_time">{{dialogData.join_time || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="家庭住址">
                                <span class="sblock" :title="dialogData.address">{{dialogData.address || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="联系电话">
                                <span class="sblock" :title="dialogData.cellphone ">{{dialogData.cellphone  || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="专业特长">
                                <span class="sblock" :title="dialogData.majorthey_name">{{dialogData.majorthey_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                            <el-form-item class="col-name" label="是否困难">
                                <span class="sblock" :title="(dialogData.unnnn=='1'?'是':'否')">{{(dialogData.unnnn=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="12">
                            <el-form-item class="col-name" label="所在支部党内职务">
                                <span class="sblock" :title="dialogData.duties_name">{{dialogData.duties_name || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="党务工作经验(年)">
                                <span class="sblock" :title="dialogData.experience">{{dialogData.experience || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="是否为企业高管">
                                <span class="sblock" :title="(dialogData.high=='1'?'是':'否')">{{(dialogData.high=='1'?'是':'否') || ""}}</span>
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
                datacenter.member_info({id:this.dataid}).then(res => {
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

<style scoped>
.worklist { background-color:#ffffff;}
.worklist .el-table >>> td,.worklist .el-table >>> th { padding:12px 0;}
.page-div { padding:10px 0 0 0; line-height:28px;}
.page-div > span { color:#333333;}
</style>

<style>
.memberBox .col-name { height:58px; line-height:40px;}
.memberBox .col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}
.memberBox .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.memberBox .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height:180px; text-align: center; cursor: pointer; position: relative; font-size:0;}
.memberBox .dialog_info .avatar-uploader.no_photo { cursor: default; }
.memberBox .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.memberBox .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
/* .memberBox .data-edit .upload-div, */
.memberBox .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
/* .memberBox .data-edit .avatar-uploader .el-upload__tip, */
.memberBox .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.memberBox .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.memberBox .upload-div img { vertical-align: middle; max-height: 100%!important; }
.memberBox .upload-div .look { cursor: default; }
.memberBox .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.memberBox .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.memberBox .dialog_info .el-form .el-form-item { margin: 0; height: 60px; overflow: hidden; }
.memberBox .dialog_info .el-form .el-form-item__label,
.memberBox .dialog_info .el-form .el-form-item__content { line-height: 60px; }
.memberBox .dialog_info .el-form .el-form-item__content{ padding: 0 16px; }
.memberBox .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.memberBox .dialog_info .el-form .el-input input,
.memberBox .dialog_info .el-form .el-select input,
.memberBox .dialog_info .el-form .el-textarea textarea,
.memberBox .el-form .map-content {height: 400px;}
.memberBox .el-form .map-content .el-form-item,
.memberBox .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.memberBox .el-form .map-content .el-form-item__content { padding: 0; }
.memberBox .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.memberBox .dialog_info .secretary .el-form-item, 
.memberBox .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.memberBox .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.memberBox .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.memberBox .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
.memberBox .dialog_info .col-table .el-col { border-left: 0; }
.memberBox .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.memberBox .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.memberBox .dialog_info { max-height: 60vh; overflow: auto;}
</style>
