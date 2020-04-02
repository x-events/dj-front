<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      :title="`添加${title}`"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="form">
        
        <el-form-item label="">
          <el-input v-model="realnames" :placeholder="`请输入${title}名称`"></el-input>
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

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
        type: String,
        required: true,
        default:()=>{}
    },
    type: {
        type: String,
        default:()=> {
            return ''
        }
    }
  },
  data() {
    return {
      loading: false,
      realnames: ''
    };
  },
  methods: {
    submit: function() {
      //验证
      if(!this.realnames){
        return this.$message({
            message: '请填写名称',
            type: 'warning'
          });
      }
      this.$emit("choosen", this.realnames, this.type);
      this.handleClose();
    },
    handleClose: function() {
      this.realnames = ''
      this.$emit("close");
    }
  }
};
</script>

<style scoped>

</style>
