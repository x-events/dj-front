<template>
  <div class="workDetail" v-loading="loading || submitloading">
    <el-form label-width="180px" style="margin-right:100px;">
      
      <step-bar :steplist="stepList" :currentstep="currentStep || 0" @change="currentStep=$event" />

      <template v-if="!loading && setpFormCache[currentStep]">
        <dynamic-component v-for="(item,index) in setpFormCache[currentStep]" :key="'form'+index"
          :components="item.component"
          :iscreated="true"
          @change="handleChange(index, $event.ci, $event.value)"
          @validSuccess="extendValid[$event] = true"
          @validFail="delete extendValid[$event]"
        />
        
      </template>
    </el-form>
    <!-- 操作 -->
    <div v-if="currentStep===0" class="fixed_ext">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button
        type="primary"
        @click="save(true,true)">保存</el-button>
    </div>
    
  </div>
</template>

<script>
import dynamicComponent from "@/components/work/dynamicComponent"
import * as work from "@/api/work.js";
import stepBar from "@/components/work/stepBar";

export default {
  props: {
    form_category_id: {
      type: Number,
      required: true
    }
  },
  components: {
    stepBar,
    dynamicComponent
  },
  data() {
    return {
      loading: false,
      submitloading: false,
      queryParam: {
        process_step_log_id: "",
        form: []
      },
      stepList: [],
      setpFormCache: [],
      currentStep: null,
      current_step_index: 0,
      extendValid: {}
    };
  },
  watch: {
    form_category_id: function(){
      if (this.form_category_id) {
        this.currentStep = null;
        this.fetchStep(this.form_category_id);
      }
    },
    currentStep: function() {
      if (this.stepList[this.currentStep]) {
        this.queryParam.process_step_id = this.stepList[this.currentStep].id;
        this.fetchForm();
      }
    }
  },
  computed: {
    deliverStep: function(){
      return this.stepList.filter(e => {
        return e.status!='1' && (e.process_step_log_id!==this.stepList[this.currentStep].process_step_log_id)
      })
    }
  },
  methods: {
    handleChange: function(formIndex, compIndex, val) {
      if (
        this.queryParam.form[formIndex] &&
        this.queryParam.form[formIndex].component[compIndex]
      ) {
        this.queryParam.form[formIndex].component[compIndex].value = val;
      } else {
        console.warn("组件赋值失败：", formIndex, compIndex, val);
      }
    },
    save(actBack, check) {
      // 验证
      const noValue = function(value){
        if(Array.isArray(value)){
          return !value.length
        }else if(value===0 || value==='0'){
          return false
        }else{
          return !value
        }
      }
      let needLables = []
      this.queryParam.form.forEach(form => {
        form.component.forEach(comp => {
          if(comp.required==='1' && noValue(comp.value)){
            needLables.push(comp.name)
          }
        })
      })
      if(check && needLables.length){
        return this.$message.warning('请填写：'+needLables.join('、'));
      }
      //扩展验证
      const extendValidKeys = Object.keys(this.extendValid);
      if(extendValidKeys.length){
        switch(extendValidKeys[0]){
          case "memberPercent":
            return this.$message.warning("应到会党员比例不足80%");
          break;
          default: 
            console.warn('扩展验证异常',extendValidKeys)
        }
      }
      this.submitloading = true
      //保存类型
      let param = Object.assign({}, this.queryParam)

      work.createTask(param).then(res => {
        this.submitloading = false
        if(res.data.status==200){
        // 提交/保存后操作
          if(actBack){
            this.$emit('callback', {
              form_category_id: this.form_category_id,
              ...res.data.data
            })
          }else{
            this.$message(res.data.statusCode)
            this.fetchForm()
          }
        }
      }).catch(() => {
        this.submitloading = false
      });
    },
    fetchStep: function(form_category_id) {
      this.loading = true;
      work
        .viewProcessStep({ form_category_id })
        .then(res => {
          this.loading = false;
          if(res.data.data.length){
            this.stepList = res.data.data;
            //init
            this.currentStep = 0;
          }else{
            this.stepList = []
            this.setpFormCache = []
            this.currentStep = null
            this.current_step_index = 0
          }
          
        });
    },
    fetchForm: function() {
      this.loading = true;
      let process_step_id = this.queryParam.process_step_id;
      work
        .viewStepForm({ process_nearest_step_id: process_step_id })
        .then(res => {
          this.loading = false;
          this.$set(this.setpFormCache, this.currentStep, res.data.data);
          this.queryParam.form = res.data.data.map(f => {
            return {
              id: f.id,
              relation_id: f.relation_id,
              component: f.component.map(c => {
                return {
                  id: c.id,
                  value: "",
                  required: c.required,
                  name: c.name
                };
              })
            };
          });
        });
    }
  },
  created() {
    if (this.form_category_id) {
      this.fetchStep(this.form_category_id);
    }
  }
};
</script>

<style scoped>
.workDetail{padding-bottom:70px;}

.fixed_ext{
  position: fixed;
  left:0;
  bottom:0;
  width:100%;
  text-align: center;
  padding:15px;
  box-sizing:border-box;
  background:#fff;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  z-index: 99;
}
</style>
