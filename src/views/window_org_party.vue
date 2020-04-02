<template>
    <div class="flex-col paddingWrap orgbg">
        <div class="orgBox">
            
            <div class="org_list flex-row floor1">
                <div v-for="(e,i) in data" :key="i" :class="'org'+(i+1)">
                    <div class="box" @click="showInfo(e);" :title="e.name">
                        <div class="num">{{e.value}}</div>
                        <div class="name">{{e.name}}</div>
                    </div>
                    <div class="list flex-row floor2">
                        <div v-for="(ee,ii) in e.children" :key="ii" v-if="e.children.length > 0">
                            <div class="box" @click="showInfo(ee);" :title="ee.name">
                                <div class="num">{{ee.value}}</div>
                                <div class="name">{{ee.name}}</div>
                            </div>
                            <div class="list flex-row floor3">
                                <div v-for="(eee,iii) in ee.children" :key="iii" v-if="ee.children.length > 0">
                                    <div class="box" @click="showInfo(eee);" :title="eee.name">
                                        <div class="num">{{eee.value}}</div>
                                        <div class="name">{{eee.name}}</div>
                                    </div>
                                    <div class="list flex-row floor4">
                                        <div v-for="(eeee,iiii) in eee.children" :key="iiii" v-if="eee.children.length > 0">
                                            <div class="box" @click="showInfo(eeee);" :title="eeee.name">
                                                <div class="num">{{eeee.value}}</div>
                                                <div class="name">{{eeee.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <el-dialog :visible.sync="dialogVisible" width="980" custom-class="newComDialog" class="dzzwDialog" :close-on-click-modal="false" :close-on-press-escape="false">
            <span slot="title" class="el-dialog__title"><i class="wico wi17_b"></i> {{dialogTitle}}</span>
            <div class="flex-row listShow" :class="{'detailShow':detailStatus == true}">
                <div class="tree">
                    <el-collapse v-model="tree.parent_value" accordion @change="changeBig">
                        <el-collapse-item :name="e.value" v-for="(e,i) in tab" :key="i">
                            <template slot="title">
                                <i class="ewico" :class="'ewi'+i"></i>{{e.name}}
                            </template>
                            <div class="link" v-for="(ee,i) in e.list" :key="i">
                                <a :id="ee.id" class="flex-row" :class="{'active':tree.location_value == ee.value}" :title="ee.name" @click="getOrgManager(ee)">
                                    <div class="flex-1 el">{{ee.name}}</div>
                                    <div>（{{ee.count}}）</div>
                                </a>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="flex-1" v-loading="loading" style="padding:20px 30px;">
                    <div class="hd fix">
                        <div class="sqdw" v-for="(e,i) in listData.dict" :key="i" :class="'color'+(i+1)">
                            <i class="oico"></i>
                            <div class="num">{{e.count}}</div>
                            <div class="name">{{e.name}}</div>
                        </div>
                    </div>
                    <el-table :data="listData.org_data.data" stripe style="width: 100%" class="boxTable">
                        <el-table-column prop="short_name" label="党组织名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type_name" label="类型" width="150" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" label="操作" width="70">
                            <template slot-scope="scope">
                                <a @click="showDetail(scope.row)" class="blue">查看</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @current-change="handleCurrentChange" :current-page="listParam.p" :page-size="listParam.pagesize" layout="total, prev, pager, next" :total="totalRows" background v-if="totalPages > 1">
                    </el-pagination>

                </div>
            </div>
            <div class="backBtn" v-if="detailStatus" title="返回" @click="hideDetail"><i class="ion">&#xe69d;</i></div>
            <div class="detailInfo scrollbar" :class="{'show':effect == true}" v-if="detailStatus">
                <div class="box fix">
                    <dl class="flex-1 flex-row" v-for="(e,i) in detailData" :key="i" :title="i+'：'+e">
                        <dt class="el">{{i}}</dt>
                        <dd class="flex-1 el">{{e}}</dd>
                    </dl>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            loading:false,
            data:[],
            dialogVisible:false,
            tab:[],
            listData:{
                dict:[],
                org_data:{
                    data:[]
                }
            },
            totalRows:0,
            totalPages:0,
            queryParam:{
                org_id:"",
            },
            listParam:{
                pid:'',
                value:"",
                p:1,
                pagesize:8
            },
            tree:{
                parent_value:"",
                location_value:"",
                parent_id:""
            },
            detailStatus:false,
            effect:false,
            detailData:[],
            dialogTitle:'党组织信息列表'
        }
    },
    watch: {
        dialogVisible(value){
            if(!value){
                this.tree = {
                    parent_value:"",
                    location_value:""
                }
                this.listData = {
                    dict:[],
                    org_data:{
                        data:[]
                    }
                }
            }
        }
    },
    methods: {
        handleCurrentChange(val){
            this.listParam.p = val;
            this.getList(true);
        },
        getList(page){
            this.loading = true;
            if(!page){
                this.listParam.p = 1
            }
            //获取列表
            this.listParam.pid = this.tree.parent_id;
            this.listParam.value = this.tree.location_value;

            home.orglist(this.listParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.listData = data;
                this.totalRows = Number(data.org_data.totalRows);
                this.totalPages = Number(data.org_data.totalPages);
            })
        },
        showInfo(e){
            //点击拓扑图
            //console.log(e);
            this.tree.parent_value = e.parent_value.toString();
            this.tree.location_value = e.location_value;
            if(!this.dialogVisible){
                this.dialogVisible = true;
            }

            if(this.tab.length == 0){ return}
            this.tab.forEach((element,index)=>{
                if(this.tree.parent_value == element.value){
                    this.tree.parent_id = element.id;
                }
            })
            this.$nextTick(() =>{
                this.getList();
            })
        },
        changeBig(val){
            //切换大分类
            //console.log(val);
            if(val == ''){return}
            this.tree.location_value = ""
            this.tab.forEach((element,index)=>{
                if(val == element.value){
                    this.tree.parent_id = element.id;
                }
            })
            this.$nextTick(() =>{
                this.getList();
            })
        },
        getOrgManager(e){
            //点击小类
            //console.log(e);
            this.tree.parent_id = e.parent_id.toString();
            this.tree.location_value = e.value;
            this.$nextTick(() =>{
                this.listParam.p = 1
                this.getList();
            })
        },
        showDetail(e){
            home.org_detail({org_id:e.id}).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.detailStatus = true;
                this.dialogTitle = '党组织信息'
                setTimeout(() => {
                    this.effect = true;
                }, 10);
                //console.log(data);
                this.detailData = data
            })
        },
        hideDetail(){
            this.detailStatus = false;
            this.effect = false;
            this.dialogTitle = '党组织信息列表'
            this.detailData = [];
        },
        getData: function() {
            //获取拓扑图
            home.org(this.queryParam).then(res => {
                let data = res.data.data;
                this.data = data;
            })
            //获取弹窗菜单
            home.orgcount(this.queryParam).then(res => {
                let data = res.data.data;
                this.tab = data;
            })
        }
    },
    created() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        this.getData();
    }
}
</script>

