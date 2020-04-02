<template>
  <section class="workBox noPadding">
    <div class="channelBar" @click="$router.push({ name: '党建资讯' })">
      <div class="_title">
        <i class="wkico wkico1"></i>
        <strong>党建资讯</strong>
        <span class="moreLink"></span>
      </div>
    </div>

    <el-carousel height="260px" indicator-position="none" class="work_news_carousel">
        <el-carousel-item v-for="item in newsList" :key="item.id" @click.native="item.id && $router.push({name: '资讯详情', params: {id: item.id}})">
            <img :src="item.cover_file_url">
            <h3 class="_title" v-if="item.title">{{ item.title }}</h3>
        </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
import * as work from "../../api/work.js";

export default {
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsList() {
      work.newsList({ p: 0, pageSize: 5 }).then(res => {
        if(res.data.data.length){
          this.newsList = res.data.data;
        }else{
          this.newsList.push({
            cover_file_url: require('@/assets/img/placeholder.png')
          });
        }
        
      });
    }
  },
  created() {
    this.getNewsList();
  }
};
</script>

<style>
.work_news_carousel{cursor: pointer;}
.work_news_carousel ._title {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding:0 10px;
  box-sizing:border-box;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 2.5em;
  line-height: 2.5em;
  overflow: hidden;
  font-size:14px;
  font-weight: 300;
}
</style>

