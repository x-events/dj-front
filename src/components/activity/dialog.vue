<template>
    <div>
        <!-- 弹框 -->
        <el-dialog :visible.sync="dialogVisible" custom-class="newComDialog" class="ztDialog" :append-to-body="true" :before-close="dialogClose">
            <span slot="title" class="el-dialog__title"><i class="wico wi23_b"></i> {{detailData.work_name}}</span>
            <div class="ztDetail" v-loading="dialogLoading">
                <div class="flex-row">
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">形式</div>
                        </dt>
                        <dd class="flex-1">{{detailData.type}}</dd>
                    </dl>
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">时间</div>
                        </dt>
                        <dd class="flex-1">{{detailData.end_time}}</dd>
                    </dl>
                </div>
                <div class="flex-row">
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">地点</div>
                        </dt>
                        <dd class="flex-1">{{detailData.address}}</dd>
                    </dl>
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">依托资源类别</div>
                        </dt>
                        <dd class="flex-1">{{detailData.resource_type}}</dd>
                    </dl>
                </div>
                <div class="flex-row">
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">具体资源</div>
                        </dt>
                        <dd class="flex-1">{{detailData.resource_name}}</dd>
                    </dl>
                </div>
                <div class="flex-row">
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">参加人员</div>
                        </dt>
                        <dd class="flex-1 flex-row">
                            <template v-if="detailData.member.length > 0">
                                <a class="swiperBtn" id="mem_left"><i class="el-icon-arrow-left"></i></a>
                                <swiper v-if="detailData.member.length > 0" :options="swiperOption" ref="mySwiper" class="swiperBox flex-1">
                                    <swiper-slide v-for="(e,i) in detailData.member" :key="i">
                                        <div class="userCard" :title="e.username">
                                            <div class="avatar"><img :src="e.userface || $root.default.face" :alt="e.username" :onerror="$root.default.errorface"></div>
                                            <div class="name el">{{e.username}}</div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                                <a class="swiperBtn" id="mem_right"><i class="el-icon-arrow-right"></i></a>
                            </template>
                            <template v-else>
                                <div class="flex-1">暂无数据</div>
                            </template>
                        </dd>
                    </dl>
                </div>
                <div class="flex-row">
                    <dl class="flex-1 flex-row">
                        <dt class="flex-row align-center">
                            <div class="flex-1">活动照片</div>
                        </dt>
                        <dd class="flex-1 flex-row photos">
                            <template v-if="detailData.imgs.length > 0">
                                <a class="swiperBtn" id="img_left"><i class="el-icon-arrow-left"></i></a>
                                <swiper v-if="detailData.imgs.length > 0" :options="swiperOption_photo" ref="mySwiper" class="swiperBox flex-1">
                                    <swiper-slide v-for="(e,i) in detailData.imgs" :key="i">
                                        <div class="photo" @click="bigImg.status = true; bigImg.url = e;"><img :src="e"></div>
                                    </swiper-slide>
                                </swiper>
                                <a class="swiperBtn" id="img_right"><i class="el-icon-arrow-right"></i></a>
                            </template>
                            <template v-else>
                                <div class="flex-1">暂无数据</div>
                            </template>
                        </dd>
                    </dl>
                </div>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="bigImg.status" title="活动照片" custom-class="newComDialog" :append-to-body="true">
            <div class="tc"><img :src="bigImg.url"></div>
        </el-dialog>
    </div>
</template>

<script>
import * as home from "@/api/window";

export default {
    props:{
        detailId:{
            type: String,
            default:function(){
                return ""
            }
        }
    },
    data() {
        return {
            dialogVisible:false,
            dialogLoading:false,
            detailData:{
                work_name:"",
                type:"",
                end_time:"",
                address:"",
                resource_type:"",
                resource_name:"",
                member:[],
                imgs:[]
            },
            swiperOption: {
                slidesPerView:5,
                slidesPerGroup:5,
                loop:false,
                navigation: {
                    prevEl: '#mem_left',
                    nextEl: '#mem_right'
                }
            },
            swiperOption_photo: {
                slidesPerView:4,
                slidesPerGroup:4,
                loop:false,
                navigation: {
                    prevEl: '#img_left',
                    nextEl: '#img_right'
                }
            },
            bigImg:{
                status:false,
                url:""
            }
        }
    },
    watch: {
        detailId(new_val){
            this.showDetail(new_val)
        }
    },
    methods: {
        showDetail(id){
            this.dialogVisible = true;
            this.dialogLoading = true;
            home.activityinfo({id:id}).then(res => {
                this.dialogLoading = false;
                let data = res.data.data;
                this.detailData = data;
                //console.log(data);
            })
        },
        dialogClose(done){
            this.detailData = {
                work_name:"",
                type:"",
                end_time:"",
                address:"",
                resource_type:"",
                resource_name:"",
                member:[],
                imgs:[]
            }
            done();
        }
    }
}
</script>

<style scoped>
.ztDialog /deep/ .newComDialog { width:860px;}

.ztDetail { width:100%; min-height:100%; box-sizing:border-box; text-align:center;}
.ztDetail.show { transform:scale(1);}
.ztDetail div.flex-row:first-child { border-top:#e5e7ed 1px solid;}
.ztDetail div.flex-row { border-bottom:#e5e7ed 1px solid; border-left:#e5e7ed 1px solid; border-right:#e5e7ed 1px solid; background-color:#ffffff;}
.ztDetail dt { background-color:#326ac6; color:#ffffff; width:145px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
.ztDetail dt,.ztDetail dd { padding:15px 0;}
.ztDetail dd { padding-left:15px; padding-right:15px;}
.ztDetail dd.tl { text-align:left;}

.swiperBox { height:120px;}
.swiperBtn { width:30px; height:120px; text-align:center; line-height:120px; display:block; font-size:30px; overflow:hidden;}
.userCard { width:90px; margin-left:auto; margin-right:auto;}
.userCard .avatar { width:90px; height:90px; border:#e4e4e4 2px solid; border-radius:50%; overflow:hidden; box-sizing:border-box; position:relative;}
.userCard .avatar img { position:absolute; left:0; top:0; width:100%; height:100%; border-radius:50%;}

.photo { width:128px; height:80px; line-height:80px; background-color:#ddd; font-size:0; text-align:center; margin-left:auto; margin-right:auto; cursor:pointer;}
.photo img { max-width:100%; max-height:80px; vertical-align:middle;}
.photos .swiperBtn { height:80px; line-height:80px;}
.photos .swiperBox { height:80px;}
</style>

