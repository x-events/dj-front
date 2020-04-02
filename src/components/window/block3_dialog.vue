<template>
    <el-dialog :visible.sync="dialogVisible" custom-class="newComDialog" class="sjywDialog">
        <span slot="title" class="el-dialog__title"><i class="wico wi4_b"></i> 书记有为值</span>
        <div class="flex-row" v-loading="loading">
            <div class="tree scrollbar" style="height:455px;" v-if="cur_org_type == '1'">
                <el-collapse v-model="activeType" accordion @change="handleChange">
                    <el-collapse-item :name="e.type" v-for="(e,i) in treeData" :key="i">
                        <template slot="title">
                            <div class="el" :title="e.short_name"><i class="ewico" :class="'ewi'+e.type"></i>{{e.short_name}}</div>
                        </template>
                        <template v-if="e.child">
                            <div class="link" v-for="(ee,i) in e.child" :key="i">
                                <a :id="ee.id" class="el" :class="{'active':activeid == ee.id}" :title="ee.short_name" @click="getOrgManager(ee.id)">{{ee.short_name}}</a>
                            </div>
                        </template>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="flex-1" style="height:455px;" v-if="cur_org_type == '1'">

                <!-- 当前身份信息卡 -->
                <template v-if="activeType == 'top'">
                    <div class="userCard tc" @click="memberInfo()" v-if="currentUserData.uid" style="margin-top:70px;">
                        <div class="face"><img :src="currentUserData.avatar" :alt="currentUserData.name"></div>
                        <div>
                            <span class="name">{{currentUserData.name}}</span>
                            <span class="posi">{{currentUserData.duty}}</span>
                        </div>
                        <div class="score">{{currentUserData.score}}</div>
                    </div>
                    <template v-else>
                        <nodata mode="pic" style="background:#ffffff;" />
                    </template>
                </template>

                <template v-if="activeType != 'top' && currentUserData.avatar != '' && loading == false">
                <div class="userCard tc" @click="memberInfo()">
                    <div class="face"><img :src="currentUserData.avatar" :alt="currentUserData.name"></div>
                    <div>
                        <span class="name">{{currentUserData.name}}</span>
                        <span class="posi">{{currentUserData.duty}}</span>
                    </div>
                    <div class="score">{{currentUserData.score}}</div>
                </div>
                <div class="users flex-row" v-if="usersData.length > 0">
                    <a class="button" id="userBtn_left"><i class="el-icon-arrow-left"></i></a>
                    <div class="usersBox flex-1">
                        <swiper v-if="usersData.length > 0" :options="swiperOption" ref="mySwiper" class="swiperBox">
                            <swiper-slide v-for="(e,i) in usersData" :key="i" @click.native="memberInfo(e)">
                                <div class="imgbox" :class="{'active':currentUserData.uid == e.uid}">
                                    <div class="avatar"><img :src="e.avatar" :alt="e.name"></div>
                                </div>
                                <div class="name el">{{e.name}}</div>
                                <div class="xs">{{e.score}}分</div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <a class="button" id="userBtn_right"><i class="el-icon-arrow-right"></i></a>
                </div>
                <!-- <div class="tc confirmBtn">
                    <el-button type="primary" round size="small" @click="memberInfo()">确认</el-button>
                </div> -->
                </template>
                <template v-if="activeType != 'top' && currentUserData.avatar == '' && loading == false">
                    <nodata mode="pic" style="background:#ffffff;" />
                </template>


            </div>
            <div class="flex-1" style="height:455px;" v-if="cur_org_type == '2'">
                <template v-if="currentUserData.avatar != '' && loading == false">
                <div class="userCard tc" @click="memberInfo()">
                    <div class="face"><img :src="currentUserData.avatar" :alt="currentUserData.name"></div>
                    <div>
                        <span class="name">{{currentUserData.name}}</span>
                        <span class="posi">{{currentUserData.duty}}</span>
                    </div>
                    <div class="score">{{currentUserData.score}}</div>
                </div>
                <div class="users flex-row" v-if="usersData.length > 0">
                    <a class="button" id="userBtn_left"><i class="el-icon-arrow-left"></i></a>
                    <div class="usersBox flex-1">
                        <swiper v-if="usersData.length > 0" :options="swiperOption" ref="mySwiper" class="swiperBox">
                            <swiper-slide v-for="(e,i) in usersData" :key="i" @click.native="memberInfo(e)">
                                <div class="imgbox" :class="{'active':currentUserData.uid == e.uid}">
                                    <div class="avatar"><img :src="e.avatar" :alt="e.name"></div>
                                </div>
                                <div class="name el">{{e.name}}</div>
                                <div class="xs">{{e.score}}分</div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <a class="button" id="userBtn_right"><i class="el-icon-arrow-right"></i></a>
                </div>
                <!-- <div class="tc confirmBtn">
                    <el-button type="primary" round size="small" @click="memberInfo()">确认</el-button>
                </div> -->
                </template>
                <template v-if="currentUserData.avatar == '' && loading == false">
                    <nodata mode="pic" style="background:#ffffff;" />
                </template>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import * as util from "@/assets/util";
