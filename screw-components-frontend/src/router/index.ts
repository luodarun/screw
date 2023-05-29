import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { bindGuards } from './guard';
import BasicLayout from '@/layout/basicLayout.vue';
import home from './routes/home';
import demo from './routes/demo';
// 业务路由在此扩展
export const businessRoutes = [...home, ...demo] as RouteRecordRaw[];

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            requiresAuth: false,
            hideInNav: true,
        },
        component: () => import('@/pages/login/index.vue'),
    },
    { path: '/', component: BasicLayout, children: businessRoutes },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            title: '404',
            hideInNav: true,
            requiresAuth: false,
        },
        component: () => import('@/pages/inner/404.vue'),
    },
];

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 };
    },
});

// 绑定路由守卫
bindGuards(router);

export default router;
