import { createPinia, PiniaPluginContext, _ActionsTree } from 'pinia';
import { debounce } from 'lodash';

const pinia = createPinia();
pinia.use(({ options, store }: PiniaPluginContext) => {
    if (options.debounce) {
        // 我们正在用新的action覆盖这些action
        return Object.keys(options.debounce).reduce(
            (debouncedActions, action) => {
                debouncedActions[action] = debounce(
                    store[action],
                    options.debounce?.[action]
                );
                return debouncedActions;
            },
            {} as _ActionsTree
        );
    }
});
export default pinia;
