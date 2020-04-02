<template>
    <div class="mainCont flex-1 flex-col channelEvaluate" style="padding:0;">
        <div class="page_hd fix">
            <h2 class="title l"><i class="e_ico e_ico1_3"></i><span v-if="org_name">{{org_name}} / </span>满意度测评记录</h2>
        </div>
        <div class="page_bd fix flex-1 flex-col" v-loading="loading">
            <div class="typeHeader evalCol flex-row">
                <div v-for="(item,index) in typeFilters" :key="'type'+index" class="item pr flex-1">
                    <div class="_wrap flex-row align-center">
                        <img :src="item.ico" class="ion_pic">
                        <div class="flex-1">
                            <div class="_text">{{item.label}}</div>
                            <div class="_count"><strong>{{item.count}}</strong>{{item.unit || '个'}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <el-table :data="data" style="width: 100%" stripe class="flex-1" height="100%">
                <el-table-column label="年度" prop="year" width="300" align="center"></el-table-column>
                <el-table-column label="测评得分" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.satisfied_status == '0'">待评分</span>
                        <span v-else>{{scope.row.satisfied_score}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="check" @click="doEvaluate('satisfied',scope.row)">评价</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="page-div fix" v-if="Number(totalRows) > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(totalRows)"></el-pagination>
                <span class="pageNum">共 {{ totalPages }} 页</span>
            </div>

        </div>

        <evaluatedialog :visible="DialogVisible" :dialogtype="evaluate.dialogtype || ''" :dialogname="evaluate.dialogname || ''" :org_id="evaluate.org_id" :year="evaluate.year || ''" :satisfied_score="evaluate.satisfied_score || ''" @close="evaluate={};DialogVisible=false" @changed="fetchData()" />
    </div>
</template>

<script>
import * as work from "@/api/work";
import evaluatedialog from "@/components/work/evaluate_dialog";

export default {
    components: {
        evaluatedialog
    },
    data() {
        return {
            loading:true,
            queryParam: {
                p:1,
                pagesize:15,
                org_id:this.$route.query.org_id || ''
            },
            org_name:this.$route.query.org_name || '',

            typeFilters: [
                {
                    key: "",
                    ico: require("@/assets/img/work/evalute_icon_0.png"),
                    label: "全部",
                    count: 0
                },
                {
                    key: "",
                    ico: require("@/assets/img/work/evalute_icon_1.png"),
                    label: "待评分",
                    count: 0
                },
                {
                    key: 7,
                    ico: require("@/assets/img/work/evalute_icon_7.png"),
                    label: "平均分",
                    count: 0,
                    unit: "分"
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_3.png"),
                    label: "85-100",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_4.png"),
                    label: "75-85",
                    count: 0
                },
                {
                    key: 8,
                    ico: require("@/assets/img/work/evalute_icon_5.png"),
                    label: "≤75",
                    count: 0
                }
            ],
            data:[],
            totalRows:0,
            totalPages:0,

            //评价弹窗
            DialogVisible:false,
            evaluate:{
                dialogtype:"",
                dialogname:"",
                org_id:"",
                year:"",
                satisfied_score:"",
            }
        }
    },
    methods: {
        doEvaluate(type,e){
            this.evaluate.dialogtype = type;
            this.evaluate.dialogname = '满意度测评';
            this.evaluate.satisfied_score = e.satisfied_score || '';
            this.evaluate.org_id = e.org_id || '';
            this.evaluate.year = e.year || '';
            
            this.DialogVisible = true;
        },
        pageChange(p){
            this.queryParam.p = p;
            this.fetchData();
        },
        fetchData() {
            this.loading = true;
            work.satisfied(this.queryParam).then(res => {
                let data = res.data.data;
                this.loading = false;
                this.data = [];
                this.$nextTick(()=>{
                    this.data = data.list;
                })
                this.totalRows = data.totalRows || 0;
                this.totalPages = data.totalPages || 0;

                this.typeFilters[0].count = data.count || 0;
                this.typeFilters[1].count = data.no_evaluate || 0;
                this.typeFilters[2].count = data.avg || 0;
                this.typeFilters[3].count = data.good || 0;
                this.typeFilters[4].count = data.commonly || 0;
                this.typeFilters[5].count = data.bad || 0;
            })
        }
    },
    created: function() {
        this.fetchData();
    }
}
</script>

<style scoped>
.el-date-editor { margin-top:-5px; margin-bottom:-5px;}
.typeHeader.flex-row { padding:0 0 20px;}
.typeHeader [class*="flex-"] { overflow:hidden;}
.typeHeader .item { font-size:14px; cursor:default;}
.typeHeader .ion_pic { margin:0 0px 0 20px;}
.typeHeader ._text,.typeHeader ._count { text-align:center;}
.typeHeader ._text { padding-top:10px; font-size:16px;}
.typeHeader ._count { padding-right:0px; padding-bottom:10px;}
.typeHeader ._count strong { font-size:28px; line-height:36px;}
.typeHeader .item { margin:0 12px 0 0;}
.typeHeader .item:last-child { margin-left:0;}

.page-div { padding:10px 0 0 0; line-height:28px;}
.page-div > span { color:#333333;}
</style>