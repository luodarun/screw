<template>
    <el-collapse-item title="子组件编辑" name="slot">
        <el-form>
            <el-form-item
                v-for="(item, index) in curComponent!.slots"
                :key="index"
                label-position="top"
                :label="item.name"
            >
                <el-input
                    v-if="
                        item.type === 'string' || typeof item.value === 'string'
                    "
                    v-model="item.value"
                ></el-input>
                <div class="slot-children" v-else>
                    <div
                        class="slot-children-item"
                        v-for="(item2, index2) in item.value"
                        :key="index2"
                    >
                        <div class="slot-children-item-info">
                            <Icon
                                v-if="item2.icon"
                                :icon="item2.icon"
                                v-bind="item2.iconStyle"
                            ></Icon>
                            <img v-if="item2.img" :src="item2.img" alt="" />
                            {{ item2.name }}
                        </div>
                        <Icon icon="icon-park:delete-four"></Icon>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </el-collapse-item>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';
import { Icon } from '@iconify/vue';

defineOptions({
    name: 'SlotEditor',
});

const editStore = useEditStore();
const { curComponent } = storeToRefs(editStore);
</script>
<style lang="scss" scoped>
.slot-children {
    width: 100%;
    .slot-children-item {
        width: 100%;
        justify-content: space-between;
        display: flex;
        align-items: center;
        .slot-children-item-info {
            display: flex;
            align-items: center;
        }
    }
}
</style>
