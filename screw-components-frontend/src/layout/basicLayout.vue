<template>
    <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showStatus = ref(true);
watch(
    () => route,
    newV => {
        if (newV.meta && newV.meta.hideNavBar) {
            showStatus.value = false;
        } else {
            showStatus.value = true;
        }
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped></style>
