<template>
  <div class="flex-col worklist">
    <work-channel-bar/>
    <breadcrumb
      :showname="$route.query.name"
    />

    <div class="flex-1 flex-row fullWrap workDetail fix">
      <div class="sideWrap">
        <ul class="sideFloat">
          <li @click="scrollTo('target1')">
            <i class="ion">&#xe77a;</i>
            <div>表单</div>
          </li>
          <li @click="scrollTo('target2')">
            <i class="ion">&#xe623;</i>
            <div>上级指导</div>
          </li>
          <li @click="scrollTo('target3')">
            <i class="ion">&#xe624;</i>
            <div>评价区</div>
          </li>
        </ul>
      </div>
      <div class="flex-1 scrollbar" id="mainScroll" style="margin-bottom:70px" v-loading="loading">
        <div class="boxBlock" id="target1">
          <div class="_hd flex-row align-center">
            <div class="flex-1">
              <div class="_title ">
                <i class="ion">&#xe77a;</i>
                <strong>{{paramDecode($route.query.category_name)}}</strong>
              </div>
            </div>
            <el-button type="primary" size="medium" @click="guideVisible=true"><i class="ion">&#xe767;</i> 工作指引</el-button>
          </div>

          <el-form label-width="200" style="margin-right:120px;">
            <template v-if="setpFormCache[currentStep]">
              <!-- 动态表单 -->
              <dynamic-component v-for="(item,index) in setpFormCache" :key="'form'+index"
                :components="item.component"
                :disabled="disabledStatus"
                @change="handleChange(index, $event.ci, $event.value)"
                @validSuccess="delete extendValid[$event]"
                @validFail="extendValid[$event] = true"
              />
              
            </template>
          </el-form>
        </div>
        <div class="boxBlock" id="target2">
          <div class="_hd flex-row align-center">
            <div class="flex-1">
              <div class="_title ">
                <i class="ion">&#xe623;</i>
                <strong>上级指导</strong>
              </div>
            </div>
          </div>
          <!-- 上级指导 -->
          <work-comment 
            :id="$route.query.id"
            :form_category_id="$route.query.form_category_id"
            :record_id="$route.query.record_id"
          />
        </div>
        <div class="boxBlock" id="target3">
          <div class="_hd flex-row align-center">
            <div class="flex-1">
              <div class="_title " >
                <i class="ion">&#xe624;</i>
                <strong>日常评价</strong>
              </div>
            </div>
          </div>
          <!-- 评论 -->
          <work-rate :id="$route.query.id" :form_category_id="$route.query.form_category_id" :record_id="$route.query.record_id" />
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="fixed_ext">
      <el-button size="middle" @click="$router.go(-1)">返回</el-button>
      <template v-if="setpFormCache[currentStep]">
        
        <template v-if="setpFormCache[currentStep].can_review==1">
          <el-button
            size="middle"
            type="primary"
            @click="audit(2)"
          >驳回</el-button>
          <el-button
            size="middle"
            type="primary"
            @click="audit(1)"
          >通过</el-button>
        </template>
        <template v-if="disabledStatus">
          
          <el-button v-if="setpFormCache[currentStep].can_save==1"
            size="middle"
            type="primary"
            @click="disabledStatus=false"
          >编辑</el-button>
        </template>
        <template v-else>
          <el-button v-if="setpFormCache[currentStep].can_save==1"
            size="middle"
            type="primary"
            @click="save()"
          >保存</el-button>
        </template>
        
      </template>
    </div>
    <!-- 工作指引弹窗 -->
    <guide :visible="guideVisible" :id="$route.query.form_category_id" :name="paramDecode($route.query.category_name || $route.query.work_name)" @close="guideVisible=false" />
  </div>
</template>

<script>
import * as util from "@/assets/util";

import * as work from "@/api/work.js";
import workChannelBar from "@/components/work/workChannelBar";
import breadcrumb from "@/components/breadcrumb";
import dynamicComponent from "@/components/work/dynamicComponent"
import workComment from "@/components/work/workComment"
import workRate from "@/components/work/workRate"
import guide from "@/components/work/work_guide";

