<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar red">
            <div class="_title"><i class="ion">&#xe611;</i><strong>党费缴纳基数</strong></div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <pie :data="data" radius="50%,70%" />
            <div class="total blue" v-if="data.avg">
                <div class="num">{{data.avg}}</div>
                <div class="name">平均基数</div>
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
            data:{},
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
            home.feebase(this.queryParam).then(res => {
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
};
</script>

<style scoped>
.total { width:70px; height:50px; text-align:center; position:absolute; left:50%; top:45%; margin:-25px 0 0 -35px; line-height:1.2}
.total .num { font-size:22px;}
</style>