<template>
    <div class="basic-header">
        sso-vue3-spa
        <div>
            <el-dropdown @command="handleCommand">
                <span class="user-info-wrapper">
                    <i-ep-setting style="margin-right: 8px; margin-top: 1px" />
                    <span>{{ userStore.userAccount }}</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="quit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
defineOptions({
    name: 'BasicHeader',
});
const userStore = useUserStore();
const handleCommand = (command: string) => {
    if (command === 'quit') {
        userStore.logout();
    }
};
</script>
<style lang="scss" scoped>
.basic-header {
    height: 56px;
    background: #22262e;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .user-info-wrapper {
        display: flex;
        align-items: center;
        color: #fff;
    }
}
</style>
