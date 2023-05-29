<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/store/modules/demo';
defineOptions({
    name: 'HelloWorld',
});
defineProps<{ msg: string }>();
const countStore = useCounterStore();
const { counter } = storeToRefs(countStore);
const refCount = ref(0);
const addRefCount = () => {
    refCount.value++;
};
const addPiniaCount = () => {
    countStore.increment();
};
</script>
<template>
    <h1>{{ msg }}</h1>
    <div style="text-align: center; margin-top: 24px">
        <span class="ref-count">{{ refCount }}</span>
        <el-button @click="addRefCount">增加ref</el-button>
    </div>
    <div style="text-align: center; margin-top: 24px">
        <span class="ref-count">{{ counter }}</span>
        <el-button @click="addPiniaCount">增加pinia</el-button>
    </div>
</template>
<style lang="scss" scoped>
.read-the-docs {
    color: #888;
}
.paste-div {
    height: 200px;
    width: 200px;
    border: 1px solid #000;
}
h1 {
    text-align: center;
    margin-top: 24px;
}
.ref-count {
    margin-right: 8px;
}
</style>
