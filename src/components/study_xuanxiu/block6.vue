<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInUp faster delay4':animate == 1,'animated fadeOutDown faster':animate == 2}">
        <div class="channelBar green">
            <div class="_title"><i class="ion">&#xe61f;</i><strong>最热选学读物</strong></div>
        </div>
        <div class="flex-1 pr flex-col t_blue" style="margin:10px;">
            <el-table :data="data" style="width: 100%" height="100%" stripe class="comTable xxdw">
                <el-table-column type="index" label="排名" width="80" align="center"></el-table-column>
                <el-table-column prop="title" label="读物名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="number" label="选学人数" width="100" align="center"></el-table-column>
            </el-table>
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
            home.hotReadRank(this.queryParam).then(res => {
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
.xxdw thead { color:#ffffff;}
.xxdw th:first-child > .cell,.xxdw th:nth-child(3) > .cell { padding:0;}
.xxdw th >.cell { font-weight:normal;}
.xxdw .el-table__header { background-color:transparent;}
.xxdw.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.xxdw.el-table td,.xxdw.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>