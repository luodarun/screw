<template>
    <div class="right-slider" v-if="curComponent">
        <template v-for="(item, index) in curComponent.propsAttrs">
            <div v-if="item.type === 'String'">
                {{item.key}}: <el-input v-model="curComponent.componentProps[item.key]"></el-input>
            </div>
            <div v-else-if="item.type === 'Boolean'">
                {{item.key}}: <el-radio-group v-model="curComponent.componentProps[item.key]">
                                <el-radio :value="true">是</el-radio>
                                <el-radio :value="false">否</el-radio>
                            </el-radio-group>
            </div>
            <div v-else>{{item.key}}: 算了</div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { useEditStore } from '@/store/modules/edit';
import { storeToRefs } from 'pinia';

const editStore = useEditStore();
const { curComponent, } = storeToRefs(editStore);

const test = () => {
    curComponent.value.componentProps = {
        type: 'primary'
    };
}
</script>
<style lang="scss" scoped>
.right-slider {
    width: 200px;
    border-left: 1px solid var(--border-color);
    box-sizing: border-box;
    position: relative;
    height: 100%;
    flex-shrink: 0;
} 
</style>