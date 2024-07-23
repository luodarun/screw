<template>
    <div class="core-editor">
        <Header></Header>
        <div class="core-editor-content">
            <LeftSlider></LeftSlider>
            <Edit></Edit>
            <RightSlider></RightSlider>
        </div>
    </div>
</template>
<script setup lang="ts">
import LeftSlider from './components/LeftSlider/index.vue';
import RightSlider from './components/RightSlider/index.vue';
import Edit from './components/Edit/index.vue';
import Header from './components/Header/index.vue';

</script>
<style lang="scss" scoped>
.core-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .core-editor-content {
        display: flex;
        flex: 1;
        overflow: hidden;
        .left-content {
            width: 200px;
        }
        .middle-content {
            flex: 1;
        }
        .right-content {

        }
    }
}
</style>