<template>
  <div class="mainCont flex-col">
    <channel-bar />
    
    <div class="dynamic-list flex-col flex-1">
      <h3><i class="ion">&#xe65f;</i>工作动态</h3>
      <div class="list-content flex-1 scrollbar">
        <div class="flex-row list-item" v-for="list in list.data" :key="list.id">
          <p class="flex-1 title el" :title="list.title">
            <span class="dot"></span>
            <router-link :to="{name: '动态详情', query: {id: list.id}}">
              <span>{{list.title}}</span>
            </router-link>
          </p>
          <p>
            <span class="time">发布时间：</span>
            <span>{{list.created_at | formatDate(true)}}</span>
          </p>
        </div>
      </div>
      <div style="text-align:center;">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="list.totalRows">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "@/api/work.js";
import channelBar from '@/components/channelBar'

export default {
  components: {
    'channel-bar': channelBar
  },
  data() {
    return {
      list: {},
      params: {
        p: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    getList() {
      work.dynamicsList(this.params).then(res => {
        this.list = res.data
      })
    },
    pageChange(value) {
      this.params.p = value
      this.getList()
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
  * {box-sizing: border-box;}
  .dynamic-list {margin: 12px 12px 50px;background-color: #fff;border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0,0,0,.2);padding: 10px 10px 20px;}
  .dynamic-list>h3 {margin-bottom: 6px;}
  .dynamic-list>h3>i {color: #1244D2;margin-right: 8px;}
  .dynamic-list .list-item {background-color: #F3F5FA;height: 50px;line-height:50px;border-radius: 8px;padding: 0 20px;align-items: center;margin-bottom: 3px;}
  .dynamic-list .list-item .title {align-items: center;}
  .dynamic-list .list-item span.dot {display: inline-block;background-color: #1244D2;padding: 2px;
  vertical-align: middle;margin-right: 20px;}
  .dynamic-list .list-item .time {color: #9D9EA1;padding-right: 10px;}
  .dynamic-list .list-item a:hover {color: #1244D2;}
</style>
