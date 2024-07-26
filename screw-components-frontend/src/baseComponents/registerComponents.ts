import type { App } from 'vue';
import VButton from '@/baseComponents/VButton/index.vue';
import VImage from '@/baseComponents/VImage/index.vue';

export default function (app: App) {
  app.component('VButton', VButton);
  app.component('VImage', VImage);
}