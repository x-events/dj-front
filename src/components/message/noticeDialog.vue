<template>
  <div>
    <el-dialog :visible="visible"
      v-loading="loading"
      class="comDialog"
      title="下发通知"
      :append-to-body="true"
      width="1000px"
      :before-close="handleClose"
      @open="handleOpen">
      
      <el-form ref="validForm" :model="queryParam" label-width="80px" :rules="rules">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="queryParam.title"></el-input>
        </el-form-item>
        <el-form-item label="通知详情" prop="body">
          <el-input type="textarea" v-model="queryParam.body"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="level">
          <el-radio-group v-model="queryParam.level">
            <el-radio v-for="(item,index) in level" :key="'pri'+index"
              :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="阅读回执">
          <el-radio-group v-model="queryParam.receipt">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接收人员" prop="user_list">
          <el-button size="small" @click="pickerDialog=true">请选择</el-button>
        </el-form-item>
        <el-form-item v-if="user_list.length" label="" class="choosenWrap">
          <p>已选择</p>
          <el-tag
            v-for="tag in user_list"
            :key="'tag'+tag.uid"
            closable
            type="info"
            @close="removeTag(tag)">
            {{tag.name}}
          </el-tag>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="send">发 送</el-button>
      </span>

    </el-dialog>
    
    <!-- 选党员 -->
    <member-picker :visible="pickerDialog" :currentSelection="user_list" @close="pickerDialog=false" @choosen="user_list=$event" />
  </div>
</template>

<script>
import * as util from '@/assets/util'
import * as common from '@/api/common'
import * as notice from '@/api/notice'

let ajaxLock = false;

export default {
  components: {
    'member-picker': (resolve) => require(['@/components/memberPicker'], resolve)
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      pickerDialog: false,
      queryParam: {
        title: '',
        user_list: [],
        level: '',
        body: '',
        receipt: false
      },
      level: null,
      user_list: [],
      rules: {
          title: [
            { required: true, message: '请输入通知标题', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          body: [
            { required: true, message: '请输入通知详情', trigger: 'change' },
            { min: 10, max: 1000, message: '长度在 10 到 1000 个字符', trigger: 'blur' }
          ],
          user_list: [
            { type: 'array', required: true, message: '请选择接收人', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择优先级', trigger: 'blur' }
          ]
      }
    }
  },
  watch: {
    user_list: function(user_list){
      this.queryParam.user_list = user_list.map(e => e.uid)
      this.$nextTick(() => {
        this.$refs.validForm.validateField('user_list');
      })
    }
  },
  methods: {
    removeTag: function(tag){
      if(tag && tag.uid){
        let start = this.user_list.findIndex(e => {
          return e.uid===tag.uid
        })
        if(start > -1){
          this.user_list.splice(start,1)
        }
      }
    },
    handleOpen: function(){
      this.queryParam = {
        title: '',
        level: this.level[0].value,
        body: '',
        receipt: false,
        user_list: []
      }
      this.user_list = []
      setTimeout(() => {
        if (this.$refs.validForm) {
          this.$refs.validForm.clearValidate();
        }
      }, 300);
    },
    handleClose: function(){
      this.$refs.validForm.resetFields()
      this.loading = false
      ajaxLock = false
      this.$emit('close')
    },
    send: function(){
      //console.log(ajaxLock)
      if(ajaxLock){
        return null
      }
      ajaxLock = true
      this.loading = true
      this.$nextTick(() => {
        this.$refs.validForm.validate((valid) => {
          if (valid) {
            //转格式
            let params = util.deepcopy(this.queryParam)
            params.receipt = params.receipt ? 1 : 0;
            notice.send(params).then(res => {
              this.handleClose()
              this.$emit('done')
            })
          } else {
            this.loading = false
            ajaxLock = false
            return false;
          }
        });
      })
      
    }
  },
  created: function(){
    this.loading = true
    common.level().then(res => {
      this.loading = false
      this.level = res.data.data
      this.queryParam.level = this.level[0].value
    })
  }
};
</script>

<style >
.choosenWrap .el-form-item__content{background:#f3f5fa;padding:6px;}
.choosenWrap .el-tag{margin:0 6px 6px 0;background:#fff;}
</style>
