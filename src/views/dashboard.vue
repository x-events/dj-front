<template>
  <div class="dashboard flex-col">
    <header1 />
    <template v-if="$route.path.split('/').length>2">
      <router-view class="flex-1 flex-row" />
    </template>
    <template v-else>
    <div class="flex-1 flex-row paddingWrap">
      <div class="flex-2 flex-col">
        <block1 class="flex-1" />
         
        <block2 class="flex-2" />
          
      </div>
      <div class="flex-3 flex-col">
        <block3 class="flex-1" />
          
        <block4 class="flex-1" />
          
      </div>
      <div class="flex-2 flex-col">
        <block5 class="flex-1" />
         
        <block6 class="flex-1" />
          
        <block7 class="flex-1" />
          
      </div>
    </div>
    </template>
  </div>
</template>

<script>
//import * as home from "../api/home";
import block1 from '@/components/dashboard/block1'
import block2 from '@/components/dashboard/block2'
import block3 from '@/components/dashboard/block3'
import block4 from '@/components/dashboard/block4'
import block5 from '@/components/dashboard/block5'
import block6 from '@/components/dashboard/block6'
import block7 from '@/components/dashboard/block7'

export default {
  components: {
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7
  },
  data() {
    return {
      
    };
  },
  watch: {
    $route: function(){
      this.$nextTick(() => {
        this.showBlock()
      })
    }
  },
  methods: {
    showBlock: function(){
      console.log(this.$router)
      let blocks = document.querySelectorAll('.block');
      if(!blocks.length){
        return console.log('没有blocks元素')
      }
      for(let i = 0;i<blocks.length;i++){
        let node = blocks[i];
        setTimeout(() => {
          node.classList.remove('hide')
        }, 50 * i)
      }
      
    }
  },
  created: function() {
    this.$nextTick(() => {
      this.showBlock()
    })
  }
};
</script>

<style scoped>

</style>
