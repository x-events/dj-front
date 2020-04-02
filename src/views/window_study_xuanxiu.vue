<template>
    <div class="flex-col paddingWrap newWindow">
        <div class="flex-1 flex-row">
            <block1 class="flex-1" />
            <block2 class="flex-1" />
            <block3 class="flex-1" />
        </div>
        <div class="flex-1 flex-row">
            <block4 class="flex-1" />
            <block5 class="flex-1" />
            <block6 class="flex-1" />
            <block7 class="flex-1" />
        </div>
    </div>
</template>

<script>
import block1 from "@/components/study_xuanxiu/block1";
import block2 from "@/components/study_xuanxiu/block2";
import block3 from "@/components/study_xuanxiu/block3";
import block4 from "@/components/study_xuanxiu/block4";
import block5 from "@/components/study_xuanxiu/block5";
import block6 from "@/components/study_xuanxiu/block6";
import block7 from "@/components/study_xuanxiu/block7";

export default {
    components: {
        block1,
        block2,
        block3,
        block4,
        block5,
        block6,
        block7
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

