<template>
  <div class="flex-col workBox ">
    <div class="channelBar green" @click="$router.push({name: '文件接收箱'})">
      <div class="_title">
        <i class="ion">&#xe737;</i>
        <strong>文件接收箱</strong>
      </div>
      <div class="moreLink">
      </div>
    </div>
    <div class="flex-1 scrollbar" style="margin:-15px">
      <template v-if="list && list.length">
      <ul class="baseList filesList inline">
        <li v-for="(item,index) in list" :key="'file'+index" class="flex-row align-center"
          :class="{unread: item.is_read==0}">
          <div class="_avat">
            <img :src="item.file_name | fileIcon" />
          </div>
          <a class="flex-1 _main" @click="weboffice(item, true)">
            <div class="_title el">
              {{item.file_name}}
            </div>
            <!-- <div class="_pub">
              {{item.created_at | formatDate(true)}}&emsp;&emsp;From: {{item.user_name}}
            </div> -->
          </a>
          <div class="_mark">
            <a @click="downloadUrl(item)" class="_download">
              <i class="ion">&#xe629;</i>
            </a>
          </div>
        </li>
      </ul>
      </template>
      <template v-else>
      <nodata mode="pic" />
      </template>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util"
import * as files from "@/api/files"
import * as notice from "@/api/notice"

export default {
  filters: {
    fileIcon: util.fileIcon
  },
  data() {
    return {
      queryParam: {
        p: 0,
        pageSize: 3,
        type: 'receive'
      },
      list: null
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
          return window.open(`${files.downloadUrl}?id=${params.file_id}&token=${this.$root.user.access_token}`)
        }).catch((err) => {
          console.warn('阅读状态执行异常',err)
          return window.open(`${files.downloadUrl}?id=${params.file_id}&token=${this.$root.user.access_token}`)
        })
      })
      
      
    },
    fetchData: function(){
      files.receive(this.queryParam).then(res => {
        this.list = res.data.data
      })
    }
  },
  created: function(){
    this.fetchData()
  }
}
</script>

<style scoped>
.filesList li{padding-left:15px;padding-right: 15px;}
.filesList li:nth-child(even){background:#f7f9fc;}
.filesList li ._title{color:#777;}
.filesList ._download .ion{font-size:2em;color:#0c8ae5;}
.filesList .unread ._title{color:#333;font-weight: 700;}
</style>
