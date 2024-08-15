<template>
    <div class="layout-header">
        <el-button @click="previewPage">预览</el-button>
        <el-button @click="save">保存</el-button>
        <el-button @click="release">发布</el-button>
        <el-button @click="setting()">设置为模版</el-button>
    </div>
</template>
<script setup lang="ts">
const previewPage = () => {

}

const save = () => {

}

const setting = () => {

}

const release = () => {

}
</script>
<style lang="scss" scoped>
.layout-header {
    height: 64px;
    padding-left: 24px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);
}
</style>