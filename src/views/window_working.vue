<template>
    <el-container class="digistBlock newWindow">
        <el-header height="300px" class="flex-col">
            <div class="block_wrap_opc flex-1 flex-col nodot">
                <div class="channelBar">
                    <div class="_title"><i class="ion">&#xe77a;</i><strong>基本情况<span v-if="work_name"> — {{work_name}}</span></strong></div>
                </div>
                <div class="flex-row flex-1">
                    <div class="flex-2 dotBox chartBox mr20"><b class="dot"></b>
                        <pie :data="chart1" radius="45%,55%" :label="true" />
                        <div class="comTotal" v-if="chart1.count || chart1.count == '0'">
                            {{chart1.count}}
                            <div class="text">为民办实事总数</div>
                        </div>
                    </div>
                    <div class="flex-2 dotBox chartBox mr20"><b class="dot"></b>
                        <pie :data="chart2" radius="45%,55%" :label="true" />
                        <div class="comTotal" v-if="chart2.count || chart2.count == '0'">
                            {{chart2.count}}
                            <div class="text">受益人总数</div>
                        </div>
                    </div>
                    <div class="flex-1 flex-col counter">
                        <div class="flex-1 dotBox flex-row align-center mb10"><b class="dot"></b>
                            <div class="flex-1">
                                <div class="count">{{countData.count}} <span class="unit">件</span></div>
                                <div class="text">本党组织总件数</div>
                            </div>
                        </div>
                        <div class="flex-1 dotBox flex-row align-center"><b class="dot"></b>
                            <div class="flex-1">
                                <div class="count">{{countData.obj_count}} <span class="unit">人</span></div>
                                <div class="text">本党组织受益人总数</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main class="table-div flex-1 flex-row">
            <div class="table-left t_blue flex-col block_wrap_opc" :screen="screen" :class="screen == 'screen_small' ? 'flex-1':'flex-2'">
                <div class="channelBar">
                    <div class="_title"><i class="ion">&#xe77a;</i><strong>为民办实事记录<span v-if="work_name"> — {{work_name}}</span></strong></div>
                    <!-- <div class="_ext" @click="manualToggle"><i class="ion">&#xe62a;</i></div> -->
                </div>
                <div class="flex-1 flex-col">
                    <el-table :data="tableData1.data" height="100%" stripe v-loading="loading1">
                        <el-table-column prop="work_name" label="名称" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="end_time" label="时间" width="120" align="center">
                            <template slot-scope="scope">
                                {{scope.row.end_time | formatDate('yyyy-MM-dd')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="地点" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="object_count" label="受益人数量" width="150" align="center"></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button class="colorBtn" @click.native.prevent="showDetail(scope.row)" round>查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-div fix" v-if="Number(tableData1.totalRows) > 0">
                        <el-pagination background layout="prev, pager, next" :page-size="queryParam_month.pagesize" :current-page="Number(queryParam_month.p)" @current-change="pageChange1" :total="Number(tableData1.totalRows)"></el-pagination>
                        <span class="pageNum">共 {{ tableData1.totalPages }} 页</span>
                    </div>
                </div>
            </div>
            <div class="table-right t_blue flex-1 flex-col block_wrap_opc">
                <div class="channelBar">
                    <div class="_title"><i class="ion">&#xe617;</i><strong>直属党组织总件数排名<span v-if="work_name"> — {{work_name}}</span></strong></div>
                </div>
                <div class="flex-1 flex-col">
                    <el-table :data="tableData2.data" height="100%" stripe v-loading="loading2">
                        <el-table-column type="index" :index="indexMethod_year" label="排名" width="100" align="center"></el-table-column>
                        <el-table-column prop="short_name" label="党组织" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="count" label="总件数" class-name="col_g" width="80" align="center"></el-table-column>
                        <el-table-column prop="object_count" label="受益人总数" class-name="col_y" width="110" align="center"></el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button class="colorBtn" @click.native.prevent="showData(scope.row)" round>查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-div fix" v-if="Number(tableData2.totalRows) > 0">
                        <el-pagination background layout="prev, pager, next" :page-size="queryParam_year.pagesize" :current-page="Number(queryParam_year.p)" @current-change="pageChange2" :total="Number(tableData2.totalRows)"></el-pagination>
                        <span class="pageNum">共 {{ tableData2.totalPages }} 页</span>
                    </div>
                </div>
            </div>
        </el-main>

        <detaildialog :detailId="detail_id" v-if="detail_id != ''" @dialogClose="hideDetail" />

    </el-container>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";
import detaildialog from "@/components/working/dialog";

let counterHash = []

export default {
    components:{
        detaildialog
    },
    data() {
        return {
            screen:'',
            animate:false,
            timer: null,
            countData:{
                count:0,
                obj_count:0,
                avg_count:0
            },
            list: [
                {
                    name:"为民办实事总数",
                    icon:require('@/assets/img/work/icon5.png'),
                    count:0
                },
                {
                    name:"受益人总数",
                    icon:require('@/assets/img/work/icon6.png'),
                    count:0
                },
                {
                    name:"件均受益人数量",
                    icon:require('@/assets/img/work/icon7.png'),
                    count:0
                }
            ],
            queryParam:{
                org_id:"",
            },
            queryParam_month:{
                org_id:"",
                p:1,
                pagesize:13
            },
            queryParam_year:{
                org_id:"",
                p:1,
                pagesize:13
            },
            tableData: {
                monthData: {
                    data: [],
                    totalRows: 0,
                    totalPages: 0
                },
                monthData: [],
                yearData: [],
                totalRows: 0,
                totalPages: 0
            },
            tableData1: {
                data: [],
                totalRows: 0,
                totalPages: 0
            },
            tableData2: {
                data: [],
                totalRows: 0,
                totalPages: 0
            },
            loading1: false,
            loading2: false,
            chart1:{},
            chart2:{},
            work_name:this.$route.query.name || '',
            detail_id:""
        };
    },
    watch: {
        $route(){
            this.work_name = this.$route.query.name || ''
        },
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = this.queryParam_month.org_id = this.queryParam_year.org_id = new_id;
            this.getData();
            this.getMonthData()
            this.getYearData()
        }
    },
    methods: {
        showData(e){
            //console.log(e);
            if(e.level == '2'){
                this.$router.push({name:'为民办实事-党工委',params:{org_id:e.id},query:{name:e.short_name}})
                //window.location.href="/#/window/"+e.id+'/working?name='+e.short_name
            }
            if(e.level == '3'){
                this.$router.push({name:'为民办实事-党工委-党支部',params:{org_id:e.id},query:{name:e.short_name}})
                //window.location.href="/#/window/"+e.id+'/working_committee?name='+e.short_name
            }
        },
        showDetail(e){
            //console.log(e);
            this.detail_id = e.record_id;
        },
        hideDetail(){
            //console.log('close');
            setTimeout(() => {
                this.detail_id = "";
            }, 300);
        },
        indexMethod_month(index) {
            return (index + 1) + (this.queryParam_month.p-1)* this.queryParam_month.pagesize;
        },
        indexMethod_year(index) {
            return (index + 1) + (this.queryParam_year.p-1)* this.queryParam_year.pagesize;
        },
        getData() {
            home.doGoodCountPie(this.queryParam).then(res => {
                let data = res.data.data;
                this.chart1 = data;
            })
            home.doGoodObjCountPie(this.queryParam).then(res => {
                let data = res.data.data;
                this.chart2 = data;
            })
            home.work_cmt_info(this.queryParam).then(res => {
                let count = res.data.data;
                this.countData = count;
                // this.$set(this.list[0], 'count', count.count)
                // this.$set(this.list[1], 'count', count.obj_count)
                // this.$set(this.list[2], 'count', count.avg_count)
            })
        },
        getMonthData() {
            this.loading1 = true
            home.doGoodList(this.queryParam_month).then(res => {
                this.loading1 = false
                let month = res.data;
                this.tableData1 = month
            })
        },
        getYearData() {
            this.loading2 = true
            home.work_cmt_year(this.queryParam_year).then(res => {
                this.loading2 = false
                let year = res.data;
                this.tableData2 = year
            })
        },
        pageChange1(p){
            this.queryParam_month.p = p
            this.getMonthData();
        },
        pageChange2(p){
            this.queryParam_year.p = p
            this.getYearData();
        },
    },
    created: function() {
        this.screen = this.$root.screen
        util.on('screenClass',(type) =>{
            this.screen = type
        });
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = this.queryParam_month.org_id = this.queryParam_year.org_id = ""
        }else{
            this.queryParam.org_id = this.queryParam_month.org_id = this.queryParam_year.org_id = this.$route.params.org_id
        }
        this.getData()
        this.getMonthData()
        this.getYearData()
        // setTimeout(() => {
        //     document.getElementsByClassName('el-table__body-wrapper')[0].classList.add('scrollbar')
        // }, 3000);
        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        }); 
    }
};
</script>

