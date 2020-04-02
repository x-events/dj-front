<template>
    <el-dialog class="comDialog" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData(true)" @close="$emit('close')">
        <div class="detailInfo worklist" v-loading="loading">
            <el-table :data="detailData" style="width: 100%">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="user_name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="org_name" label="党组织" show-overflow-tooltip></el-table-column>
                <el-table-column prop="duty" label="职务" show-overflow-tooltip v-if="duty"></el-table-column>
            </el-table>
            <div class="page-div fix" v-if="totalRows > 0">
                <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(totalRows)"></el-pagination>
                <span class="pageNum">共 {{ totalPages }} 页</span>
            </div>
        </div>
  </el-dialog>
</template>

<script>
import * as home from "@/api/window";

export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false
        },
        category_name: {
            type: String,
            required: true
        },
        org_id: {
            type: String,
            required: true
        },
        item_id:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            queryParam:{
                p:1,
                pagesize:10
            },
            detailData:[],
            totalRows:0,
            totalPages:0,
            duty:false
        }
    },
    watch: {
        detailData(new_val){
            if(new_val.length){
                if(new_val[0].duty || new_val[0].duty == ''){
                    this.duty = true
                }
            }
        }
    },
    methods: {
        pageChange(p){
            this.queryParam.p = p;
            this.fetchData();
        },
        fetchData(init) {
            if(init){
                this.queryParam.p = 1;
            }
            this.loading = true;
            if (this.type && this.org_id) {
                home.memberList({ 
                    p:this.queryParam.p,
                    pagesize:this.queryParam.pagesize,
                    type:this.type,
                    org_id:this.org_id,
                    item_id:this.item_id
                }).then(res => {
                        this.loading = false;
                        let data = res.data;
                        this.detailData = data.data;
                        this.totalRows = data.totalRows;
                        this.totalPages = data.totalPages;
                    })
            }else{
                this.loading = false;
                console.warn('参数错误')
            }
        }
    },
    created() {}
};
</script>

<style scoped>
.worklist { background-color:#ffffff;}
.worklist .el-table >>> td,.worklist .el-table >>> th { padding:12px 0;}
.page-div { padding:10px 0 0 0; line-height:28px;}
.page-div > span { color:#333333;}
</style>
