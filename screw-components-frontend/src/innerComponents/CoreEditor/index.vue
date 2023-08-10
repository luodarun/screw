<template>
    <div class="core-editor">
        <Header class="core-editor-header"></Header>
        <div class="core-editor-content">
            <div class="left-content">
                <LeftSlider></LeftSlider>
            </div>
            <div class="middle-content">
                内容
            </div>
            <SplitLine></SplitLine>
            <div class="right-content">
                <RightSlider></RightSlider>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import LeftSlider from './components/LeftSlider/index.vue';
import RightSlider from './components/RightSlider/index.vue';
import Header from './components/Header/index.vue';
import SplitLine from './components/SplitLine/index.vue';

</script>
<style lang="scss" scoped>
.core-editor {
    display: flex;
    flex-direction: column;
    .core-editor-header {
        height: 64px;
        flex-shrink: 0;
    }
    .core-editor-content {
        display: flex;
        .left-content {

        }
        .middle-content {
            flex: 1;
        }
        .right-content {

        }
    }
}
</style>