import * as home from "@/api/window";

export default {
    data() {
        return {
            loading:false,
            dialogVisible:false,
            activeid:"",
            activeType:"",
            treeData:[],
            queryParam:{
                org_id:""
            },
            currentUserData:{
                uid: "",
                org_id: "",
                avatar: "",
                name: "",
                score: "",
                duty:""
            },
            usersData:[],
            swiperOption: {
                autoplay:false,
                slidesPerView:4,
                slidesPerGroup:4,
                loop:false,
                navigation: {
                    prevEl: '#userBtn_left',
                    nextEl: '#userBtn_right'
                }
            },
            topInfo:{
                uid: "",
                org_id: "",
                avatar: "",
                name: "",
                score: "",
                duty:""
            },
            cur_org_type:""
        }
    },
    watch:{
        'queryParam.type'(){
            this.getData();
        },
        "$route.params.org_id"(new_id){
            this.queryParam.org_id = new_id;
            this.getData();
        },
        dialogVisible(new_val){
            if(new_val){
                this.getData();
            }
        }
    },
    computed: {
        orgtype1_notTop(){
            if(activeType != 'top' && loading == false){
                if(currentUserData.avatar != ''){
                    return true
                }
            }
        }
    },
    methods: {
        handleChange(type) {
            if(type == 'top'){
                this.currentUserData = this.topInfo
                return;
            }
            this.treeData.forEach((e,i) => {
                if(type == e.type){
                    if(e.child && e.child[0]){
                        this.getOrgManager(e.child[0].id);
                    }
                }
            });
        },
        getOrgManager(id){
            this.loading = true;
            this.activeid = id;
            this.currentUserData = {
                uid: "",
                org_id: "",
                avatar: "",
                name: "",
                score: "",
                duty:""
            }
            home.getOrgManager({org_id:id}).then(res => {
                this.loading = false;
                let data = res.data.data;
                this.usersData = data || [];
                if(this.usersData.length > 0){
                    this.currentUserData = data.slice(0,1)[0];
                    this.usersData = data.slice(1);
                }
            })
        },
        changeCard(e){
            this.currentUserData = e;
        },
        memberInfo(item){
            let org_id;
            if(item){
                org_id = item.org_id;
                this.$router.push({name:'书记信息',query:{id:org_id}})
                return;
            }
            if(this.currentUserData.org_id){
                org_id = this.currentUserData.org_id
                this.$router.push({name:'书记信息',query:{id:org_id}})
            }
        },
        getData: function() {
            this.loading = true;
            home.getOrgType(this.queryParam).then(res => {
                let data = res.data.data
                if(data.length > 0){
                    this.treeData = data;

                    this.activeType = this.treeData[0].type;
                    this.topInfo = util.deepcopy(this.treeData[0].info);
                    this.currentUserData = this.treeData[0].info;
                    this.cur_org_type = this.treeData[0].org_type;

                    if(this.cur_org_type == '2'){
                        this.$nextTick(()=>{
                            this.getOrgManager(this.queryParam.org_id)
                        })
                    }else{
                        this.loading = false;
                    }
                    // this.$nextTick(()=>{
                    //     if(this.treeData[0].child.length > 0){
                    //         this.getOrgManager(this.treeData[0].child[0]);
                    //     }else{
                    //         this.loading = false;
                    //     }
                    // })
                }
            })
        }
    },
    created: function() {
        if(this.$route.params.org_id == 0){
            this.queryParam.org_id = ""
        }else{
            this.queryParam.org_id = this.$route.params.org_id
        }
        //this.getData();
        util.on("sjyw_dialog",() =>{
            this.dialogVisible = !this.dialogVisible
        });
    }
}
</script>

