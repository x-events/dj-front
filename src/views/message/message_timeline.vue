<template>
  <div class="mainCont flex-col innerWrap" v-loading="loading">
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
          <el-button type="primary" size="medium" @click="sendVisible = true"><i class="ion">&#xe730;</i> 发布朋友圈</el-button>
        </div>
      </div>
      
      <div class="flex-1 scrollbar">
        <template v-if="list && list.length">
        <!-- list -->
        <ul class="baseList timelineList">
          <li v-for="(item,index) in list" :key="'tl'+index">
            <!-- list -->
          <div class="flex-row list_hd" v-if="currentTab==='list'">
            <div class="_avat">
              <img :src="item.user_avatar || holdavat" />
            </div>
            <div class="flex-1 _main">
              <div class="flex-row">
                <div class="flex-1 _title el">
                  {{item.user_name}}
                </div>
              </div>
              <div class="el">
                {{item.part_name}} 
              </div>
            </div>
            <div class="_mark _agree"
              :class="{active:item.is_agree==1}"
              @click="doAgree(item)">
              <i class="ion">&#xe742;</i>
              <i class="ion agree">&#xe60c;</i>
              {{item.agree_sum}}
            </div>

          </div>
          <!-- mylist -->
          <div class="flex-row" v-if="currentTab==='mylist'">
            <div class="flex-1">
              <el-tag size="small" type="info" class="timelineList_itme">
                {{item.created_at | formatDate(true)}}
              </el-tag>
            </div>
            <div class="_mark _del"
              @click="del(item)">
              <i class="ion">&#xe66a;</i>
            </div>
          </div>
          
          <div class="_cont _full" v-if="item.body" v-html="item.body"></div>
          <div class="_imgs" :gutter="8">
            <div class="_wrap" v-for="(img,index) in item.img_list" :key="'img'+index"
              @click="previewUrl=img">
              <img :src="img">
            </div>
          </div>
        </li>
        </ul>
        <!-- page -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :page-size="queryParam.pagesize"
          :current-page="queryParam.p"
          :total="totalRows"
          @current-change="handleCurrentChange">
        </el-pagination>
        </template>
        <template v-else>
        <nodata mode="pic" />
        </template>
      </div>
      
    </div>
    
    <el-dialog title="提示" :visible.sync="sendVisible" class="comDialog" width="50%">
        <span slot="title" class="dialog-title"><i class="ion">&#xe628;</i> <strong>党建朋友圈</strong></span>
        <messagesend class="messagesend" v-if="sendVisible == true" />
    </el-dialog>


    </template>
    <template v-else>
      <router-view class="flex-1" />
    </template>
    <!-- preview -->
    <preview :src="previewUrl" @close="previewUrl=''" />
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as timeline from "@/api/timeline"
import * as common from "@/api/common"
import channelBar from '@/components/channelBar'
import messagesend from '@/views/message/message_timeline_send'

export default {
  components: {
    'channel-bar': channelBar,
    'preview': (resolve) => require(['@/components/preview'], resolve),
    messagesend
  },
  data() {
    return {
      loading: false,
      currentTab: null,
      tabs: [{
        key: 'list',
        title: '党建朋友圈'
      },{
        key: 'mylist',
        title: '我的朋友圈'
      }],
      queryParam: {
        p: 1,
        pagesize: 10
      },
      list: [],
      totalRows: 0,
      previewUrl: '',
      holdavat: require("@/assets/img/talk-avat.png"),
      sendVisible:false
    };
  },
  watch: {
    currentTab: function(){
      this.fetchData(true)
    }
  },
  methods: {
    del: function(item){
      this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          timeline.del(item).then(res => {
            this.loading = false
            this.fetchData(true)
          })
        })
    },
    doAgree: function(item){
      this.loading = true
      if(item.is_agree==1){
        timeline.cancelagree(item).then(res => {
          this.loading = false
          item.agree_sum-=1
          item.is_agree = 0
          this.$forceUpdate()
        })
      }else{
        timeline.agree(item).then(res => {
          this.loading = false
          item.agree_sum+=1
          item.is_agree = 1
          this.$forceUpdate()
        })
      }
    },
    handleCurrentChange: function(currentPage){
      this.queryParam.p = currentPage;
      this.fetchData();
    },
    fetchData: function(init){
      if(init){
        this.queryParam.p = 1
      }
      this.loading = true
      let instance = timeline[this.currentTab]
      if(instance){
        instance(this.queryParam).then(res => {
          this.loading = false
          this.list = res.data.data;
          this.totalRows = res.data.totalRows;
        })
      }else{
        //error
      }
    }
  },
  created: function() {
    this.currentTab = this.tabs[0].key
    util.on('timeline-send', () => {
      this.fetchData()
    })
    util.on('cancel_send',() =>{
        this.sendVisible = false
    })
    util.on('timeline-send',() =>{
        this.sendVisible = false
    })
  }
};
</script>

<style scoped>
.timelineList li{border-bottom:1px solid #eee;}
.timelineList_itme{margin-top: 5px}

.ext .el-button .ion { margin-right:5px; font-size:18px; vertical-align:-2px;}
.comDialog >>> .el-dialog { width:800px!important; border-radius:5px; overflow:hidden;}
.comDialog >>> .el-dialog__header { padding-left:15px; font-size:15px; color:#087ad9;}
.comDialog >>> .el-dialog__header::before { display:none;}
.comDialog >>> .el-dialog__header .ion { font-size:22px; margin-right:5px; vertical-align:-3px;}
.comDialog >>> .el-dialog__body { padding:0}
.messagesend { overscroll-behavior:inherit;}
.messagesend >>> .sendWrap { width:100%;}
.messagesend >>> .channelBar { display:none;}
.messagesend >>> .upload_img_list .el-col-4 { width:25%;}
.messagesend >>> .footer { padding-bottom:0;} 
.messagesend >>> .el-textarea__inner { height:100px;}
</style>
