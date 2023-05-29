/*
    路由守卫
 */
import { useUserStore } from '@/store/modules/user';
import NProgress from 'nprogress'; // progress bar
import '@/styles/nprogress.scss'; // progress bar style
import { Router } from 'vue-router';
import config from '../config';

NProgress.configure({
    showSpinner: false,
});

// 绑定路由守卫
export function bindGuards(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();
        NProgress.start();

        // set page title
        document.title = to.meta.title || config.defaultPageTitle;

        // 不需要登录认证的路由可以直接放行
        if (to.meta && to.meta.requiresAuth === false) {
            return next();
        }

        // 访问路由与当前路由一致放行
        if (to.name === from.name) {
            return next();
        }
        // 检查用户态，未登录前去登录
        const allow = await userStore.checkUser(
            String(to.query.ticket),
            encodeURIComponent(location.origin)
        );
        if (!allow) {
            return next({
                name: 'login',
                replace: true,
            });
        }
        next();
    });

    router.afterEach(() => {
        NProgress.done();
    });
}
