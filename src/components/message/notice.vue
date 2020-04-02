<template>
  <div class="flex-col workBox ">
    <div class="channelBar cyan" @click="$router.push({name: '通知公告'})">
      <div class="_title">
        <i class="ion">&#xe65c;</i>
        <strong>通知公告</strong>
      </div>
      <div class="moreLink">
      </div>
    </div>
    <div class="flex-1 scrollbar">
      <template v-if="list && list.length">
      <ul class="baseList">
        <li v-for="(item,index) in list" :key="'notice'+index" 
          class="flex-row"
          :class="{unread: item.is_read==0}"
          @click="$router.push({name: '通知详情', query: {id: item.id, currentTab: 'receive'}})">
          <div class="flex-1 _main flex-row align-center">
            <div class="_icon">
              <!-- 未读 -->
              <i class="ion " v-show="item.is_read==0">&#xe890;</i>
              <!-- 已读 -->
              <i class="ion read" v-show="item.is_read!=0">&#xe637;</i>
            </div>

            <div class="flex-1 _title el">
              {{item.title}}
            </div>
          </div>
          <div class="_pub">
            {{item.created_at | formatDate(true)}}
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
import * as notice from "@/api/notice"

export default {
  data() {
    return {
      queryParam: {
        p: 0,
        pageSize: 4,
        type: 'receive'
      },
      list: null
    }
  },
  methods: {
    fetchData: function(init){
      if(init){
        this.queryParam.p = 0
      }
      notice.receive(this.queryParam).then(res => {
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
.baseList ._icon{font-size:1.6em;margin-right: 6px;}
.baseList li{color:#b9b9b9;padding: 4px 0;}
.baseList .unread,.baseList li:hover{color:#666;}
.baseList .unread ._icon{color:#ffb00d;}
.baseList li ._title{color:inherit;}
</style>
