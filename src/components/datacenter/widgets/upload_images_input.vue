<template>
  <div v-loading="loading">
    <div class="imgs-list">
        <el-form :model="list" ref="uploadInputForm" :show-message="false" size="medium">
            <el-form-item v-for="(item, index) in list.d" :key="index" :prop="'d.'+index+'.realname'" :rules="formRule.realname">
                <dl>
                    <dt><img :src="item.url">
                        <div class="mask-div" v-if="!disabled">
                            <div class="zoom">
                                <i @click="handlePictureCardPreview(item,index)" class="el-icon-zoom-in"></i>
                            </div>
                            <div class="del">
                                <i @click="handleFileRemove(item,index)" class="el-icon-delete"></i>
                            </div>
                        </div>
                    </dt>
                    <dd>
                        <el-input v-model="item.realname" :placeholder="pholder" :disabled="disabled" maxlength="10"></el-input>
                    </dd>
                </dl>
            </el-form-item>
            <el-upload
                :class="{
                    'avatar-uploader': !!onefile,
                    'hidePicker': !onefile && !(list.d.length<limit) || disabled
                }"
                :action="upload"
                :headers="{Authorization: $root.user && $root.user.access_token}"
                accept="image/*"
                :file-list="list.d"
                :show-file-list="false"
                :list-type="'picture-card'"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :on-error="handleError"
                :before-upload="beforeUpload"
                :disabled="disabled"
                :limit="limit">
                <!-- <template v-if="onefile">
                    <img v-if="list[0]" :src="list[0].url" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </template>
                <template v-else> -->
                <template>
                    <template v-if="list.d.length<limit">
                        <i class="el-icon-plus" ></i>
                    </template>
                    <template v-else>
                        达到上传上限
                    </template>
                </template>
            </el-upload>
        </el-form>
    </div>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { upload } from "@/api/common";
import * as util from "@/assets/util";

export default {
  props: {
    propvalue: {
      type: [Object, Array],
      required: true,
      default: function(){
        return []
      }
    },
    onefile: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    limit: {
        type: Number,
        default: 9
    },
    pholder: {
        type: String,
        default: '请输入'
    },
    refsname: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
        loading: false,
        upload,
        list: [],
        list: {
            d:[]
        },
        formData: [],
        formRule: {
            realname: [ { required: true, trigger: 'blur' }],
            type: [ { required: true, trigger: 'blur' }],
        },
        previewVisible: false,
        dialogImageUrl: '',
    };
  },
  watch: {
    propvalue: {
      handler: function(propvalue) {
          //this.list = propvalue
          if (this.onefile) {
            if(propvalue.id){
              this.list.d = [propvalue];
            }else{
              this.list.d = [];
            }
          } else {
            this.list.d = propvalue;
          }
      },
      deep: true
    },
    'list.d': {
      handler: function(list) {
        this.$emit(
          "change",
          this.onefile
            ? (list[0] || {})
            : list
        );
      },
      deep: true
    }
  },
  methods: {
    handleSuccess: function(res, file, filelist) {
      console.log(res)
      this.loading = false;
      if (this.onefile) {
        this.list.d = [res.data];
      } else {
        this.list.d.push(res.data);
      }
    },
    handleRemove(file, fileList) {
      this.list.d = this.list.d.filter(e => {
        return e.id != file.id
      })
    },
    handleError: function(err) {
      this.loading = false;
      return util.catchError(err);
    },
    beforeUpload: function() {
      this.loading = true;
      return true;
    },
    handleFileRemove(file,i){//删除图片
        if(!file.url){
            return false;
        }
        this.list.d.splice(i,1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.previewVisible = true;
    },
    // 验证是否通过
    submitValid() {
        let val = ''
        this.$refs['uploadInputForm'].validate((valid, vinfo) => {
            
            if (valid) {
                
            } else {
                this.$message({ message: this.pholder, type: 'error' });
                return false;
            }
            val = valid
        });
        return val
    }
  },
  created: function() {
    let propvalue = this.propvalue;
    if (propvalue) {
      if (this.onefile) {
        if(propvalue.id){
            this.list.d = [propvalue];
          }else{
            this.list.d = [];
          }
      } else {
        this.list.d = propvalue;
      }
    }
  }
};
</script>

<style scoped>
.hidePicker >>> .el-upload--picture-card{display: none;}
.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

.imgs-list { clear: both; }
.imgs-list .el-form { padding: 0!important; }
.imgs-list .el-form-item,
.imgs-list .el-form > div { display: inline-block; vertical-align: top; height: auto!important; }
.imgs-list .el-form-item { width: 148px; margin-right: 10px!important; padding-bottom: 10px; }
.imgs-list dt { height: 148px; margin-right: 0; border: 1px solid #ddd; border-radius: 6px; position: relative; overflow: hidden; }
.imgs-list dt img { position: absolute; left: 0;top: 0;right: 0;bottom: 0;margin: auto; }
.imgs-list dd,
.imgs-list dd .el-input /deep/ input { height: 40px!important; line-height: 40px; width: 100%; border-color: #ddd !important; }
.imgs-list dd { text-align: center; margin-top: 10px; }
.imgs-list dt:hover .mask-div { opacity: 0; }
.imgs-list dt .mask-div i { color: #fff; cursor:pointer; font-size: 20px; }
.imgs-list dt:hover .mask-div{ opacity: 1; background: rgba(0,0,0,0.5); transition: opacity .3s; }
.mask-div { position: relative; width: 100%; height: 100%; opacity: 0; }
.imgs-list dt .del,
.imgs-list dt .zoom { position: absolute;width: 20px;height: 20px; top: 0;bottom: 0;/* left: 0; */ margin: auto; }
.imgs-list dt .del i,
.imgs-list dt .zoom i { position: absolute; }
.imgs-list dt .zoom { left: 30%; }
.imgs-list dt .del { right: 30%; }
</style>

