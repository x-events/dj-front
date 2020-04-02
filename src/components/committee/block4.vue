<template>
    <div class="block_wrap_normal flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="flex-1 flex-row info-row">
            <div class="colorBlock flex-1" v-for="(e,i) in count1" :key="i" :class="corlor1[i]">
                <span class="box">
                <div class="num">{{e.value}}<span class="unit">{{e.unit}}</span></div>
                <div class="title">{{e.name}}</div>
                </span>
            </div>
        </div>
        <div class="flex-1 flex-row info-row">
            <div class="colorBlock flex-1" v-for="(e,i) in count2" :key="i" :class="corlor2[i]">
                <span class="box">
                <div class="num">{{e.value}}<span class="unit">{{e.unit}}</span></div>
                <div class="title">{{e.name}}</div>
                </span>
            </div>
        </div>
        <div class="flex-1 flex-row info-row">
            <div class="colorBlock flex-1" v-for="(e,i) in count3" :key="i" :class="corlor3[i]">
                <span class="box">
                <div class="num">{{e.value}}<span class="unit">{{e.unit}}</span></div>
                <div class="title">{{e.name}}</div>
                </span>
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
            animate: false,
            queryParam:{
                org_id:""
            },
            corlor1:["","cyan","green"],
            count1:[],
            corlor2:["orange","red","purple"],
            count2:[],
            corlor3:["","cyan","orange"],
            count3:[]
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
        getData(){
            this.loading = true;
            committee.getSomeNum(this.queryParam).then(res => {
                let data = res.data.data;
                this.loading = false;
                this.count1 = data.slice(0,3);
                this.count2 = data.slice(3,6);
                this.count3 = data.slice(6,9);
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData();

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });

    }
}
</script>

<style scoped>
.info-row { margin-bottom:10px;}
.info-row:last-child { margin-bottom:0;}
</style>
