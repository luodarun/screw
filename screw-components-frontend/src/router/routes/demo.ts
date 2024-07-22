import { RouteRecordRaw } from 'vue-router';

const demoRoutes: RouteRecordRaw[] = [
    {
        path: '/demo1',
        name: 'demo1',
        meta: {
            title: 'demo1',
            icon: 'ep:present'
        },
        component: () => import('@/pages/demo/demo1/index.vue'),
    },
    {
        path: '/demo2',
        name: 'demo2',
        meta: {
            title: 'demo2',
            icon: 'ep:ice-cream'
        },
        component: () => import('@/pages/demo/demo2/index.vue'),
    },
];

export default demoRoutes;
