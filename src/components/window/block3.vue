<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay4':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar green" @click="showdialog">
            <div class="_title"><i class="wico wi4"></i><strong>书记有为值</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;" v-loading="loading">
            <div class="controlbar tc pr" v-if="data.length > 0">
                <a class="leftBtn" id="ywBtn_left"><i class="ion">&#xe664;</i></a>
                <a class="rightBtn" id="ywBtn_right"><i class="ion">&#xe667;</i></a>
            </div>
            <div class="flex-1" style="min-height:175px;">
                <div class="scoreBar" v-if="score != ''" @click="maxMemberInfo()">
                    得分：<span class="scorebox">{{score}}</span>
                </div>
                <swiper v-if="data.length > 0" :options="swiperOption" ref="mySwiper" class="swiperBox">
                    <swiper-slide v-for="(e,i) in data" :key="i" @click.native="memberInfo(e)">
                        <div class="tc score">
                            <span class="gbox">{{e.score}}</span>
                        </div>
                        <div class="userCard">
                            <div class="avatar"><img :src="e.avatar || $root.default.face" :alt="e.name" :onerror="$root.default.errorface"></div>
                            <div class="name">{{e.name}}</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="swiper-pagination" slot="pagination" id="sjyw"></div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            cur_org_id:this.$route.params.org_id,
            loading:true,
            animate:false,
            swiperOption: {
                autoplay: {
                    delay:5000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                //effect: 'coverflow',
                //grabCursor: true,
                //centeredSlides: true,
                slidesPerView:3,
                slidesPerGroup:3,
                // coverflowEffect: {
                //     rotate:0,
                //     stretch:10,
                //     depth:20,
                //     modifier:5,
                //     slideShadows:false
                // },
                loop:false,
                pagination: {
                    el: '#sjyw'
                },
                navigation: {
                    prevEl: '#ywBtn_left',
                    nextEl: '#ywBtn_right'
                }
            },
            data:[],
            score:"",
            queryParam:{
                org_id:""
            }
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.data = [];
            this.animate = 2;
            this.getData();
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        memberInfo(item){
            if(item.org_id){
                this.$router.push({name:'书记信息',query:{id:item.org_id}})
            }
        },
        maxMemberInfo(){
            let org_id = "";
            if(this.queryParam.org_id == 0){
                org_id = this.$root.user.org_id;
            }else{
                org_id = this.queryParam.org_id;
            }
            this.$router.push({name:'书记信息',query:{id:org_id}})
        },
        destroySwiper() {
            this.swiper.destroy();
        },
        showdialog(){
            util.emit('sjyw_dialog')
        },
        getData: function(){
            home.getMemberDoneFive(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                /* let count = 0;
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    count += 1;
                    if(count == 6) count = 1
                    e.bgNum = count;
                }
                this.data = data.slice(0,5); */
                this.data = data;
                this.score = res.data.extra || "";

                if(this.data.length < 3){
                    this.swiperOption.loop = false;
                    this.swiperOption.autoplay = false;
                }else{
                    //this.swiperOption.loop = true;
                    //this.swiperOption.autoplay = false;
                    this.swiperOption.autoplay = {
                        delay:5000,
                        stopOnLastSlide:false,
                        disableOnInteraction:false,
                    }
                }
                
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        setTimeout(() => {
            this.getData();
        }, 1500);

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.data = [];
            this.animate = 2;
        });
    }
}
</script>

<style scoped>
.flex-col { height:100%;}
.swiper-slide { position:relative; color:#fff; text-align:center; background-repeat:no-repeat; background-size:100% 100%; opacity:1; cursor:pointer;}
.controlbar { padding:0 80px; height:0px; position:relative; z-index:10;}
.controlbar a { position:absolute; top:110px; width:30px; height:30px; line-height:30px; font-size:16px;}
.controlbar .leftBtn { left:10px;}
.controlbar .rightBtn { right:10px;}
.score { margin-top:15px;}
.gbox { visibility:visible; padding:0; line-height:20px; border-radius:15px; display:inline-block; font-size:16px; color:#85420b; background:#ffeb08; padding:0 10px;}
.swiper-slide-active { opacity:1;}
.swiper-slide-active .gbox { visibility:visible;}
.userCard { padding:.5em;}

.userCard .avatar { position:relative; width:65px; height:65px; border-radius:50%; border:#fff 2px solid; box-sizing:border-box; overflow:hidden; margin:0 auto 8px;}
.userCard .avatar img { position:absolute; width:100%; height:100%; left:0; top:0;}
.userCard .name { font-size:1em; margin-top:.2em;}
.swiperBox { margin:0 50px;}

.scoreBar { padding: 10px; line-height: 26px; text-align: right; border-bottom: #1c4b77 1px solid; position:relative; cursor:pointer;}
.scoreBar::after { content: ''; display: block; width: 100%; height: 0; border-bottom: #06142a 1px solid; position: absolute; left: 0; bottom: 0;}
</style>