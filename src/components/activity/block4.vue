<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay5':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar yellow">
            <div class="_title"><i class="ion">&#xe77a;</i><strong>主题党日活动记录</strong></div>
        </div>
        <div class="flex-1 flex-col t_blue">
            <el-table :data="data.data" height="100%" stripe v-loading="loading">
                <el-table-column prop="work_name" label="主题" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="org_name" label="党组织名称" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="end_time" label="时间" width="100" align="center"></el-table-column>
                <el-table-column prop="address" label="地点" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="resource" label="依托资源" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" label="形式" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button class="colorBtn" @click.native.prevent="showDetail(scope.row.id)" round>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-div fix" v-if="Number(data.totalRows) > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(data.totalRows)"></el-pagination>
                <span class="pageNum">共 {{ data.totalPages }} 页</span>
            </div>
        </div>

        <detaildialog :detailId="detail_id" />

    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";
import detaildialog from "@/components/activity/dialog";

export default {
    components:{
        detaildialog
    },
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
            },
            detail_id:""
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
        showDetail(id){
            this.detail_id = id;
        },
        pageChange(p){
            this.queryParam.p = p
            this.getData();
        },
        getData: function(){
            this.loading = true;
            home.activityrecord(this.queryParam).then(res => {
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
