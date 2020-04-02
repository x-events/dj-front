<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title"><i class="wico wi15"></i><strong>党员活跃度详情</strong> </div>
            <div class="_ext">得分：<span class="scorebox">{{total}}</span></div>
        </div>
        <div class="flex-1 flex-col hyd" style="margin:10px;">
            <div class="flex-1 flex-row">
                <div class="flex-1 flex-col hand" v-for="(e,i) in data1" :key="i" :title="e.title" @click="goDetail(i,e)">
                    <div class="flex-1 pr">
                        <pieprogress :number="e.score" :color="data1_colors[i]" :fontsize="24" :radiusSet="['60%','70%']" />
                    </div>
                    <div class="name el">{{e.title}}</div>
                </div>
            </div>
            <div class="flex-1 flex-row">
                <div class="flex-1 flex-col hand" v-for="(e,i) in data2" :key="i" :title="e.title" @click="goDetail(i,e)">
                    <div class="flex-1 pr">
                        <pieprogress :number="e.score" :color="data2_colors[i]" :fontsize="24" :radiusSet="['60%','70%']" />
                    </div>
                    <div class="name el">{{e.title}}</div>
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
            data1:[],
            data1_colors:["#ffcf06","#88d013","#0ab8ca","#116feb","#861edf"],
            data2:[],
            data2_colors:["#ffcf06","#88d013","#0ab8ca","#116feb","#861edf"],
            total:0,
            queryParam:{
                org_id:""
            },
            fromPage:"",
            routerNames:["党费缴纳","专题学习","必修课"]
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
        goDetail(i,e){
            if(this.$route.name == '党员活跃度'){
                this.$router.push({name: '党员活跃度详情', query: e});
            }
            if(this.$route.name == '党员活跃度-党支部'){
                this.$router.push({name: '党员活跃度详情-党支部', query: e});
            }
        },
        getData: function(){
            home.getMemberActive(this.queryParam).then(res => {
                let data = res.data.data;
                this.data1 = data.slice(0,5);
                this.data2 = data.slice(5,10);
                this.total = res.data.total;
            })
        }
    },
    created: function() {
        this.fromPage = this.$route.matched[1].name || ""
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
};
</script>

<style scoped>
.digital { margin-left:15px; font-size:20px; vertical-align:-2px;}
.hyd { text-align:center;}
.hyd .flex-col { padding-bottom:10px; position:relative;}
.hyd .flex-col .name { width:100%; position:absolute; left:0; bottom:0;color:#00ccff;}
</style>