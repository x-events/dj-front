<template>
    <div class="loginContainer">
        <div class="login flex-row align-center justify-center">
            <div class="content flex-1 flex-row">
                <div class="login-left">
                    <h1 class="logo"><img src="/img/login/logo.png" alt="八里庄街道基层党建规范化可视平台"></h1>
                    <div class="animate">
                        <div class="model ghost">
                            <img src="/img/login/model.png">
                        </div>
                        <div class="vbHidden circle3" :class="{'animated slow fadeIn':animate.status == 1}">
                            <img src="/img/login/circle3.png">
                        </div>
                        <div class="vbHidden circle2" :class="{'animated slow fadeIn delay4':animate.status == 1}">
                            <img src="/img/login/circle2.png">
                        </div>
                        <div class="vbHidden circle1" :class="{'animated slow fadeIn delay8':animate.status == 1}">
                            <img src="/img/login/circle1.png">
                        </div>

                        <div class="vbHidden block1" :class="{'animated fadeInUp delay12':animate.status == 1}">
                            <img src="/img/login/block1.png">
                        </div>
                        <div class="vbHidden block2" :class="{'animated fadeInUp delay14':animate.status == 1}">
                            <img src="/img/login/block2.png">
                        </div>
                        <div class="vbHidden block3" :class="{'animated fadeInUp delay16':animate.status == 1}">
                            <img src="/img/login/block3.png">
                        </div>
                        <div class="vbHidden block4" :class="{'animated fadeInUp delay18':animate.status == 1}">
                            <img src="/img/login/block4.png">
                        </div>
                    </div>
                </div>
                <template v-if="$route.path === '/login'">
                    <div class="login-content flex-1">
                        <h2 class="flex-row align-center">
                            <span>密码登录</span>
                        </h2>
                        <el-form ref="validForm" :model="queryParam" :rules="rules" class="login-form" @keyup.native.enter="login">
                            <el-form-item class="form-item" prop="username">
                                <el-input class="form-input" placeholder="身份证/手机号" v-model="queryParam.username"></el-input>
                            </el-form-item>
                            <el-form-item class="form-item" prop="password">
                                <el-input class="form-input" placeholder="密码" type="password" v-model="queryParam.password"></el-input>
                                <p @click="forget" class="forget">忘记密码？</p>
                            </el-form-item>
                            <el-form-item class="submit-item">
                                <el-button class="submit-button" @click="login" type="primary" :loading="loading">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <router-view class="flex-1" v-else/>
            </div>
            
        </div>
        <div class="copyRight">&copy;2019北京市朝阳区八里庄街道版权所有</div>
        <ImagesPreload v-if="imgUrls.length" :images="imgUrls" @call_center="call_center" @call_ready="call_ready"></ImagesPreload>
        <div class="loading flex-row align-center justify-center" v-show="animate.hideloading" :class="{'animated fadeOut faster':animate.loading == false}">
            <div>
                <i class="el-icon-loading"></i>加载中.... <span>{{animate.per}}%</span>
            </div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util.js";
import * as account from "@/api/account";
import { instance } from "@/api";

import ImagesPreload from "vue-images-preload"

