<template>
    <div class="header" :class="{'window':$route.matched[1].name == '可视窗口' || $route.matched[1].name == '党支部' || $route.matched[1].name == '党建地图'}">
        <el-popover placement="bottom" popper-class="popShowImg qrcode" trigger="hover" width="180">
            <img :src="$root.mobile_qrcode">
            <div class="tc">APP下载</div>
            <div class="qrcode" slot="reference"></div>
        </el-popover>

        <!--2党务工作者/3书记-->
        <ul class="nav" v-if="role != '1'">
            <li @click="home" :class="{cur: $route.matched[1].name == '可视窗口' || $route.matched[1].name == '党支部'}">
                <div class="icon" :class="'window'"></div>
                可视窗口
            </li>
            <li v-for="(item,index) in $router.options.routes[0].children" :key="'nav'+index" :class="{cur: $route.path.indexOf(item.path)===0 || $route.path.indexOf(item.path)===1}" @click="gopage(item,index)" v-if="showStatus(index)" :index="index">
                <div class="icon" :class="item.icon"></div>
                {{item.name}}
            </li>
            <li>
                <el-popover placement="bottom" width="210" trigger="click" popper-class="setInfoBox">
                    <div class="box" slot="reference"><div class="icon set"></div>设置</div>
                    <div class="setInfo" v-if="user.org_id">
                        <div class="avatar" @click="setButtonCommand('user_info')"><img :src="user.avatar" :alt="user.realname"></div>
                        <div class="info" @click="setButtonCommand('user_info')">
                            <div class="name el" :title="user.realname">{{user.realname}}</div>
                            <div class="duty_text el" :title="user.duty_text">{{user.duty_text}}</div>
                        </div>
                        <div class="org_name">{{user.heightest_org_name}}</div>
                        <div class="switch"><el-button size="mini" round type="primary" @click="switchID()">身份切换</el-button></div>
                    </div>
                    <div class="flex-row setButtons">
                        <div class="flex-1" v-if="user.is_manager == 1">
                            <el-button type="primary" @click="setButtonCommand('manage_platform')">后台管理</el-button>
                        </div>
                        <div class="flex-1">
                            <el-button @click="setButtonCommand('logout')">退出</el-button>
                        </div>
                    </div>
                </el-popover>
            </li>
        </ul>

        <!--1党员-->
        <ul class="nav" v-if="role == '1'">
            <li v-for="(item,index) in $router.options.routes[0].children" :key="'nav'+index" :class="{cur: $route.path.indexOf(item.path)===0 || $route.path.indexOf(item.path)===1}" @click="gopage(item,index)" v-if="showStatus_dangyuan(index)" :index="index">
                <div class="icon" :class="item.icon"></div>
                {{item.name}}
            </li>
        </ul>

        <h1 class="h1title" :class="{'hide':logoShow}">
            <img src="@/assets/img/logo.png" alt="八里庄街道基层党建规范化可视平台">
        </h1>
        
        <template v-if="$route.name != '可视窗口' && $route.name != '党支部'">
            <div class="window_breadcrumb" v-if="$route.matched[1].name == '可视窗口' || $route.matched[1].name == '党支部'">
                <a title="返回上一级" @click="goback" class="back"><img src="@/assets/img/back.png" alt="返回上一级"></a>
                <span v-for="(e,i) in routeArr" :key="i">
                    <a :class="{'nolink':i+1 == routeArr.length}">{{e.meta.mytitle || e.meta.title}}</a>
                    <i class="el-icon-d-arrow-right" v-if="i+1 != routeArr.length"></i>
                </span>
            </div>
        </template>

    </div>
</template>

<script>
import * as util from "@/assets/util"
import * as common from "@/api/common"

