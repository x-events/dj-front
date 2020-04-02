<template>
    <div class="flex-col">
        <div class="img"><img src="@/assets/img/mobile_bg.png" alt=""></div>
        <div class="btns tc">
            <a :href="iosLink"><img src="@/assets/img/app_ios.png" alt="iPhone"></a>
            <a :href="androidLink" @click="showTip"><img src="@/assets/img/app_android.png" alt="Android"></a>
        </div>
        <el-dialog :visible.sync="DialogVisible" width="100%" :show-close="false" custom-class="openTip" top="0">
            <div class="box" @click="hideTip">
                <div class="tc fz16" style="padding-left:90px;">链接打不开?</div>
                <div class="tr">点击右上角选择<strong>“在浏览器中打开”</strong></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as common from "@/api/common";

export default {
    data() {
        return {
            iosLink:"###",
            androidLink:"javascript:void(0)",
            DialogVisible:false,
            weixin:false
        };
    },
    methods: {
        showTip(){
            if(this.weixin){
                this.DialogVisible = true;
            }
        },
        hideTip(){
            this.DialogVisible = false;
        },
        fetchData(){
            common.config().then((res) => {
                let data = res.data.data;
                //console.log(data);
                this.iosLink = data.ios || 'javascript:void(0);';
                let agent = navigator.userAgent;
                let weixin = /microMessenger/i;
                if (weixin.test(agent)) {
                    this.weixin = true;
                }else{
                    if(data.android == ""){
                        this.androidLink = 'javascript:void(0);';
                    }else{
                        this.androidLink = data.android;
                    }
                }
            })
        }
    },
    created: function() {
        this.fetchData();
    }
};
</script>

<style scoped>
#app { background-color:#f5f5f5;}
.img img { width:100%;}
.img { margin-bottom:50px;}
#app { padding-bottom:0; width:100%; height:100%; position:relative; overflow:hidden; background:#f5f5f5;}
.title { font-size:24px; color:#d91c1c; font-weight:bold; margin-bottom:50px;}
.btns a { display:block; width:180px; margin:0 auto 15px;}
</style>

<style>
html,body { overflow:hidden; min-width:0; width:100%; height:100%; position:relative;}
.openTip { border-radius:0; margin-bottom:0;}
.openTip .box { background-image:url('../assets/img/guide.png'); background-position:92% top; background-repeat:no-repeat; padding:20px 110px 20px 20px;}
.openTip .el-dialog__header { display:none;}
.openTip .el-dialog__body {padding:0;}
</style>
