<template>
    <div class="flex-col paddingWrap minheight">
        <tabmenu />
        <div class="flex-1 flex-row">
            <block1 class="flex-1" />
            <block2 class="flex-1" />
            <block3 class="flex-1" />
        </div>
        <div class="flex-1 flex-row">
            <block4 class="flex-1" />
            <block5 class="flex-1" />
            <block6 class="flex-1" />
        </div>
    </div>
</template>

<script>
import tabmenu from "@/components/study_special/menu";
import block1 from "@/components/study_bixiu/block1";
import block2 from "@/components/study_bixiu/block2";
import block3 from "@/components/study_bixiu/block3";
import block4 from "@/components/study_bixiu/block4";
import block5 from "@/components/study_bixiu/block5";
import block6 from "@/components/study_bixiu/block6";

export default {
    components: {
        tabmenu,
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

