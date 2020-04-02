<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title tab">
                <strong v-for="(e,i) in tab" :key="i" :class="{'act':queryParam.type == e.type}" @click="queryParam.type = e.type">{{e.name}}</strong>
            </div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <pie :data="data" type="rose" radius="30,110" />
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
            tab:[
                {
                    name:'各类课程占比',
                    type:1
                },
                {
                    name:'各类党建读物占比',
                    type:2
                }
            ],
            queryParam:{
                type:1,
                org_id:""
            },
            data:{}
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
    watch:{
        'queryParam.type'(){
            this.getData()
        }
    },
    methods: {
        getData: function(){
            home.coursetype(this.queryParam).then(res => {
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
.bixiuStudy .box { text-align:center; margin:10px; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; background-position:right bottom; background-repeat:no-repeat; line-height:1.4;}
.bixiuStudy .num { font-size:38px;}
.bg1 { background-image:url(../../assets/img/bxbg1.png); background-color:#18d09a;}
.bg2 { background-image:url(../../assets/img/bxbg2.png); background-color:#3fa7ff;}
.bg3 { background-image:url(../../assets/img/bxbg3.png); background-color:#ffaf30;}
.bg4 { background-image:url(../../assets/img/bxbg4.png); background-color:#ff7077;}
</style>