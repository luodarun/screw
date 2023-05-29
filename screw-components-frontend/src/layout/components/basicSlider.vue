<template>
    <div class="menu-tree-wrap">
        <el-menu theme="dark" :default-active="current">
            <template v-for="item in menuSource" :key="item.name">
                <el-sub-menu
                    :class="{ active: activeStatus(item) }"
                    v-if="item.children"
                    :index="item.path"
                >
                    <template #title>
                        <span>
                            <template v-if="item.meta && item.meta.icon">
                                <MenuIcon :iconPath="item.meta.icon"></MenuIcon>
                            </template>
                            {{ item.meta?.title }}
                        </span>
                    </template>
                    <template v-for="item1 in item.children" :key="item1.name">
                        <el-menu-item-group v-if="item1.children">
                            <template #title>
                                <span>
                                    <template
                                        v-if="item1.meta && item1.meta.icon"
                                    >
                                        <MenuIcon
                                            :iconPath="item1.meta.icon"
                                        ></MenuIcon>
                                    </template>
                                    {{ item1.meta?.title }}
                                </span>
                            </template>
                            <template
                                v-for="item2 in item1.children"
                                :key="item2.name"
                            >
                                <el-menu-item
                                    :class="{ active: activeStatus(item2) }"
                                    v-show="
                                        !item2.meta || !item2.meta.hideInNav
                                    "
                                    :index="item2.path"
                                    @click="menuChangeHandle(item2)"
                                >
                                    <template
                                        v-if="item2.meta && item2.meta.icon"
                                    >
                                        <MenuIcon
                                            :iconPath="item2.meta.icon"
                                        ></MenuIcon>
                                    </template>
                                    {{ item2.meta?.title }}
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                        <el-menu-item
                            v-else
                            :index="item1.path"
                            :class="{ active: activeStatus(item1) }"
                            v-show="!item1.meta || !item1.meta.hideInNav"
                            @click="menuChangeHandle(item1)"
                        >
                            <template v-if="item1.meta && item1.meta.icon">
                                <MenuIcon
                                    :iconPath="item1.meta.icon"
                                ></MenuIcon>
                            </template>
                            {{ item1.meta?.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item
                    :class="{ active: activeStatus(item) }"
                    v-else
                    :index="item.path"
                    v-show="!item.meta || !item.meta.hideInNav"
                    @click="menuChangeHandle(item)"
                >
                    <template v-if="item.meta && item.meta.icon">
                        <MenuIcon :iconPath="item.meta.icon"></MenuIcon>
                    </template>
                    {{ item.meta?.title }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup lang="ts">
import {
    ref,
    watch,
    nextTick,
    defineAsyncComponent,
    h,
    defineComponent,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { getNavMenu } from '@/router/permission';
const MenuIcon = defineComponent({
    props: ['iconPath'],
    setup(props) {
        const AsyncComponent = defineAsyncComponent(() => {
            return props.iconPath;
        });
        return () =>
            h(AsyncComponent, {
                style: {
                    marginRight: '4px',
                },
            });
    },
});

defineOptions({
    name: 'BasicSlider',
});
const route = useRoute();
const router = useRouter();
const menuSource = ref(getNavMenu());
const current = ref<string>();
watch(
    menuSource,
    newV => {
        if (!newV) {
            return;
        }
        current.value = route.path;
    },
    { immediate: true }
);
watch(
    () => route,
    newV => {
        current.value = newV.path;
    },
    { immediate: true }
);
const activeStatus = (item: RouteRecordRaw) => {
    return route.fullPath.includes(item.path);
};
const menuChangeHandle = (param: RouteRecordRaw) => {
    if (param.meta && param.meta.openNewPage) {
        window.open(param.path);
        nextTick(() => {
            current.value = param.path;
        });
        return;
    }
    router.push({
        name: param.name,
    });
};
</script>
<style lang="scss" scoped>
.menu-tree-wrap {
    flex: 1;
    user-select: none;
    :global(.el-menu) {
        background-color: unset;
    }
}
</style>
