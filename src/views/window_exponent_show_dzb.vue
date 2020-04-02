<template>
    <div class="flex-row flex-1 paddingWrap">
        <div class="exponent_left flex-col" v-loading="menuloading"><span class="dot"></span>
            <div class="block_wrap_opc flex-1 scrollbar" v-if="!menuloading">
                <el-collapse accordion v-model="activeMenu" class="comCollapse" v-if="menus.length > 0">
                    <el-collapse-item v-for="(e,i) in menus" :key="i" :name="e.id">
                        <template slot="title"><span :id="e.id"><i class="zb_ico" :class="'zbi'+(i+1)"></i> {{e.name}}</span></template>
                        <div v-for="(ee,ii) in e.child" :key="ii" :id="ee.item_id" :title="ee.name" class="links el" :class="{'act':contentParam.item_id == ee.item_id}" @click="changeShow(e.id,ee.item_id)">
                            <span>{{ee.name}}</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <nodata v-if="menus.length == 0" color="#ffffff" />
            </div>
        </div>
        <div class="flex-1 scrollbar" v-loading="contentloading">
            <div v-if="contentData.length > 0 && !contentloading">
                <div class="content_list" v-for="(e,i) in contentData" :key="i" :id="e.id">
                    <div class="hd"><i class="zb_ico zbi6"></i>{{e.title}}</div>
                    <div class="bd">
                        <template v-if="e.imgs && e.imgs.length > 0">
                            <!-- 有图 -->
                            <div class="flex-row imgType">
                                <div class="zsbox flex-col pbox"><span class="dot"></span>
                                    <div class="chartBox flex-1">
                                        <span class="score"><span class="wt">{{e.get_score}}</span>/{{e.max_score}}</span>
                                        <template v-if="e.is_infinite == '1'">
                                            <pieprogress :number="'80'" :total="'100'" :color="'#ffeb08'" :fontsize="0" :radiotype="'bold'" />
                                        </template>
                                        <template v-if="e.is_infinite != '1'">
                                            <pieprogress :number="e.get_score" :total="e.max_score" :color="'#ffeb08'" :fontsize="0" :radiotype="'bold'" />
                                        </template>
                                    </div>
                                    <div class="ptitle">工作任务完成情况</div>
                                </div>
                                <div class="zsbox flex-1 imgBox flex-col"><span class="dot"></span>
                                    <div class="title">工作成果</div>
                                    <div class="img_slider">
                                        <swiper v-if="e.imgs.length > 0" :options="swiperOption" ref="mySwiper" class="swiperBox">
                                            <swiper-slide v-for="(ee,ii) in e.imgs" :key="ii">
                                                <div class="box">
                                                    <div class="img"><img :src="ee.url" :alt="ee.title"></div>
                                                    <div class="name el">{{ee.title}}</div>
                                                </div>
                                            </swiper-slide>
                                        </swiper>
                                    </div>
                                </div>
                            </div>
                            <div class="zsbox tbox mt15 rank_list" v-if="e.list.length > 0"><span class="dot"></span>
                                <el-table :data="e.list" style="width: 100%" class="comTable" stripe>
                                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                                    <el-table-column prop="work_name" label="名称" show-overflow-tooltip></el-table-column>
                                    <el-table-column label="时间" align="center">
                                        <template slot-scope="scope">{{scope.row.time | formatDate('yyyy-MM-dd')}}</template>
                                    </el-table-column>
                                    <el-table-column prop="type" label="形式" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="score" width="100" label="得分"></el-table-column>
                                </el-table>
                            </div>
                        </template>
                        <template v-else>
                            <!-- 无图 -->
                            <div class="zsbox tbox mt15 rank_list" v-if="e.list.length > 0"><span class="dot"></span>
                                <div class="eprogress">
                                    <div class="flex-row hd">
                                        <div class="flex-1">工作任务完成情况</div>
                                        <div><span class="wt">{{e.get_score}}</span>/{{e.max_score}}</div>
                                    </div>
                                    <div class="bd">
                                        <template v-if="e.is_infinite == '1'">
                                            <el-progress :percentage="80" :color="'#e03d3d'" :show-text="false" :stroke-width="15"></el-progress>
                                        </template>
                                        <template v-if="e.is_infinite != '1'">
                                            <el-progress :percentage="parseInt(e.get_score)/parseInt(e.max_score)*100" :color="'#e03d3d'" :show-text="false" :stroke-width="15"></el-progress>
                                        </template>
                                    </div>
                                </div>
                                <el-table :data="e.list" style="width: 100%" class="comTable" stripe>
                                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                                    <el-table-column prop="work_name" label="名称" show-overflow-tooltip></el-table-column>
                                    <el-table-column label="时间" align="center">
                                        <template slot-scope="scope">{{scope.row.time | formatDate('yyyy-MM-dd')}}</template>
                                    </el-table-column>
                                    <el-table-column prop="type" label="形式" show-overflow-tooltip></el-table-column>
                                    <el-table-column prop="score" width="100" label="得分"></el-table-column>
                                </el-table>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div v-if="contentData.length == 0 && !contentloading">
                <nodata color="#ffffff" />
            </div>
        </div>
    </div>