<style scoped>
.sjywDialog /deep/ .newComDialog { width:780px;}
.sjywDialog /deep/ .el-dialog__body { padding:0;}
.ewico { display:inline-block; vertical-align:-9px; width:30px; height:30px; overflow:hidden; background:url(../../assets/img/ewz_ico.png) no-repeat; margin-right:8px;}
.ewitop { background-position:-90px 0;}
.ewioffice { background-position:-30px 0;}
.ewinon-public { background-position:-60px 0;}
.tree /deep/ .el-collapse-item__header.is-active { background-color:#3d7de5; color:#ffffff;}
.tree /deep/ .el-collapse-item__header.is-active .ewitop { background-position:-90px -30px;}
.tree /deep/ .el-collapse-item__header.is-active .ewiarea { background-position:0 -30px;}
.tree /deep/ .el-collapse-item__header.is-active .ewioffice { background-position:-30px -30px;}
.tree /deep/ .el-collapse-item__header.is-active .ewinon-public { background-position:-60px -30px;}
.tree /deep/ .el-collapse-item__arrow { display:none;}
.tree /deep/ .el-collapse-item__header,.tree /deep/ .el-collapse-item__wrap,.el-collapse { border-width:0;}
.tree /deep/ .el-collapse-item__header { border-radius:8px; padding-left:15px; font-size:16px;}
.tree /deep/ .el-collapse-item__content { padding:15px 0 5px;}
.tree { width:220px; padding:15px; background-color:#ffffff; box-sizing:border-box; box-shadow:0 0 5px #ccc; min-height:455px; z-index:10; position:relative;}

.link a { display:block; line-height:22px; padding:7px 10px 7px 30px; position:relative;}
.link a::before { content:''; display:block; width:7px; height:7px; overflow:hidden; background:#646364; border-radius:50%; position:absolute; left:14px; top:14px;}
.link a.active,.link a:hover { color:#3d7de5;}
.link a.active::before,.link a:hover::before { background:#3d7de5;}

.users { border:#ddd 1px solid; border-radius:10px; background-color:#f3f5f8; margin:0 15px; height:150px;}
.users .button { width:40px; line-height:150px; text-align:center;}
.users .button [class^=el-icon-] { font-size:20px; font-weight:bold;}
.usersBox { text-align:center;}
.usersBox .imgbox { max-width:72px; display:block; margin-right:auto; margin-left:auto; position:relative; margin-top:15px;}
.usersBox .avatar { width:100%; height:0; padding-bottom:100%; border:#fff 2px solid; border-radius:50%; overflow:hidden; position:relative; background:#000;}
.usersBox .avatar img { position:absolute; width:100%; height:100%; left:0; top:0;}
.usersBox .active img { opacity:1;}
.usersBox .name { height:24px; line-height:24px;}
.usersBox .xs { display:inline-block; white-space:nowrap; width:auto; height:24px; line-height:24px; color:#ffffff; background:linear-gradient(to left,#ff0341,#ff654e); border-radius:12px; padding:0 5px 0 8px; font-size:12px;}

.userCard { width:170px; height:225px; background:url(../../assets/img/usercardbg.jpg) no-repeat; margin:30px auto; color:#ffffff; border-radius:8px; overflow:hidden; cursor: pointer;}
.userCard .face { width: 100px; height:100px; border:#fff 2px solid; border-radius:50%; box-sizing:border-box; overflow:hidden; position:relative; margin:35px auto 15px;}
.userCard .face img { position:absolute; width:100%; height:100%; left:0; top:0;}
.userCard .name,.userCard .posi { display:inline-block; white-space:nowrap; margin:0 5px; width:auto; height:20px; line-height:20px;}
.userCard .posi {background-color:#ffffff; color:#f93b42; border-radius:10px; padding:0 8px; font-size:12px;}
.userCard .score { color:#fff119; font-size:24px; padding-top:8px;}

.confirmBtn { padding-top:20px;}
.confirmBtn .el-button { padding-left:32px; padding-right:32px;}

.swiper-slide { cursor:pointer;}
</style>