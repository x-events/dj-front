<template>
    <el-dialog class="comDialog womenBox" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData()" @close="$emit('close')">
        <div class="dialog_info" v-loading="loading">
            <div class="dialog-table">
                 <el-form class="flex-1" :model="dialogData" ref="formForm" label-width="190px" :show-message="false" size="medium" label-suffix="">
                    <el-row class="form-row fix">
                        <el-row class="upload-row">
                            <el-row>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位名称">
                                        <span class="sblock" :title="dialogData.company">{{dialogData.company || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="20">
                                    <el-form-item class="col-name" label="单位地址">
                                        <span class="sblock" :title="dialogData.addr">{{dialogData.addr || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="妇联主席">
                                        <span class="sblock" :title="dialogData.chairman">{{dialogData.chairman || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="任期(年)">
                                        <span class="sblock" :title="dialogData.tenure">{{dialogData.tenure || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="col-name" label="妇联建立时间">
                                        <span class="sblock" :title="dialogData.setup_time">{{dialogData.setup_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item class="col-name" label="妇联换届时间">
                                        <span class="sblock" :title="dialogData.change_time">{{dialogData.change_time || ""}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4" class="upload-div">
                                    <div class="avatar-uploader no_photo">
                                        <img v-if="dialogData.legal_img_url" :src="dialogData.legal_img_url" class="avatar">
                                    </div>
                                    <div class="upload-text">妇联主席照片</div>
                                </el-col>
                            </el-row>
                        </el-row>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="地区人口总数">
                                <span class="sblock" :title="dialogData.user_num">{{dialogData.user_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="妇女人口总数">
                                <span class="sblock" :title="dialogData.women_num">{{dialogData.women_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="妇联党员数">
                                <span class="sblock" :title="dialogData.party_num">{{dialogData.party_num || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="col-name" label="是否建立党组织">
                                <span class="sblock" :title="(dialogData.party_branch=='1'?'是':'否')">{{(dialogData.party_branch=='1'?'是':'否') || ""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item class="col-name" label="联系电话">
                                <span class="sblock" :title="dialogData.tel">{{dialogData.tel || ""}}</span>
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
                datacenter.women_detail({id:this.dataid}).then(res => {
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
.womenBox .col-name { height:58px; line-height:40px;}
.womenBox .col-name .sblock { display: inline-block; max-height:42px; line-height:20px; overflow:hidden; vertical-align:middle; overflow:hidden; text-overflow: ellipsis; display:-webkit-inline-box; -webkit-line-clamp: 2; -webkit-box-orient:vertical;}
.womenBox .dialog_info .el-row.upload-row { position: relative; float: left; width: 100%; }
.womenBox .dialog_info .avatar-uploader  { /* height: 243px; */ height: 100%; line-height:180px; text-align: center; cursor: pointer; position: relative; font-size:0;}
.womenBox .dialog_info .avatar-uploader.no_photo { cursor: default; }
.womenBox .dialog_info .avatar-uploader .el-upload { font-size: 30px; }
.womenBox .upload-div .upload-text { line-height: 50px; background: rgba(0,0,0,0.5); color: #fff; text-align: center; position: absolute; bottom: 0; width: 100%; z-index: 0; box-sizing: border-box; border: 1px solid; font-size: 14px; }
.womenBox .upload-div  { position: absolute; right: 0; top: 0; z-index: 0; height: 100%; }
.womenBox .upload-div .avatar-uploader .el-upload__tip { position: absolute; bottom: 60px; left: 0;right: 0; margin: auto; line-height: 1; z-index: 10;}
.womenBox .upload-div .el-upload { width: 100%; height: 100%; position: relative; z-index: 10; }
.womenBox .upload-div img { vertical-align: middle; max-height: 100%!important; }
.womenBox .upload-div .look { cursor: default; }
.womenBox .dialog_info .el-row.form-row { position: relative; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
.womenBox .dialog_info .el-row .el-col{ border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; }
.womenBox .dialog_info .el-form .el-form-item { margin: 0; height: 60px; overflow: hidden; }
.womenBox .dialog_info .el-form .el-form-item__label,
.womenBox .dialog_info .el-form .el-form-item__content { line-height: 60px; }
.womenBox .dialog_info .el-form .el-form-item__content{ padding: 0 16px; }
.womenBox .dialog_info .el-form .el-form-item__label { background: #206eca; color: #fff; text-align: center; }
.womenBox .dialog_info .el-form .el-input input,
.womenBox .dialog_info .el-form .el-select input,
.womenBox .dialog_info .el-form .el-textarea textarea,
.womenBox .el-form .map-content {height: 400px;}
.womenBox .el-form .map-content .el-form-item,
.womenBox .el-form .map-content .el-form-item__label { height: 100%; line-height: 400px; }
.womenBox .el-form .map-content .el-form-item__content { padding: 0; }
.womenBox .el-form .map-content .map {width: 100%;height: 400px;overflow: hidden;position: relative;}
.womenBox .dialog_info .secretary .el-form-item, 
.womenBox .dialog_info .secretary .el-form-item__label { height: 90px; line-height: 90px; }
.womenBox .dialog-table .detail-subtext { color: #177cd5; padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box; }
.womenBox .dialog-table .detail-subtext:before { content: ''; position: absolute; width: 4px; border-radius: 20px; height: 20px; background: #147cd7; left: 0;  }
.womenBox .detail-void { padding: 15px; position: relative; border-left: 3px solid #fff; margin-left: -1px; border-bottom: 1px solid #ddd; float: left; width: 100%; box-sizing: border-box;}
.womenBox .dialog_info .col-table .el-col { border-left: 0; }
.womenBox .dialog_info .col-table { border: 1px solid #ddd; border-bottom: 0; border-right: 0; }
.womenBox .dialog_info .col-table .col-name:nth-of-type(2n-1){ background: #206eca; color: #fff; text-align: center; }
.womenBox .dialog_info { max-height: 60vh; overflow: auto;}
</style>
