<template>
    <div class="flex-col">
        <div class="loading" v-if="loading"></div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as account from "@/api/account";
export default {
    data() {
        return {
            loading:true,
            queryParam:this.$route.query || {}
        }
    },
    methods: {
        getData(){
            account.loginNoPassword(this.queryParam).then(res => {
                let data = res.data.data;
                util.storage("user", res.data.data);
                if(data.to){
                    setTimeout(() => {
                        window.location.href=data.to
                    }, 100);
                }else{
                    util.emit("login", this.$router.currentRoute.query.from);
                }
            })
        }
    },
    created() {
        //console.log(this.$route.query);
        this.getData()
    }
};
</script>

<style scoped>
.loading { width:100%; height:100%; position:fixed; left:0; top:0; background:url(../assets/img/loading.gif) center no-repeat #2e5692; z-index:20;}
</style>
