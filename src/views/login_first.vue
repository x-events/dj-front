<template>
  <div class="login-first">
    <login-box title="完善信息">
      <el-form hide-required-asterisk="true" :model="params" :rules="rules" ref="ruleForm">
        <el-form-item class="form-item align-center" prop="password">
          <el-input type="password" v-model="params.password" placeholder="更改密码" class="input-normal"></el-input>
        </el-form-item>
        <el-form-item class="form-item align-center send" prop="phone">
          <el-input v-model="params.phone" placeholder="绑定手机号" class="input-normal"></el-input>
          <el-button plain :disabled="sendMsgInfo.isDisabled" @click="sendMsg()" size="small" class="get-code">{{sendMsgInfo.buttonName}}</el-button>
        </el-form-item>
        <el-form-item class="form-item align-center" prop="code">
          <el-input v-model="params.code" placeholder="验证码" class="input-normal"></el-input>
        </el-form-item>
        <el-row type="flex" class="btn-content"> 
          <el-button @click="submit('ruleForm')" class="btn submit-button">确定</el-button>
          <el-button @click="jump" class="btn jump">跳过</el-button>
        </el-row>
      </el-form>
    </login-box>
  </div>
</template>

<script>
import * as account from '../api/account.js'
import loginBox from '../components/login-box';

export default {
  components: {
    loginBox
  },
  data() {
    return {
      sendMsgInfo: {
          buttonName: "获取验证码",
          isDisabled: false,
          time: 60
      },
      params: {
        password: '',
        phone: '',
        code: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: "blur"},
          { min:6, max:20, message:"密码长度为 6 到 20 个字符", trigger:"blur"}
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: "blur"},
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: "blur"},
          { min: 6,max: 6,message: "请输入6位验证码",trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      let vm = this;
      if (this.params.phone === "") {
        this.$message.error("请输入手机号");
        return false;
      }
      account.getcode({ mobile:this.params.phone,type:3 }).then(res => {
        this.sendMsgInfo.isDisabled = true;
        this.$message.success(res.data.statusCode)
        let timer = window.setInterval(() => {
          this.sendMsgInfo.buttonName =
          this.sendMsgInfo.time + "秒后重新发送";
          --this.sendMsgInfo.time;
          if (this.sendMsgInfo.time < 0) {
            this.sendMsgInfo.buttonName = "发送验证码";
            this.sendMsgInfo.time = 60;
            this.sendMsgInfo.isDisabled = false;
            window.clearInterval(timer);
          }
        }, 1000);
      });
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          account.firstLogin(this.params).then( res => {
            this.$message({
              message: res.data.statusCode,
              type: 'success',
              onClose: () => {
                this.$router.push({name: '首页'})
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    jump() {
      this.$router.push({name: '首页'})
    }
  }
}
</script>

<style scoped>
.login-first .send {position: relative;}
.login-first .get-code {position: absolute; right:1px; top:4px; color: #007fe1; border-radius: 6px; background-color:transparent; border:0; font-size:14px;}
.login-first .get-code.is-disabled {color: #aaa;}
.login-first .jump {background-color: #F48B25;}
.login-first .btn-content .submit-button {flex: 6;}
.login-first .btn-content .jump {flex:2; background:linear-gradient(to bottom, #eaecf1, #f7f6f6); border:0; color:#666;flex:4; border:#e2e7eb 1px solid;}
.el-form { width:100%;}
</style>