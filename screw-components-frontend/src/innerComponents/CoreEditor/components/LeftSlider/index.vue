<template>
    <el-scrollbar class="left-slider">
        <div class="min-com-wrapper">
            <MinCom
                v-for="(item, index) in list"
                :key="index"
                :info="item"
            ></MinCom>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
// 怎么展示默认收录的组件？维护到数据库中，自己扩展的维护在自己的表中
import { storeToRefs } from 'pinia';
import MinCom from './miniCom';
import { useComponentStore } from '@/store/modules/component';

const componentStore = useComponentStore();
const { list } = storeToRefs(componentStore);
</script>
<style lang="scss" scoped>
.left-slider {
    width: 200px;
    box-sizing: border-box;
    border-right: 1px solid #e5e5e5;
    flex-shrink: 0;
    background-color: red;
    .min-com-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
    }
}
</style>
