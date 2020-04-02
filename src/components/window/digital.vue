<template>
    <div class="digistBlock vbHidden" :class="{'animated flipInX faster delay4':animate == 1,'animated flipOutX faster':animate == 2}">
        <ul class="flex-row">
            <li class="flex-1 block flex-row" v-for="(item,index) in list" :key="'num'+index" @click="go(item.name,index)">
                <div class="title" v-html="item.name"></div>
                <div class="num flex-1"><span class="dicount" :data-num="item.count" :id="'num'+index">0</span>{{item.unit}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as map from "@/api/map";
const CountUp = window.CountUp;
let counterHash = []

export default {
    data() {
        return {
            animate:false,
            timer: null,
            list: [
                {
                    name:"党组织",
                    count:0,
                    unit:'个'
                },
                {
                    name:"党员",
                    count:0,
                    unit:'人'
                },
                {
                    name:"党务工作者",
                    count:0,
                    unit:'人'
                },
                {
                    name:"工会",
                    count:0,
                    unit:'个'
                },
                {
                    name:"团组织",
                    count:0,
                    unit:'个'
                },
                {
                    name:"妇联",
                    count:0,
                    unit:'个'
                },
                {
                    name:"党建阵地",
                    count:0,
                    unit:'个'
                }
            ],
            queryParam:{
                org_id:""
            }
        };
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
        go(name,index){
            if(index < 3){
                if(name == '党务<br/>工作者'){
                    name = '党务工作者-可视窗口'
                }
                this.$router.push({name:name})
            }else{
                this.$router.push({name:'党建地图',query:{name:name}});
            }
        },
        getData: function() {
            map.count(this.queryParam).then(res => {
                let data = res.data.data;
                //console.log(data);
                data.forEach((e,i) => {
                    this.list[i].name = e.name
                    this.list[i].count = e.count
                });
                //this.list = data;
                this.$nextTick(() =>{
                    this.countNum()
                    //this.randomApply()
                })
            })
        },
        countNum: function(applyIndex) {
            let doms = document.querySelectorAll('.dicount');
            let options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
            };
            if (applyIndex !== void(0)) {
                if (doms[applyIndex]) {
                    if (counterHash[applyIndex]) {
                        counterHash[applyIndex].reset();
                        counterHash[applyIndex].update(doms[applyIndex].getAttribute('data-num'))
                    } else {
                        //console.warn('wrong index', applyIndex)
                    }

                }
            } else {
                for (let i = 0; i < doms.length; i++) {
                    let node = doms[i]
                    let counter = new CountUp('num' + i, 0, node.getAttribute('data-num'), 0, 1.5, options);
                    counter.start();
                    counterHash[i] = counter
                }
            }

        },
        randomApply: function() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let randomIndex = parseInt(Math.random() * 100) % 7;
                this.countNum(randomIndex);
                this.randomApply()
            }, 8000)
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
.digistBlock { overflow:hidden; margin:15px 12px 5px; color:#ffffff;}
.block,.block::after { background:url(../../assets/img/window_blocl_bg.png) no-repeat;}
.block { height:102px; position:relative; cursor:pointer;}
.block:hover { opacity:.9;}
.block::after { content:''; display:block; width:23px; height:75px; background-position:right -11px; position:absolute; right:0; top:11px;}
.digistBlock .num { font-weight:normal; font-size:24px; line-height:70px; padding-top:10px; margin-right:20px; text-align:center; color:#ffeb08;}
.digistBlock .title { width:50px; height:auto; line-height:1.2; font-size:16px; color:#00ecfc; text-align:center; padding:40px 28px 0px 25px;}
.digistBlock .block:nth-child(3) .title { padding-top:30px;}
.digistBlock .block:nth-child(7) .title { width:45px; padding-right:30px; padding-left:28px; padding-top:30px;}

@media screen and (max-width: 1600px) {
    .digistBlock .num { font-size:18px;}
}
@media screen and (max-width: 1440px) {
    .digistBlock .num { font-size:14px;}
}
</style>
