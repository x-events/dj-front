<template>
    <div class="vbHidden" :class="{'animated fadeIn faster delay4':animate == 1,'animated fadeOut faster':animate == 2}">
        <span class="position">
            <i class="wico"></i><span>{{position}}</span>
        </span>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as map from "@/api/map";

export default {
    data() {
        return {
            animate:false,
            position:"加载中...",
            queryParam:{
                org_id:""
            }
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
        getData: function() {
            this.position = "加载中..."
            map.getOrgMessage(this.queryParam).then(res => {
                let data = res.data.data;
                this.position = data.name
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = this.$root.user.org_id || ''
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
.position { display:inline-block; background-color:#093e6d; height:40px; line-height:40px; border-radius:20px; color:#00ecfc; padding:0 20px 0 15px;}
.position .wico { vertical-align:-9px;}
</style>
