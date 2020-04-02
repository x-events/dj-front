<template>
  <div v-loading="loading">
    <el-dialog :visible="visible"
      title="任务指派"
      :append-to-body="true"
      width="1000px"
      :before-close="handleClose"
      @open="handleOpen">
      
      <el-form ref="validForm" :model="queryParam" label-width="120px" :rules="rules">
        <el-alert
          :title="alertTitle"
          :closable="false"
          type="info">
        </el-alert>
        
        <el-form-item label="指派人员" prop="assigned_uid" class="tagWrap">
          <el-button size="small" @click="pickerDialog=true">请选择</el-button>
          <el-tag
            v-for="(tag,index) in user_list"
            :key="'tag'+tag.uid"
            closable
            type="info"
            @close="user_list.splice(index,1)">
            {{tag.name}}
          </el-tag>
        </el-form-item>
        <!-- <el-form-item label="期望完成时间">
            <el-date-picker v-model="currentData" 
              type="date" 
              placeholder="选择日期"></el-date-picker>
          </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </span>

    </el-dialog>
    
    <!-- 选党员 -->
    <member-picker :visible="pickerDialog" :currentSelection="user_list" @close="pickerDialog=false" @choosen="setPeople" />
  </div>
</template>

<script>
import * as work from "@/api/work.js";

export default {
  components: {
    'member-picker': (resolve) => require(['@/components/memberPicker'], resolve)
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    process_step_log_id: {
      type: String,
      required: false
    },
    filters: {
      type: Array,
      required: false,
      default: function(){
        return []
      }
    },
    current_step_data: {
      type: Object,
      required: true,
      default: function(){
        return {
          name: '--',
          no: '?'
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      pickerDialog: false,
      queryParam: {
        process_step_log_id: '',
        assigned_uid: [],
        hope_at: ''
      },
      user_list: [],
      rules: {
          assigned_uid: [
            { type: 'array', required: true, message: '请选择指派人', trigger: 'blur' }
          ]
      },
      currentData: null
    }
  },
  computed: {
    alertTitle: function(){
      return `指派：第${this.current_step_data.no}步 ${this.current_step_data.name}`
    }
  },
  watch: {
    user_list: function(user_list){
      this.queryParam.assigned_uid = user_list.map(e => e.uid)
      this.$nextTick(() => {
        this.$refs.validForm.validateField('assigned_uid');
      })
    },
    currentData: function(currentData){
      if(currentData){
        this.queryParam.hope_at = Math.floor(currentData.getTime() / 1000)
      }
    }
  },
  methods: {
    setPeople:function($event){
      let result = $event.filter(u => {
        return this.filters.findIndex(e => e.uid===u.uid)===-1
      })
      if(result.length){
        if(result.length!==$event.length){
          this.$message.warning('已过滤重复的负责人/协作者');
        }
      }else{
        return this.$message.warning('人员设置冲突，请重新选择');
      }
      
      this.user_list=result
    },
    handleOpen: function(){
      this.user_list = []
      this.queryParam.process_step_log_id = this.process_step_log_id
      setTimeout(() => {
        if (this.$refs.validForm) {
          this.$refs.validForm.clearValidate();
        }
      }, 300);
    },
    handleClose: function(){
      this.$emit('close')
    },
    send: function(){
      this.$refs.validForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          work.actAssignMember(this.queryParam).then(res => {
            this.loading = false;
            this.handleClose()
          })
        } else {
          return false;
        }
      });
      
    }
  }
};
</script>

<style scoped>
.tagWrap .el-tag{margin-left:10px;}

</style>
