<template>
    <div class="">
        <!-- <i-ep-edit />
        <IconEpRefresh></IconEpRefresh>
        <el-icon><Plus /></el-icon>
        <IconEpApple />
        222
        <component :is="IconEpApple"></component>
        111
        <MinCom text="1234"></MinCom> -->
        <!-- {{ list }} -->
        <MinCom v-for="(item, index) in list" :key="index" :info="item"></MinCom>
    </div>
</template>
<script setup lang="ts">
// 怎么展示默认收录的组件？维护到数据库中，自己扩展的维护在自己的表中
import { storeToRefs } from "pinia";
import MinCom from './miniCom';
import { useComponentStore } from '@/store/modules/component';


const componentStore = useComponentStore();
const { list } = storeToRefs(componentStore);

</script>
<style lang="scss" scoped>
    
</style>
