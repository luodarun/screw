import { createApp, defineAsyncComponent } from 'vue';
import '@/styles/reset.scss';
import '@/styles/global.scss'
import registerComponents from './baseComponents/registerComponents';
import 'element-plus/es/components/message/style/css';
import store from './store/index';
import router from './router/index';
import App from './App.vue';
const app = createApp(App);
registerComponents(app);

app.component('MyComponent', defineAsyncComponent(async () => {
    const bb = await import('v-image');
    console.log('bb :>> ', bb.VImage);
    return bb.VImage;
}))

app.use(store).use(router).mount('#app');
