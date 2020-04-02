<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar cyan" @click="clicked">
            <div class="_title"><i class="wico wi2"></i><strong>组织力指数</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 flex-col pr" style="margin:10px;">
            <div class="_hd">
                <div class="user gbox tc pointer" v-if="data.user" @click="clicked">
                    得分： 
                    <div class="scorebox">{{data.user.total}}</div>
                    <div class="hidden">{{data.user.one}}+{{data.user.two}}</div>
                </div>
                <!-- <a class="gbox m intro boxshadow" @click="$router.push({name:'指数构成'})">指数构成</a> -->
            </div>
            <div class="_bd flex-1 chartBox">
                <span class="chartHand flex-col">
                    <div class="flex-1 flex-row" v-for="(e,i) in data.result" :key="i" :title="e.text" @click="goDetail(e)">
                        <div class="text el">{{e.text}}</div>
                        <div class="flex-1" :class="'color'+(i+1)">
                            <el-progress :percentage="Number(e.score_percent)" :color="colors[i]" :show-text="false" :stroke-width="e.avg_percent != undefined ? 8:15" class="per1" :class="{'noAvg':e.avg_percent === undefined}"></el-progress>
                            <el-progress :percentage="Number(e.avg_percent)" color="#00ecfc" :show-text="false" :stroke-width="8" v-if="e.avg_percent != undefined" class="per2" title="平均线"></el-progress>
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
import * as committee from "@/api/committee";

export default {
    data() {
        return {
            animate:false,
            colors:["#e03e3d","#7caf2d","#097c8d","#7732b5","#3f56d1","#ff5252","#c05dd5"],
            data:{
                result:[],
                user:{}
            },
            queryParam:{
                org_id:""
            },
            focusData:[]
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
            if(!e.id){ return }
            this.$router.push({name:'指标展示-党支部',query:{bid:e.id,pid:''}})
        },
        clicked(){
            this.$router.push({name:'组织力指数考核体系-党支部'})
        },
        getData: function(){
            committee.getworkpoint(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
            })
            // committee.focus_on_view(this.queryParam).then(res => {
            //     let data = res.data.data;
            //     this.focusData = data.exponent_item;
            // })
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
.user { position:absolute; right:0; top:0; font-size:12px; white-space:nowrap;}
.user .digital { font-size:20px; line-height:1.2; padding:8px 8px 5px; display:inline-block; cursor:pointer;}
.user .status { vertical-align:3px; margin-right:10px;;}
.intro { position:absolute; left:0; top:0; font-size:12px; padding:5px 7px 5px 10px;}
.focusInfo { margin-top:0px; border:#1298d3 1px dotted; padding:10px; font-size:13px; width:120px; margin-bottom:3px;}
.focusInfo dt { margin-bottom:5px;}
.focusInfo dd { position:relative; min-height:22px; line-height:22px; margin-bottom:4px; padding-left:10px;}
.focusInfo dd::before { content:''; display:block; width:3px; height:3px; border:#1298d3 1px solid; border-radius:50%; position:absolute; left:0; top:7px;}

._hd { height:54px; position:relative; border-bottom:1px solid #1c4874;}
._hd::after { content:''; display:block; width:100%; height:0; overflow:hidden; border-bottom:#06142b 1px solid; position:absolute; left:0; bottom:0;}
.gbox { background:none; border-radius:0; padding:0;}
.user { color:#ffffff; font-size:14px; line-height:1; right:6px; left:auto; top:12px;}
.user > div { display:inline-block;}
.user .digital { font-size:48px; margin-right:8px; line-height:1;}
.intro { background-color:#2fc79c; font-size:14px; color:#ffffff; padding:6px 10px; border-radius:16px; line-height:1; top:12px; left:12px; right:auto;}
.intro .ion { font-size:18px; vertical-align:-3px;}

._bd { padding-top:5px; padding-bottom:5px;}
.text,.score { line-height:26px;}
.text { font-size:12px; width:73px; padding-left:10px; color:#3ce1ff;}
.per1,.per2 { margin-top:3px;}
.score { width:55px; line-height:28px; font-size:13px; font-weight:normal; padding-left:8px; color:#ffffff!important;}
.chartHand { position:static;}
.chartHand::after { display:none;}
.noAvg { margin-top:7px;}

.color1 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#e03e3d,#e78b5a)!important;}
.color2 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#7caf2d,#c0e66d)!important;}
.color3 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#097c8d,#74e3d8)!important;}
.color4 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#7732b5,#b65cde)!important;}
.color5 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#3f56d1,#2eb1d7)!important;}
</style>