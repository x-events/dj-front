<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay4':animate == 1,'animated fadeOutDown faster':animate == 2}">
        <div class="channelBar orange">
            <div class="_title"><i class="wico wi25"></i><strong>直属党组织活跃度排名</strong></div>
        </div>
        <div class="flex-1 pr flex-col scrollbar" style="margin:10px;">
            <div class="rank_list">
                <el-table :data="data" style="width: 100%" class="comTable zhibupaihang">
                    <el-table-column type="index" label="排名" width="50" align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
                    <el-table-column label="活跃度" width="60" align="center">
                        <template slot-scope="scope">
                            <span class="lightBlue">{{scope.row.score}}</span>
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
            data:[],
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
            home.activeRank(this.queryParam).then(res => {
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
.zhibupaihang thead { color:#ffffff;}
.zhibupaihang th:first-child > .cell,.zhibupaihang th:nth-child(3) > .cell { padding:0;}
.zhibupaihang th >.cell { font-weight:normal;}
.zhibupaihang .el-table__header { background-color:transparent;}
.zhibupaihang.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;color:#00ffff;}
.zhibupaihang.el-table td, .zhibupaihang.el-table th.is-leaf { border-bottom-color:#3b5694;cursor: default;}
</style>