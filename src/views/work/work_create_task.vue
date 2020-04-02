<template>
  <div class="flex-col worklist">
    <work-channel-bar/>
    <breadcrumb/>
    <div class="flex-1 scrollbar fullWrap showBottom">
      <div class="boxBlock">
        <div class="_hd flex-row align-center">
          <div class="flex-1">
            <div class="_title">
              <i class="ion">&#xe77a;</i>
              <strong>{{paramDecode($route.query.name)}}</strong>
            </div>
          </div>
          <el-button
            type="primary"
            size="medium"
            @click="openGuide"
          >
            <i class="ion">&#xe767;</i> 工作指引
          </el-button>
        </div>
        <!-- 新建流程 -->
        <template v-if="form_category_id">
          <create-task class="flex-1" 
            :form_category_id="form_category_id" 
            @callback="reset"
            @cancel="$router.go(-1)"
            />
        </template>
        <!-- 新建记录 -->
        <template v-else-if="record_id">
          <create-record
            class="flex-1"
            :form_category_id="record_id"
            :process_sub="processSub"
            :processSubIndex="processSubIndex"
            @callback="reset"
            @cancel="$router.go(-1)"
            @change="processSubIndex=$event"
          />
        </template>
      </div>
    </div>
    <!-- 工作指引弹窗 -->
    <guide :visible="guideVisible" :id="currentId" :processSubIndex="processSubIndex" :name="$route.query.name" @close="guideVisible=false" />
  </div>
</template>

<script>
import * as util from "@/assets/util";
import * as work from "@/api/work.js";

import workChannelBar from "@/components/work/workChannelBar";
import breadcrumb from "@/components/breadcrumb";
import createTask from "@/components/work/create_task";
import createRecord from "@/components/work/create_record";
import guide from "@/components/work/work_guide";

export default {
  components: {
    workChannelBar,
    breadcrumb,
    createTask,
    createRecord,
    guide
  },
  data() {
    return {
      loading: false,
      guideVisible: false,
      currentId: null,
      form_category_id: null,
      record_id: null,
      processSub: [],
      processSubIndex: null
    };
  },
  watch: {
    $route: function(){
      //异常回退
      if(!this.$route.query.name){
        return this.$router.go(-1)
      }
    },
    processSubIndex: function(){
      if(this.processSub.length && this.processSub[this.processSubIndex]){
          this.currentId = this.processSub[this.processSubIndex].id
        }
    }
  },
  methods: {
    openGuide: function(){

      this.guideVisible=true;
    },
    paramDecode: util.paramDecode,
    reset: function(task){
      this.$message({
        message: '新建成功',
        duration: 1000,
        type: 'success',
        onClose: () => {
          console.log(task)
          if(task && task.name){
            console.log('replace')
            this.$router.replace({name: '工作详情', query: util.paramEncode({category_name: this.$route.query.name, id: task.process_log_id, form_category_id: task.form_category_id})})
          }else{
            this.$router.go(-1)
          }
        }
      });
    }
  },
  created() {
    
    //处理页面跳转携带的参数
    const params = this.$route.query;
    
    this.currentId = params.id;
    switch (parseInt(params.type)) {
      case 2:
        //流程
        this.record_id = null;
        this.form_category_id = parseInt(params.id);
        break;
      case 3:
        //记录
        this.form_category_id = null;
        this.record_id = parseInt(params.id);
        let sub = sessionStorage.getItem('work-detail-tabs')
        this.processSub = sub ? JSON.parse(sub) : [];
        this.processSubIndex = this.$route.query.processSubIndex || 0
        if(this.processSub.length && this.processSub[this.processSubIndex]){
          this.currentId = this.processSub[this.processSubIndex].id
        }
        break;
      default:
        console.warn(params);
        this.$router.go(-1);
    }

  }
};
</script>

<style scoped>
.showBottom{padding-bottom: 70px;}
</style>
