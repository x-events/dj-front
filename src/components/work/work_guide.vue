<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      :title="name ? name : '工作指引'"
      :append-to-body="true"
      :visible="visible"
      width="1200px"
      @open="fetchData(true)"
      @close="closeAllVideo();$emit('close')"
    >
      <div class="fullWrap flex-col work_guide">
        <div class="flex-1 scrollbar">
          <!-- tab -->
          <div class="hd_tabs" v-if="process_sub.length">
            <el-button-group>
              <el-button
                v-for="(item,index) in process_sub"
                :key="'tab'+index"
                :type="currentTab===index ? 'primary' : ''"
                @click="currentTab=index"
              >{{item.name}}</el-button>
            </el-button-group>
          </div>
          <!-- 工作依据 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi"></i>
                  <strong>工作依据</strong>
                </div>
              </div>
            </div>
            <div class="_bd">
              <ul class="list hasDot">
                <li class="flex-row" v-for="(e,i) in data.working_basis_list" :key="i">
                  <a class="name el flex-1" @click="weboffice(e)">{{e.title}}</a>
                  <a :href="downloadUrl(e)" class="smBtn" target="_blank">下载</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 流程指引 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi wgi1"></i>
                  <strong>流程指引</strong>
                </div>
              </div>
            </div>
            <div class="_bd flex-row">
              <div class="process_text flex-1" v-if="data.process_text">
                <el-input v-model="data.process_text" type="textarea" :rows="10" readonly></el-input>
              </div>
              <div class="process_img_url tc" v-if="data.process_img_url">
                <div class="imgBox">
                  <div class="img" @click="imgBox.status = true;imgBox.url = data.process_img_url">
                    <img :src="data.process_img_url">
                  </div>
                  <div>
                    <i class="el-icon-view"></i> 点击查看大图
                  </div>
                </div>
              </div>
              <nodata
                class="flex-1"
                mode="pic"
                v-if="data.process_text == '' && data.process_img_url == ''"
              />
            </div>
          </div>

          <!-- 视频教程 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi wgi2"></i>
                  <strong>视频教程</strong>
                </div>
              </div>
            </div>
            <div class="_bd">
              <ul class="videoList">
                <li class="flex-row" v-for="(e,i) in data.video_intro_list" :key="i">
                  <div class="video" >
                    <video
                      :id="'vid'+e.file_id"
                      width="100%"
                      height="225"
                      controls
                      preload="auto"
                      :poster="e.img_url"
                    >
                      <source :src="e.video_url" type="video/mp4">您的浏览器不支持 video 标签。
                    </video>
                  </div>
                  <div class="flex-1">
                    <div class="title el" :title="e.title">{{e.title}}</div>
                    <div class="intro">{{e.intro}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 工作标准 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi wgi3"></i>
                  <strong>工作标准</strong>
                </div>
              </div>
            </div>
            <div class="_bd">
              <el-input v-model="data.work_standard" type="textarea" :rows="10" readonly></el-input>
            </div>
          </div>

          <!-- 相关指标 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi wgi4"></i>
                  <strong>相关指标</strong>
                </div>
              </div>
            </div>
            <div class="_bd">
              <div class="zhibiaoList">
                <div class="hd flex-rows">
                  <div class="title">
                    <i class="wgi wgi5"></i>组织力指数
                  </div>
                </div>
                <div class="bd">
                  <el-table :data="data.strength_index_list" stripe style="width: 100%">
                    <el-table-column label="预计得分">
                      <template slot-scope="scope">{{scope.row.title}}</template>
                    </el-table-column>
                    <el-table-column prop="score" label="满分" width="180"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="zhibiaoList">
                <div class="hd flex-rows">
                  <div class="title">
                    <i class="wgi wgi6"></i>党员活跃度
                  </div>
                </div>
                <div class="bd">
                  <el-table :data="data.person_active_list" stripe style="width: 100%">
                    <el-table-column label="预计得分">
                      <template slot-scope="scope">{{scope.row.title}}</template>
                    </el-table-column>
                    <el-table-column prop="score" label="满分" width="180"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="zhibiaoList">
                <div class="hd flex-rows">
                  <div class="title">
                    <i class="wgi wgi7"></i>书记有为值
                  </div>
                </div>
                <div class="bd">
                  <el-table :data="data.leader_done_list" stripe style="width: 100%">
                    <el-table-column label="预计得分">
                      <template slot-scope="scope">{{scope.row.title}}</template>
                    </el-table-column>
                    <el-table-column prop="score" label="满分" width="180"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>

          <!-- 工作模板 -->
          <div class="boxBlock">
            <div class="_hd flex-row align-center">
              <div class="flex-1">
                <div class="_title">
                  <i class="wgi wgi8"></i>
                  <strong>工作模板</strong>
                </div>
              </div>
            </div>
            <div class="_bd">
              <ul class="list hasDot">
                <li class="flex-row" v-for="(e,i) in data.file_template_list" :key="i">
                  <a class="name el flex-1" @click="weboffice(e)">{{e.title}}</a>
                  <a :href="downloadUrl(e)" class="smBtn" target="_blank">下载</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="imgBox.status"
      width="800px"
      :append-to-body="true"
      :before-close="imgBoxClose"
    >
      <img :src="imgBox.url" style="display:block;margin:auto">
    </el-dialog>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "@/api/work";
import * as files from "@/api/files";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      required: true,
      default: ""
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    processSubIndex: { //默认tab序号
      type: [Number, String],
      required: false,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      imgBox: {
        status: false,
        url: ""
      },
      data: {},
      process_sub: [],
      currentTab: 0
    };
  },
  watch: {
    processSubIndex: {
      handler: function(processSubIndex){
        this.currentTab = processSubIndex;
      },
      immediate: true
    },
    currentTab: function(){
      this.fetchData()
    }
  },
  methods: {
    weboffice: function(item, needtip) {
      util.weboffice.call(this, item, needtip);
    },
    imgBoxClose(done) {
      this.imgBox.url = "";
      done();
    },
    downloadUrl: function(params) {
      return `${files.downloadUrl}?id=${params.id}&token=${
        this.$root.user.access_token
      }`;
    },
    closeAllVideo: function(){
      if(this.data.video_intro_list.length){
        const players = this.data.video_intro_list.map(e => {
          return document.getElementById('vid'+e.file_id)
        })
        players.forEach(p => {
          p.pause()
        })
      }
    },
    fetchData() {
      let sub = sessionStorage.getItem('work-detail-tabs')
      this.process_sub = sub ? JSON.parse(sub) : [];

      this.loading = true;
      let paramId = this.id;
      if(this.process_sub.length && this.process_sub[this.currentTab]){
        paramId = this.process_sub[this.currentTab].id
      }
      console.log(paramId)
      work
        .form_guide_view({ id: paramId })
        .then(res => {
          this.loading = false;
          this.data = res.data.data;

        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.boxBlock {
  border-radius: 6px;
  background: #fff;
  margin-bottom: 12px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.boxBlock ._hd {
  position: relative;
  border-bottom: 1px solid #dce2e7;
  overflow: hidden;
  padding-right: 20px;
}
.boxBlock ._hd ._title {
  float: left;
  position: relative;
  padding: 1em 0.5em 0.5em 1em;
  font-weight: bold;
  font-size: 16px;
  color: #046bce;
}
.boxBlock ._hd ._title:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 3px solid #046bce;
}
.boxBlock ._bd {
  padding: 15px;
}

.work_guide {
  height: 60vh;
}

.list li {
  padding: 7px 10px;
  overflow: hidden;
}
.list li:nth-child(even) {
  background-color: #fcfcfc;
}
.list li:hover {
  background-color: #f9f9f9;
  color: #ff7200;
}
.list .smBtn {
  margin-left: 10px;
}
.list.hasDot .name {
  position: relative;
  padding-left: 20px;
}
.list.hasDot .name::before {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #595757;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -2px;
}
.list.hasDot li:hover .name::before {
  background-color: #ff7200;
}

.process_img_url {
  width: 25%;
}
.process_img_url .imgBox {
  border: #dce2e7 1px solid;
  padding: 10px;
  box-sizing: border-box;
}
.process_img_url .img {
  margin-bottom: 5px;
}
.process_img_url .img img {
  max-height: 200px;
}
.process_img_url .el-icon-view {
  font-size: 16px;
}
.boxBlock /deep/ .picholder {
  padding-top: 20px;
}

.videoList li {
  padding: 10px 0px;
}
.videoList .video {
  width: 370px;
  height: 225px;
  position: relative;
  margin-right: 30px;
}
.videoList .title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}
.videoList .intro {
  color: #999;
  line-height: 1.5em;
  max-height: 12em;
  overflow: hidden;
}

.zhibiaoList {
  border: #dce2e7 1px solid;
  margin-bottom: 15px;
}
.zhibiaoList:last-child {
  margin-bottom: 0;
}
.zhibiaoList .hd {
  border-bottom: #dce2e7 1px solid;
  padding: 8px 10px;
}
.zhibiaoList .hd .title {
  font-size: 16px;
  font-weight: bold;
}
.zhibiaoList .hd .title .wgi {
  vertical-align: -8px;
}

.zhibiaoList /deep/ .el-table {
  border-radius: 0;
  border-width: 0;
}
.zhibiaoList /deep/ .el-table__header-wrapper {
  background: #fcfcfc;
}
.zhibiaoList
  /deep/
  .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td {
  background-color: #fcfcfc;
}

.zhibiaoList /deep/ .el-table__header thead tr th:first-child .cell,
.zhibiaoList /deep/ .el-table__body tr td:first-child .cell {
  padding-left: 50px;
}
</style>