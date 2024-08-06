<template>
    <div class="right-slider" v-if="curComponent">
        <el-scrollbar height="100%">
            <el-collapse v-model="activeNames">
                <ComponentAttributeEditor></ComponentAttributeEditor>
                <StyleEditor></StyleEditor>
            </el-collapse>
            <div>slot</div>
            <div>default: <input type="text" /></div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useEditStore } from '@/store/modules/edit';
import { storeToRefs } from 'pinia';
import StyleEditor from './components/StyleEditor.vue';
import ComponentAttributeEditor from './components/componentAttributeEditor.vue';

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
