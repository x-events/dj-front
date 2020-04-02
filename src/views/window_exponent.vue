<template>
    <div class="flex-col paddingWrap newWindow">
        <template v-if="$route.path.split('/').length>4">
            <router-view />
        </template>
        <template v-else>
            <div class="flex-1 flex-row minheight_half">
                <block1 class="flex-1" />
                <block4 class="flex-1" />
            </div>
            <div class="flex-1 flex-row minheight_half">
                <block3 class="flex-1" />
                <block5 class="flex-1" />
            </div>
        </template>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/exponent/block1";
import block2 from "@/components/exponent/block2";
import block3 from "@/components/exponent/block3";
import block4 from "@/components/exponent/block4";
import block5 from "@/components/exponent/block5";

export default {
    components: {
        block1,
        block2,
        block3,
        block4,
        block5
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