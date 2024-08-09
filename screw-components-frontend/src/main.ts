import { createApp } from 'vue';
import '@/styles/reset.scss';
import '@/styles/global.scss'
import ElementPlus from 'element-plus'
import registerComponents from './baseComponents/registerComponents';
import store from './store/index';
import router from './router/index';
import App from './App.vue';
import 'element-plus/dist/index.css'

const app = createApp(App);
registerComponents(app);
app.use(ElementPlus).use(store).use(router).mount('#app');
