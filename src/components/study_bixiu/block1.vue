<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="ion">&#xeffe;</i><strong>必修课</strong></div>
        </div>
        <div class="flex-1 flex-col bixiuStudy" style="margin:10px;">
            <div class="flex-1 flex-row">
                <div class="flex-1 box bg1">
                    <div class="inbox">
                        <div class="name">总课程数</div>
                        <div class="num">{{data.total}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg2">
                    <div class="inbox">
                        <div class="name">总学时</div>
                        <div class="num">{{data.credit}}</div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex-row">
                <div class="flex-1 box bg3">
                    <div class="inbox">
                        <div class="name">计划课程数</div>
                        <div class="num">{{data.bx_coursenum}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg4">
                    <div class="inbox">
                        <div class="name">计划学时</div>
                        <div class="num">{{data.bx_xuwancheng}}</div>
                    </div>
                </div>
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
            data:{
                total: "",
                credit: "",
                bx_xuwancheng: "",
                bx_coursenum: ""
            },
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
            home.computeMustStudyNum(this.queryParam).then(res => {
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