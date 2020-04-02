<template>
  <div class="workSteps flex-row">
    <div
      class="flex-1 item"
      v-for="(item,index) in stepList"
      :key="'setpitem'+index"
      :class="stepClass(item,index)"
      @click="$emit('change', index)"
    >
      <div class="title" :title="item.name">
        <div class="el">{{item.name}}</div>
      </div>
      <div class="mark">
        <span class="text">{{item.no}}</span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steplist: {
      type: Array,
      required: true,
      default: function(){
        return []
      }
    },
    currentstep: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    stepList: function(){
      return this.steplist
    },
    currentStep: function(){
      return this.currentstep
    }
  },
  methods: {
    stepClass: function(item, index) {
      let result = {};
      result["status-" + item.status] = true;
      if (index === this.currentStep) {
        result.cur = true;
      } else if (this.currentStep > index) {
        result.ispass = true;
      }
      return result;
    }
  }
};
</script>

<style scoped>
/* 步骤 */
.workSteps {
  padding: 20px 0 30px;
}
.workSteps .item {
  position: relative;
  text-align: center;
  cursor: pointer;
  
}
.workSteps .item::before,
.workSteps .item::after {
  content: "";
  position: absolute;
  bottom: 50%;
  margin-bottom: -22px;
  width:50%;
  border-top: 4px dashed #cad1d7;
  z-index: 1;
}
.workSteps .item::before {
  right: 0;
}
.workSteps .item::after {
  left: 0;
}
.workSteps .item:first-child:after {
  display: none;
}
.workSteps .item:last-child:before {
  display: none;
}

.workSteps .mark {
  position: relative;
  width: 56px;
  height: 56px;
  margin: 10px auto;
  overflow: hidden;
  line-height: 56px;
  color: #898989;
  background:#fff;
  z-index: 2;
}
.workSteps .mark::before {
  content: "";
  position: absolute;
  left: 14px;
  top: 14px;
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
}
.workSteps .mark::after {
  content: "";
  position: absolute;
  left: 8px;
  top: 8px;
  width: 34px;
  height: 34px;
  border: 3px solid #cad1d7;
  border-radius: 50%;
}
.workSteps .mark .text {
  position: relative;
  font-weight: 700;
  color: #999;
  z-index: 3;
}
.workSteps .title {
  position: relative;
  display: inline-block;
  color: #a3a1a1;
  height: 34px;
  line-height: 34px;
  padding:0 8px;
  max-width: 99%;
}
/* 鼠标悬浮 */
.workSteps .item:hover .title,
.workSteps .cur .title,
.workSteps .ispass .title {
  color: #208fff;
}
/* 过往 */
.workSteps .ispass::before, .workSteps .ispass::after, .workSteps .cur::after {
  border-style:solid;
  border-color: #208fff;
  border-width: 2px;
}

.workSteps .cur .mark .text,
.workSteps .ispass .mark .text {
  color: #fff;
}

.workSteps .cur .mark::before,
.workSteps .ispass .mark::before {
  background: #208fff;
}
.workSteps .cur .mark::after,
.workSteps .ispass .mark::after {
  border-color: #208fff;
}
.workSteps .cur .mark {
  border-color: #f5f5f5;
}

.workSteps .status-4.cur .text {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  color: #208fff;
  background: #208fff;
  border-radius: 1em;
  overflow: hidden;
  vertical-align: middle;
}
/* 当前 */
.workSteps .status-2 .mark {
  border-color:#ff6c00;
}
.workSteps .status-2 .mark .text{
  color:#fff;
}
.workSteps .status-2 .mark::before{
  background:#ff6c00;
}
.workSteps .status-2 .mark::after {
  border-color:#ff6c00;
}
.workSteps .status-2 .title, .workSteps .status-2:hover .title{
  color:#ff6c00;
}
.workSteps .status-2 .title::before {
  content: "";
  position: absolute;
  left: 0;
  top:0;
  right:0;
  bottom:0;
  border: 2px solid #ff6c00;
  border-radius: 4px;
  z-index: 1;
}
.workSteps .status-2 .title::after{
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  bottom: -5px;
  left:50%;
  margin-left:-5px;
  border-right: 2px solid #ff6c00;
  border-bottom: 2px solid #ff6c00;
  transform: rotate(45deg);
  background:#fff;
  z-index: 2;
}
</style>
