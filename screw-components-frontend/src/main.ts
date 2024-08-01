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
app.use(store).use(router).mount('#app');
