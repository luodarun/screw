<template>
    <div
        :style="{
            left: areaStart.x + 'px',
            top: areaStart.y + 'px',
            width: areaSize.width + 'px',
            height: areaSize.height + 'px',
        }"
        class="area"
    ></div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
defineProps({
    areaStart: {
        type: Object as PropType<{ x: number; y: number }>,
        default: () => ({}),
    },
    areaSize: {
        type: Object as PropType<{ width: number; height: number }>,
        default: () => ({}),
    },
});
</script>
<style lang="scss" scoped>
.area {
    border: 1px solid #70c0ff;
    position: absolute;
}
</style>
