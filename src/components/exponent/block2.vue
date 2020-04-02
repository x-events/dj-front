<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title"><i class="ion">&#xe65a;</i><strong>下级指数</strong></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;">
            <pieprogress :number="data.num" :total="data.total" color="#3bd58e" />
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
                num:"0",
                total:"100"
            },
            queryParam:{
                org_id:"",
                type:0
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
            home.workCommitteeSub(this.queryParam).then(res => {
                let data = res.data.data;
                this.data.num = Number(data.num).toFixed(2);
                this.data.total = Number(data.total).toFixed(2);
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

</style>