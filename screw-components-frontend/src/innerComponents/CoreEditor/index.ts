import type { App } from 'vue';
import CoreEdit from './index.vue';

CoreEdit.install = (app: App): void => {
    app.component(CoreEdit.name, CoreEdit);
};

export const CoreEditComponent = CoreEdit;

export default CoreEditComponent;

export type CoreEditInstance = InstanceType<typeof CoreEdit>