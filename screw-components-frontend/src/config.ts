const { VITE_ENV_FLAG, VITE_API_HOST, VITE_CDN } = import.meta.env || {};

export default {
    envFlag: VITE_ENV_FLAG,
    cdnApiUrl: VITE_CDN, // 静态资源使用的cdn地址
    baseUrl: VITE_ENV_FLAG === 'DEVELOPMENT' ? '/' : VITE_API_HOST,
    timeout: 30 * 1000,
    defaultPageTitle: '单页面模板',
    loginStyle: 'self', // 登录方式，self：自定义的登录，sso使用公司的域名登录
};
