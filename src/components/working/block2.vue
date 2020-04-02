<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated fadeInRight faster delay2':animate == 1,'animated fadeOutRight faster':animate == 2}">
        <div class="channelBar orange">
            <div class="_title"><i class="ion">&#xe60f;</i><strong>排行榜</strong></div>
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;">
            <div class="rank_list">
                <el-table :data="data" style="width: 100%" class="comTable phb">
                    <el-table-column type="index" label="排名" width="40" align="center"></el-table-column>
                    <el-table-column prop="name" label="党组织" show-overflow-tooltip></el-table-column>
                    <el-table-column label="总件数" width="80" align="center">
                        <template slot-scope="scope">
                            <span class="lightBlue">{{scope.row.count}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="doing" label="进行中" width="80" align="center">
                        <template slot-scope="scope">
                            <span class="lightBlue">{{scope.row.stay}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="finished" label="已结束" width="80" align="center">
                        <template slot-scope="scope">
                            <span class="lightBlue">{{scope.row.ended}}</span>
                        </template>
                    </el-table-column>
                </el-table>
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
            data:[
                
            ],
            queryParam:{
                org_id:""
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
        getData: function(){
            home.rank_lists(this.queryParam).then(res => {
                let data = res.data.data;
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

<style scoped>
.comTable { color:#ffffff;}
.comTable::before { display:none;}
</style>

<style>
.phb thead { color:#ffffff;}
.phb th:first-child > .cell,.phb th:nth-child(3) > .cell { padding:0;}
.phb th >.cell { font-weight:normal;}
.phb .el-table__header { background-color:transparent;}
.phb.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.phb.el-table td,.phb.el-table th.is-leaf { border-bottom-color:rgba(255, 255, 255, .15);}
</style>