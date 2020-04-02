<template>
    <div class="flex-col scrollbar">
        <!-- <header3 @opened="showBlock" /> -->
        <header1 />
        <template v-if="$route.path.split('/').length>3">
            <router-view class="flex-1 flex-row scrollbar" />
        </template>
        <template v-else>
            <div class="flex-1 scrollbar">
                <digital />
                <div class="flex-row paddingWrap newWindow" style="height:846px;">
                    <div class="flex-2 flex-col">
                        <block1 class="flex-1" />

                        <block2 class="flex-1" />

                        <block3 class="flex-1" />
                    </div>
                    <div class="flex-3 flex-col">
                        <div class="flex-2 flex-col block">
                            <position />
                            <block4 class="flex-1" v-if="mapRender" />
                        </div>
                        <div class="flex-1 flex-row block">
                            <block5 class="flex-1" />
                        </div>

                    </div>
                    <div class="flex-2 flex-col">

                        <block7 class="flex-1" />

                        <block8 class="flex-1" />

                        <block9 class="flex-1" />

                    </div>

                </div>
                <!--书记有为弹窗-->
                <block3dialog />
                <!--书记有为弹窗 end-->
                <loadcover />
            </div>
        </template>
        
        <sidemenu />
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/window/block1";
import block2 from "@/components/window/block2";
import block3 from "@/components/window/block3";
import block3dialog from "@/components/window/block3_dialog";
import position from '@/components/window/position';
import digital from '@/components/window/digital';
import block4 from "@/components/window/block4";
import block5 from "@/components/window/block5";
import block7 from "@/components/window/block7";
import block8 from "@/components/window/block8";
import block9 from "@/components/window/block9";

export default {
    components: {
        block1,
        block2,
        block3,
        block3dialog,
        position,
        digital,
        block4,
        block5,
        block7,
        block8,
        block9
    },
    beforeRouteEnter (to, from, next) {
        let user = util.storage('user');
        //let rtRedirect = "/window/0"
        if(user){
            //已登录
            if(user.role != '1'){
                //非党员权限
                if(user.org_type == '3'){
                    //党支部权限
                    next({path:"/window_committee/0"})
                }else{
                    //非党支部权限
                    next()
                }
            }else {
                //党员权限
                next({path:"/work"})
            }
        }else{
            //未登录
            next({path:"/login"})
        }
    },
    beforeRouteLeave (to, from , next) {
        util.emit("leaveWindow");
        setTimeout(() => {
            next()
        }, 400);
    },
    data() {
        return {
            mapRender:true
        }
    },
    methods: {
        fetchData: function() {
            
        }
    },
    mounted: function() {
        this.fetchData();
        setTimeout(() => {
            util.emit("opened");
        }, 400);
    },
    created() {
        util.on("mapshow", () => {
            this.mapRender = false;
            this.$nextTick(()=>{
                this.mapRender = true;
            })
        });
    }
}
</script>