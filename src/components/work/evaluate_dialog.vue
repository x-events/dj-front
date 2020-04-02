<template>
    <div>
        <el-dialog class="comDialog" :title="dialogtype == 'detail_evaluate'? '日常评价': dialogname" :append-to-body="true" :visible="visible" width="430px" @open="fetchData()" @close="dialogClose()">
            <div class="dialogname" v-if="dialogtype == 'detail_evaluate'">{{dialogname}}</div>
            <div class="satisfied_score" v-if="dialogtype == 'satisfied'">
                <el-input v-model.trim="queryParams.satisfied_score" oninput="value=value.replace(/[^\d.]/g,'').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" placeholder="请输入评分"></el-input>
            </div>
            <div class="evaluate_level" v-if="dialogtype == 'evaluate' || dialogtype == 'detail_evaluate'">
                <el-rate v-model="queryParams.evaluate_level" class="rate" :colors="['#ff8610','#ff8610','#ff8610']" void-color="#d8d8d8"></el-rate>
            </div>
            <div class="evaluate_content" v-if="dialogtype == 'detail_evaluate'">
                <el-input type="textarea" :rows="4" placeholder="请您就本项工作给予评价" v-model="queryParams.evaluate_content" maxlength="300"></el-input>
            </div>
            <div class="buttons tc">
                <el-button type="primary" @click="submitEvaluate()"><i class="ion">&#xe645;</i>确定</el-button>
                <el-button @click="dialogClose()"><i class="ion">&#xe6ff;</i>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as work from "@/api/work";
import * as util from "@/assets/util";

export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false
        },
        dialogtype: {
            type: String,
            default: function(){
                return ''
            }
        },
        dialogname: {
            type: String,
            default: function(){
                return ''
            }
        },
        org_id: {
            type: String,
            default: function(){
                return ''
            }
        },
        year: {
            type: [Number, String],
            default: function(){
                return ''
            }
        },
        evaluate_level: {
            type: [Number, String],
            default: function(){
                return 0
            }
        },
        evaluate_content: {
            type: String,
            default: function(){
                return ''
            }
        },
        satisfied_score: {
            type: [Number, String],
            default: function(){
                return ''
            }
        },
        form_category_id: {
            type: String,
            default: function(){
                return ''
            }
        },
        work_id: {
            type: String,
            default: function(){
                return ''
            }
        },
    },
    watch: {
        org_id(new_val){
            this.queryParams.org_id = new_val;
        },
        year(new_val){
            this.queryParams.year = new_val;
        },
        satisfied_score(new_val){
            this.queryParams.satisfied_score = new_val;
        },
        evaluate_level(new_val){
            this.queryParams.evaluate_level = Number(new_val);
        },
        evaluate_content(new_val){
            this.queryParams.evaluate_content = new_val;
        },
        form_category_id(new_val){
            this.queryParams.form_category_id = new_val;
        },
        work_id(new_val){
            this.queryParams.work_id = new_val;
        },
        'queryParams.satisfied_score'(new_val,old_val){
            //只允许输入1个.
            let changeNumber = new_val.toString().match(/^\d+(?:\.\d{0,1})?/);
            if(changeNumber){
                this.queryParams.satisfied_score = changeNumber[0];
            }
            //不允许0
            // if(Number(new_val) == 0){
            //     this.queryParams.satisfied_score = ''
            // }
            //不允许大于100
            if(Number(new_val) > 100){
                this.queryParams.satisfied_score = old_val
            }
        }
    },
    data() {
        return {
            loading:false,
            queryParams:{
                org_id:'',
                year:'',
                satisfied_score:'',
                evaluate_level:0,
                evaluate_content:'',
                form_category_id:'',
                work_id:''
            }
        }
    },
    methods: {
        dialogClose(){
            this.$emit('close');
            this.queryParams = {
                org_id:'',
                year:'',
                satisfied_score:'',
                evaluate_level:0,
                evaluate_content:'',
                form_category_id:'',
                work_id:''
            }
        },
        submitEvaluate(){
            let vm = this;
            let api = work.evaluate_edit
            let queryParams = {};
            if(this.dialogtype == 'evaluate'){
                queryParams = {
                    org_id:this.queryParams.org_id,
                    year:this.queryParams.year.toString(),
                    evaluate_level:this.queryParams.evaluate_level
                }
            }
            if(this.dialogtype == 'satisfied'){
                api = work.satisfied_edit
                if(this.queryParams.satisfied_score == ''){
                    this.$message.warning('请输入评分');
                    return;
                }
                queryParams = {
                    org_id:this.queryParams.org_id,
                    year:this.queryParams.year.toString(),
                    satisfied_score:Number(this.queryParams.satisfied_score).toFixed(1),
                }
            }
            if(this.dialogtype == 'detail_evaluate'){
                api = work.evaluate_save
                queryParams = {
                    form_category_id:this.queryParams.form_category_id,
                    work_id:this.queryParams.work_id,
                    evaluate_level:this.queryParams.evaluate_level,
                    evaluate_content:this.queryParams.evaluate_content
                }
            }
            
            api(queryParams).then(res => {
                this.$message({
                    message: res.data.statusCode,
                    type: 'success',
                    onClose(){
                        vm.dialogClose();
                        vm.$emit('changed');
                    }
                });
            })
        },
        fetchData(){
            //console.log(Number(15.7784514000.toString().match(/^\d+(?:\.\d{0,1})?/)));
            
            // console.log(this.dialogtype,'dialogtype');
            // console.log(this.org_id,'org_id');
            // console.log(this.year,'year');
            // console.log(this.evaluate_level,'evaluate_level');
            // console.log(this.satisfied_score,'satisfied_score');
        }
    }
};
</script>

<style scoped>
.dialogname { font-size:16px; margin-top:-10px; margin-bottom:10px;}
.buttons {padding-top:20px;}
.el-button { min-width:95px;}
.el-button .ion { font-size:18px; vertical-align:text-bottom; margin-right:4px;}
.evaluate_level .rate { text-align:center; height:auto;}
.evaluate_level .rate >>> .el-rate__icon { font-size:38px;}
.evaluate_content { padding:15px 0px 0;}
</style>
