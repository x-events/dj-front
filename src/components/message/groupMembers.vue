<template>
  <div class="flex-col groupMembers" v-loading="loading" v-if="visible">
    <div class="channelBar">
      <div class="_title">
        <i class="ion">&#xe64e;</i>
        <strong>成员列表</strong>
      </div>
      <div class="_ext" @click="$emit('close')">
        <i class="ion">&#xe644;</i>
      </div>
    </div>
    <div class="flex-1 scrollbar">
      <template v-if="list.length">
      <ul class="baseList">
        <li v-for="(item,index) in list" :key="'org'+index" 
          class="flex-row align-center"
          @click="$emit('select', item)">
          <div class="_avat">
            <img :src="item.avatar || holdavat" />
          </div>
          <div class="flex-1 _main">
            <div class="flex-row">
              <div class="flex-1 _title el">
                {{item.name}}
              </div>
            </div>
          </div>
        </li>
      </ul>
      </template>
      <template v-else>
        <div style="text-align:center;padding:20px 0;">
          暂无数据
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import * as im from "@/api/im"

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    group_id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      loading: false,
      holdavat: require("@/assets/img/talk-avat.png"),
      list: []
    }
  },
  watch: {
    visible: function(visible){
      if(visible && this.group_id){
        this.list = []
        this.fetchData(this.group_id)
      }
    }
  },
  methods: {
    fetchData: function(group_id){
      this.loading = true;
      im.getmembers({
        id: group_id
      }).then(res => {
        this.loading = false;
        this.list = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.groupMembers{position: absolute;right:0;top:60px;bottom:20px;width:300px;background: #fff;z-index: 99;box-shadow: 2px 2px 8px rgba(0,0,0,.5)}
.groupMembers .channelBar{background:#fff;color:#333;}
.groupMembers .ion{color:#ff7177;}
.groupMembers ._title .ion{color:#1244d2;}
.groupMembers ._avat{margin-left:10px;}

</style>
