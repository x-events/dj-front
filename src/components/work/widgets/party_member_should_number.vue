<template>
  <div class="el-form-item"
    :class="{'is-required': requiredvalue}">
    <div class="el-form-item__label" :style="{width: labelwidth+'px'}">{{labelname}}</div>
    <div class="el-form-item__content" :style="{marginLeft: labelwidth+'px'}">
        <template v-if="disabled">
            {{input}}
        </template>
        <template v-else>
            <el-input :placeholder="input" :maxlength="127" type="number" v-model.number="input" readonly @change="$emit('change', input)" ></el-input>
        </template>
    </div>
  </div>
</template>

<script>
import * as work from "@/api/work.js";

export default {
  props: {
    labelname: {
      type: String,
      required: true,
      default: '请输入'
    },
    labelwidth: {
      type: Number,
      required: false,
      default: 80
    },
    propvalue: {
      type: Number,
      required: false,
      default: 0
    },
    propdata: {
      type: String,
      required: false
    },
    requiredvalue: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
      return {
        input: 0
      }
  },
  watch: {
    propvalue: function(propvalue){
      this.input = this.propvalue
    },
    input: function(){
      this.$emit('change', this.input)
    }
  },
  methods: {
    fetchData: function(){
      work.organization().then(res => {
        this.input = res.data.data.count ? parseInt(res.data.data.count) : this.input;
        this.$emit('change', this.input)
      })
    }
  },
  created: function(){
    this.input = this.propvalue
    this.fetchData()
  }
};
</script>

<style scoped>

</style>
