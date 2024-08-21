<template>
  <el-collapse-item title="子组件编辑" name="style">
      <el-form>
          <el-form-item
              v-for="(item, index) in curComponent!.slots"
              :key="index"
              label-position="top"
              :label="item.name"
          >
              <el-input
                  v-if="item.type === 'string'"
                  v-model="item.value"
              ></el-input>
              <div v-else>
                子组件可以加减
              </div>
          </el-form-item>
      </el-form>
  </el-collapse-item>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';
import { STYLE_ITEM_DESC } from '@/utils/constants';

defineOptions({
  name: 'SlotEditor',
});

const editStore = useEditStore();
const { curComponent } = storeToRefs(editStore);
</script>
