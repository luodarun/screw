import { createApp, defineAsyncComponent } from 'vue';
import '@/styles/reset.scss';
import '@/styles/global.scss'
import registerComponents from './baseComponents/registerComponents';
import 'element-plus/es/components/message/style/css';

import store from './store/index';
import router from './router/index';
import App from './App.vue';
import 'element-plus/es/components/button/style/index'
import 'element-plus/es/components/button/index';

const app = createApp(App);
registerComponents(app);

app.component('MyComponent', defineAsyncComponent(async () => {
    const bb = await import('v-image');
    console.log('bb.VImage :>> ', bb.VImage);
    return bb.VImage;
}))
app.component('RIButtonFuck', defineAsyncComponent(async () => {
    // const ElButtonFuck = await import('element-plus/lib/components/button/index.js');
    const RIButtonFuck = await import('element-plus/es/components/button/index');
    console.log('RIButtonFuck :>> ', RIButtonFuck);
    return RIButtonFuck;
}))

app.use(store).use(router).mount('#app');
