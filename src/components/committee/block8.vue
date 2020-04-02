<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar" @click="$router.push({name:'工作管理'})">
            <div class="_title"><i class="wico wi5"></i><strong>工作记实</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 flex-col">
            <div class="flex-1">
                <div class="flex-row total tc" style="min-height:53px;">
                    <div class="flex-1 inbox ib1">
                        <i class="ion">&#xe65b;</i>
                        <div class="number">{{data.amount_all}}</div>
                        <div class="name">工作总数</div>
                    </div>
                    <div class="flex-1 inbox ib2">
                        <i class="ion">&#xe69c;</i>
                        <div class="number">{{data.amount_out}}</div>
                        <div class="name">已完成</div>
                    </div>
                    <div class="flex-1 inbox ib3">
                        <i class="ion">&#xe62d;</i>
                        <div class="number">{{data.amount_on}}</div>
                        <div class="name">待完成</div>
                    </div>
                </div>
                <div class="flex-1 list fix">
                    <dl v-for="(e,i) in progress" :key="i" :title="e.name+'：'+e.count+e.unity">
                        <dd>{{e.count}}<span class="unit">{{e.unity}}</span></dd>
                        <dt class="el">{{e.name}}</dt>
                    </dl>
                </div>
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
            data:{
                amount_all:0,
                amount_on:0,
                amount_out:0,
                percent:0
            },
            progress:[],
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
            committee.work_record(this.queryParam).then(res => {
                let data = res.data.data;

                this.data.amount_all = data.amount_all;
                this.data.amount_on = data.amount_on;
                this.data.amount_out = data.amount_out;
                
                this.progress = data.list;

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
.total { padding:10px 1% 11px;}
.total .name { font-size:12px;}
.total .number { font-size:18px; line-height:1.2; white-space:nowrap; margin-top:7px;}

.inbox { display:inline-block; min-width:70px; height:53px; text-align:center; position:relative; padding-left:45px;background-color:#e6436e; border-radius:5px; overflow:hidden; margin:0 1%;}
.inbox .ion { width:45px; height:100%; position:absolute; left:0px; top:0px; background-color:#ff90ae; font-size:0;}
.inbox .ion::before { content:''; display:block; width:36px; height:36px; background:url(../../assets/img/wjs_ico.png) no-repeat; position:absolute; left:5px; top:50%; margin-top:-18px;}
.ib2 { background-color:#eb8a2a;}
.ib2 .ion { background-color:#ffd163;}
.ib2 .ion::before { background-position:-36px 0;}
.ib3 { background-color:#24b781;}
.ib3 .ion { background-color:#58e4b1;}
.ib3 .ion::before { background-position:-72px 0;}

.list dl { width:25%; height:95px; float:left; text-align:center; border:#0f476d 1px solid; border-left-width:0; margin:-1px -1px 0 0;}
.list dd { color:#ffeb08; font-size:24px; padding-top:20px; line-height:1.2;}
.list .unit { font-size:16px; display:inline-block; vertical-align:2px;}
</style>