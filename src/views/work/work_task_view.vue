<template>
  <div class="mainCont scrollbar">
    <div class="block_wrap_min mainWrap withTitle" v-loading="loading">
      <div class="channelBar flex-row taskDetailTitle">
          <div class="_title flex-1">
            <div class="el">
              <i class="ion">&#xe77a;</i>
              <strong>{{$route.query.name}}</strong>
            </div>
          </div>
          <div class="_ext" v-if="$root.user">
            <el-button size="small" @click="$router.go(-1)">返回</el-button>
            <!-- <template v-if="setpFormCache[currentStep] && setpFormCache[currentStep].button.length">
              <el-button v-for="(item,index) in setpFormCache[currentStep].button" :key="'btn'+index" 
                size="small"
                @click="handleAction(item)">{{item.name}}</el-button>
            </template> -->
          </div>
      </div>
      
      <el-form label-width="180px" style="margin-right:100px;">
        <div class="workSteps flex-row">
          <div class="flex-1 item" v-for="(item,index) in stepList" :key="'setpitem'+index"
            :class="stepClass(item,index)"
            @click="currentStep=index">
            <div class="mark">
              <span class="text">{{item.no}}</span>
              <i class="icon el-icon-check"></i>
            </div>
            <div class="title">
              {{item.name}}
            </div>
          </div>
        </div>
        <!-- <el-steps :active="currentStep" align-center>
          <el-step v-for="(item,index) in stepList"
            :key="'setp'+index"
            icon="el-icon-tickets"
            :title="item.no"
            :description="item.name"
            @click.native="currentStep=index"></el-step>
        </el-steps> -->
        <template v-if="setpFormCache[currentStep]">
          <div v-for="(item,index) in setpFormCache[currentStep]" :key="'form'+index">
            <!-- <div class="formChannel">
              {{item.name}}
            </div> -->
            <component v-for="(comp,ci) in item.component" :key="'comp'+ci" 
            :is="'widget_'+comp.type" 
            :labelname="comp.name" 
            :labelwidth="180"
            :propdata="comp.data"
            :requiredvalue="comp.required==='1'"
            @change="handleChange(index, ci, $event)"></component>
          </div>
        </template>
        <!-- <div style="text-align:center" v-if="stepList.length>1">
          <el-button size="small" :disabled="currentStep<=0" @click="currentStep--">上一步</el-button>
          <el-button size="small" :disabled="currentStep>=stepList.length-1" @click="currentStep++">下一步</el-button>
        </div> -->
      </el-form>
    </div>
    
  </div>
</template>

<script>
import * as componentsRepository from "@/components/work/widgets/componentsMap";
import * as work from "@/api/work.js";

export default {
  components: {
    ...componentsRepository
  },
  data() {
    return {
      loading: false,
      queryParam: {
        process_id: "",
        process_step_id: "",
        form: []
      },
      stepList: [],
      setpFormCache: [],
      currentStep: null
    };
  },
  watch: {
    currentStep: function(){
      if(this.stepList[this.currentStep]){
        this.queryParam.process_step_id = this.stepList[this.currentStep].id
        this.fetchForm()
      }
    }
  },
  methods: {
    stepClass: function(item,index){
      let result = {}
      result['status-'+item.status] = true;
      if(index===this.currentStep){
        result.cur = true
      }else if(this.currentStep>index){
        result.ispass = true
      }
      return result
    },
    handleChange: function(formIndex, compIndex, val){
      if(this.queryParam.form[formIndex] && this.queryParam.form[formIndex].component[compIndex]){
        this.queryParam.form[formIndex].component[compIndex].value = val
      }else{
        console.warn('组件赋值失败：', formIndex, compIndex, val)
      }
    },
    fetchStep: function(){
      this.loading = true;
      work.viewProcessStep({process_nearest_id: this.queryParam.process_id}).then(res => {
        this.loading = false
        this.stepList = res.data.data;
        
        //init
        this.currentStep = 0

      })
    },
    fetchForm: function(){
      this.loading = true;
      let process_step_id = this.queryParam.process_step_id
      work.viewStepForm({process_nearest_step_id: process_step_id}).then(res => {
        this.loading = false
        this.$set(this.setpFormCache, this.currentStep, res.data.data)
        this.queryParam.form = res.data.data.map(f => {
          return {
            id: f.id,
            relation_id: f.relation_id,
            component: f.component.map(c => {
              return {
                id: c.id,
                value: ''
              }
            })
          }
        })
      })
    }
  },
  created() {
    if(this.$route.query.id){
      this.queryParam.process_id = this.$route.query.id;
      this.fetchStep()
    }
  }
};
</script>

<style scoped>

.formChannel{font-weight: 700;font-size:1.5em;margin:20px;}

.el-step{cursor: pointer;}
</style>
