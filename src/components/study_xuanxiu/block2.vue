<template>
    <div class="flex-col vbHidden block_wrap_normal" :class="{'animated fadeInDown faster delay2':animate == 1,'animated fadeOutUp faster':animate == 2}">
        <div class="flex-row" style="margin-bottom:12px;">
            <div class="colorBlock flex-1">
                <div class="box">
                    <div class="num digital">{{data.select_total}}</div>
                    <div class="title">总课程数</div>
                </div>
            </div>
            <div class="colorBlock cyan flex-1">
                <div class="box">
                    <div class="num digital">{{data.credit}}</div>
                    <div class="title">总学时</div>
                </div>
            </div>
            <div class="colorBlock green flex-1">
                <div class="box">
                    <div class="num digital">{{data.select_num}}</div>
                    <div class="title">选学课程数</div>
                </div>
            </div>
            <div class="colorBlock yellow flex-1">
                <div class="box">
                    <div class="num digital">{{data.book_total}}</div>
                    <div class="title">党建读物数</div>
                </div>
            </div>
            <!-- <div class="colorBlock orange flex-1">
                <div class="num digital">接口缺少</div>
                <div class="title">党建读物总学时</div>
            </div> -->
        </div>
        <div class="block_wrap_opc withTitle flex-1 flex-col" style="margin:0;">
            <div class="channelBar orange">
                <div class="_title"><i class="ion">&#xe615;</i><strong>选学人数和时长</strong></div>
            </div>
            <div class="flex-1 chartBox" style="margin:10px;">
                <barline :data="chartData" axisPointer="line" :colors="['#2795fa','#f96605']" />
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
                select_total:0,
                credit:0,
                select_num:0,
                book_total:0
            },
            chartData:{},
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
        getData: function(){
            home.computeNum(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
            })
            home.num_duration(this.queryParam).then(res => {
                let data = res.data.data;
                this.chartData = data;
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
.gender .tip { padding-top:10px; padding-bottom:10px; margin-bottom:8px;}
.gender .tip span { display:inline-block; width:76px; height:34px; line-height:34px; position:relative; background-color:#40a7fe; border-radius:8px; font-size:16px;}
.gender .tip span::after { content:''; display:block; width:0; height:0; overflow:hidden; position:relative; border-width:7px 5px; border-color:#40a7fe transparent transparent; border-style:solid dashed dashed; position:absolute; left:50%; bottom:-14px; margin-left:-5px;}
.gender .women .tip span { background-color:#c05dd5;}
.gender .women .tip span::after { border-top-color:#c05dd5;} 

.gender .img { align-items:start; display:flex; justify-content:center;}
.gender .img img { max-height:150px; height:90%; width:auto;}

.colorBlock { height:70px;}
</style>
