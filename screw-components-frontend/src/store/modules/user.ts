import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { logout, loginSSO, auth, logoutSSO } from '@/apis/user';
import { UserInfo } from '@/types/user';
import config from '@/config';

type UserState = {
    userInfo: UserInfo | null;
};

export const useUserStore = defineStore({
    // 这里的id必须为唯一ID
    id: 'user',
    state: (): UserState => {
        return {
            userInfo: null,
        };
    },
    // 等同于vuex的getter
    getters: {
        userAccount(state) {
            if (!state.userInfo) {
                return '';
            }
            return state.userInfo.account;
        },
    },
    // pinia 放弃了 mutations 只使用 actions
    actions: {
        async checkUser(ticket: string, service: string) {
            // 验证用户信息
            if (this.userInfo) {
                return true;
            }
            if (config.loginStyle === 'sso' && !ticket) {
                loginSSO();
                return false;
            }
            try {
                const { data } = await auth(ticket, service);
                if (data) {
                    this.userInfo = data;
                }
                return true;
            } catch (e) {
                ElMessage.error(`sso登录失败${(e as any).message}`);
                setTimeout(() => {
                    config.loginStyle === 'sso' && logoutSSO();
                });
                return false;
            }
        },
        async logout() {
            this.userInfo = null;
            await logout();
            logoutSSO();
        },
    },
});
