<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay3':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar cyan" @click="$router.push({name:'党员活跃度'})">
            <div class="_title"><i class="wico wi3"></i><strong>党员活跃度</strong></div>
            <div class="_ext"><i class="ion">&#xe62a;</i></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;" v-if="!dataStatus">
            <div class="controlbar tc pr">
                得分： <span class="gbox pointer" @click="$router.push({name:'党员活跃度'})">{{total}}</span>
                <a class="leftBtn" id="hyBtn_left" v-if="data.length > 0"><i class="ion">&#xe664;</i></a>
                <a class="rightBtn" id="hyBtn_right" v-if="data.length > 0"><i class="ion">&#xe667;</i></a>
            </div>
            <div class="flex-1" style="margin-left:10%; margin-right:10%;">
                <swiper v-if="data.length > 1" :options="swiperOption" class="flex-col">
                    <swiper-slide v-for="(e,i) in data" :key="i" class="flex-col">
                        <div class="pr flex-1 pieprogress" :title="e.title" @click="goDetail(i,e)"><pieprogress :number="e.score" :total="e.total || '10'" :color="colors[i]" :fontsize="18" /></div>
                        <div class="title el" :title="e.title" @click="goDetail(i,e)">{{e.title}}</div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="swiper-pagination" slot="pagination" id="hy"></div>
        </div>
        <!-- <div class="flex-1 scrollbar" style="margin:10px;" v-if="dataStatus">
            <div class="fix list">
                <el-row :gutter="35">
                    <el-col :span="12" v-for="(e,i) in data" :key="i" :title="e.title + '：'+e.score">
                        <dl class="flex-row">
                            <dt class="flex-1 el">{{e.title}}</dt>
                            <dd>{{e.score}}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </div>
        </div> -->
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            animate:false,
            swiperOption: {
                autoplay: {
                    delay:5000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                slidesPerView:3,
                slidesPerGroup:3,
                loop:false,
                pagination: {
                    el: '#hy',
                    clickable:false
                },
                navigation: {
                    prevEl: '#hyBtn_left',
                    nextEl: '#hyBtn_right'
                }
            },
            colors:['#ff8300','#4683ff','#c453ff','#ff5b29','#9dfcff','#2deb8b','#ffe119','#0dc8b9','#6ac32e','#ff3d3d'],
            data:[],
            total:0,

            dataStatus:false,
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
            this.$router.push({name: '党员活跃度详情', query: e});
        },
        getData: function(){
            home.getMemberActive(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
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
        this.getData();

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
.screen_small .swiper-slide { width:90px;}
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