<template>
    <div class="block_wrap_opc flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar purple">
            <div class="_title"><i class="ion">&#xe617;</i><strong>直属党组织得分走势</strong></div>
            <!-- <div class="_ext">平均得分：<span class="bar_score">{{score}}</span></div> -->
        </div>
        <div class="flex-1 pr flex-col" style="margin:10px;">
            <barline :data="data" axisPointer="line" :colors="['#2ad988','#ff43e7']" :areaColors="['#2ad988','#ff43e7']" />
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
            data:{},
            score:0,
            queryParam:{
                org_id:"",
                type:0
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
            home.workCommitteeLine(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
                this.score = data.avg;
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
.exp_zbRank thead { color:#ffffff;}
.exp_zbRank th:first-child > .cell { padding:0;}
.exp_zbRank th >.cell { font-weight:normal;}
.exp_zbRank .el-table__header { background-color:transparent;}
.exp_zbRank.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.exp_zbRank.el-table td,.exp_zbRank.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>