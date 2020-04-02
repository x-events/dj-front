<template>
  <div v-loading="loading">
    <el-dialog
      :visible="visible"
      title="转交下一步"
      :append-to-body="true"
      width="1000px"
      :before-close="handleClose"
      @open="handleOpen"
    >
      <el-form ref="validForm" :model="queryParam" label-width="130px" :rules="rules">
        <div class="flex-row border-layout">
          <div class="flex-1" style="overflow:hidden">
            <template v-if="$route.query.transmit_type==='2'">
              <el-form-item label="选择下一步" prop="next_process_step_log_id" class="tagWrap">
                <div v-for="(item,index) in delivers_step" :key="'step'+index">
                  <el-radio
                    v-model="queryParam.next_process_step_log_id"
                    :label="item.process_step_log_id"
                  >{{item.name}}</el-radio>
                </div>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="转交下一步">
                {{delivers_step[0] && delivers_step[0].name}}
              </el-form-item>
            </template>
          </div>
          <div class="flex-1" style="overflow:hidden">
            <el-form-item label="办理组织或人员" prop="submit_organization_id" class="tagWrap">
              <el-button size="small" @click="pickerLeaderDialog=true">请选择</el-button>
            </el-form-item>
            <div class="custom_form_item">
              办理组织：{{submit_organization.organization_name}}
            </div>
            <div class="custom_form_item">
              办理人：
              <template v-if="assignLeader">
                <el-tag
                  v-for="(item,index) in leader"
                  :key="'leader' + index"
                  style="margin:0 .5em .5em 0"
                  type="info"
                  closable
                  @close="leader.splice(index,1)"
                >{{item.name}}</el-tag>
              </template>
              <template v-else>
                不指定
              </template>
            </div>
            
            <!-- <el-form-item label="协作者" class="tagWrap">
              <el-button size="small" @click="pickerActorDialog=true">请选择</el-button>
              <el-tag
                v-for="(tag,index) in actor_list"
                :key="'tag'+tag.uid"
                closable
                type="info"
                @close="actor_list.splice(index,1)"
              >{{tag.name}}</el-tag>
            </el-form-item> -->
          </div>
        </div>
        <el-form-item label="期望完成时间">
          <el-date-picker v-model="currentData" 
            type="datetime" 
            placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="发送通知">
          <el-switch v-model="queryParam.is_notice"></el-switch>
        </el-form-item>
        
      </el-form>

      <el-form v-if="queryParam.is_notice" ref="noticeForm" :model="noticeParam" label-width="100px" :rules="noticeRules">
        <el-form-item label="通知标题" prop="title">
          <el-input v-model="noticeParam.title"></el-input>
        </el-form-item>
        <el-form-item label="通知详情" prop="body">
          <el-input type="textarea" v-model="noticeParam.body"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="level">
          <el-radio-group v-model="noticeParam.level">
            <el-radio v-for="(item,index) in level" :key="'pri'+index"
              :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="阅读回执">
          <el-radio-group v-model="noticeParam.receipt">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接收人员" prop="user_list" class="tagWrap">
          <el-button size="small" @click="pickerDialog=true">请选择</el-button>
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
        <el-button type="primary" @click="send">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 组织/负责人 -->
    <leader-picker
      :visible="pickerLeaderDialog"
      :currentOrg="submit_organization"
      :assignLeader="assignLeader"
      @close="pickerLeaderDialog=false"
      @choosen="setPeople1"
    />
    <!-- 协作者 -->
    <!-- <actor-picker
      :visible="pickerActorDialog"
      :currentSelection="actor_list"
      @close="pickerActorDialog=false"
      @choosen="setPeople2"
    /> -->
    <!-- 选党员 -->
    <member-picker :visible="pickerDialog" :currentSelection="user_list" @close="pickerDialog=false" @choosen="user_list=$event" />
  </div>
</template>

<script>
import * as util from '@/assets/util'
import * as work from "@/api/work.js";
import * as common from '@/api/common'
import * as notice from '@/api/notice'

let ajaxLock = false;

