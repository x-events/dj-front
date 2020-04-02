<template>
  <div class="header">
      <div class="user">
        <div class="avat" @click="logout">
          <img src="https://static.refined-x.com/avat.jpg" />
        </div>
      </div>
      <div class="qrcode"></div>
      <div class="zoom"></div>
      <ul class="nav">
        <li v-for="(item,index) in $router.options.routes[0].children" :key="'nav'+index"
          :class="{cur: $route.path.indexOf(item.path)===0}"
          @click="$router.push(item)">
          <div class="icon"></div>
          {{item.name}}
        </li>
      </ul>
      <div class="logo"></div>
      <h1 class="h1title">
        八里庄街道基层党建规范化可视平台
      </h1>

    </div>
</template>

<script>
import * as util from "@/assets/util.js";

export default {
  name: 'header2',
  methods: {
    logout: function(){
      this.$confirm('确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          util.emit('logout')
        })
      
    }
  }
}
</script>

<style scoped>
.header{height: 70px;overflow: hidden; background:#1f3777;}
.header .logo{float: left;height:70px;line-height: 70px;width:70px; background:url(../assets/img/logo-w.png) center /auto 50% no-repeat;}
.header .h1title{float: left;height:70px;line-height: 70px;color:#fff;font-size: 20px;}
.header .user{float: right;height:70px;line-height: 70px;margin: 0 1em;}
.header .avat{display: inline-block; width:50px;height: 50px;border-radius: 25px;overflow: hidden;vertical-align: middle;}
.header .qrcode{float: right;width:50px;height: 70px;background:url(../assets/img/qrcode.png) center no-repeat;}
.header .zoom{float: right;width:50px;height: 70px;background:url(../assets/img/zoom.png) center no-repeat;}

.header .nav{float:right;color:#fff;height: 100%;}
.header .nav li{float: left;width:7em;text-align: center; font-size:14px;cursor: pointer;height: 100%;}
.header .nav .icon{display: block;width:20px;height: 20px;margin:10px auto;background-image: url(../assets/img/ico.png);background-repeat:no-repeat;}
.header .nav li:nth-child(1) .icon{background-position: 0 0;}
.header .nav li:nth-child(2) .icon{background-position: -20px 0;}
.header .nav li:nth-child(3) .icon{background-position: -40px 0;}
.header .nav li:nth-child(4) .icon{background-position: 0 -20px;}
.header .nav li:nth-child(5) .icon{background-position: -20px -20px;}
.header .nav li:nth-child(6) .icon{background-position: -40px -20px;}
.header .nav li:nth-child(7) .icon{background-position: 0 -40px;}
.header .nav li:nth-child(8) .icon{background-position: -20px -40px;}

.header .nav .cur, .header .nav li:hover{background: #152c6b;}
</style>
