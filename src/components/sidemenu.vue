<template>
    <div class="sideMenus flex-col" :class="{'act':status}">
        <div class="controlBtn" @click="toggle"><i class="ion">&#xe625;</i></div>
        <div class="hd fix">
            <div class="title l"><i class="ion">&#xe64e;</i>列表</div>
            <div class="close r" title="关闭" @click="toggle"><i class="ion">&#xe644;</i></div>
        </div>
        <div class="bd flex-1 scrollbar" v-loading="loading">
            <el-tree :data="orgData" :props="defaultProps" :show-checkbox="false" node-key="id" :check-strictly="true" :highlight-current="true" default-expand-all :expand-on-click-node="false" ref="tree" @check-change="checkChange" @node-click="nodeClick" class="comTree">
            </el-tree>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as common from "@/api/common";

export default {
    data() {
        return {
            status:false,
            loading:true,
            queryParam:{
                id:"",
            },
            orgData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        };
    },
    methods: {
        toggle(){
            this.status = !this.status
        },
        checkChange(item, node, self){
            if (node == true) {   //点击未选中复选框
                this.queryParam.id = item.id;
                this.$refs.tree.setCheckedKeys([item.id]);
            } else {
                if (this.queryParam.id == item.id) {//点击已选中复选框，保证至少一个选中
                    this.$refs.tree.setCheckedKeys([item.id]);
                }
            }
        },
        nodeClick(item, node, self){
            this.$root.default.tree_org_type = item.org_type;
            //console.log(this.$root.default.tree_org_type);
            //console.log(item);
            let curId = item.id
            this.queryParam.id = curId;
            this.$refs.tree.setCheckedKeys([curId]);

            if(item.status == '1'){
                this.$router.push({name:'党支部',params:{org_id:curId}});
            }else{
                this.$router.push({name:'可视窗口',params:{org_id:curId}});
                /* this.$nextTick(()=>{
                    setTimeout(() => {
                        util.emit('leaveWindow');
                        setTimeout(() => {
                            util.emit("getData",curId);
                        }, 400);
                    }, 10);
                }) */
            }

            this.toggle();
        },
        fetchData: function() {
            common.getRoleTree().then(res => {
                this.loading = false;
                let data = res.data.data
                //console.log(data);
                this.orgData = data;
            })
        }
    },
    created() {
        this.fetchData();
        util.on("leaveWindow", () => {
            this.status = false;
        });
    }
}
</script>

<style scoped>
.sideMenus { width:280px; height:80%; background:rgba(12,86,137,.9); position:absolute; left:-281px; top:82px; z-index:10; border-radius:0; border:2px solid #057ec3; border-left-width:0; color:#fff; overflow:visible; transition: all ease .3s;}
.sideMenus .hd { background-color:#3f79ff; padding:5px 0px 5px 15px; line-height:24px; height:24px; margin:-1px -1px 0 0; display:none;}
.sideMenus .hd .title { font-size:16px;}
.sideMenus .hd .title .ion { font-size:20px; vertical-align:-2px; margin-right:10px;}
.sideMenus .hd .close { cursor:pointer; height:24px; line-height:24px; padding:0 10px;}
.controlBtn { width:40px; height:50px; line-height:50px; padding-right:10px; text-align:center; cursor:pointer; position:absolute; right:-54px; top:50%; margin-top:-38px; border:#057ec3 2px solid; background:rgba(6,115,189,.70); border-radius:0 26px 26px 0;}
.controlBtn .ion { display:block; font-size:23px; transition: all ease .3s;}

.sideMenus.act { left:0; box-shadow:0 0 10px #333;}
.sideMenus.act .controlBtn { top:-2px; margin-top:0;}

.comTree /deep/ .el-tree-node__content { border-bottom-width:0;}
</style>