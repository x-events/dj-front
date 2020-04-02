<template>
  <div class="mainCont flex-col">
    <channel-bar/>

    <div class="flex-col detail flex-1 scrollbar">
      <div class="header">
        <h3 class="el" :title="data.title">{{data.title}}</h3>
      </div>
      <p>发布时间：{{data.created_at | formatDate(true)}}</p>
      <div class="content flex-1" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "@/api/work.js";
import channelBar from "@/components/channelBar";

export default {
  components: {
    "channel-bar": channelBar
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getDetail() {
      work.newsDetail({ id: this.$route.params.id }).then(res => {
        this.data = res.data.data;
      });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped>
.detail {
  margin: 12px 12px 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 30px;
}
.detail .header {
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e4e4;
   margin-bottom: 15px;
}
.content {
  margin-top: 15px;
}
</style>
