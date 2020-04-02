<template>
    <div class="flex-col scrollbar">
        <!-- <header3 @opened="showBlock" /> -->
        <header1 />
        <template v-if="$route.path.split('/').length>3">
            <router-view class="flex-1 flex-row scrollbar" />
        </template>
        <template v-else>
            <div class="flex-1 flex-row paddingWrap newWindow scrollbar">
                <div class="flex-1 flex-row" style="height:985px;">

                    <div class="flex-1 flex-col">
                        <block1 class="flex-1" />
                        <block2 class="flex-1" />
                        <block3 class="flex-1" />
                    </div>

                    <div class="flex-1 flex-col">
                        <block4 class="flex-1" />
                        <block5 class="flex-1" />
                        <block6 class="flex-1" />
                    </div>

                    <div class="flex-1 flex-col">
                        <block7 class="flex-1" />
                        <block8 class="flex-1" />
                        <block9 class="flex-1" />
                    </div>

                </div>

                <!--支部班子成员弹窗-->
                <block2dialog />
                <!--支部班子成员弹窗 end-->

            </div>
            <loadcover />
        </template>
        
        <sidemenu v-if="$root.user.org_type != '3' && $root.user.role != '1'" />
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/committee/block1";
import block2 from "@/components/committee/block2";
import block2dialog from "@/components/committee/block2_dialog";
import block3 from "@/components/committee/block3";
import block4 from "@/components/committee/block4";
import block5 from "@/components/committee/block5";
import block6 from "@/components/committee/block6";
import block7 from "@/components/committee/block7";
import block8 from "@/components/committee/block8";
import block9 from "@/components/committee/block9";

export default {
    components: {
        block1,
        block2,
        block2dialog,
        block3,
        block4,
        block5,
        block6,
        block7,
        block8,
        block9
    },
    beforeRouteLeave (to, from , next) {
        util.emit("leaveWindow");
        setTimeout(() => {
            next()
        }, 400);
    },
    data() {
        return {

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
        }, 500);

        window.onresize = function temp() {
            util.emit("resize");
        }
    }
}
</script>

<style scoped>
/* .flex-col { overflow:visible;} */
</style>
