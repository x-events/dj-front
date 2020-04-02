<template>
    <div class="flex-row flex-1 paddingWrap" :class="[{'dzb':$route.name == '指标展示-党支部'}]">
        <div class="exponent_left flex-col" v-loading="menuloading"><span class="dot"></span>
            <div class="block_wrap_opc flex-1 scrollbar" v-if="!menuloading">
                <el-collapse accordion v-model="activeMenu" class="comCollapse" v-if="menus.length > 0">
                    <el-collapse-item v-for="(e,i) in menus" :key="i" :name="e.id">
                        <template slot="title"><span :id="e.id"><i class="zb_ico" :class="'zbi'+(i+1)"></i> {{e.name}}</span></template>
                        <div v-for="(ee,i) in e.child" :key="i" :id="ee.item_id" :title="ee.name" class="links el" :class="{'act':contentParam.item_id == ee.item_id}" @click="changeShow(e.id,ee.item_id)">
                            <span>{{ee.name}}</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <nodata v-if="menus.length == 0" color="#ffffff" />
            </div>
        </div>
        <div class="flex-1 scrollbar">

            <div class="content_list exp_exponent" v-loading="contentloading">
                <div class="hd"><i class="zb_ico zbi6"></i>工作任务完成情况</div>
                <div class="bd">
                    <div class="zsbox flex-row" v-if="contentData.exponent.length"><span class="dot"></span>
                        <div class="flex-1" v-for="(e,i) in contentData.exponent" :key="i">
                            <div class="chartBox flex-1" style="height:200px;">
                                <span class="score"><span class="wt">{{e.get_score}}</span>/{{e.max_score}}</span>
                                <template v-if="e.is_infinite == '1'">
                                    <pieprogress :radius="['70%','85%']" :number="'80'" :total="'100'" :color="'#ffeb08'" :fontsize="0" v-if="chartStatus" />
                                </template>
                                <template v-if="e.is_infinite != '1'">
                                    <pieprogress :radius="['70%','85%']" :number="Number(e.get_score) < 0 ? '0':e.get_score" :total="e.max_score" :color="'#ffeb08'" :fontsize="0" v-if="chartStatus" />
                                </template>
                            </div>
                            <div class="ptitle">{{e.title}}</div>
                        </div>
                    </div>
                    <div class="zsbox flex-row" v-else><span class="dot"></span>
                        <nodata color="#ffffff" class="flex-1" />
                    </div>
                </div>
            </div>

            <div class="content_list exp_imgs" v-if="contentData.imgs && contentData.imgs.length" v-loading="contentloading">
                <div class="hd"><i class="zb_ico zbi6"></i>工作成果</div>
                <div class="bd">
                    <div class="zsbox"><span class="dot"></span>
                        <div class="img_slider flex-row">
                            <a class="swiperBtn" id="img_left"><i class="el-icon-arrow-left"></i></a>
                            <swiper :options="swiperOption" ref="mySwiper" class="swiperBox flex-1">
                                <swiper-slide v-for="(e,i) in contentData.imgs" :key="i">
                                    <div class="box" @click="bigImg.status = true; bigImg.url = e.url; bigImg.title = e.title;">
                                        <div class="img"><img :src="e.url" :alt="e.title"></div>
                                        <div class="name el">{{e.title}}</div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                            <a class="swiperBtn" id="img_right"><i class="el-icon-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content_list exp_list t_blue" v-loading="contentloading">
                <div class="hd"><i class="zb_ico zbi6"></i>工作记录</div>
                <div class="bd">
                    <div class="zsbox rank_list" v-if="contentData.list.length"><span class="dot"></span>
                        <el-table :data="contentData.list" style="width: 100%" class="comTable" stripe>
                            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                            <el-table-column prop="work_name" label="名称" show-overflow-tooltip></el-table-column>
                            <el-table-column width="100" label="时间" align="center">
                                <template slot-scope="scope">{{scope.row.time | formatDate('yyyy-MM-dd')}}</template>
                            </el-table-column>
                            <el-table-column prop="org_name" label="开展工作党组织" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="type" label="形式" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="score" width="100" label="得分"></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button class="colorBtn" @click.native.prevent="showData(scope.row)" round>查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page-div fix" v-if="Number(contentData.totalRows) > 0">
                            <el-pagination background layout="prev, pager, next" :page-size="contentParam.pagesize" :current-page="Number(contentParam.p)" @current-change="pageChange" :total="Number(contentData.totalRows)"></el-pagination>
                            <span class="pageNum">共 {{ contentData.totalPages }} 页</span>
                        </div>
                    </div>
                    <div class="zsbox rank_list" v-else><span class="dot"></span>
                        <nodata color="#ffffff" />
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="bigImg.status" :title="bigImg.title" custom-class="newComDialog" :append-to-body="true">
            <div class="tc"><img :src="bigImg.url"></div>
        </el-dialog>

        <!-- 人员 -->
        <expTableDialog :visible="tableDialogVisible" :category_name="tableInfo.category_name || ''" :org_id="tableInfo.org_id || ''" :type="tableInfo.type || ''" :item_id="tableInfo.item_id || ''" @close="tableInfo={};tableDialogVisible=false" />

        <!-- 工作记实弹窗 -->
        <workTaskDialog :visible="taskDialogVisible" :category_name="taskInfo.category_name || ''" :form_category_id="taskInfo.form_category_id || ''" :record_id="taskInfo.record_id || ''" :process_log_id="taskInfo.process_log_id || ''" @close="taskInfo={};taskDialogVisible=false" />

        <!-- 党组织弹窗 -->
        <expOrgDialog :visible="orgDialogVisible" :category_name="orgInfo.category_name || ''" :org_id="orgInfo.org_id || ''" @close="orgInfo={};orgDialogVisible=false" />

        <!-- 工会弹窗 -->
        <expUnionDialog :visible="unionDialogVisible" :category_name="unionInfo.category_name || ''" :dataid="unionInfo.id || ''" @close="unionInfo={};unionDialogVisible=false" />

        <!-- 妇联弹窗 -->
        <expWomenDialog :visible="womenDialogVisible" :category_name="womenInfo.category_name || ''" :dataid="womenInfo.id || ''" @close="womenInfo={};womenDialogVisible=false" />

        <!-- 团组织弹窗 -->
        <expYouthDialog :visible="youthDialogVisible" :category_name="youthInfo.category_name || ''" :dataid="youthInfo.id || ''" @close="youthInfo={};youthDialogVisible=false" />

        <!-- 党员弹窗 -->
        <expMemberDialog :visible="memberDialogVisible" :category_name="memberInfo.category_name || ''" :dataid="memberInfo.id || ''" @close="memberInfo={};memberDialogVisible=false" />

    </div>
