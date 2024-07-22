import { h, ref, defineComponent, defineAsyncComponent } from 'vue';
import type { PropType } from 'vue';
import type { ComponentScheme } from '../../../../types/component';
import { Icon } from '@iconify/vue';

export default defineComponent({
  props: {
      info: {
          type: Object as PropType<ComponentScheme>,
      }
  },
  setup(props) {
    const divEl = ref();
    return () => h('div', { ref: divEl }, [
      h('span', {}, props.info?.name),
      props.info?.icon && h(Icon, {icon: props.info.icon, ...props.info?.iconStyle}),
      props.info?.img && h('img', {src: props.info.img})
    ]);
  }
})