<template>
  <router-view id="app" :class="bg" />
</template>

<script>
import * as util from "@/assets/util.js";
import { instance } from "@/api";
import QRCode from 'qrcode'

export default {
  name: "app",
  data(){
      return {
        screenWidth:1920,
        screenClass:'',
        default:{
            errorface:"this.src='/img/default_face.png'",
            face:"/img/default_face.png",
            tree_org_type:""
        }
      }
  },
  watch: {
    $route: function(to,from) {
      this.checkLogin();
      util.emit("routeChange",from);
    }
  },
  computed: {
      bg(){
          let route = this.$route;
          if(route.name == '登录'){
              return 'appbg'
          }
          if(route.matched[1]){
              if(route.matched[1].name == '可视窗口' || route.matched[1].name == '党支部' || route.matched[1].name == '党建地图'){
                  return 'window'
              }
          }
      }
  },
  methods: {
    checkLogin: function(callback) {
      const noAuthPath = [
        "/",
        "/work/task-preview",
        "/login",
        '/first',
        '/forget',
        '/mobile',
        '/demo',
        '/powerlogin'
      ]
      
      if (!this.$root.user.access_token) {
        let localUser = util.storage("user");
        if (localUser) {
          this.initUser(callback);
        } else if (noAuthPath.findIndex(e => e===this.$route.path)===-1) {
          return this.$router.replace({ path: "/login", query: {from: this.$route.path} });
        }else{
          //window.isVisitor = true
        }
      }
    },
    initUser: function(callback) {
      this.$root.datacenter_op_auth = {
          add:1,
          del:1,
          edit:1,
          check:1
      }
      this.$root.mapcenter = [116.508479,39.929238]
      this.$root.user = util.storage("user");
      //设置请求头统一携带token
      instance.defaults.headers.common[
        "Authorization"
      ] = this.$root.user.access_token;
      
      //执行回调
      typeof callback === "function" && callback();
    },
    loginDirect: function(newPath) {
      this.checkLogin();
      this.initUser(() => {
        this.$router.replace({ path: newPath || "/" });
      });
    },
    logoutDirect: function() {
      //清除user
      util.storage("user", "");
      //清除请求头token
      instance.defaults.headers.common["Authorization"] = "";
      //退出IM
      if (this.$root.clientUser) {
        this.$root.clientUser.close().then(res => {
          this.$root.clientUser = null;
          setTimeout(() => {
              window.location.href = "/"
          }, 10);
          /* this.$router.replace({ path: "/login" }, () =>{
            window.location.reload()
          }); */
        });
      } else {
        //回到登录页
        if(this.$route.path!=='/login'){
          setTimeout(() => {
            window.location.href = "/"
          }, 10);
          //this.$router.replace({ path: "/login" });
        }
      }
    }
  },
  created: function() {
    var domain = window.location.host;
    let qr_url = 'http://'+domain+'/#/mobile'
    QRCode.toDataURL(qr_url,{
        errorCorrectionLevel: 'H',
        margin:2,
        width:260,
        rendererOpts: {
            quality: 0.3
        }
        }).then(url => {
        this.$root.mobile_qrcode = url;
    })

    this.$root.default = this.default;
    this.checkLogin();
    util.on("login", this.loginDirect);
    util.on("logout", this.logoutDirect);
    
    //自适应机制
    document.getElementsByTagName("html")[0].classList.remove('screen_big','screen_middle','screen_small')
    this.screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
    if (this.screenWidth > 1900) {
        this.screenClass = 'screen_big'
    }
    if(this.screenWidth <= 1900 && this.screenWidth >= 1370){
        this.screenClass = 'screen_middle'
    }
    if (this.screenWidth < 1370) {
        this.screenClass = 'screen_small'
    }
    document.getElementsByTagName("html")[0].classList.add(this.screenClass)
    this.$root.screen = this.screenClass || '';
    setTimeout(() => {
        util.emit('screenClass',this.screenClass);
    },500);
    //自适应机制resize
    window.onresize = function() {
        util.emit('resize');
        document.getElementsByTagName("html")[0].classList.remove('screen_big','screen_middle','screen_small')
        this.screenWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
        if (this.screenWidth > 1900) {
            this.screenClass = 'screen_big'
        }
        if(this.screenWidth <= 1900 && this.screenWidth >= 1370){
            this.screenClass = 'screen_middle'
        }
        if (this.screenWidth < 1370) {
            this.screenClass = 'screen_small'
        }
        document.getElementsByTagName("html")[0].classList.add(this.screenClass)
        util.emit('screenClass',this.screenClass);
    }
    
  }
};
</script>

<style>
@import url(assets/common.css);
</style>
