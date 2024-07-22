import { RouteRecordRaw } from 'vue-router';
const homeRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        redirect: '/home',
        meta: {
            title: '首页',
            hideInNav: true,
        },
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页',
            icon: 'ep:home-filled', // 只能这样引入啊
        },
        component: () => import('@/pages/home/index.vue'),
    },
];
export default homeRoutes;
