<template>
    <div class="left-slider">
        <el-scrollbar height="100%">
            <div class="min-com-wrapper" @dragstart="handleDragStart">
                <MinCom
                    v-for="(item, index) in allComponentList"
                    :key="index"
                    :info="item"
                    :data-index="index"
                    draggable="true"
                ></MinCom>
            </div>
        </el-scrollbar>
        <div class="control-btn">
            <el-icon size="18px">
                <DArrowRight v-if="showLeft" />
                <DArrowLeft v-else />
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
// 怎么展示默认收录的组件？维护到数据库中，自己扩展的维护在自己的表中
import { storeToRefs } from 'pinia';
import MinCom from './miniCom';
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue';
import { useEditStore } from '@/store/modules/edit';

const componentStore = useEditStore();
const { allComponentList, showLeft } = storeToRefs(componentStore);

const handleDragStart = (e: DragEvent) => {
    e.dataTransfer &&
        e.dataTransfer.setData('index', (e.target as any).dataset.index);
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.left-slider {
    border-right: 1px solid var(--border-color);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 200px;
    flex-shrink: 0;
    .min-com-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 12px;
    }
    .control-btn {
        position: absolute;
        width: 24px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border-color);
        border-left: 0;
        border-radius: 0 50% 50% 0;
        right: -24px;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &:hover {
            .el-icon {
                color: $primary;
            }
        }
    }
}
</style>
