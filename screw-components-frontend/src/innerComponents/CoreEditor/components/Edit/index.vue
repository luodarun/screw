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
const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer.getData('index');
    const rectInfo = this.editor.getBoundingClientRect();
    if (index) {
        const component = deepCopy(componentList[index]);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = generateID();

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);

        this.$store.commit('addComponent', { component });
        this.$store.commit('recordSnapshot');
    }
};

const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
};

const handleMouseDown = e => {
    e.stopPropagation();
    this.$store.commit('setClickComponentStatus', false);
    this.$store.commit('setInEditorStatus', true);
};

const deselectCurComponent = e => {
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
