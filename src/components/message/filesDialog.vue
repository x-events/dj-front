<template>
  <div v-loading="loading">
    <el-dialog
      :visible="visible"
      class="comDialog"
      title="发送文件"
      :append-to-body="true"
      width="1000px"
      :before-close="handleClose"
      @open="handleOpen"
    >
      <el-form ref="validForm" :model="queryParam" label-width="100px" :rules="rules">
        <el-form-item label="附件文件" prop="file_list" class="tagWrap">
          <el-upload
            ref="upload"
            class="customUpload"
            :action="uploadAction"
            :headers="{Authorization: $root.user.access_token}"
            :accept="accept.join(',')"
            :before-upload="handleFileAdd"
            :on-success="handleUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button >请上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传 doc/docx/xls/xlsx/ppt/pptx/pdf 文件，一次最多上传3个文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="优先级" prop="level">
          <el-radio-group v-model="queryParam.level">
            <el-radio
              v-for="(item,index) in level"
              :key="'pri'+index"
              :label="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="阅读回执">
          <el-radio-group v-model="queryParam.receipt">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接收人员" prop="user_list" class="tagWrap">
          <el-button @click="pickerDialog=true">请选择</el-button>
        </el-form-item>
        <el-form-item v-if="user_list.length" label="" class="choosenWrap">
          <p>已选择</p>
          <el-tag
            v-for="tag in user_list"
            :key="'tag'+tag.uid"
            closable
            type="info"
            @close="removeTag(tag)">
            {{tag.name}}
          </el-tag>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="send">发 送</el-button>
      </span>
    </el-dialog>

    <!-- 选党员 -->
    <member-picker
      :visible="pickerDialog"
      :currentSelection="user_list"
      @close="pickerDialog=false"
      @choosen="user_list=$event"
    />
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as common from "@/api/common";
import * as files from "@/api/files";

export default {
  components: {
    "member-picker": resolve => require(["@/components/memberPicker"], resolve)
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      pickerDialog: false,
      uploadedFileList: [],
      fileList: [],
      uploadAction: common.upload,
      queryParam: {
        file_list: [],
        user_list: [],
        level: "",
        receipt: false
      },
      level: null,
      user_list: [],
      rules: {
        file_list: [
          {
            type: "array",
            required: true,
            message: "请上传附件",
            trigger: "blur"
          }
        ],
        user_list: [
          {
            type: "array",
            required: true,
            message: "请选择接收人",
            trigger: "blur"
          }
        ],
        level: [{ required: true, message: "请选择优先级", trigger: "blur" }]
      },
      accept: [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/pdf"
      ]
    };
  },
  watch: {
    uploadedFileList: function(uploadedFileList) {
      this.queryParam.file_list = uploadedFileList.map(e => {
        return {
          id: e.response.data.id,
          name: e.response.data.name
        };
      });
      this.$nextTick(() => {
        this.$refs.validForm.validateField("file_list");
      });
    },
    user_list: function(user_list) {
      this.queryParam.user_list = user_list.map(e => e.uid);
      this.$nextTick(() => {
        this.$refs.validForm.validateField("user_list");
      });
    }
  },
  methods: {
    handleFileAdd: function(file) {
      const isRepeat = this.uploadedFileList.findIndex(e => {
        return e.name === file.name && e.size === file.size;
      });
      const sizeLimit = file.size / 1024 / 1024 < 10;
      if (!sizeLimit) {
        file.msg = "上传文件大小不能超过 10MB!";
        return false;
      }
      if (isRepeat > -1) {
        file.msg = "请不要重复上传！";
        return false;
      }
      if (file.name.length > 40) {
        file.msg = "文件名长度不能大于40！";
        return false;
      }
      return true;
    },
    handleUpload(response, file, fileList) {
      this.uploadedFileList.push(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`达到最大上传数量限制！`);
    },
    beforeRemove(file, fileList) {
      if (file.status !== "success") {
        return true;
      }
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file) {
      if (file.status === "success") {
        let start = this.uploadedFileList.findIndex(e => {
          return e.name === file.name && e.size === file.size;
        });
        if (start > -1) {
          this.uploadedFileList.splice(start, 1);
        }
      } else {
        this.$message({
          message: file.raw.msg || "上传失败",
          type: "warning"
        });
      }
    },
    removeTag: function(tag) {
      if (tag && tag.uid) {
        let start = this.user_list.findIndex(e => {
          return e.uid === tag.uid;
        });
        if (start > -1) {
          this.user_list.splice(start, 1);
        }
      }
    },
    handleOpen: function() {
      this.queryParam.level = this.level[0].value;
      this.queryParam.receipt = false;

      this.user_list = [];
      this.uploadedFileList = [];
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }
      setTimeout(() => {
        if (this.$refs.validForm) {
          this.$refs.validForm.clearValidate();
        }
      }, 300);
    },
    handleClose: function(){
      this.$emit('close')
    },
    send: function() {
      this.$refs.validForm.validate(valid => {
        if (valid) {
          //转格式
          let params = util.deepcopy(this.queryParam);
          params.receipt = params.receipt ? 1 : 0;

          this.loading = true;
          files.send(params).then(res => {
            this.loading = false;
            this.$emit("done");
            this.$emit("close");
          });
        } else {
          return false;
        }
      });
    }
  },
  created: function() {
    this.loading = true;
    common.level().then(res => {
      this.loading = false;
      this.level = res.data.data;
      this.queryParam.level = this.level[0].value;
    });
  }
};
</script>

<style >
.choosenWrap .el-form-item__content{background:#f3f5fa;padding:6px;}
.choosenWrap .el-tag{margin:0 6px 6px 0;background:#fff;}

.customUpload .el-upload-list li{background: #f3f5fa; padding: 10px;}
.customUpload .el-upload-list__item-status-label{top:10px}
.customUpload .el-upload-list__item .el-icon-close, .customUpload .el-upload-list__item .el-icon-close-tip{top:15px}

</style>
