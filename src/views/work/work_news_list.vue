<template>
  <div class="mainCont flex-col">
    <channel-bar/>

    <div class="block_wrap news-list flex-col flex-1 head_bar">
      <div class="_T">党建资讯</div>
      <template v-if="list.data && list.data.length">
      <div class="list-content flex-1 scrollbar">
        <div class="list-item" v-for="item in list.data" :key="item.id">
          <router-link class="flex-row" :to="{name: '资讯详情', params: {id: item.id}}">
            <div class="_img" v-if="item.cover_file_url">
              <img :src="item.cover_file_url" >
            </div>
            <div class="flex-1">
              <div class="flex-row">
                <p class="flex-1 title el" :title="item.title">
                  <span>{{item.title}}</span>
                </p>
                <p>
                  <span class="_static">发布时间：</span>
                  <span class="_time">{{item.created_at | formatDate(true)}}</span>
                </p>
              </div>
              <div class="_desc">{{item.content}}</div>
            </div>
          </router-link>
        </div>
      </div>
      <div style="text-align:center;">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="list.totalRows"
        ></el-pagination>
      </div>
      </template>
      <template v-else>
        <nodata mode="pic"/>
      </template>

    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "@/api/work.js";
import channelBar from "@/components/channelBar";

export default {
  components: {
    "channel-bar": channelBar
  },
  data() {
    return {
      list: {},
      params: {
        p: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    getList() {
      work.newsList(this.params).then(res => {
        this.list = res.data;
      });
    },
    pageChange(value) {
      this.params.p = value;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.list-content{margin-bottom: 12px;}
.news-list > h3 {
  margin-bottom: 6px;
}
.news-list > h3 > i {
  color: #1244d2;
  margin-right: 8px;
}
.news-list .list-item {
  background-color: #f3f5fa;
  border-radius: 8px;
  padding: 10px;
  align-items: center;
  margin-bottom: 3px;
  color:#999;
}
.news-list ._img{width:128px;height: 78px;margin-right: 16px;}
.news-list .list-item .title {
  align-items: center;
  color:#333;
  height: 26px;line-height: 26px;margin-bottom: 5px;
}

.news-list .list-item ._time {
  color: #434343;
  margin-left: 10px;
}
.news-list .list-item ._static{color: #434343;}
.news-list ._desc{font-size: .9em;line-height: 1.7em;height: 3.4em;overflow: hidden;}

.news-list .list-item a:hover {
  color: #1244d2;
}
</style>
