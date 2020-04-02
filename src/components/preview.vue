<template>
  <div class="previewModel flex-row align-center" 
    v-if="src"
    @click="$emit('close')">
    <img :src="src"  >
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.previewModel{position: fixed;left: 0;right:0;top:0;bottom: 0;z-index: 99;background:rgba(0,0,0,.5);overflow: hidden;}
.previewModel img{display: block;margin:auto; max-width: 100%;max-height: 100%;}
</style>
