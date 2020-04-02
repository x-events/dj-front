<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay5':animate == 1,'animated fadeOutDown faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title"><i class="wico wi27"></i><strong>机关党组织组织力指数</strong></div>
            <div class="_ext">平均得分：<span class="bar_score">{{data.avg}}</span> <i class="wico wi29" @click="switchData"></i></div>
        </div>
        <div class="flex-1 flex-col" style="margin-top:10px;" v-if="chart == false" v-loading="loading">
            <div class="rank_list flex-1 scrollbar">
                <el-table :data="data.result" style="width: 100%" class="comTable wcs1">
                    <el-table-column type="index" :index="indexMethod" label="排名" width="80" align="center"></el-table-column>
                    <el-table-column prop="name" label="党组织" show-overflow-tooltip></el-table-column>
                    <el-table-column label="得分" width="60" align="center">
                        <template slot-scope="scope">
                            <span class="imp">{{scope.row.score}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-div fix" v-if="totalRows > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(totalRows)"></el-pagination>
                <span class="pageNum">共 {{ totalPages }} 页</span>
            </div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;" v-if="chart == true">
            <barline :data="chartData" axisPointer="line" :colors="['#ff43e7']" :areaColors="['#ff43e7']" :areaColors_status="true" :legendShow="true" />
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            loading:false,
            animate:false,
            data:{
                result:[],
                avg:0
            },
            queryParam:{
                org_id:"",
                type:1,
                p:1,
                pagesize:7
            },
            totalRows:0,
            totalPages:0,
            chart:true,
            chartData:{}
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
        indexMethod(index) {
            return (index + 1) + (this.queryParam.p-1)* this.queryParam.pagesize;
        },
        pageChange(p){
            this.queryParam.p = p;
            this.getData();
        },
        switchData(){
            this.chart = !this.chart;
        },
        getData: function(){
            this.loading = true;
            home.workCommitteeRank(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data;
                this.data.result = data.data;
                this.data.avg = data.avg;
                this.totalRows = data.totalRows;
                this.totalPages = data.totalPages;
            })
        },
        getChart(){
            home.workCommitteeLine(this.queryParam).then(res => {
                let data = res.data.data;
                this.chartData = data;
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
        this.getChart();

        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });
    }
}
</script>

<style scoped>
.comTable { color:#ffffff;}
.comTable::before { display:none;}

.page-div { margin-top: 5px; padding-right: 15px; line-height: 40px; }
.page-div > span, .page-div .el-pagination { float: right; } 
.page-div > span { color: #fff; margin-right: 5px; }
</style>

<style>
.wcs1 thead { color:#ffffff;}
.wcs1 th:first-child > .cell,.wcs1 th:nth-child(3) > .cell { padding:0;}
.wcs1 th >.cell { font-weight:normal;}
.wcs1 .el-table__header { background-color:transparent;}
.wcs1.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.wcs1.el-table td,.wcs1.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>
