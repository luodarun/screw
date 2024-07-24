<template>
    <div
        class="edit-panel"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @mousedown="handleMouseDown"
        @mouseup="deselectCurComponent"
    >
        Edit
    </div>
</template>
<script setup lang="ts">
import { useEditStore } from '@/store/modules/edit';
import { storeToRefs } from 'pinia';
import { deepCopy } from '@/utils/index';
import { nanoid } from 'nanoid';
import { changeComponentSizeWithScale } from './changeComponentsSizeWithScale';

const componentStore = useEditStore();
const { editor, allComponentList } = storeToRefs(componentStore);

const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer?.getData('index');
    const rectInfo = editor.value?.getBoundingClientRect();
    if (index && rectInfo) {
        const component = deepCopy(allComponentList.value[Number(index)]);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = nanoid();

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);

        componentStore.addComponent({ component });
        componentStore.recordSnapshot();
    }
};

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
    }
};

const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    componentStore.setClickComponentStatus(false);
    componentStore.setInEditorStatus(true);
};

const deselectCurComponent = (e: MouseEvent) => {
    if (!this.isClickComponent) {
        this.$store.commit('setCurComponent', { component: null, index: null });
    }

    // 0 左击 1 滚轮 2 右击
    if (e.button != 2) {
        this.$store.commit('hideContextMenu');
    }
};
</script>
<style lang="scss" scoped>
.edit-panel {
    flex: 1;
}
</style>
