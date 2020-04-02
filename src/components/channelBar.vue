<template>
  <div class="subChannel">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
          {{ item.meta.name || item.name }}
        </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="_back" @click="$router.go(-1)">
      <i class="ion">&#xe664;</i>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  }
};
</script>

<style scoped>
.subChannel{position: relative; background: #fff;box-shadow: 0 1px 4px #d7def4;padding:10px 0 10px 15px;}
.subChannel::before{content: "";
  position: absolute;
  left:0px;
  top:50%;
  margin-top: -8px;
  width:4px;
  height:16px;
  background:rgba(8,122,217,1);
  border-radius:2px;}
.subChannel .ion{position: absolute;right:15px;top:50%;margin-top:-15px; width:30px;height: 30px;border-radius: 2px; line-height: 30px;text-align: center;background:#e6e6e6;color:#1244d2;cursor: pointer;}
.subChannel .ion:hover{opacity: .8;}
.subChannel { background:none; box-shadow:none;}
</style>
