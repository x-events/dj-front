<template>
  <div class="flex-col">
    <header1 />
    
    <template v-if="$route.path.split('/').length>2">
      <keep-alive :include="['work_task']">
        <router-view class="flex-1 newWrap" />
      </keep-alive>
    </template>
    <template v-else>
        <div class="flex-1 flex-col">
            <div class="mainCont flex-1 flex-row paddingWrap scrollbar">
                <div class="work-side flex-col">
                    <person-info class="block-1 block_wrap_min" />
                    
                    <my-party class="block-2 block_wrap_min flex-col withTitle" />
                    
                    <block />
                </div>
                <div class="flex-1 flex-col" style="min-height:693px;">
                    
                    <div class="flex-row" style="min-height:315px;">
                        <news class="block-3 block_wrap_min withTitle" />
                        <notice class="block-4 flex-1 block_wrap_min withTitle" />
                    </div>
                    
                    <div class="block-5 block_wrap_min flex-col withTitle workBox flex-1">
                        <div class="channelBar green" @click="$router.push({path: '/work/todos'})">
                            <div class="_title">
                                <i class="wkico wkico2"></i>
                                <strong>待办工作</strong>
                                <span class="moreLink"></span>
                            </div>
                        </div>
                        <div class="flex-1 scrollbar">
                            <schedule />
                        </div>
                    </div>
                    
                </div>
            
            </div>
        </div>
    </template>
  </div>
</template>

<script>

import header1 from '@/components/header1'
import personInfo from '@/components/work/personInfo.vue'
import myParty from '@/components/work/myParty.vue'
import block from "@/components/work/block.vue";
import news from '@/components/work/news.vue'
import notice from '@/components/work/notice.vue'
import schedule from '@/components/work/schedule.vue'

export default {
  components: {
    header1,
    personInfo,
    myParty,
    block,
    news,
    notice,
    schedule
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    
  },
  created: function() {
    
  }
};
</script>

<style scoped>
.work-side{width:20%; min-height:695px; min-width:272px;}
.block-1,.block-2,.block-3,.block-4, .block-5{margin-bottom:12px;}
.block-1{height:auto;}
.block-2{height: 220px;}
.block-3{height: 260px; width:500px;}
.block-4{height: 233px;}
.block-5{/* height: 286px; */min-height: 286px;}
.block-1 .title p {text-align: right;height: 20px;}
.person.ion {color: #D2D2D2;font-size: 20px;}

.mainCont { margin:0; background-color:#edf4f9;}
.block_wrap_min {margin: 6px;border-radius: 10px;padding:10px 15px;box-shadow: 1px 1px 4px rgba(0,0,0,.2); overflow:hidden;}
.my-party { min-height: auto; }
.person { min-height: 110px; box-sizing: border-box; padding-top:25px; padding-bottom:25px;}
</style>
