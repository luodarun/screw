import type { App } from 'vue';
import VButton from '@/baseComponents/VButton/index.vue';
import VImage from '@/baseComponents/VImage/index.vue';
import VRect from '@/baseComponents/VRect/index.vue';

// 这是本地的基本组件，所以一定是可以拿到组件的props
export default function (app: App) {
  console.log('VButton :>> ', VButton);
  app.component('VButton', VButton);
  console.log('VImage :>> ', VImage);
  app.component('VImage', VImage);
  console.log('VRect :>> ', VRect);
  app.component('VRect', VRect);
}