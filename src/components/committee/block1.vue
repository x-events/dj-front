<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="wico wi11"></i><strong>党组织基本信息</strong></div>
        </div>
        <div class="flex-1 flex-col" style="margin:15px 15px;">
            <dl class="info flex-1 scrollbar">
                <dt class="el" :title="data.short_name">{{data.short_name}}</dt>
                <dd class="el" :title="'党员数：'+data.member_num"><strong class="t">党员数：</strong>{{data.member_num}}</dd>
                <dd class="el" :title="'换届时间：'+data.change_time"><strong class="t">换届时间：</strong>{{data.change_time}}</dd>
                <dd class="el" :title="'属性：'+data.org_type"><strong class="t">属性：</strong>{{data.org_type}}</dd>
                <dd class="el" :title="'联系方式：'+data.tel"><strong class="t">联系方式：</strong>{{data.tel}}</dd>
                <dd class="el" :title="'地址：'+data.addr" style="width:100%;"><strong class="t">地址：</strong>{{data.addr}}</dd>
            </dl>
            <div class="members flex-row">
                <a class="leftBtn" id="cyBtn_left" v-if="members.length > 0"><i class="ion">&#xe664;</i></a>
                <div class="flex-1">
                    <swiper v-if="members.length > 0" :options="swiperOption" class="flex-col">
                        <swiper-slide v-for="(e,i) in members" :key="i">
                            <div class="meminfo flex-row">
                                <div class="face"><img :src="e.avatar" :alt="e.realname"></div>
                                <div class="flex-1">
                                    <div class="realname el" :title="e.realname">{{e.realname}}</div>
                                    <div class="role el" :title="e.role">{{e.role}}</div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
                <a class="rightBtn" id="cyBtn_right" v-if="members.length > 0"><i class="ion">&#xe667;</i></a>
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
                name:"",
                short_name:"",
                change_time:"",
                member_num:"0",
                org_type:"",
                tel:"",
                addr:""
            },
            members:[],
            queryParam:{
                org_id:""
            },
            swiperOption: {
                slidesPerView:3,
                slidesPerGroup:3,
                loop:false,
                pagination: {
                    el: '#hyd',
                    clickable:false
                },
                navigation: {
                    prevEl: '#cyBtn_left',
                    nextEl: '#cyBtn_right'
                }
            },
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
        showDetail(uid){
            util.emit('dy_dialog',uid);
        },
        getData: function(){
            committee.view(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
            })
            committee.members(this.queryParam).then(res => {
                let data = res.data.data;
                this.members = data;
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
.info { line-height:1.5; padding:10px 20px 0px; overflow:hidden;}
.info dt { font-size:18px; color:#01e3f4; margin-bottom:5px;}
.info dd { width:50%; float:left; height:34px; line-height:34px;}
.info strong.t { font-weight:normal; color:#01e3f4;}

.members { height:90px; text-align:center}
.members > a { line-height:90px; width:40px;}

.meminfo { max-width:150px; margin-left:auto; margin-right:auto;}
.meminfo .face { width:70px; height:70px; border:#fff 2px solid; border-radius:50%; box-sizing:border-box; overflow:hidden; position:relative; margin-right:10px;}
.meminfo .face img { width:100%; height:100%; position:absolute; left:0; top:0;}
.meminfo .realname { text-align:left; font-size:14px; color:#68d8fe; margin-top:8px;}
.meminfo .role { font-size:12px; color:#bdfaff; text-align:left;}
</style>
