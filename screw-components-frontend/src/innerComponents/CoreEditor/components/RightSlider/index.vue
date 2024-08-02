<template>
    <div class="right-slider">
        <el-button @click="test">测试</el-button>
    </div>
</template>
<script setup lang="ts">
import { useEditStore } from '@/store/modules/edit';
import { storeToRefs } from 'pinia';

const editStore = useEditStore();
const { curComponent, } = storeToRefs(editStore);

const test = () => {
    curComponent.value.componentProps = {
        type: 'primary'
    };
}
</script>
<style lang="scss" scoped>
.right-slider {
    width: 200px;
    border-left: 1px solid var(--border-color);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    flex-shrink: 0;
} 
</style>