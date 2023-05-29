/* eslint-disable no-unused-vars */
import request from '@/utils/request';
import { BaseResponse } from '@/utils/request';
import { UserInfo } from '@/types/user';

export function getSSODomain() {
    if (location.host.includes('17zuoye')) {
        return 'https://sso.oaloft.com';
    }
    return 'https://sso.jinshuschool.net';
}

// sso 登录
export function loginSSO() {
    location.href = `${getSSODomain()}/cas/login?service=${encodeURIComponent(
        location.origin
    )}`;
}

// sso 登出
export function logoutSSO() {
    location.href = `${getSSODomain()}/cas/logout?service=${encodeURIComponent(
        location.origin
    )}`;
}

// 登录
// eslint-disable-next-line no-unused-vars
export function auth(
    ticket: string,
    service: string
): Promise<BaseResponse<UserInfo>> {
    // TODO 移除下面Mock代码，对接业务后台
    return new Promise(resolve => {
        resolve({
            success: true,
            data: {
                account: 'mate.sha',
            },
            code: 1,
        });
    });
}

// 退出登录
export function logout() {
    // TODO 移除下面Mock代码，对接业务后台
    return new Promise(resolve => {
        resolve({ success: true });
    });
}
