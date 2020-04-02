<template>
    <div class="loading" v-if="loading"></div>
</template>

<script>
import * as util from "@/assets/util"
export default {
    data() {
        return {
            loading:false
        }
    },
    created() {
        setTimeout(() => {
            this.loading = false
        }, 500);
    }
}
</script>

<style scoped>
.loading { width:100%; height:100%; position:fixed; left:0; top:0; background:url(../assets/img/loading.gif) center no-repeat #2e5692; z-index:20;}
</style>