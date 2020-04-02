<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay2':animate == 1,'animated fadeOutDown faster':animate == 2}">
        <div class="channelBar orange">
            <div class="_title"><i class="ion">&#xe63c;</i><strong>专题学习参与人数</strong></div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <barline :data="data" axisPointer="line" :colors="['#fe6601']" />
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
            home.studyselect(this.queryParam).then(res => {
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
