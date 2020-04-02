<template>
  <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="p in $route.matched" :key="p.path"
        :to="p">{{p.meta.title || p.name}}</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
</template>

<script>
import * as util from "@/assets/util";

export default {
  props: {
    showname: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    showname: {
      handler: function(){
        let matched = this.$route.matched;
        if(this.showname){
          document.title = this.paramDecode(this.showname)
        }
      },
      immediate: true
    }
  },
  methods: {
    paramDecode: util.paramDecode
  }
};
</script>

<style scoped>
.breadcrumb {
  position: relative;
  padding: 5px 30px 5px 15px;
  margin:15px 0;
}
.breadcrumb::before{
  content: "";
  position: absolute;
  left:0px;
  top:50%;
  margin-top: -8px;
  width:4px;
  height:16px;
  background:rgba(8,122,217,1);
  border-radius:2px;
}
</style>
