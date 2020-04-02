<template>
    <div class="flex-col paddingWrap newWindow">
        <template v-if="$route.path.split('/').length>4">
            <router-view />
        </template>
        <template v-else>
            <div class="flex-1 flex-row minheight_half">
                <block1 class="flex-1" />
                <block2 class="flex-1" />
                <block3 class="flex-1" />
            </div>
            <div class="flex-1 flex-row minheight_half">
                <block4 class="flex-1" />
                <block5 class="flex-1" />
                <block6 class="flex-1" />
            </div>
        </template>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/party_member/block1";
import block2 from "@/components/party_member/block2";
import block3 from "@/components/party_member/block3";
import block4 from "@/components/party_member/block4";
import block5 from "@/components/party_member/block5";
import block6 from "@/components/party_member/block6";

export default {
    components: {
        block1,
        block2,
        block3,
        block4,
        block5,
        block6
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