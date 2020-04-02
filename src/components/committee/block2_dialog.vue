<template>
    <el-dialog title="党务工作者信息卡" :visible.sync="dialogVisible" custom-class="comDialog" class="dangyuanDialog" :before-close="handleClose">
        <div class="hd flex-row">
            <div class="avatar"><img :src="data.avatar" :alt="data.realname"></div>
            <div class="flex-1">
                <div class="name">{{data.realname}}</div>
                <div class="sex">性别：
                    <template v-if="data.sex == '0'">
                        男
                    </template>
                    <template v-if="data.sex == '1'">
                        女
                    </template>
                </div>
            </div>
        </div>
        <div class="bd">
            <div class="info">出生年月：{{data.birthday}}</div>
            <div class="info">入党时间：{{data.join_time}}</div>
            <div class="info">参加工作时间：{{data.work_time}}</div>
            <div class="info">学历：{{data.education}}</div>
            <div class="info">专业：{{data.majorthey}}</div>
            <div class="info">所在单位：{{data.org_name}}</div>
            <div class="info">现任职务：{{data.role}}</div>
            <div class="info">从事现岗位时长：{{data.time}} 年</div>
            <div class="info">年度考核结果：{{data.score}}</div>
        </div>
        <div class="tc"><el-button type="primary" @click="dialogVisible = false">关闭</el-button></div>
    </el-dialog>
</template>

<script>
import * as util from "@/assets/util";
import * as committee from "@/api/committee";

export default {
    data() {
        return {
            dialogVisible:false,
            queryParam:{
                uid:"",
                org_id:""
            },
            data:{
                realname:"",
                birthday:"",
                sex:"",
                join_time:"",
                work_time:"",
                education:"",
                majorthey:"",
                org_name:"",
                avatar:"",
                role:"",
                time:"",
                score:""
            }
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        }
    },
    methods: {
        handleClose(done) {
            this.data.realname = ""
            this.data.birthday = ""
            this.data.sex = ""
            this.data.join_time = ""
            this.data.work_time = ""
            this.data.education = ""
            this.data.majorthey = ""
            this.data.org_name = ""
            this.data.avatar = ""
            this.data.role = ""
            this.data.time = ""
            this.data.score = ""

            done()
        },
        getData: function() {
            committee.memberinfo(this.queryParam).then(res => {
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
        util.on("dy_dialog",(uid) =>{
            this.dialogVisible = !this.dialogVisible
            this.queryParam.uid = uid
            this.$nextTick(()=>{
                this.getData();
            })
        });
    }
}
</script>

<style scoped>
.hd { margin-bottom:15px;}
.avatar,.avatar img { width:85px; height:85px;}
.avatar { margin-right:15px;}
.name { font-size:24px;}
.info { margin-bottom:5px; padding-left:8px;}
.el-button { min-width:90px; background-color:#3f79ff; border-color:#3f79ff;}
</style>

<style>
.dangyuanDialog .comDialog { width:500px;}
.dangyuanDialog .comDialog .el-dialog__body { padding:20px;}
</style>