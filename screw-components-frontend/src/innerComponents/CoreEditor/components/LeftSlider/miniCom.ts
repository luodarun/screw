import { h, ref } from 'vue';
import type { PropType } from 'vue';
import type { ComponentScheme } from '../../../../types/component';

export default {
  props: {
      text: {
          type: Object as PropType<ComponentScheme>,
      }
  },
  setup(props) {
    const divEl = ref()
    return () => h('div', { ref: divEl }, props.text)
  }
}