<style scoped>
.digistBlock { overflow:hidden; padding: 25px 22px; width: 100%; box-sizing: border-box;}
.el-header { margin-bottom: 15px; padding-left:0; padding-right:0;}
.block,.block::after { background:url(../assets/img/window_blocl_bg.png) no-repeat;}
.block { height:102px; width: 240px; position:relative; }
.block::after { content:''; display:block; width:23px; height:75px; background-position:right -11px; position:absolute; right:0; top:11px;}
.digistBlock .num { font-weight:normal; font-size:24px; line-height:25px; padding:25px 0; margin-right:20px; text-align:center; color:#ffeb08;}
.digistBlock .num p { font-size: 16px; color: #00ecfc; }
.digistBlock .title { width:50px; height:auto; line-height:1.2; font-size:16px; color:#00ecfc; text-align:center; padding:35px 28px 0px 25px;}
.digistBlock .block:nth-child(3) .title { padding-top:32px; padding-left: 26px; }
.digistBlock .block:nth-child(7) .title { width:45px; padding-right:30px; padding-left:28px; padding-top:30px;}
.channelBar { margin-bottom: 15px; cursor: default; background:linear-gradient(to right, rgba(13,58,105,1) 0%,rgba(13,58,105,0.4) 100%); }
.table-div { padding: 0; }
.table-div .el-button { line-height: 10px; }
.table-left { margin-right:15px;}
.page-div { margin-top: 5px; padding-right: 15px; line-height: 40px; }
.page-div > span, .page-div .el-pagination { float: right; } 
.page-div > span { color: #fff; margin-right: 5px; }

.min-height { min-height:698px;}
.table-div /deep/ .col_g:not(.is-leaf) { color: #72fd30; }
.table-div /deep/ .col_y:not(.is-leaf) { color: #efde34; }
.table-div /deep/ .col_r:not(.is-leaf) { color: #fc722d; }

.counter { text-align:center; font-size:18px; line-height:1.4;}
.counter .count { font-size:24px; color:#00ecfc;}
.counter .count .unit { font-size:16px;}

.comTotal { font-size:18px;}
.comTotal .text { font-size:14px;}
</style>
