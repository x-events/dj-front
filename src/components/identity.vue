<template>
    <el-dialog class="comDialog" title="选择身份" :append-to-body="true" :visible="dialogVisible" width="440px" @open="fetchData()"  @close="closeDialog()">
        <ul class="userList scrollbar" v-if="!loading && data.length">
            <li v-for="(e,i) in data" :key="i" class="el" :title="e.organization_name+e.party_membership_name" :class="{'active':currentRole.organization_id===e.organization_id}" @click="currentRole=e">{{e.organization_name+e.party_membership_name}}</li>
        </ul>
        <div v-if="!loading && !data.length">
            <nodata color="#333333" />
        </div>
        <div class="tc loading" v-if="loading">
            <i class="el-icon-loading"></i> 加载中...
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeRole">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import * as account from "@/api/account";
import * as util from "@/assets/util";

export default {
    data() {
        return {
            dialogVisible:false,
            loading:true,
            queryParams:{},
            data:[],
            currentRole: {
                organization_id:'',
                party_membership:''
            },
            user:this.$root.user
        }
    },
    methods: {
        openDialog(){
            this.dialogVisible = true;
        },
        closeDialog(){
            this.dialogVisible = false;
        },
        fetchData(){
            this.currentRole.organization_id = this.user.org_id;

            this.loading = true;
            account.partyMemberShipList(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.data = data;
            })
        },
        changeRole: function(){
            if(this.currentRole.organization_id == this.user.org_id){
                return this.dialogVisible = false;
            }
            account.changePartyMemberShip(this.currentRole).then(res => {
                this.$message({
                    message: '切换成功',
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                        const userInfo = res.data.data
                        if(userInfo.access_token){
                            util.storage("user", userInfo);
                            this.$nextTick(() => {
                                window.location.href="/"
                            })
                        }
                    }
                });
            })
        }
    },
    created() {
        util.on("switchID", this.openDialog);
    }
};
</script>

<style scoped>
.loading .el-icon-loading { font-size:18px; vertical-align:text-bottom;}
.userList { padding:0; height:300px;}
.userList li { padding:10px; cursor:pointer; margin:1px 0; border-radius:5px; text-align:center;}
.userList li:hover,.userList li.active { background-color:#087ad9; color:#ffffff;}

.dialog-footer .el-button { min-width:8em;}
</style>
