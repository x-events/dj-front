<template>
    <div class="instruction" v-loading="commentLoading">
        <template>
            <div class="flex-row rate_hd align-center">
                <div class="rate_title">评价结果：</div>
                <div class="rateBox flex-1">
                    <el-rate v-model="commentdata.evaluate_level" class="rate" :colors="['#ff8610','#ff8610','#ff8610']" void-color="#d8d8d8" void-icon-class="el-icon-star-on" text-color="#ff8610" show-text :texts='["差", "一般", "较好", "好", "非常好"]' :disabled="!access"></el-rate>
                    <!-- <div class="evaluate_name">{{commentdata.evaluate_name}}</div> -->
                </div>
            </div>
            <div class="_input">
                <el-input type="textarea" :rows="3" class="noborderInut" placeholder="请您就本项工作给予评价" v-model="commentdata.evaluate_content" :disabled="!access" maxlength="300"></el-input>
                <div class="_action">
                    <el-button size="small" :disabled="!access" @click="addComment">提交</el-button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import * as work from "@/api/work.js";

export default {
    props: {
        form_category_id: {
            type: [Number, String],
            required: true
        },
        id: {
            type: String,
            required: true
        },
        record_id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            commentLoading: false,
            commentdata:{
                evaluate_level:0,
                evaluate_content:"",
                evaluate_name:""
            },
            can_evaluate:false
        };
    },
    computed: {
        access(){
            if(this.$root.user.org_type != '3'){
                //非党支部身份
                if(this.can_evaluate){
                    return true
                }else{
                    return false
                }
            }else{
                //党支部身份
                return false
            }
        }
    },
    methods: {
        fetchComment: function(){
            this.commentLoading = true;
            work.evaluate_detail({
                form_category_id: this.form_category_id,
                work_id: this.id
            }).then(res => {
                let data = res.data.data;
                this.commentLoading = false
                this.commentdata = {
                    evaluate_level:Number(data.evaluate_level) || 0,
                    evaluate_content:data.evaluate_content || "",
                    evaluate_name:data.evaluate_name || ""
                }
                this.can_evaluate = !!Number(res.data.can_evaluate)
            }).catch(err =>{
                this.commentLoading = false
            });
        },
        addComment: function(){
            // if(!this.commentdata.evaluate_content){
            //     return null
            // }
            this.commentLoading = true;
            work.evaluate_save({
                work_id: this.id,
                form_category_id: this.form_category_id,
                evaluate_level: this.commentdata.evaluate_level,
                evaluate_content: this.commentdata.evaluate_content
            }).then(res => {
                this.commentdata.evaluate_content = ''
                this.fetchComment()
                this.$message({
                    message: res.data.statusCode,
                    type: 'success'
                });
            }).catch(err =>{
                this.commentdata.evaluate_content = ''
                this.fetchComment()
            });
        }
    },
    created() {
        this.fetchComment()
    }
};
</script>

<style scoped>
/* 领导批示 */
.instruction{padding:0 25px 25px;}

.instruction ._input{border: 1px solid #dcdfe6;border-radius: 4px;}
.instruction ._input ._action{text-align: right;padding:10px;}

.placeholder{width:274px;height:160px;margin:15px auto;background:url(../../assets/img/work/placeholder.jpg) 0 0 no-repeat;}
/* 日常评价 */
.rate_hd{margin-bottom:20px;}
.rate_title{font-size:16px;
line-height: 2em;
font-weight:bold;
color:rgba(8,122,217,1);}
.noborderInut>>>.el-textarea__inner, .noborderInut:hover >>> .el-textarea__inner{border:0;}

.rateBox > div { display:inline-block; vertical-align:middle;}
.rateBox .rate { height:auto;}
.rateBox .rate >>> .el-rate__icon { font-size:28px;}
.rateBox .rate >>> .el-rate__text { font-size:22px; margin-left:10px;}
.rateBox .evaluate_name { font-size:22px; color:#ff8610; margin-left:10px;}
</style>

