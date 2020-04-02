<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated fadeInLeft faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar cyan">
            <div class="_title"><i class="ion">&#xe657;</i><strong>专题学习参加人数统计</strong></div>
        </div>
        <div class="flex-1 chartBox" style="margin:10px;">
            <pie :data="data" radius="40%,50%" :label="true" />
            <div class="comTotal" v-if="data.all_count">{{data.all_count}}人</div>
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
            home.studymember(this.queryParam).then(res => {
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
.zhibupaihang_spec thead { color:#ffffff;}
.zhibupaihang_spec th:first-child > .cell,.zhibupaihang_spec th:nth-child(3) > .cell { padding:0;}
.zhibupaihang_spec th >.cell { font-weight:normal;}
.zhibupaihang_spec .el-table__header { background-color:transparent;}
.zhibupaihang_spec.el-table--enable-row-hover .el-table__body tr:hover>td { background-color:#466a8e;}
.zhibupaihang_spec.el-table td,.zhibupaihang_spec.el-table th.is-leaf { border-bottom-color:#3b5694;}
</style>