export default {
    components: {
        ImagesPreload
    },
    data() {
        return {
            loading: false,
            queryParam: {
                username: "",
                password: ""
            },
            remember: false,
            rules: {
                username: [
                { required: true, message: "请输入身份证/手机号", trigger: "blur" }
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            },
            animate:{
                loading:true,
                hideloading:true,
                status:false,
                per:0
            },
            imgUrls:[
                '/img/login/bg.jpg',
                '/img/login/block1.png',
                '/img/login/block2.png',
                '/img/login/block3.png',
                '/img/login/block4.png',
                '/img/login/circle1.png',
                '/img/login/circle2.png',
                '/img/login/circle3.png',
                '/img/login/logo.png',
                '/img/login/model.png'
            ]
        };
    },
    methods: {
        call_center(data){
            this.animate.per = data.rate;
        },
        call_ready() {
            this.animate.loading = false;
            setTimeout(() => {
                this.animate.status = 1;
                this.animate.hideloading = false;
            }, 1000);
        },
        login() {
            this.$refs.validForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    account.login(this.queryParam).then(res => {
                        this.loading = false;
                        util.storage("user", res.data.data);
                        if (res.data.data.lastlogin === 0) {
                            instance.defaults.headers.common["Authorization"] = res.data.data.access_token;
                            this.$router.push({ name: "完善信息" });
                        } else {
                            util.emit("login", this.$router.currentRoute.query.from);
                        }
                    }).catch(err => {
                        this.loading = false;
                        util.catchError(err);
                    });
                } else {
                    return false;
                }
            });
        },
        forget() {
            this.$router.push({ name: "找回密码" });
            //console.log(this.$route.path);
        }
    },
    created() {
    }
};
</script>

<style scoped>
.login-content { margin-left:0px; margin-top:100px; margin-right:20px;}
.login-content h2 { padding: 8px 16px; color:#007fe1; font-weight: normal; font-size: 18px;}
.login { width:1340px; height:550px; position:absolute; left:50%; top:50%; margin:-275px 0 0 -670px; overflow:visible;}
.login-form { padding: 10px 15px 0;}
.login-form .form-item { position: relative; height: 45px;}
.login-form .icon { position: absolute; left: 1px; top: 1px; background-color: #cedeff; height: 43px; width: 43px; text-align: center; color: #3f79ff; font-size: 20px; border-top-left-radius: 10px; border-bottom-left-radius: 10px;}
.login-form .el-form-item:nth-of-type(3) { margin-bottom: 0;}
.remember { color: #fff;}
.forget { cursor: pointer; text-align: right; line-height: 20px; margin-bottom: 3px; position:absolute; right:5px; top:10px; color: #007fe1;}
.submit-button { height: 45px; color: #fff; width: 100%; border-radius:5px; font-size:18px; background: linear-gradient(to bottom, #f8461c, #ff851b); border: none;}
.wjmm { margin-top:-7px; padding-bottom:10px;}


.loginContainer { overflow:hidden; background:url(/img/login/bg.jpg) center top / 100% 100% no-repeat!important; min-width:1340px; overflow-x:auto!important;}
.login-left { width:940px; height:550px; margin-right:30px;}
.copyRight { position:absolute; bottom:20px; right:50%; margin-right:-620px;}
.logo { margin-bottom:40px; padding-left:110px;}
.animate { height:390px; width:888px; position:relative;}
.animate > div { position:absolute;}

.model { left:142px; top:60px; z-index:10;;}
.circle3 { left:273px; top:244px;}
.circle2 { left:224px; top:153px;}
.circle1 { left:128px; top:15px;}
.block1 { left:63px; top:87px;}
.block2 { left:634px; top:68px;}
.block3 { left:640px; top:275px;}
.block4 { left:16px; top:260px;}

.loading { width:100%; height:100%; background-color:#2685d1; position:fixed; left:0; top:0; z-index:20; color:#ffffff; font-size:20px;}
.loading .el-icon-loading { font-size:50px; vertical-align:middle; margin-right:8px;}

.ghost {
    animation:ghostUpdown 1.8s linear 5.5s infinite normal;
}
@keyframes ghostUpdown{
    0%   {margin-top:0px;}
    25%  {margin-top:10px;}
    50%  {margin-top:20px;}
    75%  {margin-top:10px;}
    100% {margin-top:0px;}
}
</style>

<style>
.loginContainer .login-forget,.loginContainer .login-first { width:350px; margin-top:100px; margin-right:20px;} 
.loginContainer .login-box { width:auto; background-color:transparent; border-radius:0; box-shadow:none; border:0;}
.loginContainer .login-box h2 { color:#007fe1; background-color:transparent; border-radius:0; text-shadow:none; font-weight:normal; justify-content:inherit;}
</style>