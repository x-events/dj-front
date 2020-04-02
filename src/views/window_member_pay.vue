<template>
    <div class="flex-row paddingWrap minheight">
        <div class="flex-3 flex-col">
            <div class="flex-1 flex-row">
                <block1 class="flex-1" />
                <block2 class="flex-1" />
            </div>
            <div class="flex-1 flex-row">
                <block3 class="flex-1" />
            </div>
        </div>
        <div class="flex-1 flex-row">
            <block4 class="flex-1" />
        </div>
    </div>
</template>

<script>
import * as util from "@/assets/util";
import block1 from "@/components/member_pay/block1";
import block2 from "@/components/member_pay/block2";
import block3 from "@/components/member_pay/block3";
import block4 from "@/components/member_pay/block4";

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