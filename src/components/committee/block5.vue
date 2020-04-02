<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar orange" @click="$router.push({name:'党员活跃度-党支部'})">
            <div class="_title"><i class="wico wi12"></i><strong>党员活跃度</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;">
            <div class="controlbar tc pr">
                得分： <span class="gbox pointer" @click="$router.push({name:'党员活跃度-党支部'})">{{total}}</span>
                <a class="leftBtn" id="hydBtn_left" v-if="data.length > 0"><i class="ion">&#xe664;</i></a>
                <a class="rightBtn" id="hydBtn_right" v-if="data.length > 0"><i class="ion">&#xe667;</i></a>
            </div>
            <div class="flex-1" style="margin-left:10%; margin-right:10%;">
                <swiper v-if="data.length > 1" :options="swiperOption" class="flex-col">
                    <swiper-slide v-for="(e,i) in data" :key="i" class="flex-col">
                        <div class="pr flex-1 pieprogress" :title="e.title"><pieprogress :number="e.score" :total="e.total || '10'" :color="colors[i]" :fontsize="18" /></div>
                        <div class="title el" :title="e.title">{{e.title}}</div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="swiper-pagination" slot="pagination" id="hyd"></div>
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
            swiperOption: {
                slidesPerView:3,
                slidesPerGroup:3,
                loop:false,
                pagination: {
                    el: '#hyd',
                    clickable:false
                },
                navigation: {
                    prevEl: '#hydBtn_left',
                    nextEl: '#hydBtn_right'
                }
            },
            colors:['#ff8300','#4683ff','#c453ff','#ff5b29','#9dfcff','#2deb8b','#ffe119','#0dc8b9','#6ac32e','#ff3d3d'],
            data:[],
            swiperData:[],
            total:0,
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
        goDetail(i,e){
            //console.log(i,e);
            this.$router.push({name: '党员活跃度详情-党支部', query: e});
        },
        getData: function(){
            committee.getMemberActive(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;

                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    e.index = i+1
                }

                let newData = [];
                for(let i=0;i<data.length;i+=2){
                    newData.push(data.slice(i,i+2));
                }
                //console.log(newData);
                this.swiperData = newData

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
.flex-col { height:100%;}
.swiper-slide { width:120px; position:relative; color:#fff; text-align:center;}
.title { font-size:12px; color:#68d8fe;}
.controlbar { padding:10px; line-height:26px; text-align:right; border-bottom:#1c4b77 1px solid; position:relative;}
.controlbar::after { content:''; display:block; width:100%; height:0; border-bottom:#06142a 1px solid; position:absolute; left:0; bottom:0;}
.controlbar a { position:absolute; top:115px; width:30px; height:30px; line-height:30px; font-size:16px;}
.controlbar .leftBtn { left:10px;}
.controlbar .rightBtn { right:10px;}
.gbox { background-color:#ffeb08; color:#85420b; font-size:22px; height:26px; line-height:26px; padding:0 10px; border-radius:13px;}

.list dl { position:relative; height:28px; line-height:28px; padding-left:10px; padding-right:10px;}
.list dl:hover { background-color:rgba(255, 255, 255, .2);}
.list dt,.list dd { display:inline-block; vertical-align:top;}
.list dt { margin-right:12px; max-width:90%;}
.list dd { color:#9dfcff; min-width:45px;}

.pieprogress .myChart /deep/ div { margin-left:auto!important; margin-right:auto!important;}
</style>