export default {
  components: {
    workChannelBar,
    breadcrumb,
    dynamicComponent,
    workComment,
    workRate,
    guide
  },
  data() {
    return {
      loading: false,
      guideVisible: false,
      queryParam: {
        form_category_id: "",
        record_id: "",
        form: []
      },
      currentStep: 0,
      setpFormCache: [],
      instruction: [{
        org: 'org',
        name: 'name',
        title: 'title',
        time: 'time',
        cont: 'cont'
      }],
      extendValid: {},
      disabledStatus: true
    };
  },
  methods: {
    audit(status){
        this.$confirm('确认操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            work.honoraudit({id: this.$route.query.id,status:status}).then(res => {
              this.fetchForm();
                this.$message({
                    type: 'success',
                    message: res.data.statusCode
                });
            })
        })
    },
    scrollTo: function(id){
      let mainScroll = document.getElementById('mainScroll');
      if(id==='target1'){
        mainScroll.scrollTop = 0
      }else if(id==='target2'){
        const target2 = document.getElementById('target2');
        if(target2){
          
          let st = target2.getClientRects()[0].top;
          
          mainScroll.scrollTop =  mainScroll.scrollTop - (200 - st)
          
        }
      }else{
        mainScroll.scrollTop = 999
      }
    },
    paramDecode: util.paramDecode,
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
    save(actBack, type) {
      // 验证
      let needLables = [];
      this.queryParam.form.forEach(form => {
        form.component.forEach(comp => {
          if (comp.required === "1" && (!comp.value || (Array.isArray(comp.value) && !comp.value.length))) {
            needLables.push(comp.name);
          }
        });
      });
      if (type === 1 && needLables.length) {
        return this.$message.warning("请填写：" + needLables.join("、"));
      }
      //扩展验证
      const extendValidKeys = Object.keys(this.extendValid);
      if(extendValidKeys.length){
        switch(extendValidKeys[0]){
          case "memberPercent":
            return this.$message.warning("应到会党员比例不足80%");
          break;
          case "unitNameEmpty":
            return this.$message.warning("请选择或输入单位");
          break;
          default: 
            console.warn('扩展验证异常',extendValidKeys)
        }
      }

      this.loading = true;
      //保存类型
      let param = Object.assign({ type }, this.queryParam);

      work
        .createTask(param)
        .then(res => {
          this.loading = false;
          // 提交/保存后操作
          this.$router.go(-1);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    fetchForm: function(reload) {
      if (reload) {
        return window.location.reload();
      }
      this.loading = true;

      work.form_record(this.queryParam).then(res => {
        this.loading = false;
        this.setpFormCache = res.data.data;
        this.queryParam.form = res.data.data.map(f => {
          return {
            id: f.id,
            component: f.component.map(c => {
              return {
                id: c.id,
                value: c.value,
                relation_id: c.relation_id
              };
            })
          };
        });
  
      });
    }
  },
  created() {
    if (this.$route.query.form_category_id && this.$route.query.record_id) {
      this.queryParam.form_category_id = this.$route.query.form_category_id;
      this.queryParam.record_id = this.$route.query.record_id;
      this.fetchForm();
    }else{
      console.warn('参数异常')
    }
  }
};
</script>

<style scoped>
.fixed_ext {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.sideWrap{width:64px;margin-right:20px;}
.sideFloat{box-shadow: 2px 2px 4px rgba(0,0,0,.1);border-radius: 6px;overflow: hidden;}
.sideFloat li{text-align: center;color:#7f8a93;background:#fff;margin-bottom: 2px; padding:6px 0;cursor: pointer;}
.sideFloat li .ion{font-size:1.5em;}
.sideFloat li:last-child{margin-bottom: 0;}
.sideFloat li:hover{color:#0571d3;}

.boxBlock{border-radius: 6px;background:#fff;margin-bottom:12px;box-shadow: 2px 2px 4px rgba(0,0,0,.1);}

.boxBlock ._hd{
  position: relative;
  border-bottom:1px solid #dce2e7;
  overflow: hidden;
  margin-bottom: 25px;
  padding-right:20px;
}
.boxBlock ._hd ._title{
  float: left;
  position: relative;
  padding: 1em .5em .5em 1em;
  font-weight: bold;
  font-size: 16px;
  color:#046bce;
}
.boxBlock ._hd ._title:after{
  content:"";
  position: absolute;
  left: 0;
  bottom:0;
  width:100%;
  border-bottom: 3px solid #046bce;
}

</style>
