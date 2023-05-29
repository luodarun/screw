import 'vue-router';
// import type { DefineComponent } from 'vue';

declare module 'vue-router' {
    interface RouteMeta {
        title: string; // 标题
        hideNavBar?: boolean; // 隐藏导航栏(头部存在，但是导航菜单不显示，若是不想显示头部，使用EmptyLayout布局模版)
        hideInNav?: boolean; // 不在导航栏中显示（链接直接访问、其他按钮跳转，个人信息等）
        openNewPage?: boolean; // 新页面打开（自身链接、外部链接）
        requiresAuth?: boolean; // 需要登录认证
        icon?: Promise<typeof import('~icons/*')>; // 菜单图标
    }
}
