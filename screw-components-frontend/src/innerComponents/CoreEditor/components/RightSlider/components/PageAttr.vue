<template>
    <div class="page-attr">
        <p class="module-title">页面属性</p>
        <el-form>
            <el-form-item label-position="top" label="页面背景色">
                <el-color-picker v-model="canvasStyleData.background" />
            </el-form-item>
            <el-form-item label-position="top" label="页面布局">
                <el-radio-group v-model="canvasStyleData.position">
                    <el-radio value="relative">相对布局</el-radio>
                    <el-radio value="absolution">绝对布局</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';

const editStore = useEditStore();
const { canvasStyleData } = storeToRefs(editStore);
</script>
<style lang="scss" scoped>
.page-attr {
  padding: 12px;
  .module-title {
    margin-bottom: 12px;
  }
}
</style>