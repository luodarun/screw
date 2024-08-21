<template>
    <div class="right-slider">
        <el-scrollbar height="100%">
            <el-collapse v-if="curComponent" v-model="activeNames">
                <ComponentAttributeEditor></ComponentAttributeEditor>
                <StyleEditor></StyleEditor>
                <SlotEditor v-if="curComponent?.slots?.length"></SlotEditor>
            </el-collapse>
            <PageAttr v-else></PageAttr>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useEditStore } from '@/store/modules/edit';
import { storeToRefs } from 'pinia';
import StyleEditor from './components/StyleEditor.vue';
import ComponentAttributeEditor from './components/componentAttributeEditor.vue';
import PageAttr from './components/PageAttr.vue';
import SlotEditor from './components/SlotEditor.vue';

const editStore = useEditStore();
const { curComponent } = storeToRefs(editStore);

const activeNames = ref(['component-attribute']);
</script>
<style lang="scss" scoped>
.right-slider {
    width: 240px;
    border-left: 1px solid var(--border-color);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    flex-shrink: 0;
    :global(.el-collapse) {
        padding: 12px;
    }
}
</style>
