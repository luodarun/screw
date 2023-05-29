import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import qs from 'qs';
import config from '@/config';
import { ElMessage } from 'element-plus';
import { logout } from '@/apis/user';

export type BaseResponse<T> = {
    success: boolean;
    data?: T;
    msg?: string;
    code?: number;
};

// 重定向至SSO登录
function redirectToSSOLogin() {
    logout();
}

const service: AxiosInstance = axios.create({
    baseURL: config.baseUrl, // url = base url + request url
    timeout: config.timeout, // request timeout
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

// request interceptor
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (
            config.data &&
            config.method === 'post' &&
            config.headers &&
            config.headers['Content-Type'] ===
                'application/x-www-form-urlencoded'
        ) {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 相应数据拦截
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        res._headers = response.headers;
        return res;
    },
    (error: AxiosError) => {
        // 网络错误，error.response为空，自定义网络错误信息
        if (!error.response) {
            const netError = new Error('网络错误');
            ElMessage({
                message: netError.message,
                type: 'error',
                duration: 5 * 1000,
            });
            throw netError;
        }
        // 401 登录状态失效
        if (error.response.status === 401) {
            ElMessage({
                message: '登录失效',
                type: 'info',
            });
            // 退出登录
            redirectToSSOLogin();
            throw new Error('');
        }
    }
);

// 校验ajax结果，如果response.success === false打印出返回信息
export type AssertOption = {
    auto: boolean; // 自动处理错误信息，默认自动处理
};
export default async function assertAjax<T>(
    config: AxiosRequestConfig,
    option?: AssertOption
) {
    try {
        const response = await service(config);
        const { data } = response as AxiosResponse<BaseResponse<T>>;
        if (data.success === false && option?.auto !== false) {
            ElMessage.error(data.msg);
        }
        return {
            data,
            _response: response,
        };
    } catch (e) {
        ElMessage({
            message: (e as any).message,
            type: 'info',
        });
    }
}

// 自定义请求
export const http = service;
