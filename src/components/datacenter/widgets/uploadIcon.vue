<template>
    <el-col :span="4" class="upload-div">
        <el-upload v-if="!lookTag"
            class="avatar-uploader"
            accept="image/*"
            :action="action"
            :headers="{Authorization: $root.user.access_token}"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <!-- <i class="el-icon-plus avatar-uploader-icon" v-if="!imgUrl && !lookTag"></i> -->
            <img class="default-icon" :src="defaultIcon" v-if="!imgUrl && !lookTag">
            <div slot="tip" class="el-upload__tip" :style="{top: tipTop}" v-if="!imgUrl && !lookTag">{{ tip }}</div>
            <div class="upload-text">{{imgText}}</div>
        </el-upload>
        <div class="avatar-uploader look" v-else>
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <div class="upload-text" v-if="introShow">{{imgText}}</div>
        </div>
    </el-col>
</template>

<script>
import * as common from '@/api/common.js'

export default {
    props: {
        action: {
            type: String,
            default: common.upload
        },
        image: {
            type: String,
            default: ''
        },
        imgText: {
            type: String,
            required: true,
            default: ''
        },
        lookTag: {
            type: Boolean,
            default: false
        },
        tip: {
            type: String,
            default: '推荐240x320比例的照片'
        },
        defaultIcon: {
            type: String,
            default: require('@/assets/img/dc_default.png')
        },
        isIntro: {
            type: Boolean,
            default: true
        },
        tipTop: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imgUrl: this.image,
            introShow: this.isIntro
        };
    },
    watch: {
        image() {
            this.imgUrl = this.image
        },
        isIntro(val) {
            this.introShow = val
        }
    },
    methods: {
        // 上传成功
        uploadSuccess(res, file, fileList) {
            this.imgUrl = res.data.url
            this.$emit('on-Success', res);
        },
        /* beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if(!isLt2M) {
                this.$message({
                    message: '上传文件大小不能超过 10MB!',
                    type: 'warning'
                });
            }
            return isLt2M
        } */
    }
};
</script>

<style scoped>
.upload-div { width: 182px; }
.default-icon { width: 100%; }
</style>
