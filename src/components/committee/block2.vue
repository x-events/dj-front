<template>
    <div class="block_wrap_opc withTitle flex-col vbHidden" :class="{'animated zoomIn faster delay2':animate == 1,'animated zoomOut faster':animate == 2}">
        <div class="channelBar cyan" @click="$router.push({name:'书记信息-党支部',query:{id:queryParam.org_id}})">
            <div class="_title"><i class="wico wi4"></i><strong>书记有为值</strong></div>
            <div class="_ext"><i class="ion">&#xe777;</i></div>
        </div>
        <div class="flex-1 flex-col">
            <div class="controlbar tc pr">
                得分： <span class="gbox pointer" @click="$router.push({name:'书记信息-党支部',query:{id:queryParam.org_id}})">{{all}}</span>
            </div>
            <div class="flex-1 chartBox" style="margin:5px 10px;">
                <barline barWidth="20" :data="data" :colors='["#e03e3d","#7caf2d","#097c8d","#7732b5","#3f56d1"]' />
            </div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as committee from "@/api/committee";

export default {
    data() {
        return {
            animate:false,
            data:{},
            all:'',
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
            committee.ManagerDoneDetail(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
                this.all = res.data.all;
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
};
</script>

<style scoped>
.members .box { margin-bottom:20px; cursor:pointer;}
.members .avatar,.members .avatar img { width:56px; height:56px; border-radius:50%;} 
.members .avatar { margin-right:10px;}
.members .name { font-size:16px; padding-top:3px;}

.controlbar { padding:10px; line-height:26px; text-align:right; border-bottom:#1c4b77 1px solid; position:relative;}
.controlbar::after { content:''; display:block; width:100%; height:0; border-bottom:#06142a 1px solid; position:absolute; left:0; bottom:0;}
.gbox { background-color:#ffeb08; color:#85420b; font-size:22px; height:26px; line-height:26px; padding:0 10px; border-radius:13px;}

</style>