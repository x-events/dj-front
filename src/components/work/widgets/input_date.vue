<template>
  <div class="el-form-item"
    :class="{'is-required': requiredvalue}">
    <div class="el-form-item__label" :style="{width: labelwidth+'px'}">{{labelname}}</div>
    <div class="el-form-item__content" :style="{marginLeft: labelwidth+'px'}">
      <template v-if="disabled">
        {{input && dateFormat(input)}}
      </template>
      <template v-else>
        <el-date-picker 
          v-model="input" 
          :placeholder="placeholder || ('请选择'+labelname)"
          type="date" 
          @change="handleChange" 
          ></el-date-picker>
      </template>
    </div>
  </div>
</template>

<script>
import * as util from "@/assets/util";

export default {
  props: {
    labelname: {
      type: String,
      required: true,
      default: "请输入"
    },
    labelwidth: {
      type: Number,
      required: false,
      default: 80
    },
    propvalue: {
      type: [String, Number],
      required: false,
      default: function() {
        /*
        "timestamp"
        */
        return "";
      }
    },
    propdata: {
      type: Array,
      required: false,
      default: function(){
        return []
      }
    },
    requiredvalue: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      input: ""
    };
  },
  watch: {
    propvalue: function(propvalue){
      this.input = (propvalue!=0) ? new Date(parseInt(this.propvalue) * 1000) : '';
    }
  },
  methods: {
    dateFormat: util.dateFormat,
    handleChange: function(value) {
      if (value && value.getTime()) {
        let time = Math.floor(value.getTime() / 1000);
        this.$emit("change", time);
      }else{
        this.$emit("change", '');
      }
    }
  },
  created: function() {
    if (this.propvalue) {
      this.input = (this.propvalue!=0) ? new Date(parseInt(this.propvalue) * 1000) : '';
    }
    // 重置事件
    util.on('resetWidgets', () => {
      this.input = ''
    })
  }
};
</script>

<style scoped>
</style>
