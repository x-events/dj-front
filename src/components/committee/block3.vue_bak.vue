<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar green" @click="$router.push({name:'主题党日活动-党支部'})">
            <div class="_title"><i class="wico wi7"></i><strong>主题党日活动</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 flex-col">
            <el-carousel :interval="5000" type="card" class="flex-1 cardCarousel">
                <el-carousel-item v-for="(item,index) in data" :key="index">
                    <img :src="item.cover_url" >
                    <h3 v-if="item.name">{{item.name}}</h3>
                </el-carousel-item>
            </el-carousel>
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
            data: [],
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
            committee.activity(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
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
.cardCarousel{overflow: hidden; padding-bottom:30px; margin:15px 15px 0;}
.el-carousel__item h3 {
    background: rgba(0,0,0,.3);
    padding:10px;
    box-sizing:border-box;
    color: #fff;
    font-size: 16px;
    position: absolute;
    left: 0;
    width:100%;
    bottom:0px;
    line-height: 20px;
    text-align: center;
    overflow: hidden;
    font-weight:normal;
  }
  .el-carousel__item img{
    width:100%;height: 100%;
  }
</style>