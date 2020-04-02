<template>
  <section class="workBox notice">
    <div class="channelBar">
      <span class="moreLink" title="更多" @click="$router.push({ name: active==='first' ? '通知公告' : '工作动态' })"></span>
    </div>
    
    <el-tabs v-model="active" type="card">
        <el-tab-pane label="通知公告" name="first">
          <template v-if="notice.length">
            <div
              class="flex-row dynamics"
              v-for="item in notice"
              :key="item.id"
              @click="$router.push({name: '通知详情', query: {id: item.id, receipt: item.receipt, currentTab: 'receive'}})"
            >
              <div class="title flex-1">
                <div class="el">
                  <span class="dot"></span>
                  <span>{{item.title}}</span>
                </div>
              </div>
              <p>{{item.created_at | formatDate(true)}}</p>
            </div>
          </template>
          <template v-else>
            <nodata/>
          </template>
        </el-tab-pane>
        <el-tab-pane label="工作动态" name="second">
          <template v-if="dynamics.length">
            <div class="dynamics flex-row" v-for="item in dynamics" :key="item.id">
              <div class="title flex-1">
                <div class="el">
                  <span class="dot"></span>
                  <router-link :to="{name: '动态详情', query: {id: item.id}}">
                    <span>{{item.title}}</span>
                  </router-link>
                </div>
              </div>
              <p>{{item.created_at | formatDate(true)}}</p>
            </div>
          </template>
          <template v-else>
            <nodata/>
          </template>
        </el-tab-pane>
      </el-tabs>
  </section>
</template>

<script>
import * as work from "../../api/work.js";

export default {
  data() {
    return {
      active: "first",
      dynamics: [],
      notice: []
    };
  },
  methods: {
    getDynamics() {
      work.dynamics({ limit: 8 }).then(res => {
        this.dynamics = res.data.data;
      });
    },
    getNoticeList() {
      work.noticeList({ p: 0, pageSize: 8, type: "receive" }).then(res => {
        this.notice = res.data.data;
      });
    }
  },
  created() {
    this.getDynamics();
    this.getNoticeList();
  }
};
</script>

<style scoped>
.notice {
  position: relative;
}
.notice .dynamics {
  align-items: center;
  padding:4px 0 3px;
  border-top: 0px solid #f3f3f3;
  justify-content: space-between;
  cursor: pointer;
}
.notice .dynamics:first-of-type {
  border-top: none;
}
.notice .dynamics .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #666666;
  margin-right: 10px;
  display: inline-block;
}
.notice .dynamics .title {
  color: #333;
  flex-grow: 1;
  flex-wrap: nowrap;
  margin-right: 1px;
}
.notice .dynamics .title:hover,
.notice a:hover,.notice .dynamics:hover p {
  color: #e6322c;
}
.notice .dynamics .title:hover .dot { background-color:#e6322c;}
.el-tabs {
    margin-top:-54px;
}
.el-tabs /deep/ .el-tabs__header { margin-right:90px;}
</style>
<style>
.notice .el-tabs--card > .el-tabs__header {
  border: none;
}
.notice .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.notice .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
  height: 30px;
  padding: 0 15px;
  line-height: 30px;
  border-radius: 5px;
  color: #087ad9;
}
.notice .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  background: -webkit-linear-gradient(top, rgba(0,95,197,1) 0%,rgba(17,153,240,1) 100%);
  background: linear-gradient(to bottom, rgba(0,95,197,1) 0%,rgba(17,153,240,1) 100%);
  color: #ffffff;
}
</style>