</template>

<script>
import * as home from "@/api/window";

//人员
import expTableDialog from "@/components/exponent/exp_table_dialog";
//工作记实
import workTaskDialog from "@/components/work/work_task_dialog";
//党组织
import expOrgDialog from "@/components/exponent/exp_org_dialog";
//工会
import expUnionDialog from "@/components/exponent/exp_union_dialog";
//妇联
import expWomenDialog from "@/components/exponent/exp_women_dialog";
//团组织
import expYouthDialog from "@/components/exponent/exp_youth_dialog";
//党员
import expMemberDialog from "@/components/exponent/exp_member_dialog";

export default {
    components:{
        expTableDialog,
        workTaskDialog,
        expOrgDialog,
        expUnionDialog,
        expWomenDialog,
        expYouthDialog,
        expMemberDialog
    },
    data() {
        return {
            menuloading:true,
            queryParam:{
                org_id:""
            },
            menus:[],
            icons:["&#xe64a;","&#xe622;","&#xe63c;","&#xe659;","&#xe611;"],
            activeMenu:0,
            
            contentloading:true,
            contentParam:{
                org_id:"",
                item_id:"",
                p:1,
                pagesize:10
            },
            contentData:{
                exponent:[],
                imgs:[],
                list:[],
                totalRows:0,
                totalPages:0
            },
            swiperOption: {
                autoplay: {
                    delay:3000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                slidesPerView:4,
                slidesPerGroup:1,
                loop:false,
                navigation: {
                    prevEl: '#img_left',
                    nextEl: '#img_right'
                }
            },
            colors:['','cyan','green','yellow','orange','purple','red'],
            bigImg:{
                status:false,
                url:"",
                title:""
            },
            chartStatus:true,

            //人员弹窗
            tableDialogVisible:false,
            tableInfo:{
                org_id:"",
                type:"",
                item_id:"",
                category_name:""
            },

            //工作记实弹窗
            taskDialogVisible:false,
            taskInfo:{
                record_id:"",
                form_category_id:"",
                category_name:"",
                process_log_id:""
            },

            //党组织弹窗
            orgDialogVisible:false,
            orgInfo:{
                org_id:"",
                category_name:""
            },

            //工会弹窗
            unionDialogVisible:false,
            unionInfo:{
                id:"",
                category_name:""
            },

            //妇联弹窗
            womenDialogVisible:false,
            womenInfo:{
                id:"",
                category_name:""
            },

            //团组织弹窗
            youthDialogVisible:false,
            youthInfo:{
                id:"",
                category_name:""
            },

            //党员弹窗
            memberDialogVisible:false,
            memberInfo:{
                id:"",
                category_name:""
            },
        }
    },
    watch: {
        $route(to,from){
            this.dataStart();
        },
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        },
        "queryParam.org_id"(org_id){
            this.contentParam.org_id = org_id;
        },
        "contentParam.item_id"(){
            this.getContent(true);
        },
        "contentData.exponent"(){
            this.chartStatus = false;
            this.$nextTick(()=>{
                this.chartStatus = true;
            })
        }
    },
    methods: {
        showData(e){
            //console.log(e);
            let data_type = e.data_type || "";
            //data_type = 'union'

            if(data_type == 'break' || data_type == 'member' || data_type == 'high-manager-percent' || data_type == "manager-attend" || data_type == "normal-attend" || data_type == "member-attend"){
                this.tableDialogVisible = true;
                this.tableInfo = {
                    org_id:e.org_id,
                    type:data_type,
                    item_id:e.item_id,
                    category_name:e.work_name
                }
            }
            //工作记实
            if(data_type == 'record'){
                this.taskDialogVisible = true;
                this.taskInfo = {
                    record_id:e.record_id,
                    form_category_id:e.form_category_id,
                    category_name:e.work_name,
                    process_log_id:e.process_log_id
                }
            }
            //党组织
            if(data_type == 'org'){
                this.orgDialogVisible = true;
                this.orgInfo = {
                    org_id:e.org_id,
                    category_name:e.work_name
                }
            }
            //工会
            if(data_type == 'union'){
                this.unionDialogVisible = true;
                this.unionInfo = {
                    id:e.id,
                    category_name:e.work_name
                }
            }
            //妇联
            if(data_type == 'women'){
                this.womenDialogVisible = true;
                this.womenInfo = {
                    id:e.id,
                    category_name:e.work_name
                }
            }
            //团组织
            if(data_type == 'youth'){
                this.youthDialogVisible = true;
                this.youthInfo = {
                    id:e.id,
                    category_name:e.work_name
                }
            }
            //党员
            if(data_type == 'high-manager'){
                this.memberDialogVisible = true;
                this.memberInfo = {
                    id:e.uid,
                    category_name:e.work_name
                }
            }
        },
        changeShow(bid,pid){
            this.activeMenu = bid;
            this.contentParam.item_id = pid;
            this.$router.push({name:this.$route.name,query:{bid:bid,pid:pid}})
        },
        pageChange(p){
            this.contentParam.p = p;
            this.getContent();
        },
        getContent(page){
            if(page){ this.contentParam.p = 1}
            this.contentloading = true;
            home.exponent_detail_show(this.contentParam).then(res => {
                this.contentloading = false;
                let data = res.data;
                this.contentData = data.data;
                this.contentData.totalRows = data.totalRows;
                this.contentData.totalPages = data.totalPages;
            }).catch(() => {
                this.contentloading = false
            });
        },
        getData: function() {
            home.workDetailMenu(this.queryParam).then(res => {
                this.menuloading = false;
                let data = res.data.data;
                this.menus = data;
                if(data.length > 0){
                    if(!this.$route.query.bid){
                        //无id
                        if(data[0].child){
                            let id = data[0].child[0].item_id
                            this.activeMenu = data[0].id;
                            this.contentParam.item_id = id;
                        }else{
                            this.contentloading = false;
                        }
                    }else{
                        //有id
                        if(!this.$route.query.pid){
                            data.forEach((e,i) => {
                                if(this.activeMenu == e.id){
                                    if(data[i].child[0]){
                                        this.contentParam.item_id = data[i].child[0].item_id;
                                    }else{
                                        this.contentloading = false;
                                    }
                                }
                            })
                        }
                    }
                }else{
                    this.contentloading = false;
                }
            }).catch(() => {
                this.menuloading = false
            });
        },
        dataStart(){
            if(this.$route.params.org_id == 0){
                this.queryParam.org_id = ""
            }else{
                this.queryParam.org_id = this.$route.params.org_id
            }
            if(this.$route.query.bid){
                this.activeMenu = this.$route.query.bid
            }
            if(this.$route.query.pid){
                this.contentParam.item_id = this.$route.query.pid
            }
            this.getData();
        }
    },
    created: function() {
        this.dataStart();
    }
}
</script>

