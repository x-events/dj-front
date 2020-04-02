<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInRight faster delay2':animate == 1,'animated fadeOutRight faster':animate == 2}">
        <div class="channelBar cyan">
            <div class="_title"><i class="ion">&#xe617;</i><strong>指数趋势</strong></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;">
            <barline :data="data" axisPointer="line" :colors="['#2ad988','#ff43e7']" :areaColors="['#2ad988','#ff43e7']" />
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
            home.indextrend(this.queryParam).then(res => {
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

</style>