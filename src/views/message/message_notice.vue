<template>
  <div class="mainCont flex-col" v-loading="loading">
    <channel-bar />
    <template v-if="$route.path.split('/').length===3">
    <div class="flex-1 block_wrap flex-col">
      <!-- tabs -->
      <div class="tabsHeader">
        <ul class="tabs">
          <li v-for="(item,index) in tabs" :key="'tab'+index" 
            v-if="item.isShow"
            :class="{cur: currentTab===item.key}"
            @click="currentTab=item.key">{{item.title}}</li>
        </ul>
        <div class="ext" v-if="$root.user.role!=='1'">
          <el-button type="primary" size="medium" @click="dialogVisible=true">下发通知</el-button>
        </div>
      </div>
      <!-- search -->
      <el-form :inline="true" :model="queryParam" class="searchForm">
        <el-form-item label="优先级">
          <el-select v-model="queryParam.level" placeholder="请选择">
            <el-option
              label="全部"
              value="">
            </el-option>
            <el-option
              v-for="item in level"
              :key="'level'+item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送时间">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="queryParam.keywords" placeholder="请输入通知公告" style="width:20em"></el-input>
        </el-form-item>
        <el-button plain @click="fetchData(true)">搜索</el-button>
      </el-form>
      <div class="flex-1 scrollbar">
        <template v-if="list && list.length">
        <!-- list -->
        <ul class="baseList noticeList">
          <li v-for="(item,index) in list" :key="'notice'+index"
            class="flex-row"
            :class="{unread: item.is_read==0}"
            @click="$router.push({name: '通知详情', query: {id: item.id, receipt: item.receipt, currentTab}})">
            <div class="flex-1 _main">
              <div class="flex-row">
                <div class="_icon">
                  <!-- 未读 -->
                  <i class="ion " v-show="item.is_read==0">&#xe890;</i>
                  <!-- 已读 -->
                  <i class="ion read" v-show="item.is_read!=0">&#xe637;</i>
                </div>
                <div class="flex-1 _title el">
                  {{item.title}}
                </div>
                <div v-if="currentTab==='outbox' && item.receipt==='1'">
                  <el-button size="small" plain @click.stop="$router.push({name: '通知-阅读回执', query: {id: item.id, title: item.title, created_at: item.created_at, level: item.level}})">阅读回执</el-button>
                </div>
              </div>
              <div class="_pub">
                <template v-if="currentTab==='receive'">
                  发送人：{{item.user_name}}
                </template>
                <template v-if="currentTab==='outbox'">
                  发送范围：{{item.user_info}}
                </template>
                &emsp;&emsp;发送时间：{{item.created_at | formatDate(true)}}&emsp;&emsp;优先级：{{item.level | labelTextByValue(level)}}
              </div>
              <div class="abstract">
                {{item.body}}
              </div>
            </div>
          </li>
        </ul>
        <!-- page -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :page-size="queryParam.pageSize"
          :current-page="queryParam.p"
          :total="totalRows"
          @current-change="handleCurrentChange">
        </el-pagination>
        </template>
        <template v-else>
        <nodata mode="pic" />
        </template>
      </div>
      <!-- 下发通知 -->
      <notice-dialog :visible="dialogVisible" @close="dialogVisible=false" @done="fetchData(true)" />
    </div>
    </template>
    <template v-else>
      <router-view class="flex-1" />
    </template>
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as notice from "@/api/notice"
import * as common from "@/api/common"
import channelBar from '@/components/channelBar'

let created = false;

export default {
  components: {
    'channel-bar': channelBar,
    'notice-dialog': (resolve) => require(['@/components/message/noticeDialog'], resolve)
  },
  filters: {
    labelTextByValue: util.labelTextByValue
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      currentTab: null,
      tabs: [{
        key: 'receive',
        title: '收件箱',
        isShow: true
      },{
        key: 'outbox',
        title: '发件箱',
        isShow: this.$root.user.role!=='1'
      }],
      queryParam: {
        p: 1,
        pageSize: 10,
        level: '',
        start_at: '',
        end_at: '',
        keywords: '',
        type: ''
      },
      daterange: null,
      level: [],
      list: [],
      totalRows: 0
    };
  },
  beforeRouteUpdate: function(to, from, next){
    if((to.path == '/message/notice') && created){
      this.fetchData();
    }
    return next()
  },
  watch: {
    daterange: function(daterange){
      if(Array.isArray(daterange) && daterange.length===2){
        let end_tail = 24 * 60 * 60 - 1;
        this.queryParam.start_at = daterange[0] / 1000
        this.queryParam.end_at = daterange[1] / 1000 + end_tail
      }else{
        this.queryParam.start_at = ''
        this.queryParam.end_at = ''
      }
    },
    currentTab: function(currentTab){
      if(currentTab==='receive'){
        this.queryParam.type = 'receive'
      }else if(currentTab==='outbox'){
        this.queryParam.type = 'send'
      }else{
        //error
      }
      this.reset();
      this.fetchData(true)
    }
  },
  methods: {
    handleCurrentChange: function(currentPage){
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    reset: function(){
      this.queryParam.keywords = ''
      this.queryParam.level = ''
      this.daterange = null
    },
    fetchData: function(init){
      if(init){
        this.queryParam.p = 1
      }
      this.loading = true
      notice.receive(this.queryParam).then(res => {
        this.loading = false
        this.list = res.data.data;
        this.totalRows = res.data.totalRows;
      })
    },
    fetchLevel: function(){
      this.loading = true
      common.level().then(res => {
        this.level = res.data.data
        this.currentTab = this.tabs[0].key
        this.loading = false
        created = true;
      })
    }
  },
  created: function() {
    
    this.fetchLevel()
  }
};
</script>

<style scoped>
.noticeList,.searchForm,.pagination { margin-left:15px; margin-right:15px;}
.noticeList ._icon{font-size:1.6em;margin-right: 6px;}
.noticeList li{color:#b9b9b9;padding:15px 0; border-bottom:#eee 1px solid;}
.noticeList .unread,.noticeList li:hover{color:#666;}
.noticeList .unread ._icon{color:#ffb00d;}
.noticeList li ._title{color:inherit;font-size:16px;height: 2em;line-height: 2em;}

.noticeList .abstract{margin:0}
</style>
