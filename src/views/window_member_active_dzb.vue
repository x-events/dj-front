<template>
    <div class="newWindow flex-col">
        <div class="flex-1 flex-col" style="margin:10px;">
            <div class="flex-1 flex-row">
                <div class="block_wrap_opc flex-1 flex-col hand" v-for="(e,i) in data1" :key="i" :title="e.title">
                    <div class="flex-1 flex-col childBox">
                        <div class="hd">
                            <div class="btitle">{{e.title}}</div>
                        </div>
                        <div class="chartBox flex-1">
                            <span class="total">总分：{{e.total}}分</span>
                            <pieprogress :number="e.score" :total="e.total" :color="data1_colors[i]" :fontsize="25" radiotype="bold" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex-row">
                <div class="block_wrap_opc flex-1 flex-col hand" v-for="(e,i) in data2" :key="i" :title="e.title">
                    <div class="flex-1 flex-col childBox">
                        <div class="hd">
                            <div class="btitle">{{e.title}}</div>
                        </div>
                        <div class="chartBox flex-1">
                            <span class="total">总分：{{e.total}}分</span>
                            <pieprogress :number="e.score" :total="e.total" :color="data2_colors[i]" :fontsize="25" radiotype="bold" />
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
            data1:[],
            data1_colors:["#ffd30a","#8bd214","#15c7d1","#2586f4","#7b28db"],
            data2:[],
            data2_colors:["#ffd30a","#8bd214","#15c7d1","#2586f4","#7b28db"],
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
.childBox { color:#00ecfc;}
.childBox .hd { text-align:center; padding-top:28px; cursor:pointer; position:relative;}
.childBox .hd::after { content:''; display:block; width:100%; height:100%; position:absolute; left:0; top:0; cursor: default;;}
.childBox .hd .btitle { display:inline-block; position:relative; width:auto; height:47px; line-height:46px; background:rgba(19, 96, 167, .4); padding:0 35px; font-size:18px;}
.childBox .hd:hover .btitle { background:rgba(19, 96, 167, .7);}
.childBox .btitle::before,.childBox .btitle::after { content:''; display:block; width:14px; height:57px; background:url(../assets/img/title_corner.png) no-repeat; position:absolute; top:-5px;}
.childBox .btitle::before { left:-5px;}
.childBox .btitle::after { right:-5px; background-position:right 0;}
.childBox .chartBox { height:240px;}
.childBox .chartBox .total { font-size:12px; position:absolute; right:15px; top:10%; left:auto!important; width:auto!important;}
</style>