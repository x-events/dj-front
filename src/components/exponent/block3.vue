<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar orange">
            <div class="_title"><i class="wico wi25"></i><strong>直属党组织得分排行</strong></div>
            <div class="_ext">平均得分：<span class="bar_score">{{score}}</span></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;" v-loading="loading">
            <div class="rank_list flex-1 flex-col" style="overflow:hidden;">
                <el-table :data="data" style="width: 100%" height="100%" stripe class="comTable exp_myrank flex-1">
                    <el-table-column prop="order" label="排名" width="80" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
                    <el-table-column label="得分" width="160" align="center">
                        <template slot-scope="scope">
                            <span class="imp">{{scope.row.score}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page fix" v-if="totalRows > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="totalRows" class="r"></el-pagination>
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
            loading:false,
            animate:false,
            data:[],
            score:0,
            queryParam:{
                p:1,
                pagesize:6,
                org_id:""
            },
            totalRows:0
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
        pageChange(p) {
            this.queryParam.p = p;
            this.getData();
        },
        getData: function(){
            this.loading = true;
            home.MyOrgRank(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.data = data;
                this.score = res.data.avg;
                this.totalRows = res.data.totalRows;
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
.comTable { color:#ffffff;}
.comTable::before { display:none;}
.page { padding:10px;}
</style>

<style>
.exp_myrank thead { color:#ffffff;}
.exp_myrank th:first-child > .cell { padding:0;}
.exp_myrank th >.cell { font-weight:normal;}
.exp_myrank .el-table__header { background-color:transparent;}
.exp_myrank.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.exp_myrank.el-table td,.exp_myrank.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>