<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInRight faster delay2':animate == 1,'animated fadeOutRight faster':animate == 2}">
        <div class="channelBar orange">
            <div class="_title"><i class="wico wi5"></i><strong>专业特长</strong></div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <pie :data="data" radius="40%,60%" :label="true" :colors="colors" />
            <div class="total blue" v-if="data.total != undefined">
                <div class="num">{{data.total}}人</div>
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
            },
            colors: ['#faeb3f','#ea267a','#33acdf','#fab037','#a42fe9','#df3b31','#40c56e','#69ce2e','#343bc8']
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
            home.worker(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data.majorthey;
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
.total { width:70px; height:50px; text-align:center; position:absolute; left:50%; top:48%; margin:-25px 0 0 -35px; line-height:1.2}
.total .num { font-size:22px; color: #fff; }
</style>