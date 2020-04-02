<template>
    <div class="mainCont flex-1 flex-col channelEvaluate" style="padding:0;">
        <div class="page_hd fix">
            <h2 class="title l"><i class="e_ico e_ico1_1"></i><span v-if="org_name">{{org_name}} / </span>日常评价</h2>
            <el-date-picker v-model="queryParam.year" value-format="yyyy" type="year" placeholder="按年份筛选" class="r" @change="queryParam.p=1;queryParam.evaluate_level='';fetchData()"></el-date-picker>
        </div>
        <div class="page_bd fix flex-1 flex-col" v-loading="loading">
            <div class="typeHeader evalCol flex-row">
                <div v-for="(item,index) in typeFilters" :key="'type'+index" :evaluate_level="item.key" class="item pr flex-1" @click="queryParam.p=1;queryParam.evaluate_level=item.key;fetchData();">
                    <div class="_wrap flex-row align-center">
                        <img :src="item.ico" class="ion_pic">
                        <div class="flex-1">
                            <div class="_text">{{item.label}}</div>
                            <div class="_count"><strong>{{item.count}}</strong>个</div>
                        </div>
                    </div>
                </div>
            </div>

            <el-table :data="data" style="width: 100%" stripe class="flex-1" height="100%">
                <el-table-column label="工作名称" prop="work_name" align="left" show-overflow-tooltip></el-table-column>
                <el-table-column label="完成时间" width="170" align="center">
                    <template slot-scope="scope">
                        {{scope.row.finish_at | formatDate}}
                    </template>
                </el-table-column>
                <el-table-column label="工作类型" prop="category_name" width="200" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="评价结果" width="270" align="center">
                    <template slot-scope="scope">
                        <div class="rateBox">
                            <el-rate :value="Number(scope.row.evaluate_level)" disabled class="rate" :colors="['#ff8610','#ff8610','#ff8610']" disabled-void-color="#d8d8d8"></el-rate>
                            <div class="evaluate_name">{{scope.row.evaluate_name}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="check" @click="doEvaluate('detail_evaluate',scope.row)">评价</el-button>
                        <el-button type="text" class="check" @click="openDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="page-div fix" v-if="Number(totalRows) > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(totalRows)"></el-pagination>
                <span class="pageNum">共 {{ totalPages }} 页</span>
            </div>

        </div>

        <evaluatedialog :visible="DialogVisible" :dialogtype="evaluate.dialogtype || ''" :dialogname="evaluate.dialogname || ''" :form_category_id="evaluate.form_category_id" :work_id="evaluate.work_id || ''" :evaluate_level="evaluate.evaluate_level || ''" :evaluate_content="evaluate.evaluate_content || ''"  @close="evaluate={};DialogVisible=false" @changed="fetchData()" />
    </div>
</template>

<script>
import * as work from "@/api/work";
import * as util from "@/assets/util";
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
                year:"2019",
                org_id:this.$route.query.org_id || "",
                evaluate_level:""
            },
            org_name:this.$route.query.org_name || "",

            typeFilters: [
                {
                    key: "",
                    ico: require("@/assets/img/work/evalute_icon_0.png"),
                    label: "全部",
                    count: 0
                },
                {
                    key: 0,
                    ico: require("@/assets/img/work/evalute_icon_1.png"),
                    label: "待评价",
                    count: 0
                },
                {
                    key: 5,
                    ico: require("@/assets/img/work/evalute_icon_2.png"),
                    label: "非常好",
                    count: 0
                },
                {
                    key: 4,
                    ico: require("@/assets/img/work/evalute_icon_3.png"),
                    label: "好",
                    count: 0
                },
                {
                    key: 3,
                    ico: require("@/assets/img/work/evalute_icon_4.png"),
                    label: "较好",
                    count: 0
                },
                {
                    key: 2,
                    ico: require("@/assets/img/work/evalute_icon_5.png"),
                    label: "一般",
                    count: 0
                },
                {
                    key: 1,
                    ico: require("@/assets/img/work/evalute_icon_6.png"),
                    label: "差",
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
                form_category_id:"",
                work_id:"",
                evaluate_level:"",
                evaluate_content:""
            }
        }
    },
    methods: {
        openDetail(item){
            const workType = item.type;
            if(workType=='1'){
                this.$router.push({name: '工作详情', query: util.paramEncode(item)})
            }else{
                this.$router.push({name: '记录详情', query: util.paramEncode(item)})
            }
        },
        doEvaluate(type,e){
            this.evaluate.dialogtype = type;
            this.evaluate.dialogname = e.work_name;
            this.evaluate.evaluate_level = e.evaluate_level || '';
            this.evaluate.evaluate_content = e.evaluate_content || '';
            this.evaluate.form_category_id = e.form_category_id || '';
            this.evaluate.work_id = e.id || '';
            
            this.DialogVisible = true;
        },
        pageChange(p){
            this.queryParam.p = p;
            this.fetchData();
        },
        fetchData() {
            this.loading = true;
            work.work_evaluate(this.queryParam).then(res => {
                let data = res.data;
                this.loading = false;
                this.data = [];
                this.$nextTick(()=>{
                    this.data = data.data;
                })
                this.totalRows = data.totalRows;
                this.totalPages = data.totalPages;

                this.typeFilters[0].count = data.sum_complete || 0;
                this.typeFilters[1].count = data.no_evaluate || 0;
                this.typeFilters[2].count = data.very_nice || 0;
                this.typeFilters[3].count = data.good || 0;
                this.typeFilters[4].count = data.preferably || 0;
                this.typeFilters[5].count = data.commonly || 0;
                this.typeFilters[6].count = data.bad || 0;
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
.typeHeader .item { font-size:14px; cursor:pointer;}
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