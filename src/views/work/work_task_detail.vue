<template>
  <div class="flex-col worklist">
    <work-channel-bar/>
    <breadcrumb/>

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
      <div class="flex-1 scrollbar" id="mainScroll" style="margin-bottom:70px" v-loading="loading || submitloading">
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

          <step-bar
            :steplist="stepList"
            :currentstep="currentStep || 0"
            @change="currentStep=$event"
          />

          <el-form label-width="200" style="margin-right:120px;">
            <template v-if="!loading && setpFormCache[currentStep]">
              <!-- 模板文件 -->
              <template v-if="Array.isArray(setpFormCache[currentStep].files)">
                <div v-for="(file, fi) in setpFormCache[currentStep].files" :key="'file'+fi"
                  class="el-form-item">
                  <div class="el-form-item__label" :style="{width: '200px'}">{{file.label}}</div>
                  <div class="el-form-item__content" :style="{marginLeft: '200px'}">
                    <el-button type="text" @click="weboffice(file)">{{file.name}}</el-button>
                  </div>
                </div>
               
              </template>
              <!-- 党员名册 -->
              <template v-if="setpFormCache[currentStep].party_member_list">
                <div class="memberPickerList">
                  <!-- head -->
                  <div class="memberPickerList_hd">
                    <div class="_title">
                      新增党员名册
                    </div>
                    <el-row>
                      <el-col :span="6">
                        党员数量：{{setpFormCache[currentStep].party_member_list.count}}
                      </el-col>
                      <el-col :span="6">
                        新增党员：{{setpFormCache[currentStep].party_member_list.add_count}}
                      </el-col>
                      <el-col :span="6">
                        转入党员：{{setpFormCache[currentStep].party_member_list.transfer_count}}
                      </el-col>

                    </el-row>
                  </div>
                  <!-- list -->
                  <el-table
                    :data="setpFormCache[currentStep].party_member_list.list"
                    style="width: 100%">
                    <el-table-column
                      label="姓名">
                      <template slot-scope="scope">
                        {{scope.row.realname || scope.row.name}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="性别"
                      width="180">
                      <template slot-scope="scope">
                        {{scope.row.sex=='0' ? '男' : '女'}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="card"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="birth"
                      label="出生日期">
                      <template slot-scope="scope">
                        {{dateFormat(scope.row.birth, true)}}
                      </template>
                    </el-table-column>
                  </el-table>
                  
                </div>
              </template>
              <!-- 动态表单 -->
              <dynamic-component v-for="(item,index) in setpFormCache[currentStep].form" :key="'form'+index"
                :components="item.component"
                :disabled="!setpFormCache[currentStep] || !setpFormCache[currentStep].button.length"
                @change="handleChange(index, $event.ci, $event.value)"
                @validSuccess="delete extendValid[$event]"
                @validFail="extendValid[$event] = true"
              />
              <!-- 指派者记录 -->
              <template
                v-if="setpFormCache[currentStep].assigned && setpFormCache[currentStep].assigned.length"
              >
                <hr>
                <div
                  v-for="(actor,index) in setpFormCache[currentStep].assigned"
                  :key="'actor'+ index"
                >
                  <el-alert :title="'被指派者：'+actor.username" type="info" :closable="false"></el-alert>

                  <el-form
                    label-width="200"
                    v-for="(form,index) in actor.form"
                    :key="'actorform'+index"
                  >
                    <component
                      v-for="(comp, ci) in form.component"
                      :key="'actorformcomp'+ci"
                      :is="'widget'+comp.type"
                      :labelname="comp.name"
                      :labelwidth="200"
                      :propvalue="comp.value"
                      :propdata="comp.data"
                      :disabled="true"
                    ></component>
                  </el-form>
                </div>
              </template>
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
          <work-comment v-if="setpFormCache[currentStep]"
            :id="$route.query.id"
            :form_category_id="$route.query.form_category_id"
            :record_id="$route.query.record_id || ''"
            :process_step_log_id="queryParam.process_step_log_id"
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
          <work-rate :id="$route.query.id" :form_category_id="$route.query.form_category_id" :record_id="$route.query.record_id || ''" />
        </div>
      </div>
    </div>
    <!-- 添加协作者 -->
    <add-actor
      :visible="addActorVisible"
      :process_step_log_id="queryParam.process_step_log_id"
      :filters="setpFormCache[currentStep] && setpFormCache[currentStep].members"
      :current_step_data="stepList[currentStep]"
      @close="addActorVisible=false"
    />
    <!-- 任务指派 -->
    <act-assign-member
      :visible="assignMemberVisible"
      :process_step_log_id="queryParam.process_step_log_id"
      :filters="setpFormCache[currentStep] && setpFormCache[currentStep].members"
      :current_step_data="stepList[currentStep]"
      @close="assignMemberVisible=false;fetchForm('reload')"
    />
    <!-- 转交下一步 -->
    <act-deliver
      :visible="deliverVisible"
      :process_step_log_id="queryParam.process_step_log_id"
      :delivers_step="deliverStep"
      @close="deliverVisible=false;"
    />

    <!-- 操作按钮 -->
    <div class="fixed_ext">
      <el-button size="middle" @click="$router.go(-1)">返回</el-button>
      <template  v-if="setpFormCache[currentStep] && setpFormCache[currentStep].button.length">
        <el-button
          v-for="(item,index) in setpFormCache[currentStep].button"
          :key="'btn'+index"
          size="middle"
          :type="btnType(item)"
          @click="handleAction(item)"
        >{{item.name}}</el-button>
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
import stepBar from "@/components/work/stepBar";
import breadcrumb from "@/components/breadcrumb";
import dynamicComponent from "@/components/work/dynamicComponent"
import workComment from "@/components/work/workComment"
import workRate from "@/components/work/workRate"
import guide from "@/components/work/work_guide";
//loading
export default {
  components: {
    workChannelBar,
    stepBar,
    breadcrumb,
    dynamicComponent,
    workComment,
    workRate,
    "add-actor": resolve => require(["@/components/work/addActor"], resolve),
    "act-assign-member": resolve =>
      require(["@/components/work/actAssignMember"], resolve),
    "act-deliver": resolve => require(["@/components/work/deliver"], resolve),
    guide
  },
  data() {
    return {
      loading: false,
      submitloading: false,
      addActorVisible: false,
      assignMemberVisible: false,
      deliverVisible: false,
      guideVisible: false,
      queryParam: {
        process_log_id: "",
        process_step_log_id: "",
        form: []
      },
      stepList: [],
      setpFormCache: [],
      currentStep: null,
      current_step_index: 0,
      instructionInput: '',
      instruction: [{
        org: 'org',
        name: 'name',
        title: 'title',
        time: 'time',
        cont: 'cont'
      }],
      extendValid: {}
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
  computed: {
    deliverStep: function() {
      if(this.stepList[this.currentStep]){
        return this.stepList.filter(e => {
          return (
            e.status != "1" &&
            e.process_step_log_id !==
              this.stepList[this.currentStep].process_step_log_id
          );
        });
      }
      
    },
    subMenu: function() {
      let menu = this.$router.options.routes[0]
        ? this.$router.options.routes[0].children
        : [];
      menu = menu.filter(e => {
        return e.name === "工作记实";
      })[0];

      return menu ? menu.children : [];
    }
  },
  methods: {
    dateFormat: util.dateFormat,
    weboffice: util.weboffice,
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
    btnType: function(btn) {
      // if (
      //   btn.type === "back" ||
      //   btn.type === "backStep" ||
      //   btn.type === "stop"
      // ) {
      //   return "danger";
      // } else if (
      //   btn.type === "addActor" ||
      //   btn.type === "assignMember" ||
      //   btn.type === "deliver"
      // ) {
      //   return "success";
      // } else if (btn.type === "submitStep" || btn.type === "submit") {
      //   return "primary";
      // } else {
      //   return "primary";
      // }
      return "primary";
    },
    handleAction: function(btn) {
      // 确认表单
      this.submitloading = true;
      work
        .confirmNext({
          process_log_id: this.queryParam.process_log_id,
          process_step_log_id: this.queryParam.process_step_log_id,
          type: btn.type
        })
        .then(res => {
          this.submitloading = false;
          if (Array.isArray(res.data.data) && res.data.data.length) {
            let isStop = false;

            let tipHtml = "";
            res.data.data.forEach(e => {
              tipHtml += `<h4>${e.message}</h4>`;
              tipHtml += `<div style="color:red">`;
              tipHtml += e.list.map(e => e.name).join("、");
              tipHtml += `</div>`;
              if (e.type === "stop") {
                isStop = true;
              }
            });
            // 需要阻止继续操作的类型
            if (isStop) {
              this.$alert(tipHtml, "提示", {
                confirmButtonText: "确定",
                dangerouslyUseHTMLString: true
              }).then(() => {
                return new Promise(resolve => resolve(false));
              });
            } else {
              return this.$confirm(tipHtml, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                dangerouslyUseHTMLString: true
              })
                .then(() => {
                  return new Promise(resolve => resolve(true));
                })
                .catch(() => {
                  return new Promise(resolve => resolve(false));
                });
            }
          } else {
            return new Promise(resolve => resolve(true));
          }
        })
        .then(res => {
          if (!res) {
            return null;
          }
          switch (btn.type) {
            // 流程中止
            case "back":
              this.$confirm("确定操作?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                this.loading = true;
                work
                  .actDone({ process_log_id: this.queryParam.process_log_id })
                  .then(() => {
                    this.loading = false;
                    this.$router.go(-1);
                  })
                  .catch(() => {
                    this.loading = false;
                  });
              });
              break;
            //驳回
            case "backStep":
              this.$confirm("确定操作?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                this.loading = true;
                work
                  .actBack({
                    process_step_log_id: this.queryParam.process_step_log_id
                  })
                  .then(() => {
                    this.loading = false;
                    this.$router.go(-1);
                  })
                  .catch(() => {
                    this.loading = false;
                  });
              });
              break;
            //流程完结
            case "stop":
              this.$confirm("确定操作?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                this.loading = true;
                work
                  .stopProcess({
                    process_log_id: this.queryParam.process_log_id,
                    process_step_log_id: this.queryParam.process_step_log_id
                  })
                  .then(() => {
                    this.loading = false;
                    this.$router.go(-1);
                  })
                  .catch(() => {
                    this.loading = false;
                  });
              });
              break;
            //增加协作者
            case "addActor":
              this.addActorVisible = true;
              break;
            //任务指派
            case "assignMember":
              this.assignMemberVisible = true;
              break;
            //转交下一步
            case "deliver":
              this.deliverVisible = true;
              break;
            //保存
            case "submit":
              this.save(false, 0);
              break;
            //提交
            case "submitStep":
              this.save(true, true);
              break;
            //被指派人提交
            case "submitAssigned":
              this.save(true, 0);
              break;
            default:
              console.warn(btn);
          }
        });
    },
    save(act, check) {
      console.log(act, check)
      // 验证
      let needLables = [];
      this.queryParam.form.forEach(form => {
        form.component.forEach(comp => {
          if (comp.required === "1" && !comp.value) {
            needLables.push(comp.name);
          }
        });
      });
      if (check && needLables.length) {
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

      this.submitloading = true;
      //保存类型
      let param = Object.assign({}, this.queryParam);

      work
        .saveTask(param)
        .then(res => {
          this.submitloading = false;
          // 后续操作
          if (act) {
            this.$router.go(-1)
          } else {
            this.$message(res.data.statusCode);
            this.fetchStep(true);
          }
        })
        .catch(() => {
          this.submitloading = false;
        });
    },
    fetchStep: function(reload) {
      if(reload){
        this.currentStep = null
      }
      this.loading = true;
      work
        .processStep({ process_log_id: this.queryParam.process_log_id })
        .then(res => {
          this.loading = false;
          this.stepList = res.data.data.list;

          let showCurrentStep = this.stepList.findIndex(e => {
            return e.status=='2';
          });
          console.log(showCurrentStep);
          this.currentStep = showCurrentStep === -1 ? 0 : showCurrentStep;
        });
    },
    fetchForm: function(reload) {
      if (reload) {
        return window.location.reload();
      }
      this.loading = true;
      let process_step_log_id = this.queryParam.process_step_log_id;
      work.stepForm({ process_step_log_id }).then(res => {
        this.loading = false;
        this.$set(this.setpFormCache, this.currentStep, res.data.data);
        this.queryParam.form = res.data.data.form.map(f => {
          return {
            id: f.id,
            relation_id: f.relation_id,
            component: f.component.map(c => {
              return {
                id: c.id,
                value: c.value,
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
    if (this.$route.query.id) {
      this.queryParam.process_log_id = this.$route.query.id;
      this.fetchStep();
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

/* 领导批示 */
.instruction{padding:25px;}
.instruction ._list{margin-bottom: 20px;}
.instruction ._list li{position: relative; margin-bottom: 15px;background:#fafdff;padding:10px 30px;}
.instruction ._list ._tag{color:#898989;margin:0 1em;}
.instruction ._list ._cont{margin-top:10px;}
.instruction ._list ._note{position: absolute;right:20px;top: 10px;}

.instruction ._input{border: 1px solid #dcdfe6;border-radius: 4px;}
.instruction ._input ._action{text-align: right;padding:10px;}
/* 党员名册 */
.memberPickerList{padding-left: 120px;margin:25px 0;}
.memberPickerList_hd{ border: 1px solid rgba(222,227,232,1); border-radius: 6px;margin-bottom:15px;}
.memberPickerList_hd ._title{text-align: center;font-size:16px;height: 3em; line-height: 3em;background: linear-gradient(0deg,rgba(255,255,255,1),rgba(232,236,246,1));
border-bottom: 1px solid rgba(222,227,232,1); }
.memberPickerList_hd ._tr{text-align: right;}
.memberPickerList_hd .el-col{padding: 10px;}


</style>