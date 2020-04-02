<template>
    <div class="flex-1 flex-row">
        <template v-if="$route.path.split('/').length>5">
            <router-view />
        </template>
        <template v-else>
            <div class="block_wrap_opc flex-1 flex-col" v-loading="loading">
                <div class="channelBar cyan">
                    <div class="_title">
                        <i class="wico wi3"></i><strong>{{data.title}}</strong>
                    </div>
                </div>
                <!-- <div class="description">
                    <strong class="title">描述：</strong>
                    {{data.description}}
                </div> -->
                <div class="flex-row flex-1" v-if="data.child.length > 0 && !loading">
                    <div class="flex-1 childBox flex-col" v-for="(e,i) in data.child" :key="i"><span class="dot"></span>
                        <div class="hd" @click="clicked(e.id,'')">
                            <div class="btitle">{{e.title}}</div>
                            <div class="chartBox">
                                <span class="total">总分：{{e.total}}分</span>
                                <pieprogress :number="e.score" :total="e.max_score" :color="pcolor[i]" :fontsize="25" />
                            </div>
                        </div>
                        <div class="bd flex-1 scrollbar">
                            <div class="li" v-for="(ee,ii) in e.child" :key="ii" @click="clicked(e.id,ee.id)">
                                <div class="title">{{ee.title}}</div>
                                <div class="flex-row">
                                    <template v-if="ee.is_infinite == '1'">
                                        <el-progress :percentage="80" :stroke-width="15" :color="ecolor[ii]" :show-text="false" class="flex-1 per"></el-progress>
                                        <div class="score"><span class="wt">{{ee.score}}</span>/{{ee.max_score}}</div>
                                    </template>
                                    <template v-else>
                                        <el-progress :percentage="parseInt(ee.score)/parseInt(ee.max_score)*100" :stroke-width="15" :color="ecolor[ii]" :show-text="false" class="flex-1 per"></el-progress>
                                        <div class="score"><span class="wt">{{ee.score}}</span>/{{ee.max_score}}分</div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-row flex-1" v-if="data.child.length == 0 && !loading">
                    <nodata class="flex-1" />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import * as home from "@/api/window";

export default {
    components: {

    },
    data() {
        return {
            loading:false,
            queryParam:{
                org_id:""
            },
            data:{
                title:"",
                description:"",
                child:[]
            },
            pcolor:["#ffd30a","#8bd214","#15c7d1","#2586f4","#7b28db"],
            ecolor:["#e03d3d","#7bae2d","#097d8e","#0d6be9","#7833b5"]
        }
    },
    watch: {
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        }
    },
    methods: {
        clicked(bid,pid){
            let exp_name;
            let path_arr = this.$route.matched[2].path.split('/')
            exp_name = path_arr[path_arr.length-1]
            
            this.$router.push({path:'/window/'+this.$route.params.org_id+'/'+exp_name+'/exponent_index/exponent_show',query:{bid:bid,pid:pid}})
        },
        getData: function() {
            this.loading = true;
            home.standards(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                //console.log(data);
                this.data = data;
                
            }).catch(() => {
                this.loading = false
            });
        }
    },
    created: function() {
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
.block_wrap_opc { margin:10px;}
.channelBar { margin-bottom:10px; cursor:default;}
.description { background:rgba(13, 57, 105, .6); border-radius:5px; padding:12px 12px 12px 70px; position:relative; min-height:24px; line-height:24px; margin-bottom:10px;}
.description .title { font-weight:normal; font-size:16px; font-weight:normal; position:absolute; left:20px; top:12px;}

.block_wrap_opc > [class*="flex-"] { border:0; background:none;}
.block_wrap_opc > [class*="flex-"]::before,.block_wrap_opc > [class*="flex-"]::after,.block_wrap_opc::before,.block_wrap_opc::after { display:none;}

.childBox { margin-right:20px; color:#00ecfc;}
.childBox:last-child { margin-right:0;}

.childBox .hd { text-align:center; padding-top:28px; cursor:pointer; position:relative;}
.childBox .hd::after { content:''; display:block; width:100%; height:100%; position:absolute; left:0; top:0; cursor:pointer;}
.childBox .hd .btitle { display:inline-block; position:relative; width:auto; height:47px; line-height:46px; background:rgba(19, 96, 167, .4); padding:0 35px; font-size:18px;}
.childBox .hd:hover .btitle { background:rgba(19, 96, 167, .7);}
.childBox .btitle::before,.childBox .btitle::after { content:''; display:block; width:14px; height:57px; background:url(../assets/img/title_corner.png) no-repeat; position:absolute; top:-5px;}
.childBox .btitle::before { left:-5px;}
.childBox .btitle::after { right:-5px; background-position:right 0;}
.childBox .chartBox { height:240px;}
.childBox .chartBox .total { font-size:12px; position:absolute; right:15px; top:10%; left:auto!important; width:auto!important;}

.childBox .li { border-top:#061329 1px solid; position:relative; padding:10px 15px 15px 20px;}
.childBox .li::after { content:''; display:block; width:100%; height:100%; position:absolute; left:0; top:0; cursor:pointer;}
.childBox .li::before { content:''; display:block; width:100%; height:0; border-top:#1c4874 1px solid; position:absolute; left:0; top:0;}
.childBox .li:hover { background:rgba(19, 96, 167, .2);}
.childBox .title { margin-bottom:5px;}
.childBox .per { margin-right:5px;}
.childBox .score { font-size:12px;}
.childBox .score .wt { color:#ffffff;}
.childBox .bd .flex-row { line-height:15px;}
.per /deep/ .el-progress-bar__outer { border:0; background-color:#274265;}

html.screen_small .chartBox { height:150px; margin-top:20px;}
html.screen_small .childBox .chartBox .total { top:0;}
</style>