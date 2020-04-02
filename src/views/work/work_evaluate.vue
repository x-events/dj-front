<template>
    <div class="flex-col worklist evaluatePage">
        <work-channel-bar/>
        <breadcrumb/>

        <template v-if="$route.path.split('/').length>3">
            <router-view />
        </template>
        <template v-else>
            <div class="mainCont flex-1 flex-row" style="padding:0;">
                <div class="org_left flex-col">
                    <div class="hd">
                        <h2 class="title">党组织列表</h2>
                    </div>
                    <div class="bd flex-1 scrollbar" v-loading="orgLoading" id="org_list">
                        <ul v-if="orgList.length && !orgLoading" class="org_list">
                            <li v-for="(e,i) in orgList" :key="i" :class="{'active':queryParam.org_id == e.id}" :id="checkid(e)">
                                <router-link :to="{name:'综合评价',query:{org_id:e.id}}">{{e.name}}</router-link>
                            </li>
                        </ul>
                        <div v-if="orgList.length == 0 && !orgLoading">
                            <nodata color="#333333" />
                        </div>
                    </div>
                </div>
                <div class="flex-1 evaluateRight scrollbar" v-loading="loading">

                    <div class="whiteBlock mb15" v-if="detailData.daily">
                        <div class="hd fix pointer" @click="$router.push({name:'日常评价',query:queryParam})">
                            <h3 class="title l"><i class="e_ico e_ico1_1"></i>日常评价</h3>
                            <span title="更多" class="moreLink"></span>
                        </div>
                        <div class="bd fix">
                            <div class="typeHeader evalCol flex-row">
                                <div v-for="(item,index) in typeFilters" :key="'type'+index" class="item pr flex-1">
                                <div class="_wrap flex-row align-center">
                                    <img :src="item.ico" class="ion_pic">
                                    <div class="flex-1">
                                        <div class="_text">{{item.label}}</div>
                                        <div class="_count"><strong>{{item.count}}</strong>个</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex-row">
                        <div class="whiteBlock evbox mb15 flex-col flex-1 mr15" v-if="detailData.work">
                            <div class="hd fix">
                                <h3 class="title l"><i class="e_ico e_ico1_2"></i>工作完成情况</h3>
                            </div>
                            <div class="bd fix flex-1 chartBox">
                                <pie :data="work_pie" :colors="['#3aa1ff','#36cbcb']" radius="50%,70%" :label="true" text_color="#333333"></pie>
                            </div>
                        </div>
                        <div class="whiteBlock evbox mb15 flex-col satisfied" style="width:360px;" v-if="detailData.evaluate">
                            <div class="hd fix pointer" @click="$router.push({name:'满意度测评',query:queryParam})">
                                <h3 class="title l"><i class="e_ico e_ico1_3"></i>满意度测评</h3>
                                <span title="考核记录" class="moreLink">考核记录</span>
                            </div>
                            <div class="bd fix flex-1 flex-row align-center tc">
                                <div class="flex-1" v-if="detailData.evaluate.satisfied_status == 0">
                                    <a class="edit" title="评价" @click="doEvaluate('satisfied')"><i class="e_ico e_ico2_1"></i> 待评价</a>
                                </div>
                                <div class="flex-1" v-else>
                                    <span class="score"><b>{{detailData.evaluate.satisfied_score || 0}}</b>分</span>
                                    <a class="edit" title="评价" @click="doEvaluate('satisfied')"><i class="e_ico e_ico2_1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-row">
                        <div class="whiteBlock evbox flex-col flex-1 mr15 schedule" v-if="detailData.schedule">
                            <div class="hd fix">
                                <h3 class="title l"><i class="e_ico e_ico1_4"></i>待办工作</h3>
                            </div>
                            <div class="bd fix flex-1 flex-col">
                                <div class="total">待办总数：{{detailData.schedule.sum_all}}</div>
                                <div class="flex-1">
                                    <div class="_title">即将到期</div>
                                    <div class="flex-row">
                                        <el-progress :percentage="schedulePercent(detailData.schedule.sum_will,detailData.schedule.sum_all)" color="#3aa1ff" :show-text="false" :stroke-width="23" class="cube flex-1"></el-progress>
                                        <div class="_num">{{detailData.schedule.sum_will}}</div>
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div class="_title">已超时</div>
                                    <div class="flex-row">
                                        <el-progress :percentage="schedulePercent(detailData.schedule.sum_timeout,detailData.schedule.sum_all)" color="#ff8610" :show-text="false" :stroke-width="23" class="cube flex-1"></el-progress>
                                        <div class="_num">{{detailData.schedule.sum_timeout}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="whiteBlock evbox flex-col yearEvaluate" style="width:360px;" v-if="detailData.evaluate">
                            <div class="hd fix pointer" @click="$router.push({name:'年终考评',query:queryParam})">
                                <h3 class="title l"><i class="e_ico e_ico1_5"></i>年终考评</h3>
                                <span title="考核记录" class="moreLink">考核记录</span>
                            </div>
                            <div class="bd fix flex-1 flex-row align-center tc">
                                <div class="flex-1" v-if="detailData.evaluate.evaluate_status == 0">
                                    <a class="edit" title="评价" @click="doEvaluate('evaluate')"><i class="e_ico e_ico2_1"></i> {{detailData.evaluate.evaluate_name || '待评价'}}</a>
                                </div>
                                <div class="flex-1" v-else>
                                    <div class="text">
                                        {{detailData.evaluate.evaluate_name}}
                                        <a class="edit" title="评价" @click="doEvaluate('evaluate')"><i class="e_ico e_ico2_1"></i></a>
                                    </div>
                                    <div class="rateBox">
                                        <el-rate :value="Number(detailData.evaluate.evaluate_level)" disabled class="rate" :colors="['#ff8610','#ff8610','#ff8610']" disabled-void-color="#d8d8d8"></el-rate>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <evaluatedialog :visible="DialogVisible" :dialogtype="evaluate.dialogtype || ''" :dialogname="evaluate.dialogname || ''" :org_id="evaluate.org_id" :year="evaluate.year || ''" :evaluate_level="evaluate.evaluate_level || ''" :satisfied_score="evaluate.satisfied_score || ''"  @close="evaluate={};DialogVisible=false" @changed="fetchData()" />

        </template>
    </div>
</template>

<script>
import * as work from "@/api/work";
import workChannelBar from "@/components/work/workChannelBar";
import breadcrumb from "@/components/breadcrumb";
import evaluatedialog from "@/components/work/evaluate_dialog";

export default {
    components: {
        workChannelBar,
        breadcrumb,
        evaluatedialog
    },
    data() {
        return {
            orgLoading:true,
            orgList:[],
            loading:false,
            typeFilters: [
                {
                    key: "",
                    ico: require("@/assets/img/work/evalute_icon_1.png"),
                    label: "待评价",
                    count: 0
                },
                {
                    key: 7,
                    ico: require("@/assets/img/work/evalute_icon_2.png"),
                    label: "非常好",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_3.png"),
                    label: "好",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_4.png"),
                    label: "较好",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_5.png"),
                    label: "一般",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_6.png"),
                    label: "差",
                    count: 0
                }
            ],
            org_queryParam:{
                id:""
            },
            queryParam: {
                org_id:this.$route.query.org_id || '',
                org_name:''
            },
            detailData:{},
            work_pie:{},

            //评价弹窗
            DialogVisible:false,
            evaluate:{
                dialogtype:"",
                dialogname:"",
                org_id:"",
                year:"",
                evaluate_level:"",
                satisfied_score:""
            }
        }
    },
    watch: {
        $route(to,from){
            if(to.name == '综合评价' && from.name != '综合评价') {
                this.queryParam.org_id = ''
                this.getOrgList();
            }
            let org_id = to.query.org_id || '';
            if(org_id){
                this.queryParam.org_id = org_id;
                this.orgList.forEach((e,i) => {
                    if(this.queryParam.org_id == e.id){
                        this.queryParam.org_name = e.name;
                    }
                });
            }
        },
        'queryParam.org_id'(){
            if(this.$route.query.org_id){
                this.fetchData();
            }
        }
    },
    methods: {
        checkid(e){
            if(this.queryParam.org_id == e.id){
                return 'org_active'
            }
        },
        schedulePercent(divisor,dividend){
            if(Number(dividend) == 0){
                return 0
            }else{
                return Number(divisor)/Number(dividend)*100
            }
        },
        doEvaluate(type){
            this.evaluate.dialogtype = type;
            switch (type) {
                //满意度测评
                case 'satisfied':
                    this.evaluate.dialogname = "满意度测评"
                    this.evaluate.satisfied_score = this.detailData.evaluate.satisfied_score || '';
                    break;
                //年终考评
                default:
                    this.evaluate.dialogname = "年终考评"
                    this.evaluate.evaluate_level = this.detailData.evaluate.evaluate_level || '';
                    break;
            }
            this.evaluate.org_id = this.queryParam.org_id || '';
            this.evaluate.year = this.detailData.evaluate.year || '';
            this.DialogVisible = true;

        },
        getOrgList(){
            this.orgLoading = true;
            work.orgChildren(this.org_queryParam).then(res => {
                this.orgLoading = false;
                this.orgList = res.data.data || [];

                if(this.orgList.length){

                    //query无org_id
                    if(this.queryParam.org_id == ''){
                        this.queryParam.org_id = this.orgList[0].id
                        this.queryParam.org_name = this.orgList[0].name
                    }else{
                        this.orgList.forEach((e,i) => {
                            if(this.queryParam.org_id == e.id){
                                this.queryParam.org_name = e.name;
                            }
                        });
                    }

                    this.$nextTick(()=>{
                        this.fetchData();
                        //列表滚动
                        var listDom = document.getElementById("org_list");
                        var activeDom = document.getElementById("org_active");
                        if(activeDom){
                            listDom.scrollTop = activeDom.offsetTop - listDom.offsetTop;
                        }
                    })

                }

            })
        },
        fetchData: function() {
            this.loading = true;
            work.org_evaluate(this.queryParam).then(res => {
                let data = res.data.data;
                this.loading = false;
                this.detailData = data;

                //日常评价
                let daily = data.daily;
                if (daily) {
                    this.typeFilters[0].count = data.daily.no_evaluate;
                    this.typeFilters[1].count = data.daily.very_nice;
                    this.typeFilters[2].count = data.daily.good;
                    this.typeFilters[3].count = data.daily.preferably;
                    this.typeFilters[4].count = data.daily.commonly;
                    this.typeFilters[5].count = data.daily.bad;
                }

                //工作完成情况
                let work = data.work;
                if(work){
                    this.work_pie = work
                }

                
            })
        }
    },
    created: function() {
        if(this.$route.name == '综合评价'){
            //this.queryParam.org_id = ''
            this.getOrgList();
        }
    }
}
</script>

<style scoped>
.mainCont { border:#ddd 1px solid; box-shadow:0 0 5px #eee;}
.org_left { width:300px; border-right:#ddd 1px solid;}
.org_left .hd { border-bottom:#ddd 1px solid; text-align:center; padding:15px 0 10px; position:relative;}
.org_left .hd::after { content:''; display:block; width:94px; height:3px; background-color:#087ad9; overflow:hidden; position:absolute; left:50%; bottom:0; transform:translate(-50%,0);}
.org_left .hd .title { font-size:16px; font-weight:normal; color:#087ad9; font-weight:bold;}

.org_list a { display:block; padding:13px 10px 13px 55px;}
.org_list .active a { background-color:#f6f8fa; color:#087ad9; font-weight:bold;}

.evaluateRight { padding:20px 25px;}

.typeHeader.flex-row { padding:0;}
.typeHeader [class*="flex-"] { overflow:hidden;}
.typeHeader .item { font-size:14px; cursor:default;}
.typeHeader .ion_pic { margin:0 15px 0 10px;}
.typeHeader ._text,.typeHeader ._count { text-align:center;}
.typeHeader ._text { padding-top:10px; font-size:16px;}
.typeHeader ._count { padding-right:0px; padding-bottom:10px;}
.typeHeader ._count strong { font-size:28px; line-height:36px;}
.typeHeader .item { margin:0 12px 0 0;}
.typeHeader .item:last-child { margin-left:0;}

.evbox { height:300px;}

.schedule .bd { padding-top:30px; padding-bottom:30px;}
.schedule .total { font-weight:bold; padding:20px 0;}
.schedule ._title { font-size:12px; padding-bottom:5px;}
.cube >>> .el-progress-bar__outer,.cube >>> .el-progress-bar__inner { border-radius:0;}
.cube >>> .el-progress-bar__outer { background-color:#f3f3f3; border-color:transparent;}
.schedule ._num { min-width:30px; text-align:right; margin-left:10px;}

.satisfied .bd { color:#087ad9;}
.satisfied .score { font-size:16px;}
.satisfied .score b { font-size:30px;}
.edit { color:#087ad9;}
.edit .e_ico { vertical-align:text-bottom; margin:0 8px;}

.yearEvaluate .rateBox { padding-top:20px;}
.yearEvaluate .text { font-size:18px; color:#ff8610; font-weight:bold;}
.yearEvaluate .text .e_ico { vertical-align:text-bottom;}
.yearEvaluate .rate { height:auto;}
.yearEvaluate .rate >>> .el-rate__icon { font-size:38px;}

.channelEvaluate >>> .page_hd { border-bottom:#ddd 1px solid; padding:10px 15px;}
.channelEvaluate >>> .page_hd .title { font-size:14px; font-weight:bold; color:#087ad9;}
.channelEvaluate >>> .page_bd { padding:15px;}

.channelEvaluate >>> .rateBox > div { display:inline-block; vertical-align:middle;}
.channelEvaluate >>> .rateBox .el-rate { height:auto;}
.channelEvaluate >>> .rateBox .el-rate__icon { font-size:23px;}
.channelEvaluate >>> .rateBox .evaluate_name { min-width:65px; color:#999999;}
</style>