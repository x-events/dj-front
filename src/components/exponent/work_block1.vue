<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="wico wi2"></i><strong>组织力指数</strong></div>
        </div>
        <div class="flex-1 flex-col" style="margin:10px;">
            <div class="_hd zhishubar">
                <div class="user gbox tc" @click="clicked">
                    <div class="digital textshadow">{{data.user.total}}</div>
                </div>
                <span class="userCount">{{data.user.one}}+{{data.user.two}}</span>
                <!-- <a class="gbox m intro boxshadow" @click="clicked"><i class="ion">&#xe868;</i> 指数构成<i class="el-icon-arrow-right"></i></a> -->
            </div>
            <div class="_bd flex-1 chartBox">
                <span class="chartHand flex-col">
                    <div class="flex-1 flex-row" v-for="(e,i) in data.result" :key="i" style="padding-top:10px;" @click="goDetail(e)">
                        <div class="text el">{{e.text}}</div>
                        <div class="flex-1">
                            <el-progress :percentage="Number(e.score_percent)" :color="colors[i]" :show-text="false" :stroke-width="15" class="per1" :class="{'noAvg':e.avg_percent === undefined}"></el-progress>
                            <el-progress :percentage="Number(e.avg_percent)" color="#3f79ff" :show-text="false" :stroke-width="15" v-if="e.avg_percent != undefined" class="per2" title="平均线"></el-progress>
                        </div>
                        <div class="score" :style="'color:'+colors[i]">{{e.score}}</div>
                    </div>
                </span>
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
            colors:["#22dada","#40d691","#ffd349","#ffaa56","#ff7d7d","#ff5252","#c05dd5"],
            data:{
                user:{
                    one:"",
                    total:"",
                    two:"",
                },
                result:[],
                total:0
            },
            total:"",
            queryParam:{
                org_id:""
            }
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
        goDetail(e){
            this.$router.push({name:'指标展示-工委',query:{bid:e.id,pid:''}})
        },
        clicked(){
            let exp_name;
            let path_arr = this.$route.path.split('/')
            exp_name = path_arr[path_arr.length-1]
            this.$router.push({path:'/window/'+this.$route.params.org_id+'/'+exp_name+'/exponent_index'})
        },
        getData: function(){
            home.getworkpoint(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
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
    }
}
</script>

<style scoped>
.user { position:absolute; left:0; top:0; padding:8px 8px 5px; font-size:12px; white-space:nowrap; cursor:pointer;}
.user .digital { font-size:20px; line-height:1.2; margin-right:10px; padding-left:10px; padding-right:10px;}
.user .status { line-height:34px;}

.intro { position:absolute; right:0; top:0; font-size:12px; padding:5px 7px 5px 10px; z-index:5;}
.gbox .ion { font-weight:bold;}

._hd { height:47px; position:relative; border-bottom:1px solid rgba(255, 255, 255, .35);}
.gbox { background:none; border-radius:0; padding:0;}
.user { color:#5f8fff; font-size:14px; line-height:1; left:5px;}
.user > div { display:inline-block;}
.user .digital { font-size:48px; margin-right:8px; line-height:1;}
.intro { background-color:#3f79ff; color:#ffffff; padding:7px 10px; border-radius:16px; line-height:1; top:2px; right:3px;}
.intro .ion { font-size:18px; vertical-align:-3px;}

.text,.score { line-height:30px;}
.text { font-size:14px; width:83px; padding-left:10px;}
.per1,.per2 { margin-top:3px;}
.score { width:55px; font-size:16px; font-weight:bold; padding-left:8px;}
.chartHand::after { display:none;}
.noAvg { margin-top:7px;}

.userCount { position:absolute; left:15px; top:14px; color:#00ecfc;}
</style>
