<template>
    <el-collapse-item title="通用样式编辑" name="style">
        <el-form>
            <el-form-item
                v-for="(item, index) in curComponent.supportCss"
                :key="index"
                label-position="top"
                :label="STYLE_ITEM_DESC[item.key]"
            >
                <el-color-picker
                    v-if="['color', 'backgroundColor'].includes(item.key)"
                    v-model="curComponent['style'][item.key]"
                />
                <el-input-number
                    v-if="['fontSize', 'width', 'height'].includes(item.key)"
                    v-model="curComponent['style'][item.key]"
                />
                <el-input
                    v-else
                    v-model="curComponent['style'][item.key]"
                ></el-input>
            </el-form-item>
        </el-form>
    </el-collapse-item>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';
import { STYLE_ITEM_DESC } from '@/utils/constants';

defineOptions({
    name: 'StyleEditor',
});

const editStore = useEditStore();
const { curComponent } = storeToRefs(editStore);
</script>