export default {
  components: {
    "leader-picker": resolve => require(["@/components/work/deliverPicker"], resolve),
    //"actor-picker": resolve => require(["@/components/memberPicker"], resolve),
    "member-picker": resolve => require(["@/components/memberPicker"], resolve)
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
    delivers_step: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
    const validNextId = (rule, value, callback) => {
      if (this.$route.query.transmit_type==='2' && !this.queryParam.next_process_step_log_id) {
        callback(new Error('请选择下一步'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      pickerLeaderDialog: false,
      pickerActorDialog: false,
      pickerDialog: false,
      queryParam: {
        process_step_log_id: "",
        next_process_step_log_id: "",
        leader_uid: [],
        submit_organization_id: "",
        actor_uid: [],
        hope_at: '',
        is_notice: true,
        notice: {}
      },
      noticeParam: {
        title: "",
        user_list: [],
        level: '',
        body: '',
        receipt: false
      },
      leader: [],
      submit_organization: {},
      assignLeader: true,
      actor_list: [],
      level: [],
      user_list: [],
      currentData: null,
      rules: {
        next_process_step_log_id: [
          { validator: validNextId, trigger: "blur" }
        ],
        leader_uid: [
          { type: 'array', required: true, message: "请选择负责人", trigger: "blur" }
        ],
        submit_organization_id: [
          { required: true, message: "请选择组织", trigger: "blur" }
        ]
      },
      noticeRules: {
          title: [
            { required: true, message: '请输入通知标题', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          body: [
            { required: true, message: '请输入通知详情', trigger: 'change' },
            { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
          ],
          user_list: [
            { type: 'array', required: true, message: '请选择接收人', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择优先级', trigger: 'blur' }
          ]
      }
    };
  },
  computed: {
    filters: function(){
      let result = [].concat(this.actor_list)
      if(this.leader.length){
        result = result.concat(this.leader)
      }
      return result
    }
  },
  watch: {
    leader: function(leader) {
      this.queryParam.leader_uid = leader.map(e => e.uid)
      this.$nextTick(() => {
        this.$refs.validForm.validateField("leader_uid");
      });
    },
    submit_organization: {
      handler: function(submit_organization){
        this.queryParam.submit_organization_id = submit_organization.organization_id || '';
      },
      deep: true
    },
    actor_list: function(actor_list) {
      this.queryParam.actor_uid = actor_list.map(e => e.uid);
      
    },
    user_list: function(user_list){
      this.noticeParam.user_list = user_list.map(e => e.uid)
      this.$nextTick(() => {
        this.$refs.noticeForm.validateField('user_list');
      })
    },
    currentData: function(currentData){
      if(currentData){
        this.queryParam.hope_at = Math.floor(currentData.getTime() / 1000)
      }
    }
  },
  methods: {
    setPeople1: function($event){
      this.leader = $event.leader || []
      this.submit_organization = $event.org || {}
      this.assignLeader = $event.assignLeader

    },
    setPeople2: function($event){
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
      
      this.actor_list=result
    },
    handleOpen: function() {
      this.leader = []
      this.actor_list = [];
      this.queryParam.process_step_log_id = this.process_step_log_id;
      this.queryParam.next_process_step_log_id = '';

      setTimeout(() => {
        if (this.$refs.validForm) {
          this.$refs.validForm.clearValidate();
        }
      }, 300);
    },
    handleClose: function() {
      this.$refs.validForm.resetFields()
      this.$emit("close");
    },
    send: function() {
      console.log(ajaxLock)
      if(ajaxLock){
        return null
      }
      //前置检查
      if(!this.queryParam.submit_organization_id){
        return this.$message({
          message: '请选择办理组织！',
          type: 'warning'
        });
      }
      if(this.assignLeader && !this.leader.length){
        return this.$message({
          message: '请选择办理人！',
          type: 'warning'
        });
      }

      this.sendNotice(() => {
        this.$refs.validForm.validate(valid => {
          if (valid) {
            ajaxLock = true;
            this.loading = true;
            let params = util.deepcopy(this.queryParam)
            params.is_notice = params.is_notice ? 1 : 0;

            work.deliverProcess(params).then(res => {
              this.loading = false;
              ajaxLock = false
              this.handleClose();
              this.$router.go(-1)
            }).catch(() => {
              this.loading = false;
              ajaxLock = false
            });
          } else {
            ajaxLock = false
            return false;
          }
        });
      })
    },
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
    sendNotice: function(callback){
      if(this.$refs.noticeForm){
        this.$refs.noticeForm.validate((valid) => {
          if (valid) {
            this.loading = true
            //转格式
            let params = util.deepcopy(this.noticeParam)
            params.receipt = params.receipt ? 1 : 0;
            // 赋值
            this.queryParam.notice = params;
            if(typeof callback === 'function'){
              callback()
            }
          } else {
            return false;
          }
        });
      }else{
        if(typeof callback === 'function'){
          callback()
        }
      }
    }
  },
  created: function(){
    //console.log(this.$route.query.status==='2')
    common.level().then(res => {
      this.loading = false
      this.level = res.data.data
      this.noticeParam.level = this.level[0].value
    })
    
  }
};
</script>

<style scoped>
.tagWrap .el-tag {
  margin-left: 10px;
}
.border-layout{border:1px solid #ccc;border-radius: 4px;margin-bottom: 20px;}
.border-layout .flex-1:first-child{border-right: 1px solid #ccc;}

.custom_form_item{padding:0 0 0 1em;margin-bottom: 20px;color:#333;}
</style>
