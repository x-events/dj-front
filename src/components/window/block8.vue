<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInRight faster delay3':animate == 1,'animated fadeOutRight faster':animate == 2}">
        <div class="channelBar orange" @click="$router.push({name:'为民办实事-党工委'})">
            <div class="_title"><i class="wico wi6"></i><strong>为民办实事</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 chartBox flex-col" style="margin-top:10px; padding-top:10px;">
            <div class="flex-1 flex-row" v-for="(e,i) in data.series" :key="i" @click="goDetail(e)" :title="e.text">
                <div class="text el">{{e.name}}</div>
                <div class="flex-1" :class="'color'+(i+1)">
                    <el-progress :percentage="0" :color="colors[i]" :show-text="false" :stroke-width="15" class="per1" v-if="data.count == '0'"></el-progress>
                    <el-progress :percentage="Number(e.value)/Number(data.count)*100" :color="colors[i]" :show-text="false" :stroke-width="15" class="per1" v-else></el-progress>
                </div>
                <div class="score" :style="'color:'+colors[i]">{{e.value}}</div>
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
                count:0,
                series:[]
            },
            queryParam:{
                org_id:""
            },
            colors:["#e03e3d","#7caf2d","#097c8d","#7732b5","#3f56d1","#ff5252","#c05dd5"],
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
            home.doGoodCountPie(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data
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
.text,.score { line-height:26px;}
.text { font-size:12px; width:73px; padding-left:10px; color:#3ce1ff;}
.per1 { margin-top:6px;}
.score { width:40px; line-height:28px; font-size:13px; font-weight:normal; padding-left:8px; color:#ffffff!important;}

.color1 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#e03e3d,#e78b5a)!important;}
.color2 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#7caf2d,#c0e66d)!important;}
.color3 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#097c8d,#74e3d8)!important;}
.color4 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#7732b5,#b65cde)!important;}
.color5 .per1 /deep/ .el-progress-bar__inner { background:linear-gradient(to left,#3f56d1,#2eb1d7)!important;}
</style>