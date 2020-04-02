<template>
  <div class="mainCont flex-col" v-loading="loading">
    <div v-if="detail" class="block_wrap flex-1 scrollbar">
      <div class="noticeDetailHd">
        <div class="_title">
          {{detail.title}}
        </div>
        <div class="_sub">
          <!-- <div style="float:right" v-if="$route.query.currentTab==='receive' && $route.query.receipt==='1'">
            <el-button :disabled="detail.receipt==='1'" type="primary" size="small" @click="fetchRead(detail.id)">已 阅</el-button>
          </div> -->
          发送时间：{{detail.created_at | formatDate(true)}}
          优先级：{{detail.level}}
        </div>
      </div>
      <div class="noticeDetailBd" v-html="detail.body">
      </div>
      
    </div>
    
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as notice from "@/api/notice"

export default {
  data() {
    return {
      loading: false,
      detail: null
    };
  },
  methods: {
    fetchRead: function(id){
      this.loading = true;
      notice.read({
        id
      }).then(res => {
        notice.isRead({
          id,
          model: 'notice'
        }).then(res => {
          this.loading = false;
        })
      })
      
    },
    fetchData: function(queryParam){
      this.loading = true;
      notice.detail(queryParam).then(res => {
        this.loading = false
        this.detail = res.data.data;
        //自动阅读
        this.fetchRead(this.detail.id)
      })
    }
  },
  created: function() {
    if(this.$route.query.id){
      this.fetchData({
        id: this.$route.query.id
      })
    }
    
  }
};
</script>

<style scoped>
.noticeDetailHd{padding:10px;margin-bottom: 20px;}
.noticeDetailHd ._title{font-size:16px;color:#000;line-height: 1.7em;margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 10px;}
.noticeDetailHd ._sub{font-size:12px;color:#ccc;line-height: 2em;}
.noticeDetailBd{color:#999;line-height: 2em;}
</style>
