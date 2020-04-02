<template>
    <div class="flex-col paddingWrap" v-loading="loading">
        <div>
            <div class="com_hd fix" v-if="data.title">
                <div class="title l">{{data.title}}</div>
                <div class="r">满分：{{data.total}}分</div>
            </div>
            <div class="com_bd" v-if="data.list.length > 0">
                <div class="standard_intro">
                    描述：{{data.description}}
                </div>
                <div class="content">
                    <div class="standard_hd standardLine flex-row">
                        <div class="sd1 flex-1">指标</div>
                        <div class="sd2">考核标准</div>
                        <div class="sd3">计算方法</div>
                        <div class="sd4">权重</div>
                    </div>
                    <div class="standard_bd">
                        <el-tree :data="data.list" :props="defaultProps" :show-checkbox="false" node-key="id" :check-strictly="true" :highlight-current="true" :default-expanded-keys="exp_arr" :expand-on-click-node="false" ref="tree" @node-click="nodeClick" class="comTree">
                            <div class="custom-tree-node standardLine flex-row" slot-scope="{ node, data }">
                                <div class="sd1 flex-1" :title="data.title" :id="data.id">{{data.title}}</div>
                                <div class="sd2" :title="data.standard">{{data.standard}}</div>
                                <div class="sd3" :title="data.method">{{data.method}}</div>
                                <div class="sd4" :title="data.percent+'%'">{{data.percent}}%</div>
                            </div>
                        </el-tree>
                    </div>
                </div>
            </div>
            <div class="com_bd" v-if="data.list.length == 0">
                <nodata color="#ffffff" />
            </div>
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            loading:true,
            data:{
                title:'',
                total:0,
                description:'',
                list:[]
            },
            orgData:[],
            defaultProps: {
                children: 'list',
                label: 'title'
            },
            treeParam:{
                id:"",
            },
            queryParam:{
                org_id:""
            },
            exp_arr:[]
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
            this.animate = 2;
            setTimeout(() => {
                this.animate = 1;
            }, 400);
        }
    },
    methods: {
        checkChange(item, node, self){
            if (node == true) {   //点击未选中复选框
                this.treeParam.id = item.id;
                this.$refs.tree.setCheckedKeys([item.id]);
            } else {
                if (this.treeParam.id == item.id) {//点击已选中复选框，保证至少一个选中
                    this.$refs.tree.setCheckedKeys([item.id]);
                }
            }
        },
        nodeClick(item, node, self){
            //console.log(item);
        },
        getData: function() {
            home.standards(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                for (let i = 0; i < data.list.length; i++) {
                    const e = data.list[i];
                    //console.log(e.id);
                    this.exp_arr.push(e.id);
                }
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
        this.getData()
    }
}
</script>

<style scoped>
.scrollbar { overflow-y:auto!important;}
.standard_intro { background:rgba(0,0,0,.2); color:#fff; padding:15px; color:#b6c3d1; border-radius:10px; margin-bottom:15px;;}
.standard_hd,.custom-tree-node { width:100%; box-sizing:border-box; position:relative;}
.standard_hd { height:44px; line-height:44px; background-color:#3f79ff; color:#ffffff; border-radius:10px; margin-bottom:10px;}
.sd2 { width:320px; margin-right:20px; margin-left:20px;}
.sd3 { width:320px; margin-right:20px;}
.sd4 { width:120px; text-align:center;}
.standard_hd .sd1 { padding-left:40px;}
.custom-tree-node .sd4 { color:#3f79ff;}
</style>
