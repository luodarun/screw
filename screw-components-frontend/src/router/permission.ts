/*
    路由权限
 */
import { RouteRecordRaw } from 'vue-router';
import { businessRoutes } from './index';

// 整理导航菜单列表(样式限制，目前最多是三级菜单, 此处只整理结构，显示判断等在导航菜单处判断)
// 父级路由隐藏下，子级路由会做提升（父级路由不添加进导航数组中），若是没有子级路由，则直接添加至导航数组中，在显示处做隐藏
const filterNavMenu = function (routes: RouteRecordRaw[]) {
    return routes;
};

export const getNavMenu = () => {
    return filterNavMenu(businessRoutes);
};
