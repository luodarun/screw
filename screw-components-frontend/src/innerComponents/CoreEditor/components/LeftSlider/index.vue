<template>
    <div class="left-slider">
        <el-tabs
            v-model="editableTabsValue"
            :closable="false"
            addable
            class="lib-tabs"
            @edit="handleTabsEdit"
        >
            <el-tab-pane
                v-for="(item, index) in allComponentList"
                :key="item.lib"
                :label="item.lib"
                :name="item.lib"
            >
                <el-scrollbar height="100%">
                    <div class="min-com-wrapper" @dragstart="handleDragStart">
                        <MinCom
                            v-for="(item2, index2) in item.components"
                            :key="index"
                            :info="item2"
                            :data-index="index"
                            :data-index2="index2"
                            draggable="true"
                        ></MinCom>
                    </div>
                </el-scrollbar>
            </el-tab-pane>
        </el-tabs>
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
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import MinCom from './miniCom';
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue';
import { useEditStore } from '@/store/modules/edit';
import type { TabPaneName } from 'element-plus';
import { ElMessage } from 'element-plus';

const componentStore = useEditStore();
const { allComponentList, showLeft } = storeToRefs(componentStore);

const handleDragStart = (e: DragEvent) => {
    if (e.dataTransfer) {
        e.dataTransfer.setData('index', (e.target as any).dataset.index);
        e.dataTransfer.setData('index2', (e.target as any).dataset.index2);
    }
};

const editableTabsValue = ref('element-plus');
const handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
) => {
    if (action !== 'add') {
        ElMessage.warning('该操作不支持');
        return;
    }
    const newTabName = 'test';
    allComponentList.value.push({
        lib: newTabName,
        components: [],
    });
    editableTabsValue.value = newTabName;
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.left-slider {
    border-right: 1px solid var(--border-color);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 300px;
    flex-shrink: 0;
    .lib-tabs {
        padding: 0 12px;
    }
    .min-com-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 5px;
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
