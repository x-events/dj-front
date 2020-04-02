<template>
  <div class="flex-col">
    <div class="flex-1 mainCont">
      <div class="block_wrap_min infoLayout withTitle" v-loading="loading">
        <div class="channelBar">
          <div class="_title">
            <i class="ion">&#xe606;</i>
            <strong>设置</strong>
          </div>
        </div>
        <div class="flex-row">
          <div class="sidebar">
            <ul>
              <li @click="$router.push({name: '个人信息'})">个人信息</li>
              <li class="cur" @click="$router.push({name: '修改密码'})">修改密码</li>
            </ul>
          </div>
          <div class="flex-1">
            <el-form ref="ruleForm2" :model="queryParam" label-width="100px" :rules="rules">
              <el-form-item label="原密码" prop="old_password">
                <el-input type="password" v-model="queryParam.old_password" ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="queryParam.password" ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="queryParam.checkPass" ></el-input>
              </el-form-item>
              <el-form-item label="" class="actionBar">
                <el-button type="primary" size="small" plain @click="$router.replace({name: '工作记实'})">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保 存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as account from "@/api/account";

export default {
  data() {
    var valioldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写原密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码长度 6 到 20 个字符"));
      } else {
        if (this.queryParam.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.queryParam.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      queryParam: {
        old_password: "",
        password: "",
        checkPass: ""
      },
      rules: {
        old_password: [
          { validator: valioldPass, trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    save: function(){
      this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.loading = true;
            account.changepw(this.queryParam).then(res => {
              this.loading = false
              this.$refs.ruleForm2.resetFields()
              this.$message({
                message: res.data.statusCode,
                type: 'success'
              });
            }).catch(() => {
              this.loading = false
            })
          }
      })
    }
      
  },
  created: function() {
    
  }
};
</script>

<style scoped>
.infoLayout {
  width: 900px;
  margin: 20px auto;
  padding: 60px 60px 60px 40px;
  box-sizing:border-box;
}
.infoLayout .channelBar {
  background: transparent;
  color: #000;
}
.infoLayout .channelBar .ion {
  color: #1244D2;
}

.sidebar {
  width: 174px;
  margin-right: 20px;
}
.sidebar li {
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  background:#f3f5fa;
}
.sidebar .cur {
  background: #1244D2;
  color: #fff;
}

</style>
<style>
/* form */
.infoLayout .el-form-item__label{color:#838383}
.actionBar .el-button{min-width: 8em;}
</style>
