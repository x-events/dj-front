<template>
  <div class="flex-col timelineComp workBox " v-loading="loading">
    <div class="channelBar yellow" @click="$router.push({name: '党建朋友圈'})">
      <div class="_title">
        <i class="ion">&#xe628;</i>
        <strong>党建朋友圈</strong>
      </div>
      <div class="moreLink">
      </div>
    </div>
    <div class="flex-1 scrollbar">
      <template v-if="list && list.length">
      <ul class="baseList timelineList">
        <li v-for="(item,index) in list" :key="'tl'+index">
          <div class="flex-row list_hd">
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
            
          </div>
          <div class="_cont _full" v-if="item.body">
            {{cleanHtml(item.body)}}
          </div>
          <el-row :gutter="8">
            <el-col :span="8" v-for="(img,index) in item.img_list" :key="'img'+index">
              <div class="_wrap" @click="previewUrl=img">
                <img :src="img">
              </div>
            </el-col>
          </el-row>
          <div class="_footer">
            <div class="_mark _agree"
              :class="{active:item.is_agree==1}"
              @click="doAgree(item)">
              <i class="ion">&#xe742;</i>
              <i class="ion agree">&#xe60c;</i>
              {{item.agree_sum}}
            </div>
            <div>
              {{item.created_at | formatDate(true)}}
            </div>
          </div>
        </li>
      </ul>
      </template>
      <template v-else>
      <nodata mode="pic" />
      </template>
    </div>
    <!-- preview -->
    <preview :src="previewUrl" @close="previewUrl=''" />
  </div>
</template>

<script>
import * as timeline from "@/api/timeline"

export default {
  components: {
    'preview': (resolve) => require(['@/components/preview'], resolve)
  },
  data() {
    return {
      loading: false,
      queryParam: {
        p: 0,
        pageSize: 4
      },
      list: null,
      previewUrl: '',
      holdavat: require("@/assets/img/talk-avat.png")
    }
  },
  methods: {
    cleanHtml: function(html){
      return html.replace(/<br>/g,'').replace(/&nbsp;/g,'')
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
    fetchData: function(){
      this.loading = true
      timeline.list(this.queryParam).then(res => {
        this.loading = false
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
.timelineList li{border-bottom:1px solid #eee;}
.timelineList ._agree .ion{font-size:1.2em;}
.timelineList ._cont{font-size:14px;color:#434343;}
.timelineComp{padding-left:10px;padding-right:0}
._footer {height: 2em; margin-top: 1em;}
._footer ._mark{float:right;}
</style>
