<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInRight faster delay2':animate == 1,'animated fadeOutRight faster':animate == 2}">
        <div class="channelBar red">
            <div class="_title"><i class="ion">&#xe60f;</i><strong>党员排行</strong></div>
        </div>
        <div class="flex-1 pr flex-col scrollbar" style="margin:10px;">
            <div class="rank_list">
                <el-table :data="data" style="width: 100%" class="comTable dangyuanpaihang">
                    <el-table-column type="index" label="排名" width="40" align="center"></el-table-column>
                    <el-table-column prop="realname" label="党员名" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="complete_rate" label="学习进度" width="90" align="center"></el-table-column>
                    <el-table-column prop="complete_credit" label="学时" width="60" align="center"></el-table-column>
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
            home.mustStudyMemberRank(this.queryParam).then(res => {
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
.dangyuanpaihang thead { color:#ffffff;}
.dangyuanpaihang th:first-child > .cell,.dangyuanpaihang th:nth-child(4) > .cell { padding:0;}
.dangyuanpaihang th >.cell { font-weight:normal;}
.dangyuanpaihang .el-table__header { background-color:transparent;}
.dangyuanpaihang.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.dangyuanpaihang.el-table td,.dangyuanpaihang.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>