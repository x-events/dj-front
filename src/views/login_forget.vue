<template>
    <div class="login-forget">
        <login-box v-if="step === 1" title="找回密码">
            <el-form :hide-required-asterisk="true" trim :model="ruleForm" ref="ruleForm" :rules="rules">
                <el-form-item class="form-item align-center send" type="flex" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="手机号" class="input-normal"></el-input>
                    <el-button size="small" class="get-code" plain :disabled="sendMsgInfo.isDisabled" @click="sendMsg()">{{sendMsgInfo.buttonName}}</el-button>
                </el-form-item>
                <el-form-item class="form-item align-center" type="flex" prop="numberCode">
                    <label for></label>
                    <el-input v-model="ruleForm.numberCode" placeholder="验证码" class="input-normal"></el-input>
                </el-form-item>
                <el-row class="form-item tips">未绑定手机号，请联系管理员重置密码!</el-row>
                <el-row type="flex" class="btn-content">
                    <el-button @click="next('ruleForm')" class="btn submit-button">下一步</el-button>
                    <el-button @click="cancel" class="btn cancel-button">关闭</el-button>
                </el-row>
            </el-form>
        </login-box>

        <login-box v-if="step === 2" title="找回密码">
            <el-form :hide-required-asterisk="true" trim :model="ruleForm" ref="ruleForm" :rules="rules2">
                <el-form-item class="form-item align-center send" type="flex" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="输入新密码" class="input-normal"></el-input>
                </el-form-item>
                <el-form-item class="form-item align-center" type="flex" prop="password2">
                    <el-input type="password" v-model="ruleForm.password2" placeholder="再次输入密码" class="input-normal"></el-input>
                </el-form-item>
                <el-row type="flex" class="btn-content">
                    <el-button @click="correct('ruleForm')" class="btn submit-button sure">确定</el-button>
                    <el-button @click="cancel" class="btn cancel-button">关闭</el-button>
                </el-row>
            </el-form>
        </login-box>
    </div>
</template>

<script>
import * as account from "../api/account.js";
import * as util from "@/assets/util.js";

import loginBox from "../components/login-box";

export default {
  components: {
    loginBox
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      if (this.ruleForm.password !== this.ruleForm.password2) {
        return callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      sendMsgInfo: {
        buttonName: "获取验证码",
        isDisabled: false,
        time: 60
      },
      ruleForm: {
        phone: "",
        numberCode: "",
        password: "",
        password2: ""
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        numberCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位验证码", trigger: "blur" }
        ]
      },
      rules2: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度为 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度为 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: checkPassword, trigger: "blur" }
        ]
      },
      step: 1
    };
  },
  methods: {
    next(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          account.checkcode({
              cellphone: this.ruleForm.phone,
              code: this.ruleForm.numberCode
            }).then(res => {
              this.step = 2;
              //this.resetForm('ruleForm');
            });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    correct(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          account
            .resetPassword({
              cellphone: this.ruleForm.phone,
              code: this.ruleForm.numberCode,
              password: this.ruleForm.password
            })
            .then(res => {
              this.$message({
                message: res.data.statusCode,
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push({ path: "/login" });
                }
              });
            });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    sendMsg() {
      let vm = this;
      if (this.ruleForm.phone === "") {
        this.$message.error("请输入手机号");
        return false;
      }
      account.getcode({ mobile: this.ruleForm.phone, type: 2 }).then(res => {
        this.$message.success(res.data.statusCode);
        this.sendMsgInfo.isDisabled = true;
        let timer = window.setInterval(() => {
          this.sendMsgInfo.buttonName = this.sendMsgInfo.time + "秒后重新发送";
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
    created() {}
  }
};
</script>

<style scoped>
.tips {
  color: #fb621c;
  margin-top: -5px;
  text-align:center;
}
.login-forget .send {
  position: relative;
}
.login-forget .get-code {
  position: absolute;
  right:1px;
  top:4px;
  color: #007fe1;
  border-radius: 6px;
  background-color:transparent;
  border:0;
  font-size:14px;
}
.login-forget .get-code.is-disabled {
  color: #aaa;
}
.el-form { width:100%;}
</style>
