<template>
  <section class="person workBox flex-row align-center" v-loading="loading">
    <router-link :to="{name:'个人信息'}" class="set" title="设置">
      <i class="ion">&#xe606;</i>
    </router-link>
    <div v-if="user" class="content flex-1">
        <div class="flex-row">
        <img :src="user.avatar" :alt="user.realname" class="avatar">
        <div class="flex-1">
            <h2 style="width:120px;" :title="user.realname" class="el">{{user.realname}}</h2>
            <p class="party_membership_text">{{user.party_membership_text}}</p>
        </div>
      </div>
      <div class="tc">
          <el-button @click="switchID()" class="logout newComBtn min">身份切换</el-button>
          <el-button @click="logout" class="logout newComBtn min">退出</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import * as util from "@/assets/util";
import * as account from "@/api/account";

export default {
  data() {
    return {
      loading: false,
      user: null
    }
  },
  methods: {
    switchID(){
        util.emit('switchID')
    },
    fetchData: function(){
      this.loading = true;
      account.info().then(res => {
        this.user = res.data.data;
        this.loading = false
      })
    }, 
    logout() {
        this.$confirm('退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            util.emit('logout')
        })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
.person{position: relative; padding-top:23px;background: url(../../assets/img/work/work_info_b.jpg) 0 bottom no-repeat!important;
background-size: cover !important;
}
.person .set {position: absolute;right:5px;top:5px;z-index: 9;padding:.5em;line-height: 1;}
.person img {width:45px; height:45px;border-radius: 50%;margin-right:7px; border:#0f7dd5 2px solid; margin-left:40px; margin-top:3px;}
.content {align-items: center;}
.content p {margin-bottom: 1em;}
.content h2 { font-size:18px;}
.content .logout { width:76px; height:22px;border:0; line-height:0; border-radius:11px; padding-left:0; padding-right:0;}
.party_membership_text { font-size:12px; color:#087ad9;}
</style>
