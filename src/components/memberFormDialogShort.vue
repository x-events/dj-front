<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      title="人员信息"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <input-date
          labelname="出生日期"
          :labelwidth="200"
          :propvalue="form.birth"
          :requiredvalue="true"
          @change="handleWidgetChange('birth', $event)"
        />

        <el-form-item label="是否党员">
          <el-switch
            v-model="form.isMember"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>

        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-circle-check-outline" type="primary" @click="submit">确 定</el-button>
        <el-button icon="el-icon-circle-close-outline" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import * as util from "@/assets/util";

import input_date from "@/components/work/widgets/input_date";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    propdata: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  components: {
    "input-date": input_date
  },
  data() {
    
    return {
      treepickerDialog: false,
      treeType: '',
      treeTitle: '',
      loading: false,
      nationList: [],
      politicsList: [],
      xueliList: [],
      healthList: [],
      techangList: [],
      work_postList: [],
      new_socialList: [],
      hunyinStatusList: [],
      titlesList: [],
      yixianList: [],
      secendPartyList: [],
      partygatsList: [],
      partyremarkList: [],
      casOption: {
        value:'id', 
        label: 'value',
        disabled: 'status'
      },
      form: {
        name: "",
        sex: "",
        birth: "",
        isMember: '0'
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  watch: {
    propdata: {
      handler: function(propdata) {
        if (!propdata.uid || propdata.uid=='0') {
          const keys = Object.keys(propdata);
          //const isEdit = !!propdata.w_id;
          if(keys.length){
            keys.forEach(key => {
              let value = propdata[key];
              this.$set(this.form, key, value);
            });
          }else{
            this.form = {
              name: "",
              sex: "",
              birth: "",
              isMember: '0'
            }
          }
          
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    
    //自动填充组件数据
    handleWidgetChange: function(name, value) {
      this.$set(this.form, name, value || '');
    },
    submit: function() {
      //验证
      if (!this.form.birth) {
        return this.$message({
          message: "请填写出生日期",
          type: "warning"
        });
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let result = Object.assign({}, this.form);

          this.$emit("choosen", result);
          this.$nextTick(() => {
            this.handleClose();
          });
        } else {
          this.$message({
            message: "部分表单项未正确填写",
            type: "warning"
          });
        }
      });
    },
    reset: function() {
      const keys = Object.keys(this.form);
      keys.forEach(key => {
        this.$set(this.form, key, "");
      });
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    handleClose: function() {
      this.reset();
      this.$emit("close");
    }
  },
  created: function() {
    
  }
};
</script>

<style scoped>
</style>
