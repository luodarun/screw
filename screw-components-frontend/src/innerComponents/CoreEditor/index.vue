<template>
    <div class="core-editor">
        <div class="left-content">
            <LeftSlider></LeftSlider>
        </div>
        <div class="middle-content">
            内容
        </div>
        <div class="right-content">
            <RightSlider></RightSlider>
        </div>
    </div>
</template>
<script setup lang="ts">
import LeftSlider from './components/LeftSlider/index.vue';
import RightSlider from './components/RightSlider/index.vue';

</script>
<style lang="scss" scoped>
.core-editor {
    display: flex;
    .left-content {

    }
    .middle-content {

    }
    .right-content {

    }
}
</style>