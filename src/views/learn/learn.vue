<template>
  <div class="flex-col">
    <header1 />

    <div class="flex-1 flex-col" style="background:#edf4f9;">
      <header class="flex-row workHeadBar align-center">
        <ul class="_list">
          <li class="_item0" :class="{cur: $route.name == '网上党校' || $route.name == '课程详情'}">
            <router-link :to="{name: '网上党校'}">
              <i class="_ion"></i>
              视频课程
            </router-link>
          </li>
          <li class="_item1" :class="{cur: $route.name == '党建读物' || $route.name == '阅读详情'}">
            <router-link :to="{name: '党建读物'}">
              <i class="_ion"></i>
              党建读物
            </router-link>
          </li>
          <li class="_item2" :class="{cur: $route.name == '线上考试' || $route.name == '考试详情' || $route.name == '考试结果'}">
            <router-link :to="{name: '线上考试'}">
              <i class="_ion"></i>
              线上考试
            </router-link>
          </li>
        </ul>
      </header>
      <template v-if="$route.name === '网上党校'">
        <div class="flex-col flex-1 learn-content">
            <header>
              <div class="flex-row align-center title">
                <p class="flex-1">本年度课程学习情况</p>
                <p class="flex-1">必修课已完成学时：<span class="course">{{studyInfo.bx_yiwancheng}}</span> <span class="sum">（需完成{{studyInfo.bx_xuwancheng}}学时）</span></p>
                <p class="flex-1">选修课已完成学时：<span class="course">{{studyInfo.xxk_yiwancheng}}</span> <span class="sum">（共{{studyInfo.xxk_num}}门课程）</span></p>
              </div>
            </header>

            <div class="flex-l flex-col content">
              <el-tabs v-model="activeName" class="headTab flex-1 flex-col" @tab-click="handleClick">
                <el-tab-pane label="必修课" name="1">
                  <div class="pane-content flex-1 scrollbar" v-if="activeName == '1'">
                    <major-course/>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="选修课" name="2">
                  <div class="pane-content flex-1 scrollbar" v-if="activeName == '2'">
                    <course/>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="系统推荐" name="3">
                  <div class="pane-content flex-1 scrollbar" v-if="activeName == '3'">
                    <recommend />
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
        </div>
      </template>
      <template v-else>
        <router-view class="flex-col flex-1 learn-content"></router-view>
      </template>

    </div>
  </div>
</template>

<script>
//import * as home from "../api/home";
import * as learn from '@/api/learn.js'
import course from "@/components/learn/course";
import majorCourse from "@/components/learn/major_course";
import recommend from "@/components/learn/recommend";
export default {
  data() {
    return {
      activeName: "1",
      studyInfo: {},
    };
  },
  components: {
    course,
    recommend,
    majorCourse
  },
  methods: {
    handleClick(value) {
      // console.log(value);
    },
    getStudyInfo() {
      learn.mystudyinfo().then( res => {
        this.studyInfo = res.data.data
      })
    }
  },
  created: function() {
    //console.log(this.$route.name)
    this.getStudyInfo()
  }
};
</script>
<style scoped>
.workHeadBar {
  height: 50px;
  background: #fff;
  box-shadow:0px -15px 62px 0px rgba(12,52,97,0.24);
}
.workHeadBar ._list{
  text-align:right;
  width:100%;
  box-sizing: border-box;
  padding-right: 5em;
}
.workHeadBar ._list li {
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
  color: #333;
}
.workHeadBar ._list ._ion {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width:35px;
  height:35px;
  background:rgba(193,204,213,1);
  border-radius:50%;
  line-height: 35px;
  text-align: center;
}
.workHeadBar ._list ._ion::after{
  content: "";
  position: absolute;
  width:16px;height: 16px;
  background-repeat: no-repeat;
  background-position: center center;
  left:50%;
  top:50%;
  margin:-8px 0 0 -8px;
}
.workHeadBar ._item0 ._ion::after{
  background-image: url(../../assets/img/lesson/channel-ico1.png)
}
.workHeadBar ._item1 ._ion::after{
  background-image: url(../../assets/img/lesson/channel-ico2.png)
}
.workHeadBar ._item2 ._ion::after{
  background-image: url(../../assets/img/lesson/channel-ico3.png)
}


.workHeadBar ._ext {
  margin: 0 20px 0 10px;
}
.workHeadBar ._list .cur,
.workHeadBar ._list li:hover {
  color: #087ad9;
}
.workHeadBar ._list .cur ._ion, .workHeadBar ._list li:hover ._ion {
  background:linear-gradient(0deg,rgba(17,154,241,1),rgba(0,95,197,1));
}
</style>

<style>
.learn-content .content{background:#fff;border-radius: 12px;border:1px solid #dedede;padding-left:0px; overflow:hidden;}
.headTab .el-tabs__item{ height:52px; line-height:52px; min-width:100px; text-align:center;}
.headTab .el-tabs__header { margin-bottom:0;}
.headTab .el-tabs__content,.headTab .el-tabs__content .el-tab-pane { flex:1; display:flex; flex-direction:column; overflow:hidden!important;}
.headTab .pane-content .el-tabs__header{ margin-bottom:15px;}

.learn-content .pane-content { padding-top:15px; padding-left:20px; padding-right:20px; box-shadow:none; background:linear-gradient(to bottom, #eff2f4 0%,#ffffff 10%); border-radius:0;}
.learn-content .pane-content .mytabs .el-tabs__nav-wrap::after,
.learn-content .pane-content .mytabs .el-tabs__active-bar{display: none;}
.learn-content .pane-content .mytabs .el-tabs__item.is-active{background: linear-gradient(to bottom, #005fc5 0%,#7db9e8 100%);color:#fff;}
.learn-content .pane-content .mytabs .el-tabs__item{height:30px !important;line-height: 30px !important;border-radius: 2px;padding:0 1em !important;margin-right:10px;width:auto !important;}

.pane-content .image {border-radius: 6px;width: 225px;height: 140px;overflow: hidden;position: relative;
margin-right: 20px;}
.pane-content .image img {width: 100%;height: 100%;}
.pane-content .image span {position: absolute;background-color: #d13831;color: #fff;padding: 2px 8px;
left: 10px;top: 0;border-radius: 0 0 6px 6px;font-size:12px;}
.learn-content .pane-content .info {margin-right: 30px;}
.learn-content .pane-content .info h3 {margin-bottom: 8px; color:#d13831;font-weight: normal}
.learn-content .pane-content .go-detail {background-color: #1244D2;color: #fff; }
.learn-content .pane-content .course-item {padding: 15px 0;border-bottom: 1px solid #E4E4E5;}
.pagination-content {align-items: center;justify-content: flex-end;}
.pagination-content .pagination {margin: 10px 0;}
.learn-content .pane-content .course-item:first-of-type {padding-top: 0;}
.learn-content .pane-content ._cont{height:3.4em;line-height: 1.7em;overflow: hidden; margin-bottom:15px;}
.learn-content .pane-content ._cat{display: inline-block;height: 26px;line-height: 26px;padding:0 12px;border:1px solid;color:#d13831;border-radius: 2px;}
.learn-content .pane-content ._time{float: right;font-size: 12px;position: relative;padding-left:15px; margin-top:4px;}
.learn-content .pane-content ._time::before{content:"";position: absolute;left:0;top:50%;margin-top:-6px; border:6px solid;border-color:transparent transparent transparent #666;}
.learn-content .pane-content .pagination-content { text-align:right; padding:16px 0;}
.learn-content .pane-content .pagination-content .pagination { display:inline-block; margin:0; vertical-align:2px;}
</style>
