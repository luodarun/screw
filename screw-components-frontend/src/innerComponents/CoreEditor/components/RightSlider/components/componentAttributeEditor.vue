<template>
    <el-collapse-item title="组件属性" name="component-attribute">
        <el-form>
            <el-form-item
                v-for="(item, index) in curComponent.propsAttrs"
                :key="index"
                label-position="top"
                :label="item.desc"
            >
                <el-color-picker
                    v-if="item.type === 'Color' || item.type === 'color'"
                    v-model="curComponent['propValue'][item.key]"
                />
                <el-radio-group
                    v-else-if="item.type === 'enum'"
                    v-model="curComponent['propValue'][item.key]"
                >
                    <el-radio v-for="(val, index) in item.enumValues" :key="val" :value="val">{{ val }}</el-radio>
                </el-radio-group>
                <el-radio-group
                v-else-if="item.type === 'Boolean' || item.type === 'boolean'"
                    v-model="curComponent['propValue'][item.key]"
                >
                    <el-radio :value="true">是</el-radio>
                    <el-radio :value="false">否</el-radio>
                </el-radio-group>
                <el-input-number
                v-else-if="item.type === 'Number'"
                    v-model="curComponent['propValue'][item.key]"
                />
                <el-input
                    v-else
                    v-model="curComponent['propValue'][item]"
                ></el-input>
            </el-form-item>
        </el-form>
    </el-collapse-item>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';

defineOptions({
    name: 'ComponentAttributeEditor',
});

const editStore = useEditStore();
const { curComponent } = storeToRefs(editStore);
</script>
