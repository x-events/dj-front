<template>
    <el-container class="digistBlock newWindow">
        <el-header>
            <ul class="flex-row">
                <li class="block flex-row" v-for="(item,index) in list" :key="'num'+index">
                    <div class="title"><img :src="item.icon"></div>
                    <div class="num digital flex-1">
                        <span class="dicount">{{ item.count || 0 }}</span>
                        <p class="fz16">{{ item.name }}</p>
                    </div>
                </li>
            </ul>
        </el-header>
        <el-main class="table-div t_blue flex-col flex-1 block_wrap_opc">
            <div class="flex-1 flex-col">
                <el-table stripe height="100%" :data="tableData.data" v-loading="loading">
                    <el-table-column type="index" label="序号" width="130" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="time" label="时间" width="180" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="地点" width="240" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="attendee" label="组织者" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="object_count" label="受益人数量" width="180" align="center"></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button class="colorBtn" @click.native.prevent="openDetail(scope.row)" round>查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-div fix" v-if="tableData.totalRows > 0">
                    <el-pagination background layout="prev, pager, next" :page-size="queryParam.pagesize" :current-page="Number(queryParam.p)" @current-change="pageChange" :total="Number(tableData.totalRows)"></el-pagination>
                    <span class="pageNum">共 {{ tableData.totalPages }} 页</span>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import * as util from "@/assets/util";
import * as committee from "@/api/committee";
export default {
    data() {
        return {
            animate:false,
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
                p: this.$route.query.p || 1,
                pagesize:14
            },
            tableData: {
                data: [],
                totalRows: 0,
                totalPages: 0
            },
            loading: false,
        };
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
        // 表格-查看
        openDetail(item) {
            const workType = item.work_type || item.type;
            if(workType=='2'){
                this.$router.push({name: '工作详情', query: util.paramEncode(Object.assign({}, {process_step_log_id: 0}, item))})
            }else{
                this.$router.push({name: '记录详情', query: util.paramEncode(item)})
            }
        },
        getData() {
            this.loading = true
            committee.run_things(this.queryParam).then(res => {
                this.loading = false
                let count = res.data.data.data;
                let list = res.data.data.list;
                if(!list.data) {
                    list.data = []
                }
                this.tableData = list;
                this.$set(this.list[0], 'count', count.count)
                this.$set(this.list[1], 'count', count.obj_count)
                this.$set(this.list[2], 'count', count.avg_count)
            }).catch(() => {
                this.loading = false
            })
        },
        pageChange(p){
            this.queryParam.p = p
            this.$router.push({name:'为民办实事-党支部',query:this.queryParam});
            this.$nextTick(()=>{
                this.getData();
            })
        },
    },
    created: function() {
        this.getData()
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        setTimeout(() => {this.animate = 1},0);
        util.on("leaveWindow",() =>{
            this.animate = 2;
        });
    }
};
</script>

<style scoped>
.digistBlock { overflow:hidden; padding: 25px 22px; width: 100%; box-sizing: border-box;}
.el-header { margin: 0 auto; height: 110px!important; margin-bottom: 10px; }
.block,.block::after { background:url(../assets/img/window_blocl_bg.png) no-repeat;}
.block { height:102px; width: 240px; position:relative;}
.block::after { content:''; display:block; width:23px; height:75px; background-position:right -11px; position:absolute; right:0; top:11px;}
.digistBlock .num { font-weight:normal; font-size:24px; line-height:25px; padding:25px 0; margin-right:20px; text-align:center; color:#ffeb08;}
.digistBlock .num p { font-size: 16px; color: #00ecfc; }
.digistBlock .title { width:50px; height:auto; line-height:1.2; font-size:16px; color:#00ecfc; text-align:center; padding:35px 28px 0px 25px;}
.digistBlock .block:nth-child(3) .title { padding-top:32px; padding-left: 26px; }
.digistBlock .block:nth-child(7) .title { width:45px; padding-right:30px; padding-left:28px; padding-top:30px;}
.table-div { padding: 0; }
.table-div .el-button { line-height: 10px; }
.page-div { margin-top: 5px; padding-right: 15px; line-height: 40px; }
.page-div > span, .page-div .el-pagination { float: right; } 
.page-div > span { color: #fff; margin-right: 5px; }
.min-height { min-height:698px;}
</style>
