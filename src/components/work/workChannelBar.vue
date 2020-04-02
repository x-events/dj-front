<template>
  <div class="workHeadBar flex-row align-center">
    <ul class="flex-1 _list">
      <li v-for="(item,index) in subMenu" :key="'sub'+index" :class="[{cur: $route.path.indexOf('/work/'+item.path.replace(/^\/work\//,''))===0}, '_item'+index]" @click="$router.push(item)" v-if="evaluateAccess(item)">
        <span class="_ion"></span>
        {{item.meta.title || item.name}}
      </li>
    </ul>
    <!-- <div class="_ext">
      <el-button type="primary" size="small" @click="$router.push({name: '标准化流程模板'})">新建任务</el-button>
    </div> -->
  </div>
</template>

<script>
import * as util from "@/assets/util";

export default {
  computed: {
    subMenu: function() {
      let menu = this.$router.options.routes[0]
        ? this.$router.options.routes[0].children
        : [];
      menu = menu.filter(e => {
        return e.name === "工作记实"
      })[0];

      if(menu.children){
        return menu.children.filter(e => {
          
          return !e.meta.hidden && (Array.isArray(e.meta.hideRole) ? (e.meta.hideRole.findIndex(e => e===this.$root.user.role)===-1) : true)
        })
      }
      return [];
    }
  },
  methods: {
      evaluateAccess(e){
          if(e.name != '综合评价'){
              return true
          }else{
              //综合评价
              if(this.$root.user.org_type == '3'){
                  return false
              }else{
                  return true
              }
          }
      }
  },
  created: function(){
    util.on('navHover', index => {
      console.log(index)
    })
  }
};
</script>

<style scoped>
.workHeadBar {
  height: 50px;
  background: #fff;
  box-shadow:0px -15px 62px 0px rgba(12,52,97,0.24);
}
.workHeadBar ._list{
  text-align: right;
  width:100%;
  box-sizing: border-box;
  padding-right: 5em;
}
.workHeadBar ._list li {
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
  color: #333;
}
.workHeadBar ._list ._ion {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width:35px;
  height:35px;
  background:rgba(193,204,213,1);
  border-radius:50%;
  line-height: 35px;
  text-align: center;
}
.workHeadBar ._list ._ion::after{
  content: "";
  position: absolute;
  width:16px;height: 16px;
  background-repeat: no-repeat;
  background-position: center center;
  left:50%;
  top:50%;
  margin:-8px 0 0 -8px;
}
.workHeadBar ._item0 ._ion::after{
  background-image: url(../../assets/img/work/channel-ico1.png)
}
.workHeadBar ._item1 ._ion::after{
  background-image: url(../../assets/img/work/channel-ico2.png)
}
.workHeadBar ._item2 ._ion::after{
  background-image: url(../../assets/img/work/channel-ico3.png)
}
.workHeadBar ._item3 ._ion::after{
  background-image: url(../../assets/img/work/channel-ico4.png)
}
.workHeadBar ._item4 ._ion::after{
  background-image: url(../../assets/img/work/channel-ico5.png)
}
.workHeadBar ._ext {
  margin: 0 20px 0 10px;
}
.workHeadBar ._list .cur,
.workHeadBar ._list li:hover {
  color: #1244d2;
}
.workHeadBar ._list .cur ._ion, .workHeadBar ._list li:hover ._ion {
  background:linear-gradient(0deg,rgba(17,154,241,1),rgba(0,95,197,1));
}
</style>
