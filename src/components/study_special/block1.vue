<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay4':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="ion">&#xe64f;</i><strong>专题学习次数走势</strong></div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <barline :data="data" axisPointer="line" :colors="['#29c886']" :areaColors_status="true" :areaColors="['#29c886']" />
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
                org_id:"",
                type:'line'
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
            home.studyline(this.queryParam).then(res => {
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
.specialStudy .box { text-align:center; margin:10px; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; background-position:right bottom; background-repeat:no-repeat; line-height:1.4;}
.specialStudy .num { font-size:38px;}
.bg1 { background-image:url(../../assets/img/spebg1.png); background-color:#3e78ff;}
.bg2 { background-image:url(../../assets/img/spebg2.png); background-color:#3fa7ff;}
.bg3 { background-image:url(../../assets/img/spebg3.png); background-color:#3bd48e;}
.bg4 { background-image:url(../../assets/img/spebg4.png); background-color:#c05dd5;}
</style>