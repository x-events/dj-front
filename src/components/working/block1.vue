<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated fadeOutLeft faster':animate == 2}">
        <div class="channelBar">
            <div class="_title"><i class="ion">&#xe61c;</i><strong>为民办实事</strong></div>
        </div>
        <div class="flex-1 chartBox flex-col working" style="margin:10px;">
            <div class="flex-row">
                <div class="flex-1 box bg1">
                    <div class="inbox">
                        <div class="name">{{list_count.num.name}}</div>
                        <div class="num">{{list_count.num.count}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg2">
                    <div class="inbox">
                        <div class="name">{{list_count.on.name}}</div>
                        <div class="num">{{list_count.on.count}}</div>
                    </div>
                </div>
                <div class="flex-1 box bg3">
                    <div class="inbox">
                        <div class="name">{{list_count.out.name}}</div>
                        <div class="num">{{list_count.out.count}}</div>
                    </div>
                </div>
            </div>
            <div class=" flex-col flex-1 list">
                <ul class="fix flex-1">
                    <li class="flex-row" v-for="item in data.data" :key="item.id">
                        <div class="img" v-if="item.images.length > 0">
                            <img :src="ee.src" v-for="(ee,ii) in item.images" v-if="ii < 1" :key="ii">
                        </div>
                        <div class="flex-1">
                            <div class="title el" title="item.title">{{item.title}}</div>
                            <div class="org el" title="item.name">{{item.name}}</div>
                        </div>
                        <div class="info">
                            <div class="status">{{item.status}}</div>
                            <div class="time">{{item.created_at | formatDate(true)}}</div>
                        </div>
                    </li>
                </ul>
                <div class="tc" v-if="data.totalPages > 1">
                    <el-pagination
                        :page-size="listParams.pagesize"
                        background
                        layout="prev, pager, next"
                        :current-page="listParams.p" 
                        @current-change="handleCurrentChange"
                        :total="data.totalRows">
                    </el-pagination>
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
            data:[],
            list_count: {
                num: {
                    name: "件数",
                    count: 0
                },
                on: {
                    name: "进行中",
                    count: 0
                },
                out: {
                    name: "已结束",
                    count: 0
                }
            },
            queryParam:{
                org_id:""
            },
            listParams: {
                p: 1,
                pagesize:8,
                org_id:""
            }
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.listParams.org_id = new_id
            this.getData();
            this.animate = 2;
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    methods: {
        getListCount() {
            home.lists_count(this.queryParam).then(res => {
                let data = res.data.data;
                this.list_count = data;
            })
        },
        getData: function(){
            home.lists_year(this.listParams).then(res => {
                let data = res.data;
                this.data = data;
            })
        },
        handleCurrentChange(value) {
            this.listParams.p = value
            this.getData()
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
            this.listParams.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
            this.listParams.org_id = this.$route.params.org_id
        }
        this.getListCount()
        this.getData()

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });
    }
}
</script>

<style scoped>
.working .box { text-align:center; height:100px; margin:10px; border-radius:8px; display:flex; align-items:center; justify-content:center; overflow:hidden; background-position:right bottom; background-repeat:no-repeat; line-height:1.4;}
.working .num { font-size:38px;}
.bg1 { background-image:url(../../assets/img/wkbg1.png); background-color:#4170f6;}
.bg2 { background-image:url(../../assets/img/wkbg2.png); background-color:#ffaf30;}
.bg3 { background-image:url(../../assets/img/wkbg3.png); background-color:#18d09a;}

.list { margin:10px 10px 0; border-top:1px solid rgba(255,255,255,.15);}
.list li { position:relative; border-bottom:1px solid rgba(255,255,255,.15); padding:8px 0 8px 25px; padding-left:0;}
.list li::before { content:''; display:block; width:5px; height:5px; background-color:#ffffff; border-radius:50%; position:absolute; left:7px; top:50%; margin-top:-2.5px; display:none;}
.list .title,.list .status { height:27px; line-height:26px;}
.list .title { font-size:16px;}
.list .org,.list .time { color:rgba(255,255,255,.45); margin-top:8px;}
.list .info { text-align:right; width:87px;}
.list .img,.list .img img { width:95px; height:60px;}
.list .img { margin-right:10px;}
</style>

<style>
.list .el-pagination button {background-color: transparent;}
.list .el-pager li {background-color: transparent;}
</style>
