<template>
    <div class="flex-col vbHidden block_wrap_normal" :class="{'animated fadeInDown faster delay2':animate == 1,'animated fadeOutUp faster':animate == 2}">
        <!-- <div class="flex-row" style="margin-bottom:12px;">
            <div class="colorBlock cyan flex-1">
                <span class="box">
                <div class="num digital">{{data.probationary}}</div>
                <div class="title">预备党员</div>
                </span>
            </div>
            <div class="colorBlock flex-1">
                <span class="box">
                <div class="num digital">{{data.poverty}}</div>
                <div class="title">困难党员</div>
                </span>
            </div>
            <div class="colorBlock green flex-1">
                <span class="box">
                <div class="num digital">{{data.special}}</div>
                <div class="title">特殊党员</div>
                </span>
            </div>
        </div> -->
        <div class="dotBox count" @click="$router.push({name:'党员-筛选'})"><b class="dot"></b>
            <img src="@/assets/img/dy.png"> <span class="text">党员信息</span> {{data.count}}人 <i class="ion">&#xe62b;</i>
        </div>
        <div class="block_wrap_opc withTitle flex-1 flex-col" style="margin:0;">
            <div class="channelBar green">
                <div class="_title"><i class="wico wi12"></i><strong>性别结构</strong></div>
            </div>
            <div class="flex-1 chartBox flex-col gender" style="margin:10px;">
            <div class="flex-1 male flex-row">
                <div class="hd align-center">
                    <div class="flex-1">
                        <div class="name">{{data.sex.male.name}}</div>
                        <div class="number">{{data.sex.male.value}}人</div>
                    </div>
                </div>
                <div class="bd flex-1 align-center" id="bd">
                    <div class="flex-1 sexbg malebg">
                        <div class="percent" :style="'width:'+data.sex.male.percent">
                            <div class="highlightbg" :style="'width:'+sexWidth+'px'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 female flex-row">
                <div class="hd align-center">
                    <div class="flex-1">
                        <div class="name">{{data.sex.female.name}}</div>
                        <div class="number">{{data.sex.female.value}}人</div>
                    </div>
                </div>
                <div class="bd flex-1 align-center" id="bd">
                    <div class="flex-1 sexbg femalebg">
                        <div class="percent" :style="'width:'+data.sex.female.percent">
                            <div class="highlightbg" :style="'width:'+sexWidth+'px'"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            animate:false,
            data:{
                poverty:"0",
                probationary:"0",
                special:"0",
                sex: {
                    male: {
                        value: "",
                        percent: "",
                        name: ""
                    },
                    female: {
                        value: "",
                        percent: "",
                        name: ""
                    }
                },
            },
            queryParam:{
                org_id:""
            },
            sexWidth:""
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
            this.animate = 2;
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    methods: {
        getData: function(){
            home.partymem(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;

                this.sexWidth = document.getElementById("bd").offsetWidth
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData()

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });

        util.on('resize', () => {
            this.sexWidth = document.getElementById("bd").offsetWidth
        })
    }
}
</script>

<style scoped>
.colorBlock { height:90px;}
.gender .tip { padding-top:10px; padding-bottom:10px; margin-bottom:8px;}
.gender .tip span { display:inline-block; width:76px; height:34px; line-height:34px; position:relative; background-color:#40a7fe; border-radius:8px; font-size:16px;}
.gender .tip span::after { content:''; display:block; width:0; height:0; overflow:hidden; position:relative; border-width:7px 5px; border-color:#40a7fe transparent transparent; border-style:solid dashed dashed; position:absolute; left:50%; bottom:-14px; margin-left:-5px;}
.gender .women .tip span { background-color:#c05dd5;}
.gender .women .tip span::after { border-top-color:#c05dd5;} 

.gender .img { align-items:start; display:flex; justify-content:center;}
.gender .img img { max-height:150px; height:90%; width:auto;}

.male { border-bottom:#1c517e 1px solid; position:relative;}
.male::after { content:''; display:block; width:100%; height:0; overflow:hidden; position:absolute; left:0; bottom:0; border-bottom:#06152c 1px solid;}
.gender { text-align:center;}
.gender > .flex-1 > div { display:flex;}
.gender .hd { width:130px; line-height:1.2; margin-left:10px;}
.gender .bd { margin-right:10px;}
.gender .number { font-size:30px; color:#57bbff;}


.sexbg { height:70px; background:url(../../assets/img/sex_male1.png) 0 0 / 100% 100% no-repeat; position:relative;}
.sexbg .percent { width:0; height:100%; overflow:hidden; position:relative;}
.highlightbg { width:100%; height:100%; position:absolute; left:0; top:0; background:url(../../assets/img/sex_male2.png) 0 0 / 100% 100% no-repeat;}

.femalebg { background-image:url(../../assets/img/sex_female1.png)}
.femalebg .highlightbg { background-image:url(../../assets/img/sex_female2.png);}

.count { margin-bottom:6px; height:40px; line-height:40px; cursor:pointer; text-align:center; padding:14px 0; font-size:24px; color:#01e3f4; position:relative;}
.count img { vertical-align:-12px; margin-right:8px;}
.count .text { color:#ffffff; font-size:16px;}
.count .ion { position:absolute; right:20px; top:13px;}
.count:hover { background:rgba(0, 0, 0, .1);}
</style>
