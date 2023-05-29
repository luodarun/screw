import { RouteRecordRaw } from 'vue-router';

const demoRoutes: RouteRecordRaw[] = [
    {
        path: '/demo1',
        name: 'demo1',
        meta: {
            title: 'demo1',
            icon: import('~icons/ep/present'), // 只能这样引入啊
        },
        component: () => import('@/pages/demo/demo1/index.vue'),
    },
    {
        path: '/demo2',
        name: 'demo2',
        meta: {
            title: 'demo2',
            icon: import('~icons/ep/ice-cream'), // 只能这样引入啊
        },
        component: () => import('@/pages/demo/demo2/index.vue'),
    },
];

export default demoRoutes;
