<template>
    <div class="v-rect">{{ text }}</div>
</template>
<script lang="ts" setup>
// 1. 应该有一些大众所用的常用的控制面板
//   1. 有大众所有的常用的控制面板说明必然有默认UI
// 2. 有专门对接开发的控制面板，是否可以让开发随意选中任意标签
// 3. 属性的对接问题（如果是函数怎么办？）
defineOptions({
    name: 'VRect',
});
defineProps<{
    text: string
}>();
</script>