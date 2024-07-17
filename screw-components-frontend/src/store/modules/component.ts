import { defineStore } from 'pinia';

export const useComponentStore = defineStore('componentStore', {
    state: () => ({
        list: [
            {
                icon: 'i-ep-warning',
                name: '按钮',
            },
            {
                icon: 'i-ep-warning',
                name: '图片',
            }
        ], // 收录的组件，这些组件在使用之前必须要先在全局注册
    }),
    getters: {
        
    },
    actions: {
        
    },
    // 稍后将由插件读取
    debounce: {
       
    },
});
