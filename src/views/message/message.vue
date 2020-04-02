<template>
  <div class="flex-col lightbg">
    <header1 />
    <template v-if="$route.path.split('/').length===2">
        <div class="flex-1 flex-col">
            <div class="mainCont flex-1 flex-row message_cont">
                <div class="flex-1 flex-col">
                    <unread class="flex-1 block_wrap_min withTitle" />
                </div>
                <div class="flex-1 flex-col">
                    <notice class="flex-1 block_wrap_min withTitle" />
                    <files class="flex-1 block_wrap_min withTitle" />
                </div>
                <div class="flex-1 flex-col">
                    <timeline class="flex-1 block_wrap_min withTitle" />
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <router-view class="flex-1 newWrap" />
    </template>
    
  </div>
</template>

<script>

import unread from '@/components/message/unread'
import notice from '@/components/message/notice'
import files from '@/components/message/files'
import timeline from '@/components/message/timeline'

export default {
  components: {
    unread,
    notice,
    files,
    timeline
  }
};
</script>

<style scoped>
.message_cont{padding:6px;}
.block_wrap_min { margin:6px; box-shadow:0px 0px 4px rgba(0,0,0,.2); border-radius:10px; padding:10px 15px; background:url(../../assets/img/work/block_b.png) 100% 100% no-repeat #fff;}
.block_wrap_min.withTitle { padding-top:32px;}
</style>
