<template>
    <div class="login-box">
        <div class="input-content">
            <el-input
                v-model="loginForm.account"
                class="account"
                placeholder="账号"
            ></el-input>
            <el-input
                v-model="loginForm.password"
                class="password"
                type="password"
                placeholder="密码"
            ></el-input>
            <div class="tips">
                <span>账号，密码随意填写</span>
            </div>
            <div class="login-button-wrapper">
                <el-button
                    :disabled="!loginForm.account || !loginForm.password"
                    @click="login"
                    type="primary"
                    >登录</el-button
                >
            </div>
        </div>
        <canvas class="star-bg" ref="bgCanvas"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createStarryBg } from './common';
import { useUserStore } from '@/store/modules/user';

const bgCanvas = ref();

const loginForm = ref({
    account: '',
    password: '',
});

const userStore = useUserStore();
const router = useRouter();
const login = async () => {
    const result = await userStore.checkUser(
        loginForm.value.account,
        loginForm.value.password
    );
    result &&
        router.push({
            name: 'home',
        });
};

onMounted(() => {
    const canvas = bgCanvas.value;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStarryBg(canvas, 2500);
});
</script>
<style lang="scss" scoped>
.login-box {
    height: 100%;
    width: 100%;
    position: relative;
    .star-bg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .input-content {
        width: 400px;
        height: 250px;
        @include positionInTheMiddle;
        .account {
            margin-bottom: 12px;
        }
        .password {
            margin-bottom: 12px;
        }
        .login-button-wrapper {
            text-align: center;
            overflow: hidden;
        }
        .tips {
            font-size: 12px;
            color: red;
        }
    }
}
</style>
