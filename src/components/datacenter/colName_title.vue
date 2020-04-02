<template>
    <el-col class="col-name" :span="span"><span class="sblock">{{title}}</span></el-col>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            default:()=> {}
        },
        span: {
            type: Number,
            default:()=> {
                return 4
            }
        }
    },
    data() {
        return {}
    },
    created() {}
}
</script>

<style scoped>

</style>