<template>
  <div v-loading="loading">
    <el-dialog
      class="comDialog"
      title="输入"
      :append-to-body="true"
      :visible="visible"
      width="1000px"
      @close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="form">
        
        <el-form-item label="">
          <el-input v-model="realnames" placeholder="请输入姓名，多个以'、'隔开"></el-input>
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
            message: '请填写姓名',
            type: 'warning'
          });
      }
      const result = this.realnames.split('、').map(realname => {
        return {
          uid: 0,
          name: realname
        }
      })
      this.$emit("choosen", result);
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
