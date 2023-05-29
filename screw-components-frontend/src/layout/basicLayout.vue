<template>
    <el-scrollbar>
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BasicHeader from './components/basicHeader.vue';
import BasicSlider from './components/basicSlider.vue';

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

<style lang="scss" scoped>
</style>
