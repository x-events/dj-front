<template>
    <div class="flex-col paddingWrap newWindow">
        <div class="flex-1 flex-row">
            <block1 class="flex-1" />
            <block2 class="flex-1" />
            <block3 class="flex-1" />
        </div>
        <div class="flex-2 flex-row">
            <block4 class="flex-1" />
        </div>
    </div>
</template>

<script>
import block1 from "@/components/study_special/block1";
import block2 from "@/components/study_special/block2";
import block3 from "@/components/study_special/block3";
import block4 from "@/components/study_special/block4";

export default {
    components: {
        block1,
        block2,
        block3,
        block4,
    }
}
</script>

