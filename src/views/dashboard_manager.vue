<template>
    <div class="flex-1 flex-row">
      <div class="flex-2 flex-col">
        <block1 class="flex-1" />
         
        <block2 class="flex-2" />
          
      </div>
      <div class="flex-3 flex-col">
        <block3 class="flex-3" />
          
        <block4 class="flex-4" />
          
      </div>
      <div class="flex-2 flex-col">
        <block5 class="flex-3" />
         
        <block6 class="flex-4" />
          
      </div>
    </div>
</template>

<script>
//import * as home from "../api/home";
import block1 from '@/components/dashboard/manager/block1'
import block2 from '@/components/dashboard/manager/block2'
import block3 from '@/components/dashboard/manager/block3'
import block4 from '@/components/dashboard/manager/block4'
import block5 from '@/components/dashboard/manager/block5'
import block6 from '@/components/dashboard/manager/block6'

export default {
  components: {
    block1,
    block2,
    block3,
    block4,
    block5,
    block6
  },
  data() {
    return {
      
    };
  },
  methods: {
    showBlock: function(blocks){
      if(this.animationLock){
        return null
      }
      this.animationLock = true;
      for(let i=0;i<blocks.length;i++){
        let node = blocks[i]
        setTimeout(() => {
          node.classList.remove('hide')
          if(i===blocks.length-1){
            this.animationLock = false;
          }
        }, 300 * i)
      }
    }
  },
  created: function() {
    
  }
};
</script>

<style scoped>

</style>