</template>

<script>
import * as home from "@/api/window";

export default {
    components: {

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
                item_id:""
            },
            contentData:[],
            swiperOption: {
                autoplay: {
                    delay:3000,
                    stopOnLastSlide:false,
                    disableOnInteraction:false,
                },
                slidesPerView:3,
                slidesPerGroup:1,
                loop:false
            },
            colors:['','cyan','green','yellow','orange','purple','red'],
            tempData:[
                {
                    name:"2018年10月1日组织八里庄十里堡社区组织学",
                    time:"2018-10-01",
                    address:"八里庄十里堡",
                    img:"http://temp.im/400x300",
                },
                {
                    name:"2018年10月1日组织八里庄十里堡社区组织学",
                    time:"2018-10-01",
                    address:"八里庄十里堡",
                    img:"http://temp.im/400x300",
                },
                {
                    name:"2018年10月1日组织八里庄十里堡社区组织学",
                    time:"2018-10-01",
                    address:"八里庄十里堡",
                    img:"http://temp.im/400x300",
                }
            ]
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        },
        "queryParam.org_id"(org_id){
            this.contentParam.org_id = org_id;
        },
        "contentParam.item_id"(){
            this.getContent();
        }
    },
    methods: {
        changeShow(bid,pid){
            this.activeMenu = bid;
            this.contentParam.item_id = pid;
            //this.$router.push({name:'指标展示-党支部',query:{bid:bid,pid:pid}})
        },
        getContent(){
            this.contentloading = true;
            home.exponent_detail_show(this.contentParam).then(res => {
                this.contentloading = false;
                let data = res.data.data;
                this.contentData = data;
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
        }
    },
    created: function() {
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
.imgType .chartBox .score { width:100%; height:24px; line-height:24px; text-align:center; position:absolute; left:0; top:50%; margin-top:-12px; z-index:10; font-size:18px;}
.pbox .ptitle {text-align:center; padding-bottom:15px;}

.imgBox { padding:0px 15px 15px;}
.imgBox .title { font-size:18px; height:45px; line-height:45px;}
.img_slider,.img_slider .box,.img_slider .img { height:178px;}
.img_slider { position:relative; overflow:hidden; margin:0 -7px;}
.img_slider .box { margin:0 7px; text-align:center; position:relative; overflow:hidden;}
.img_slider .name { width:100%; height:30px; line-height:30px; position:absolute; left:0; bottom:0; background:rgba(0,0,0,.5); color:#ffffff;}
.img_slider .img { background-color:#0d3866; line-height:178px; font-size:0;}
.img_slider .img img { max-width:100%; max-height:178px; vertical-align:middle;}

.rank_list .el-table /deep/ td,.rank_list .el-table /deep/ th.is-leaf { border-bottom-color:transparent;}
.eprogress { padding:10px 20px 15px;}
.eprogress .hd { height:32px; line-height:32px;}
.eprogress /deep/ .el-progress-bar__outer { border:0; background-color:#274265;}
</style>