<template>
  <div>
    <el-row class="header">
      <h2>
        <i @click="back" class="ion">&#xe664;</i>
        {{data.title}}
      </h2>
      <el-row>
        <span>作者：{{data.author}}</span>
        <span>出版日期：{{data.publish_time}}</span>
        <span>出版社：{{data.press}}</span>
        <span>所属分类：{{data.category}}</span>
      </el-row>
    </el-row>
    <iframe class="iframe flex-1" :src="data.video_url" frameborder="0"></iframe>
  </div>
</template>

<script>
import * as learn from "@/api/learn.js";

export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getDetail() {
      learn.bookDetail({ id: this.$route.query.id }).then(res => {
        this.data = res.data.data;
      });
    },
    studyCount() {
      this.timer = setInterval(() => {
        learn
          .studyReadCount({ id: this.$route.query.id, study_time: 30 })
          .then(() => {});
      }, 30000);
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getDetail();
    this.studyCount();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 12px;
}
.header h2 {
  display: flex;
  align-items: center;
  font-weight: normal;
  color: #333;
}
.header h2 i {
  color: #999999;
  margin-right: 10px;
  cursor: pointer;
}
.header span {
  padding-left: 35px;
}
.header .credit {
  color: #1244d2;
}
.iframe {
  width: 100%;
  height: 100%;
}
</style>



