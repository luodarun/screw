import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', {
    state: () => ({
        counter: 0,
    }),
    getters: {
        // 自动将返回类型推断为数字
        doubleCount(state) {
            return state.counter * 2;
        },
        // 使用this返回类型必须明确设置
        doublePlusOne(): number {
            // const otherStore = useOtherStore()
            return this.doubleCount * 2 + 1;
        },
    },
    actions: {
        increment() {
            this.counter++;
        },
    },
    // 稍后将由插件读取
    debounce: {
        // 将动作 increment 防抖 300ms
        increment: 300,
    },
});
