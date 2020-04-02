<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay5':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar yellow">
            <div class="_title"><i class="ion">&#xe77a;</i><strong>专题学习工作记录</strong></div>
        </div>
        <div class="flex-1 flex-col t_blue">
            <el-table :data="data.data" height="100%" stripe v-loading="loading">
                <el-table-column prop="name" label="工作名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="time" label="时间" width="100" align="center"></el-table-column>
                <el-table-column prop="org_name" label="党组织" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="category_name" label="工作类型" align="center" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="page-div fix" v-if="Number(data.totalRows) > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(data.totalRows)"></el-pagination>
                <span class="pageNum">共 {{ data.totalPages }} 页</span>
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
            data:{
                data:[],
                totalRows:0,
                totalPages:0
            },
            queryParam:{
                org_id:"",
                p:1,
                pagesize:10
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
        pageChange(p){
            this.queryParam.p = p
            this.getData();
        },
        getData: function(){
            this.loading = true;
            home.studyrecord(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data;
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
