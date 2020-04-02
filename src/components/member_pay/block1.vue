<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="ion">&#xe638;</i><strong>本月缴纳情况</strong></div>
        </div>
        <div class="flex-1 flex-col monthPay" style="margin:10px;">
            <div class="flex-1 flex-row">
                <div class="flex-1 box bg1">
                    <div class="inbox">
                        <div class="name">已缴纳人数</div>
                        <div class="num">{{data.is_pay}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg2">
                    <div class="inbox">
                        <div class="name">已缴纳金额</div>
                        <div class="num">{{data.is_pay_sum}}</div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex-row">
                <div class="flex-1 box bg3">
                    <div class="inbox">
                        <div class="name">待缴纳人数</div>
                        <div class="num">{{data.not_pay}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg4">
                    <div class="inbox">
                        <div class="name">待缴纳金额</div>
                        <div class="num">{{data.not_pay_sum}}</div>
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
                is_pay:0,
                is_pay_sum:0,
                not_pay:0,
                not_pay_sum:0
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
            home.feedata(this.queryParam).then(res => {
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
.monthPay .box { text-align:center; margin:10px; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; background-position:right bottom; background-repeat:no-repeat; line-height:1.4;}
.monthPay .num { font-size:38px;}
.bg1 { background-image:url(../../assets/img/paybg1.png); background-color:#18d09a;}
.bg2 { background-image:url(../../assets/img/paybg2.png); background-color:#4170f6;}
.bg3 { background-image:url(../../assets/img/paybg3.png); background-color:#ffaf30;}
.bg4 { background-image:url(../../assets/img/paybg4.png); background-color:#ff7077;}
</style>