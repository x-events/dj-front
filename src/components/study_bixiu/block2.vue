<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInDown faster delay2':animate == 1,'animated fadeOutUp faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title"><i class="ion">&#xe653;</i><strong>必修课计划完成进度</strong></div>
        </div>
        <div class="flex-1 flex-row" style="margin:10px;">
            <div class="flex-1 chartBox" style="margin:5% 5%">
                <gauge :data="total" :showtitle="true" :numsize="18" :titlesize="16" unit="%" />
            </div>
            <div class="flex-1 flex-col" style="margin:2% 0;">
                <div class="flex-1 flex-row pr" v-for="(e,i) in list" :key="i">
                    <div class="flex-1 pr">
                        <pieprogress :number="e.value" :fontsize="16" unit="%" :total="100" :color="colors[i]" />
                    </div>
                    <div class="text">{{e.name}}</div>
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
            colors:["#ff8300","#3fa7ff","#c453ff"],
            total:{},
            list:[],
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
            home.computeMustStudyCourseNum(this.queryParam).then(res => {
                let data = res.data.data;
                let newdata = {
                    "series": data.data1.series,
                    "max":"100"
                }
                this.total = newdata;
                this.list = data.data2;
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
.text { display:flex; align-items:center; justify-content:left; width:50%;}
</style>