export default {
    name: 'header1',
    data() {
        return {
            role:"",
            routeArr:[],
            org_id:this.$route.params.org_id,
            user:this.$root.user,
            adminDomain: ''
        }
    },
    watch: {
        $route(){
            this.bread()
        }
    },
    computed: {
        logoShow(){
            if(this.$route.matched[1].name == '可视窗口' || this.$route.matched[1].name == '党支部'){
                if(this.$route.matched.length > 2){
                    return true
                }
            }
        },
        userInfo(){
            return this.$root.user
        }
    },
    methods:{
        switchID(){
            util.emit('switchID')
        },
        goback(){
            this.$router.go(-1);
            // let prev_route = this.routeArr[this.routeArr.length-2];
            // this.$router.replace({name:prev_route.name});
        },
        bread(title){
            this.routeArr = this.$route.matched.slice(1)
            if(title){
                this.routeArr[this.routeArr.length-1].meta.mytitle = title
            }
        },
        routeJump(e){
            let pathArr =  e.path.split('/');
            let newPath = ""
            //console.log(pathArr);
            pathArr.forEach((e,i) => {
                let str = e,spl = '/'
                if(e == ':org_id'){
                    str = this.org_id
                }
                if(i == 0) {
                    spl = ''
                }
                newPath += spl+str
            });
            this.$router.push({path:newPath})
        },
        showStatus(index){
            if(index > 1){
                // if(index == 6 && this.is_manager == 0){
                //     return false
                // }else{
                //     return true
                // }
                return true
            }
        },
        showStatus_dangyuan(index){
            if(index == 2 || index == 3 || index == 5 || index == 7 || index == 6){
                return true
            }else{
                return false
            }
        },
        setButtonCommand(command){
            switch (command) {
                case 'user_info':
                    this.$router.push({name:'个人信息'});
                    break;
                case 'manage_platform':
                    this.toDashboard()
                    break;
                case 'logout':
                    this.$confirm('退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        util.emit('logout')
                    })
                    break;
                default:
                    break;
            }
        },
        toDashboard() {
            if(!this.adminDomain){
                return console.warn('adminDomain未定义')
            }
            window.open(this.adminDomain+'?access_token='+this.$root.user.access_token);
        },
        getInfo() {
            common.getConfig({
                name: 'ADMIN_DOMAIN'
            }).then(res => {
                this.adminDomain = res.data.data.value
            })
        },
        gopage(item,index){

            this.$router.push(item)
            // util.emit('navHover',index);
        },
        home(){
            if(this.$root.user.org_type == '3'){
                this.$router.push({name:'党支部',params:{org_id:"0"}});
            }else{
                this.$router.push({name:'可视窗口',params:{org_id:"0"}});
            }
        }
    },
    created() {
        this.role = this.$root.user.role

        this.bread()
        this.getInfo()
        util.on("breadTitle", (title) => {
            this.bread(title)
        });
    }
}
</script>

