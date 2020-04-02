<template>
  <div class="workDetail" v-loading="loading || submitloading">
    <el-form label-width="180px" style="margin-right:100px;">
      <!-- tab -->
      <div class="hd_tabs" v-if="process_sub.length">
        <el-button-group>
          <el-button
            v-for="(item,index) in process_sub"
            :key="'tab'+index"
            :type="currentTab===index ? 'primary' : ''"
            @click="currentTab=index"
          >{{item.name}}</el-button>
        </el-button-group>
      </div>
      <!-- form -->
      <template v-if="!loading && setpFormCache[currentTab]">
        <dynamic-component
          v-for="(item,index) in setpFormCache[currentTab]"
          :key="'form'+index"
          :components="item.component"
          :iscreated="true"
          @change="handleChange(index, $event.ci, $event.value)"
          @validSuccess="delete extendValid[$event]"
          @validFail="extendValid[$event] = true"
        />
      </template>
    </el-form>
    <!-- 操作 -->
    <div class="fixed_ext">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="save(true)">保存</el-button>
    </div>
  </div>
</template>

<script>
import * as work from "@/api/work.js";
import stepBar from "@/components/work/stepBar";
import dynamicComponent from "@/components/work/dynamicComponent";

export default {
  props: {
    form_category_id: {
      type: Number,
      required: true
    },
    process_sub: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    },
    processSubIndex: { //默认tab序号
      type: [Number, String],
      required: false,
      default: 0
    }
  },
  components: {
    dynamicComponent
  },
  data() {
    return {
      loading: false,
      submitloading: false,
      queryParam: {
        record_id: "",
        form: []
      },
      stepList: [],
      setpFormCache: [],
      extendValid: {},
      currentTab: 0
    };
  },
  watch: {
    process_sub: function() {
      if (this.loading) {
        return null;
      }
      if (this.process_sub.length) {
        this.fetchForm(this.process_sub[this.currentTab].id);
      }
    },
    form_category_id: function() {
      if (this.loading) {
        return null;
      }
      if (this.form_category_id) {
        this.fetchForm(this.form_category_id);
      }
    },
    currentTab: function() {
      this.fetchForm(this.process_sub[this.currentTab].id);
      this.$emit('change', this.currentTab)
    },
    processSubIndex: {
      handler: function(){
        this.currentTab = isNaN(parseInt(this.processSubIndex)) ? 0 : parseInt(this.processSubIndex)
      },
      immediate: true
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
    save(actBack) {
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
      let needLables = [];
      this.queryParam.form.forEach(form => {
        form.component.forEach(comp => {
          if (comp.required === "1" && noValue(comp.value)) {
            needLables.push(comp.name);
          }
        });
      });
      if (needLables.length) {
        return this.$message.warning("请填写：" + needLables.join("、"));
      }
      //扩展验证
      const extendValidKeys = Object.keys(this.extendValid);
      if (extendValidKeys.length) {
        switch (extendValidKeys[0]) {
          case "memberPercent":
            return this.$message.warning("应到会党员比例不足80%");
            break;
          case "unitNameEmpty":
            return this.$message.warning("请选择或输入单位");
            break;
          default:
            console.warn("扩展验证异常", extendValidKeys);
        }
      }
      this.submitloading = true;
      //保存类型
      let param = Object.assign({}, this.queryParam);

      work
        .createTask(param)
        .then(res => {
          this.submitloading = false;
          // 提交/保存后操作
          if(res.data.status==200){
            if (actBack) {
              this.$emit("callback");
            } else {
              this.$message(res.data.statusCode);
              this.fetchForm();
            }
          }
        })
        .catch(() => {
          this.submitloading = false;
        });
    },
    fetchForm: function(form_category_id) {
      this.loading = true;
      work.form_record({ form_category_id }).then(res => {
        this.loading = false;
        this.$set(this.setpFormCache, this.currentTab, res.data.data);
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
  mounted() {
    if (this.process_sub.length) {
      this.fetchForm(this.process_sub[this.currentTab].id);
    } else if (this.form_category_id) {
      this.fetchForm(this.form_category_id);
    }
  }
};
</script>

<style scoped>
.workDetail {
  padding-bottom: 70px;
}
.hd_tabs {
  margin-bottom: 20px;
}

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
</style>
