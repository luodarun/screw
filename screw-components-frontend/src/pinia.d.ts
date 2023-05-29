import type { StoreActions, StateTree } from 'pinia';

declare module 'pinia' {
    // eslint-disable-next-line no-unused-vars
    export interface DefineStoreOptionsBase<S extends StateTree, Store> {
        // 允许为任何操作定义毫秒数
        debounce?: Partial<Record<keyof StoreActions<Store>, number>>;
    }
}