<style scoped>
.header{height:auto; overflow: hidden; background:url(../assets/img/navbg.jpg) right bottom no-repeat #164db9;}
.header.window { background:none; border-bottom:1px solid #045089; background:url(../assets/img/head_shadow.png) 0 0 / auto 100% repeat-x;}
.header .logo{float: left;height:80px;line-height: 80px;width:80px; background:url(../assets/img/logo-y.png) center /auto 50% no-repeat;}
.header .h1title{float: left;height:80px;line-height: 80px;color:#fff;font-size: 20px; font-size:0; margin-left:10px;}
.header .h1title.hide { display:none;}

.header .qrcode{float: right;width:60px;height: 80px;}
.header .qrcode::before { content:''; display:block; height:40px; background:url(../assets/img/nav_ico.png) -420px -40px no-repeat; margin-top:20px;}
.header .zoom{float: right;width:50px;height: 80px;background:url(../assets/img/zoom.png) center no-repeat;}

.header .nav { float:right;color:#fff;height: 100%;}
.header .nav li{float: left;width:7em;text-align: center; font-size:14px;cursor: pointer;height: 100%; padding-bottom:0px; color:#b9d5f0;position:relative;}
.header .nav li::before,.header .nav li::after { content:''; display:none; width:2px; height:100%; overflow:hidden; position:absolute; top:0; background:url(../assets/img/nav_line.png) 0 0 no-repeat;}
.header .nav li::before { left:0;}
.header .nav li::after { right:0; background-position:-2px 0;}
.header .nav .icon { display:block; width:60px; height:40px;margin:15px auto 0;background-image: url(../assets/img/nav_ico.png);background-repeat:no-repeat; margin-bottom:-7px;}
.header .nav li .icon.window{background-position:0 -40px;}
.header .nav li .icon.work{background-position:-60px -40px;}
.header .nav li .icon.learn{background-position:-120px -40px;}
.header .nav li .icon.datacenter{background-position:-180px -40px;}
.header .nav li .icon.map{background-position:-240px -40px;}
.header .nav li .icon.set{background-position:-300px -40px;}
.header .nav li .icon.message{background-position:-360px -40px;}
/* .header .nav li .icon{background-position:-420px -40px;} */

.header .nav li.cur .icon.window{background-position:0 0px;}
.header .nav li.cur .icon.work{background-position:-60px 0px;}
.header .nav li.cur .icon.learn{background-position:-120px 0px;}
.header .nav li.cur .icon.datacenter{background-position:-180px 0px;}
.header .nav li.cur .icon.map{background-position:-240px 0px;}
.header .nav li.cur .icon.set{background-position:-300px 0px;}
.header .nav li.cur .icon.message{background-position:-360px 0px;}
/* .header .nav li.cur .icon{background-position:-420px 0px;} */

.header .nav .cur, .header .nav li:hover{ color:#ffffff;
background: -moz-linear-gradient(top, rgba(0,51,120,1) 0%, rgba(255,255,255,0) 100%);
background: -webkit-linear-gradient(top, rgba(0,51,120,1) 0%,rgba(255,255,255,0) 100%);
background: linear-gradient(to bottom, rgba(0,51,120,1) 0%,rgba(255,255,255,0) 100%);}
.header .nav li.cur::before,.header .nav li.cur::after { display:block;}

.qrcode {width: 180px;height: 180px;}

.window_breadcrumb { line-height:40px; float:left; padding:20px 0 0 20px; font-size:22px;}
.window_breadcrumb,.window_breadcrumb a { color:#ffffff; cursor:default;}
.window_breadcrumb .back { margin-right:20px; cursor:pointer;}
.window_breadcrumb [class^=el-icon-] { margin:0 5px;}
.window_breadcrumb .nolink { color:#00ecfc;}
.window_breadcrumb a,.window_breadcrumb [class^=el-icon-] { display:none;}
.window_breadcrumb a.nolink,.window_breadcrumb a.back { display:inline-block;}
.window_breadcrumb > a,.window_breadcrumb > span { display:inline-block; vertical-align:middle;}

.setButton { width:100%; height:80px; display:block;}
.setButton .box { color:#b9d5f0; height:80px; overflow:hidden; outline:none;}
i.sli { display:inline-block; vertical-align:-5px; width:20px; height:20px; background:url(../assets/img/set_link_ico.png) -20px 0 no-repeat;}
i.sli1 { background-position:-20px 0;}
i.sli2 { background-position:-20px -20px;}
i.sli3 { background-position:-20px -40px;}
.setLinks { background:rgba(255,255,255,.95); box-shadow:0 0 2px #999; padding-top:7px; padding-bottom:7px;}
.el-dropdown-menu__item { padding:0 10px; line-height:30px;}
.el-dropdown-menu__item:not(.is-disabled):hover i.sli1 { background-position:0 0;}
.el-dropdown-menu__item:not(.is-disabled):hover i.sli2 { background-position:0 -20px;}
.el-dropdown-menu__item:not(.is-disabled):hover i.sli3 { background-position:0 -40px;}

.setInfo { padding:10px; text-align:center;}
.setInfo .avatar,.setInfo .avatar img { width:45px; height:45px; border-radius:50%; overflow:hidden;}
.setInfo .avatar { border:#ffffff 2px solid; margin-left:auto; margin-right:auto; margin-bottom:10px; cursor:pointer;}
.setInfo .info { margin-bottom:10px; cursor:pointer;}
.setInfo .name,.setInfo .duty_text { display:inline-block; vertical-align:middle; width:auto; height:18px; line-height:18px; border-radius:9px; margin:0 2px; max-width:100%; color:#333; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;}
.setInfo .duty_text { background:#7ca7d6; color:#ffffff; font-size:12px; padding:0 10px;}
.setInfo .org_name { color:#333; margin-bottom:10px;}
.switch .el-button--primary { background:#07a3f1;}
.switch .el-button--primary:hover { opacity:.8;}
.setButtons { border-radius:0 0 4px 4px; overflow:hidden;}
.setButtons .el-button { width:100%; border-radius:0; background:#7eaad9; color:#ffffff; border:0;}
.setButtons .el-button:hover { opacity:.8;}
.setButtons .el-button.el-button--primary { background:#3571bb;}
</style>
<style>
.setInfoBox { background-color:#d9e3ef; padding:0;}
.setInfoBox[x-placement^=bottom] .popper__arrow::after { border-bottom-color:#d9e3ef;}
</style>