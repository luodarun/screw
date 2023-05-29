<template>
    <div class="read-me" v-html="html"></div>
</template>
<script setup lang="ts">
import * as Html from '../../README.md';
const html = (Html as unknown as { html: string }).html;
</script>
<style lang="scss" scoped>
.read-me {
    padding: 24px;
}
:deep(h1) {
    margin: 12px 0;
}
:deep(a) {
    color: blue;
}
</style>
