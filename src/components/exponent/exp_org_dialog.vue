<template>
    <el-dialog class="comDialog" :title="category_name" :append-to-body="true" :visible="visible" width="1200px" @open="fetchData()" @close="$emit('close')">
        <div class="detailInfo" v-loading="loading">
            <div class="box fix">
                <dl class="flex-1 flex-row" v-for="(e,i) in detailData" :key="i" :title="i+'：'+e">
                    <dt class="el">{{i}}</dt>
                    <dd class="flex-1 el">{{e}}</dd>
                </dl>
            </div>
        </div>
  </el-dialog>
</template>

<script>
import * as home from "@/api/window";

export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false
        },
        category_name: {
            type: String,
            required: true
        },
        org_id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            detailData:[]
        }
    },
    methods: {
        fetchData: function() {
            this.loading = true;
            if (this.org_id) {
                home.org_detail({org_id:this.org_id}).then(res => {
                        this.loading = false;
                        let data = res.data.data;
                        this.detailData = data
                    })
            }else{
                console.warn('参数错误')
            }
        }
    },
    created() {}
};
</script>

<style scoped>
.detailInfo { text-align:center;}
.detailInfo .box { border:#e5e7ed 1px solid;}
.detailInfo dl { width:50%; float:left; border-top:#e5e7ed 1px solid; margin-top:-1px;}
.detailInfo dt { background-color:#326ac6; color:#ffffff; width:145px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
.detailInfo dt,.detailInfo dd { padding:15px 0;}
.detailInfo dd { padding-left:15px; padding-right:15px;}
.detailInfo dd.tl { text-align:left;}
</style>
