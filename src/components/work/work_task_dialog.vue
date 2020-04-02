<template>
  <el-dialog
    class="comDialog"
    :title="category_name"
    :append-to-body="true"
    :visible="visible"
    width="1200px"
    @open="fetchData()"
    @close="$emit('close')"
  >
    <div class="workDetail" v-loading="loading">
      <step-bar
        v-if="stepList.length"
        :steplist="stepList"
        :currentstep="currentStep || 0"
        @change="currentStep=$event"
      />

      <el-form label-width="200" style="margin-right:100px;">
        <template v-if="currentStep===null">
          <!-- 动态表单 -->
          <dynamic-component
            v-for="(item,index) in setpFormCache"
            :key="'form'+index"
            :components="item.component"
            :disabled="true"
          />
        </template>
        <template v-else-if="setpFormCache[currentStep] && setpFormCache[currentStep].form">
          <!-- 动态表单 -->
          <dynamic-component
            v-for="(item,index) in setpFormCache[currentStep].form"
            :key="'form'+index"
            :components="item.component"
            :disabled="true"
          />
        </template>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import * as work from "@/api/work.js";
import dynamicComponent from "@/components/work/dynamicComponent";
import stepBar from "@/components/work/stepBar";

export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false
    },
    category_name: {
      type: String,
      required: true
    },
    form_category_id: {
      type: String,
      required: true
    },
    record_id: {
      type: String,
      required: true
    },
    process_log_id: {
      type: String,
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
      currentStep: null,
      setpFormCache: [],
      stepList: [],
      queryParam: {
        process_log_id: "",
        process_step_log_id: ""
      }
    };
  },
  watch: {
    currentStep: function() {
      if (this.stepList[this.currentStep]) {
        this.queryParam.process_step_log_id = this.stepList[
          this.currentStep
        ].process_step_log_id;
        this.fetchForm();
      }
    }
  },
  methods: {
    fetchStep: function() {
      this.loading = true;
      work.processStep({ process_log_id: this.process_log_id }).then(res => {
        this.loading = false;
        this.stepList = res.data.data.list;

        let showCurrentStep = this.stepList.findIndex(e => {
          return e.status == "2";
        });
        console.log(showCurrentStep);
        this.currentStep = showCurrentStep === -1 ? 0 : showCurrentStep;
      });
    },
    fetchForm: function() {
      this.loading = true;
      let process_step_log_id = this.queryParam.process_step_log_id;
      work.stepForm({ process_step_log_id }).then(res => {
        this.loading = false;
        this.$set(this.setpFormCache, this.currentStep, res.data.data);
      });
    },
    fetchData: function() {
      if (this.record_id && this.form_category_id) {
        this.loading = true;
        work
          .form_record({
            form_category_id: this.form_category_id,
            record_id: this.record_id
          })
          .then(res => {
            this.loading = false;
            this.currentStep = null;
            this.setpFormCache = res.data.data;
          });
      } else if(this.process_log_id){
        this.fetchStep();
      }else{
        console.warn('参数错误')
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.comDialog >>> .el-dialog__header { padding-right:50px;}
</style>
