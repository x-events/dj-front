<template>
    <div class="newWindow">
        <template v-if="$route.path.split('/').length>4">
            <router-view class="flex-1 flex-row" />
        </template>
        <template v-else>
            <div class="flex-1 flex-row paddingWrap scrollbar">
                <div class="flex-4 flex-col minheight">
                    <div class="flex-1 flex-row">
                        <block1 class="flex-2" />
                        <block2 class="flex-3" />
                    </div>
                    <div class="flex-1 flex-row">
                        <block3 class="flex-1" />
                    </div>
                </div>
                <div class="flex-1 flex-row minheight">
                    <block4 class="flex-1" />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/member_active/block1";
import block2 from "@/components/member_active/block2";
import block3 from "@/components/member_active/block3";
import block4 from "@/components/member_active/block4";

export default {
    components: {
        block1,
        block2,
        block3,
        block4
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
    }
}
</script>