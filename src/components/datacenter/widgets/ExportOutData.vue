<template>
    <el-button size="small" @click="exportData">导出数据</el-button>
</template>

<script>
import * as datacenter from '@/api/datacenter.js'
export default {
    props:{
        expType:{
            type: String,
            default:()=>{
                return ''
            }
        },
        keyword:{
            type: String,
            default:()=>{
                return ''
            }
        },
        org_id:{
            type: [Number,String],
            default:()=>{
                return ''
            }
        }
    },
    data() {
        return {
            user_org_id:''
        }
    },
    watch: {
        'org_id'(new_val){
            this.user_org_id = new_val
        }
    },
    methods: {
        exportData() {
            //console.log(`${datacenter.datacenter_export}?keyword=${this.keyword}&type=${this.expType}&org_id=${this.user_org_id}`)
            window.location.href = `${datacenter.datacenter_export}?keyword=${this.keyword}&type=${this.expType}&org_id=${this.user_org_id}`
        }
    },
    mounted() {
        this.user_org_id = this.org_id || this.$root.user.org_id
    }
}
</script>