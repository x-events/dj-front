<template>
    <div class="block_wrap_normal flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}" id="block_1" @mouseenter="pauseToggle()" @mouseleave="startToggle()">
        <div class="block_wrap_opc flipboard flipboard1 material flex-col">
            <div class="channelBar" @click="clicked">
                <div class="_title"><i class="wico wi2"></i><strong>组织力指数</strong></div>
                <div class="_ext"><i class="ion">&#xe62a;</i></div>
            </div>
            <div class="flex-1 flex-col" style="margin:10px;">
                <div class="_hd">
                    <div class="user gbox tc" v-if="data.user" @click="clicked">
                        得分： 
                        <div class="scorebox">{{data.user.total}}</div>
                        <div class="hidden">{{data.user.one}}+{{data.user.two}}</div>
                    </div>
                    <span class="userCount">{{data.user.one}}+{{data.user.two}}</span>
                    <!-- <a class="gbox m intro boxshadow" @click="$router.push({name:'组织力指数考核体系'})">指数构成</a> -->
                </div>
                <div class="_bd flex-1 chartBox">
                    <span class="chartHand flex-col">
                        <div class="flex-1 flex-row" v-for="(e,i) in data.result" :key="i" @click="goDetail(e)" :title="e.text">
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
        <div class="block_wrap_opc flipboard flipboard2 material flex-col" style="display:none;">
            <div class="channelBar">
                <div class="_title"><i class="ion">&#xe620;</i><strong>重点关注</strong></div>
                <div class="_ext" @click="manualToggle"><i class="ion">&#xe62a;</i></div>
            </div>
            <div class="flex-1 chartBox" style="margin:10px;">
                <div class="rank_list">
                    <el-table :data="focusData" style="width: 100%" class="comTable focusData">
                        <el-table-column prop="short_name" label="党组织" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="result" label="组织力指数" align="center" width="100"></el-table-column>
                        <el-table-column prop="item_name" label="待提升" width="120" align="right"></el-table-column>
                    </el-table>
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
            dom: null,
            timer: null,
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
        manualToggle(){
            if(this.dom.classList.contains('mflip')){
                this.dom.classList.remove('mflip')
            }else{
                this.dom.classList.add('mflip')
            }
        },
        toggleFlip: function(){
            this.timer = setTimeout(() => {
                if(this.dom.classList.contains('mflip')){
                    this.dom.classList.remove('mflip')
                }else{
                    this.dom.classList.add('mflip')
                }
                this.toggleFlip()
            }, 6000)
        },
        pauseToggle(){
            clearTimeout(this.timer);
        },
        startToggle(){
            //this.toggleFlip();
        },
        goDetail(e){
            if(!e.id){ return }
            if((this.$route.params.org_id == 0 && this.$root.user.org_type == '1') || (this.$route.params.org_id != 0 && this.$root.default.tree_org_type == '1')){
                this.$router.push({name:'指标展示-工委',query:{bid:e.id,pid:''}})
            }
            if((this.$route.params.org_id == 0 && this.$root.user.org_type == '2') || (this.$route.params.org_id != 0 && this.$root.default.tree_org_type == '2')){
                this.$router.push({name:'指标展示-党委',query:{bid:e.id,pid:''}})
            }
        },
        clicked(){
            if((this.$route.params.org_id == '0' && this.$root.user.org_type == '1') || (this.$route.params.org_id != '0' && this.$root.default.tree_org_type == '1')){
                this.$router.push({name:'党建指数-工委'})
            }
            if((this.$route.params.org_id == '0' && this.$root.user.org_type == '2') || (this.$route.params.org_id != '0' && this.$root.default.tree_org_type == '2')){
                this.$router.push({name:'党建指数-党委'})
            }
        },
        getData: function(){
            home.getworkpoint(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
                if(!this.$root.default.tree_org_type && data.user && data.user.org_type){
                  this.$root.default.tree_org_type = data.user.org_type;
                }
            })
            // home.focus_on(this.queryParam).then(res => {
            //     let data = res.data.data;
            //     this.focusData = data;
            // })
        }
    },
    mounted: function(){
        this.dom = document.getElementById('block_1')
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData()

        setTimeout(() => {this.animate = 1;this.startToggle()},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });
    }
}
</script>

<style scoped>
#block_1 { padding-top:32px; position:relative; border:1px solid transparent; overflow:visible;}
.user { position:absolute; left:0; top:0; padding:8px 8px 5px; font-size:12px; white-space:nowrap; cursor:pointer;}
.user .digital { font-size:20px; line-height:1.2;}

.intro { position:absolute; right:0; top:0; font-size:12px; padding:5px 7px 5px 10px; z-index:5;}

.flipboard{position: absolute;left:0;top:0;width:100%;height: 100%;transition: all 1s ease 0.1s; margin:0;/*  background-color:#273d65; */ box-sizing:border-box;}
.flipboard1{z-index: 2;}
.flipboard2{z-index: 1;transform: rotateY(180deg);}
.mflip .flipboard1 {
  transform:rotateY(180deg);
}
.mflip .flipboard2 {
  z-index: 3;
  transform:rotateY(360deg);
}

.comTable { color:#ffffff;}
.comTable::before { display:none;}

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

.userCount { position:absolute; left:15px; top:14px; color:#00ecfc;}
</style>

<style>
.focusData .el-table__empty-text,.focusData thead { color:#ffffff;}
.focusData th:first-child > .cell { padding:0;}
.focusData th >.cell { font-weight:normal;}
.focusData .el-table__header { background-color:transparent;}
.focusData.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.focusData.el-table td,.focusData.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>