<style scoped>
.exponent_left { width:300px; margin-right:5px;}
.links { padding:0px 20px; font-size:14px; height:44px; line-height:44px; cursor:pointer;}
.links span { display:block; padding:0 24px;}
.links span::before { content:''; display:inline-block; vertical-align:middle; width:4px; height:4px; overflow:hidden; border-radius:50%; background-color:#ffffff; margin-right:7px;}
.links.act,.links:hover { color:#00ffff;}
.links.act span::before { background-color:#00ffff;}
.content_list { margin-bottom:25px; color:#00ecfc;}
.content_list .block_wrap_opc { height:350px;}
.content_list > .hd { height:45px; line-height:45px; position:relative; padding-left:18px; position:relative; font-size:16px; margin-bottom:8px; background: linear-gradient(to right, rgba(13,58,105,1) 0%,rgba(13,58,105,.3) 100%);}
.content_list > .hd::before,.content_list > .hd::after { content:''; display:block; width:3px; height:3px; background-color:#00d7ff; position:absolute; left:0;}
.content_list > .hd::before { top:0;}
.content_list > .hd::after { bottom:0;}
.content_list > .hd .zb_ico { margin-right:5px;}


.paddingWrap { padding:14px;}
.paddingWrap.dzb { padding:20px;}
.exponent_left { border:#0f486e 1px solid; background:rgba(36,73,157,.12); margin-right:20px; position:relative;}
.exponent_left::before,.exponent_left::after,.exponent_left > .dot::before,.exponent_left > .dot::after { content:''; display:block; width:3px; height:3px; background-color:#00d7ff; overflow:hidden; position:absolute; bottom:0; z-index:5;}
.exponent_left > .dot::before,.exponent_left > .dot::after { bottom:auto; top:0;}
.exponent_left::before,.exponent_left > .dot::before { left:0;}
.exponent_left::after,.exponent_left > .dot::after { right:0;}

.block_wrap_opc { margin:0;}
.block_wrap_opc::before,.block_wrap_opc::after { display:none;}
.block_wrap_opc > [class*="flex-"] { background:none; border:0;}
.block_wrap_opc /deep/ .nodata::before,.block_wrap_opc /deep/ .nodata::after { display:none;}

.zb_ico { display:inline-block; vertical-align:-8px; width:30px; height:30px; overflow:hidden; background:url(../assets/img/zb_ico.png) no-repeat;}
.zbi1 { background-position:0 -30px;}
.zbi2 { background-position:-30px -30px;}
.zbi3 { background-position:-60px -30px;}
.zbi4 { background-position:-90px -30px;}
.zbi5 { background-position:-120px -30px;}
.zbi6 { background-position:-150px 0;}

.comCollapse .el-collapse-item::after { display:none;}
.comCollapse /deep/ .el-collapse-item__header.is-active { color:#00ffff; background:none;}
.comCollapse /deep/ .el-collapse-item__header { position:relative; border-top:#061229 1px solid; transition:none;}
.comCollapse /deep/ .el-collapse-item__header::before,.comCollapse /deep/ .el-collapse-item__header.is-active::after { content:''; display:block; width:100%; height:0; overflow:hidden; border-top:#1b4571 1px solid; position:absolute; left:0; top:0;}
.comCollapse /deep/ .el-collapse-item__header.is-active { border-bottom:#1b4571 1px solid;}
.comCollapse /deep/ .el-collapse-item__header.is-active::after { border-top-width:0; border-bottom:#061229 1px solid; top:auto; bottom:0}
.comCollapse .el-collapse-item:first-child /deep/ .el-collapse-item__header{ border-top-width:0;}
.comCollapse .el-collapse-item:first-child /deep/ .el-collapse-item__header::before { display:none;}

.is-active .zbi1 { background-position:0 0px;}
.is-active .zbi2 { background-position:-30px 0px;}
.is-active .zbi3 { background-position:-60px 0px;}
.is-active .zbi4 { background-position:-90px 0px;}
.is-active .zbi5 { background-position:-120px 0px;}

.zsbox { border:#0b4266 1px solid; background:rgba(36,73,157,.12); position:relative;}
.zsbox::before,.zsbox::after,.zsbox > .dot::before,.zsbox > .dot::after { content:''; display:block; width:3px; height:3px; background:#00d7ff; position:absolute; bottom:0; z-index:5;}
.zsbox > .dot::before,.zsbox > .dot::after { bottom:auto; top:0;}
.zsbox::before,.zsbox > .dot::before { left:0;}
.zsbox::after,.zsbox > .dot::after { right:0;}
.imgType { height:240px;}
.imgType .pbox { width:30%; margin-right:20px;}
.imgType .chartBox .score,.exp_exponent .chartBox .score { width:100%; height:24px; line-height:24px; text-align:center; position:absolute; left:0; top:50%; margin-top:-12px; z-index:10; font-size:18px;}
.pbox .ptitle,.exp_exponent .ptitle {text-align:center; padding-bottom:15px; padding-left:10px; padding-right:10px;}

.imgBox { padding:0px 15px 15px;}
.imgBox .title { font-size:18px; height:45px; line-height:45px;}
.img_slider,.img_slider .box,.img_slider .img { height:178px;}
.img_slider { position:relative; overflow:hidden; margin:20px 0;}
.img_slider .box { margin:0 7px; text-align:center; position:relative; overflow:hidden; cursor:pointer;}
.img_slider .name { width:100%; height:30px; line-height:30px; position:absolute; left:0; bottom:0; background:rgba(0,0,0,.5); color:#ffffff;}
.img_slider .img { background-color:#0d3866; line-height:178px; font-size:0;}
.img_slider .img img { max-width:100%; max-height:178px; vertical-align:middle;}
.img_slider .swiperBtn { text-align:center; width:60px; height:178px; line-height:178px; color:#ffffff; font-size:40px;}

.rank_list .el-table /deep/ td,.rank_list .el-table /deep/ th.is-leaf { border-bottom-color:transparent;}
.eprogress { padding:10px 20px 15px;}
.eprogress .hd { height:32px; line-height:32px;}
.eprogress /deep/ .el-progress-bar__outer { border:0; background-color:#274265;}
</style>