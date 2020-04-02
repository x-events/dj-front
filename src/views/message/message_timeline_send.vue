<template>
  <div class="mainCont scrollbar ">
    <div class="sendWrap" v-loading="loading">
      <div class="block_wrap_min">
        <div class="channelBar">
          <div class="_title">
            <i class="ion">&#xe6b3;</i>
            <strong>发布朋友圈</strong>
          </div>
          
        </div>
        <el-form ref="validForm" :model="queryParam" label-width="0">
          <div class="formTitle">
            文字
          </div>
          <el-form-item>
            <el-input type="textarea" :rows="10" v-model="queryParam.body" placeholder="请输入互动文字..."></el-input>
          </el-form-item>
          <div class="formTitle">
            图片（最多可上传6张图片）
          </div>
          <el-row :gutter="10" class="upload_img_list">
            <el-col :span="4" v-for="(item,index) in queryParam.img_list" :key="'img'+index">
              <div class="img_layout">
                <img :src="item.url" />
                <div class="_del" @click="queryParam.img_list.splice(index,1)">
                  <i class="el-icon-close"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="4" v-if="queryParam.img_list.length<6">
              <div class="img_layout">
                <label class="addHandle flex-row align-center justify-center">
                  <i class="ion">&#xe66d;</i>
                  <input type="file" class="inputFile" id="inputFile" accept="image/*" @change="handleFile">
                </label>
              </div>
            </el-col>
          </el-row>

        </el-form>
        <div class="footer">
          <el-button type="primary" @click="send"><i class="ion">&#xe730;</i> 发布</el-button>
          <el-button @click="cancel" class="cancel"><i class="ion">&#xe66e;</i> 取消</el-button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as common from "@/api/common";
import * as timeline from "@/api/timeline";

export default {
  data() {
    return {
      loading: false,
      queryParam: {
        body: "",
        img_list: []
      }
    };
  },
  methods: {
    handleFile: function(e) {
      let file = e.target.files[0];
      if (file) {
        this.loading = true;
        util.compress(file, base64 => {
          common
            .uploadImg({
              base64,
              name: file.name
            })
            .then(res => {
              this.loading = false;
              this.queryParam.img_list.push(res.data.data);
              // 清空值
              document.getElementById('inputFile').value=''
            });
        });
      }
    },
    send: function() {
      //验证
      this.queryParam.body = this.queryParam.body.trim()
      if (!this.queryParam.img_list.length && !this.queryParam.body) {
        return this.$message({
          message: "请输入内容或上传图片",
          type: "warning"
        });
      }
      //转格式
      let queryParam = util.deepcopy(this.queryParam)
      queryParam.img_list = queryParam.img_list.map(e => e.id);
      //return console.log(queryParam)
      this.loading = true;
      timeline.send(queryParam).then(res => {
        this.loading = false;
        util.emit('timeline-send')
        this.$message({
          message: "发布成功！",
          type: "success",
          onClose: () => {
            //this.$router.go(-1);
          }
        });
      });
    },
    cancel(){
        util.emit('cancel_send')
    }
  }
};
</script>

<style scoped>
.sendWrap {
  width: 1200px;
  margin: auto;
}
.sendWrap .channelBar{background: transparent;color:#333;}
.sendWrap .channelBar .ion{color:#1244d2;}
.formTitle {
  color: #999;
  margin: 20px 0 10px;
}
.img_layout {
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
  background: #434343;
  border-radius: 4px;
}
.img_layout img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.img_layout ._del{position: absolute;right: -2em;top:-2em;
width:4em;height: 4em;line-height: 6em;border-radius: 3em;overflow: hidden;
background: rgba(0,0,0,.5);color:#fff;cursor: pointer;}
.img_layout ._del .el-icon-close{font-size: 1.3em; margin: 0 .3em;}
.img_layout ._del:hover{color:red;}

.addHandle {
  cursor: pointer;
  position: absolute;
  border: 1px solid #eee;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: hidden;
  transition: all ease 0.3s;
}
.addHandle .ion {
  color: #ccc;
  font-size: 56px;
}
.addHandle .inputFile {
  display: none;
}
.addHandle:hover {
  border-color: #ccc;
}

.footer {
  padding: 40px 0;
  text-align: center;
}
.footer .el-button {
  padding-left: 30px;
  padding-right: 30px;
  font-size:16px;
}
.footer .ion { font-size:20px; vertical-align:-3px;}
</style>
