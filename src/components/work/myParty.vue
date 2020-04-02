<template>
  <div class="my-party workBox" v-loading="loading">
    <div class="channelBar">
      <div class="_title">
        <i class="wkico"></i>
        <strong>我的党组织</strong>
      </div>
    </div>
    <section class="content">
      <h1 class="el" :title="info.name">{{info.name}}</h1>
      <p class="el">党&nbsp;员&nbsp;数：<span class="imp">{{info.count}}</span></p>
      <p class="el">换届时间：<span class="imp">{{info.change_time}}</span></p>
      <p class="el">属　　性：<span class="imp">{{info.type}}</span></p>
      <p class="el">联系方式：<span class="imp">{{info.tel}}</span></p>
      <p :title="info.addr" style="line-height:1.7em;height:3.4em;overflow:hidden">地　　址：<span class="imp">{{info.addr}}</span></p>
    </section>
  </div>
</template>

<script>
import * as account from "@/api/account";

export default {
  data() {
    return {
      loading: false,
      info: {}
    };
  },
  methods: {
    fetchData: function() {
      this.loading = true;
      account.orgInfo().then(res => {
        this.info = res.data.data;
        this.loading = false;
      });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.my-party {
  overflow: hidden;
  line-height: 2;
  /* background: url(../../assets/img/work/work_party_b.png) right bottom no-repeat #fff; */
  color:#333;
}
.my-party .channelBar {
  /* background: linear-gradient(to right, #ff5e00 0%,#ff8e00 100%); */
}
._title .ion { display:inline-block; border:#005fc5 1px solid; border-radius:50%; font-size:15px; width:22px; height:22px; line-height:22px; text-align:center; vertical-align:-1px;}
.my-party h1 {
  font-size:14px;
  font-weight: normal;
  margin-bottom:5px;
}
.my-party p {
  margin-bottom:5px;
}
.content { font-size:12px;}
</style>