<style scoped>
.orgbg { background:url(../assets/img/org_body_bg.png) bottom repeat-x;}
.dzzwDialog /deep/ .newComDialog { width:900px;}
.dzzwDialog /deep/ .el-dialog__body { padding:0;}
.ewico { display:inline-block; vertical-align:-9px; width:30px; height:30px; overflow:hidden; background:url(../assets/img/ewz_ico.png) no-repeat; margin-right:8px;}
.ewi1 { background-position:-30px 0;}
.ewi2 { background-position:-60px 0;}
.tree /deep/ .el-collapse-item__header.is-active { background-color:#3d7de5; color:#ffffff;}
.tree /deep/ .el-collapse-item__header.is-active .ewi0 { background-position:0 -30px;}
.tree /deep/ .el-collapse-item__header.is-active .ewi1 { background-position:-30px -30px;}
.tree /deep/ .el-collapse-item__header.is-active .ewi2 { background-position:-60px -30px;}
.tree /deep/ .el-collapse-item__arrow { display:none;}
.tree /deep/ .el-collapse-item__header,.tree /deep/ .el-collapse-item__wrap,.el-collapse { border-width:0;}
.tree /deep/ .el-collapse-item__header { border-radius:8px; padding-left:15px; font-size:16px;}
.tree /deep/ .el-collapse-item__content { padding:15px 0 5px;}
.tree { width:220px; padding:15px; background-color:#ffffff; box-sizing:border-box; box-shadow:0 0 5px #ccc; min-height:480px;}

.link a { line-height:22px; padding:7px 10px 7px 30px; position:relative;}
.link a::before { content:''; display:block; width:7px; height:7px; overflow:hidden; background:#646364; border-radius:50%; position:absolute; left:14px; top:14px;}
.link a.active,.link a:hover { color:#3d7de5;}
.link a.active::before,.link a:hover::before { background:#3d7de5;}

.scrollbar { overflow-y:auto!important;}
.orgBox,.orgBox::before { height:706px;}
.orgBox { width:1345px; padding-top:0px; margin-left:auto; margin-right:auto; position:relative;}
.orgBox::before { content:''; display:block; background:url(../assets/img/orgbg.png) no-repeat;}

.org_list { width:100%; height:auto; position:absolute; left:0; top:80px; text-align:center; color:#fff; cursor:default;}
.org_list .box { width:107px; height:63px; display:inline-block; text-align:center; margin-bottom:56px; margin-right:12px; padding-left:47px; cursor:pointer; cursor:pointer;}
.org_list .box .num { height:22px; line-height:22px; font-size:18px; margin-top:10px;}
.org_list .box .name { height:22px; line-height:22px; font-size:14px;}

.org1 { text-align:right; width:332px; margin-right:0px; margin-left:0px;}
.org2 { margin-right:0px; padding-top:228px!important; width:669px; margin-left:-17px;}
.org2 .box { margin-right:12px; margin-bottom:45px;}
.org3 { margin-right:0px; width:375px; text-align:left; padding-top:230px!important;}
.floor1 > div { padding-top:217px;}
.floor2 > div > .box { margin-bottom:46px;}

.menus { width:180px; margin-right:30px;}
.menus li { padding:10px 15px; font-size:16px; color:#333; border-radius:5px; margin-bottom:3px; cursor:pointer;}
.menus li.act { background-color:#3f79ff; color:#fff;}

.hd { margin-bottom:15px;}
.hd .sqdw:last-child { margin-right:0;}
.sqdw { width:auto; height:58px; white-space:nowrap; background-color:#ff5b87; border-radius:5px; overflow:hidden; color:#ffffff; padding-left:68px; padding-right:10px; position:relative; text-align:center; margin-right:20px; float:left; margin-bottom:5px;}
.sqdw::before { content:''; display:block; width:58px; height:100%; position:absolute; left:0; top:0; background-color:#ff90ae;}
.sqdw .oico { position:absolute; left:11px; top:50%; margin-top:-18px;}
.sqdw .name,.sqdw .num { line-height:1.2;}
.sqdw .name { font-size:12px;}
.sqdw .num { font-size:18px; padding-top:10px;}

.oico { display:inline-block; width:36px; height:36px; background:url(../assets/img/org_ico.png) no-repeat;}
.color1 .oico { background-position:0 0;}
.color2 .oico { background-position:-36px 0;}
.color3 .oico { background-position:-72px 0;}
.color4 .oico { background-position:-108px 0;}

.color2 { background-color:#ffa44b;}
.color2::before { background-color:#ffd163;}
.color3 { background-color:#1ad893;}
.color3::before { background-color:#58e4b1;}
.color4 { background-color:#1a59d8;}
.color4::before { background-color:#4784ff;}

.comTable { margin-bottom:15px;}
.el-pagination { text-align:right;}

/*微调*/
.org1 .floor2 > div:nth-child(1) .box { margin-top:109px;}

.org2 { margin-right:5px;}
.org2 > .box { margin-left:168px;}
.org2 .floor2 > div:nth-child(1) > .box { margin-left:164px;}
.org2 .floor2 > div:nth-child(2) .box { margin-right:12px;}
.org2 .floor2 > div:nth-child(1) .floor3 > div:nth-child(1) > .box { margin-top:120px;}
.floor3 .box { margin-bottom:56px;}

.org3 > .box { margin-bottom:44px;}
.org3 .floor2 > div:nth-child(1) .box { margin-right:27px;}
.org3 .floor2 > div:nth-child(2) .box { margin-right:0px; width:147px;}

.dzzwDialog /deep/ .el-dialog__body { position:relative;}
.boxTable { margin-bottom:15px;}
.listShow { transition: all 0.3s ease; height:587px;}
.detailShow { visibility:hidden;}
.detailInfo { width:100%; height:100%; position:absolute; left:0; top:0; box-sizing:border-box; padding:20px 40px; text-align:center; background-color:#fafbfb; transform:scale(0); transition: all 0.3s ease;}
.detailInfo.show { transform:scale(1);}

.detailInfo .box { border:#e5e7ed 1px solid;}
.detailInfo dl { width:50%; float:left; border-top:#e5e7ed 1px solid; margin-top:-1px;}
.detailInfo dt { background-color:#326ac6; color:#ffffff; width:145px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
.detailInfo dt,.detailInfo dd { padding:15px 0;}
.detailInfo dd { padding-left:15px; padding-right:15px;}
.detailInfo dd.tl { text-align:left;}

.backBtn { width:30px; height:30px; line-height:30px; text-align:center; position:absolute; right:17px; top:-46px; color:#999999; background-color:#f3f5fa; font-size:22px; cursor:pointer;}

html.screen_small .orgbg { overflow:hidden!important;}
html.screen_small .orgBox { transform:scale(.8);}
</style>