<template>
    <div class="flex-row paddingWrap scrollbar newWindow" v-loading="loading">
        <div class="user_hd flex-col justify-center">
            <div class="flex-col">
                <div class="avatar"><img :src="data.member.avatar" :alt="data.member.realname"></div>
                <div class="flex-1">
                    <div class="infos tc">
                        <span class="name">{{data.member.realname}}</span><br>
                        <span class="org">{{data.member.org_name}}</span>
                    </div>
                    <div class="infos tc">
                        <span class="info score digital lightBlue">{{data.member.score}}</span>
                        <span class="info rank" :class="data.rank.sort == '1' ? 'green' : 'red'" v-if="data.rank">
                            排名：{{data.rank.num}}
                            <i class="ion" v-if="data.rank.sort == '1'">&#xe61a;</i>
                            <i class="ion" v-if="data.rank.sort != '1'">&#xe619;</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 scrollbar content">
            <el-row :gutter="30" v-if="data.result.length > 0 && !loading">
                <el-col :span="12" v-for="(e,i) in data.result" :key="i">
                    <div class="block_wrap_opc">
                        <div class="channelBar">
                            <div class="_title"><i class="wico" :class="'wi'+(i+13)"></i><strong>{{e.name}}</strong></div>
                        </div>
                        <div class="sj_list flex-row">
                            <div class="li_hd">
                                <div class="chartBox">
                                    <span class="total">总分：{{e.total}}分</span>
                                    <pieprogress :number="e.score" :color="colors[i]" :total="e.all" :fontsize="20" />
                                </div>
                            </div>
                            <div class="li_bd flex-1 scrollbar">
                                <div class="li" v-for="(ee,ii) in e.children" :key="ii">
                                    <div class="flex-row info">
                                        <div class="flex-1 name el" :title="ee.name">{{ee.name}}</div>
                                        <div class="score">{{ee.score}}/{{ee.total}}分</div>
                                    </div>
                                    <div :score="parseInt(ee.score)/parseInt(ee.total)*100" :class="'color'+(ii+1)">
                                        <el-progress :percentage="parseInt(ee.score)/parseInt(ee.total)*100" :color="colors[ii]" :show-text="false" :stroke-width="15" class="per1"></el-progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <template v-if="data.result.length == 0 && !loading">
                 <nodata style="border-left:#1c4f7d 1px solid;" />
            </template>
        </div>
        
    </div>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            loading:false,
            colors:["#e03e3d","#22dada","#b727f8","#81cd11","#ff3d3d","#c453ff"],
            data:{
                member:{
                    avatar:"",
                    org_name:"",
                    realname:"",
                    score:""
                },
                result:[]
            },
            queryParam:{
                org_id:""
            }
        }
    },
    methods: {
        getData: function() {
            this.loading = true;
            home.doneDetail(this.queryParam).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.data = data;
            })
        }
    },
    created: function() {
        //console.log(this.$route.query.id);
        this.queryParam.org_id = this.$route.query.id
        this.getData();
    }
}
</script>

<style scoped>
.user_hd { padding:15px 25px; width:25%; box-sizing:border-box;}
.user_hd > [class*="flex-"] { min-height:410px; overflow:visible;}
.user_hd .avatar { margin:15px auto; overflow:hidden; padding:18px; position:relative;cursor: pointer;}
.user_hd .avatar,.user_hd .avatar img { width:175px; height:175px; border-radius:50%;}
.user_hd .name,.user_hd .org { display:inline-block;}
.user_hd .name { color:#ffffff; font-size:24px;}
.user_hd .org { font-size:16px; color:#06ddf3;}
.user_hd .score { font-size:60px; letter-spacing:10px; margin-right:10px;}
.user_hd .rank { font-size:18px; vertical-align:5px;}
.user_hd .rank .ion { font-size:22px;}

.li_hd,.li_bd { height:415px;}
.li_hd { width:40%; text-align:center; border-right:#1c4f7d 1px solid; position:relative;}
.li_hd::after { content:''; display:block; width:0; height:100%; overflow:hidden; position:absolute; right:0; top:0; border-right:#06152c 1px solid;}
.li_bd .li { border-bottom:1px solid #1c4f7d; position:relative;}
.li_bd .li::after { content:''; display:block; width:100%; height:0; overflow:hidden; position:absolute; left:0; bottom:0; border-bottom:#06152c 1px solid;}
/* .li_bd .li:last-child { border-bottom-width:0;}
.li_bd .li:last-child::after { display:none;} */
.chartBox { height:340px;}
.chartBox .total { position:absolute; left:15%; top:8%; color:#00ecfc;}
.li_bd .li { font-size:13px; padding:20px; position:relative; color:#00ecfc;}
.li_bd .li .info { padding-bottom:5px;}
.li_bd .name { margin-right:10px;}
.li_bd .score { min-width:30px; text-align:right;}

.content .block_wrap_opc { margin:0 0 20px;}

html.screen_small .li_hd,html.screen_small .li_bd { height:265px;}
</style>