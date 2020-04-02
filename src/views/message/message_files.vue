<template>
  <div class="mainCont flex-col" v-loading="loading">
    <channel-bar />
    <template v-if="$route.path.split('/').length===3">
    <div class="flex-1 block_wrap flex-col">
      <!-- tabs -->
      <div class="tabsHeader">
        <ul class="tabs">
          <li v-for="(item,index) in tabs" :key="'tab'+index" 
            :class="{cur: currentTab===item.key}"
            @click="currentTab=item.key">{{item.title}}</li>
        </ul>
        <div class="ext">
          <el-button type="primary" size="medium" @click="dialogVisible=true">发送文件</el-button>
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
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="">
          <el-input v-model="queryParam.keywords" placeholder="请输入文件名称" style="width:20em;"></el-input>
        </el-form-item>
        <el-button plain @click="fetchData(true)">搜索</el-button>
      </el-form>
      <div class="flex-1 scrollbar">
        <template v-if="list && list.length">
        <!-- list -->
        <ul class="baseList filesList inline">
          <li v-for="(item,index) in list" :key="'files'+index"
            class="flex-row align-center"
            :class="{unread: item.is_read==0}">
            <div class="_avat">
              <img :src="item.file_name | fileIcon" />
            </div>
            <div class="flex-1 _main">
              <div class="flex-row">
                <a class="flex-1 _title el" :title="item.file_name" @click="weboffice(item, true)">
                  {{item.file_name}}
                </a>
                <div class="flex-1 _pub el" v-if="currentTab==='receive'">
                  发送人：<span class="valText">{{item.user_name}}</span>
                </div>
                <div class="flex-1 _pub el" v-if="currentTab==='outbox'">
                  发送范围：<span class="valText">{{item.user_info}}</span> 
                </div>
                <div class="flex-1 _pub el">
                  发送时间：<span class="valText">{{item.created_at | formatDate(true)}}</span>
                </div>
                <div style="width:100px">
                  <a v-if="currentTab==='receive'" @click="downloadUrl(item)" class="_download">
                    <i class="ion">&#xe73e;</i>
                    接收
                  </a>
                  <a v-if="currentTab==='outbox' && item.receipt==='1'"
                  class="_download"
                  @click.stop="$router.push({name: '文件-阅读回执', query: item})">
                    <i class="ion">&#xe626;</i>
                    接收回执
                  </a>
                </div>
                
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
      <files-dialog :visible="dialogVisible" @close="dialogVisible=false" @done="fetchData(true)" />
    </div>
    </template>
    <template v-else>
      <router-view class="flex-1" />
    </template>
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as files from "@/api/files"
import * as common from "@/api/common"
import channelBar from '@/components/channelBar'
import * as notice from "@/api/notice"

export default {
  components: {
    'channel-bar': channelBar,
    'files-dialog': (resolve) => require(['@/components/message/filesDialog'], resolve)
  },
  filters: {
    fileIcon: util.fileIcon,
    labelTextByValue: util.labelTextByValue
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      currentTab: null,
      tabs: [{
        key: 'receive',
        title: '收件箱'
      },{
        key: 'outbox',
        title: '发件箱'
      }],
      queryParam: {
        p: 1,
        pageSize: 10,
        level: '',
        keywords: '',
        type: ''
      },
      level: [],
      list: [],
      totalRows: 0
    };
  },
  watch: {
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
    weboffice: function(item, needtip){
      util.weboffice.call(this, item, needtip)
    },
    downloadUrl: function(params){
      files.read({
        id: params.file_id
      }).then(res => {
        notice.isRead({
          id: params.file_id,
          model: 'file'
        }).then(() => {
          this.fetchData()
          return window.open(`${files.downloadUrl}?id=${params.file_id}&token=${this.$root.user.access_token}`)
        }).catch((err) => {
          console.warn('阅读状态执行异常',err)
          return window.open(`${files.downloadUrl}?id=${params.file_id}&token=${this.$root.user.access_token}`)
        })
      })
      
    },
    handleCurrentChange: function(currentPage){
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    reset: function(){
      this.queryParam.keywords = ''
      this.queryParam.level = ''
    },
    fetchData: function(init){
      if(init){
        this.queryParam.p = 1
      }
      this.loading = true
      files.receive(this.queryParam).then(res => {
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
      })
    }
  },
  created: function() {
    this.fetchLevel()
  }
};
</script>

<style scoped>
.valText{color:#333}
.filesList li ._title{color:#777;}
.filesList .unread ._title{color:#333;font-weight: 700;}
</style>
