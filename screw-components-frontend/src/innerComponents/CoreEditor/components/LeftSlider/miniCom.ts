import { h, ref, defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { ComponentStaticScheme } from '../../../../types/component';
import { Icon } from '@iconify/vue';
import styles from './minCom.module.scss';

export default defineComponent({
    props: {
        info: {
            type: Object as PropType<ComponentStaticScheme>,
        },
    },
    setup(props) {
        const divEl = ref();
        return () =>
            h('div', { ref: divEl, class: styles.item }, [
                h('div', {class: styles.itemIconWrapper }, [
                  props.info?.icon &&
                    h(Icon, {
                        icon: props.info.icon,
                        ...props.info?.iconStyle,
                        class: styles.itemIcon,
                    }),
                !props.info?.icon && props.info?.img &&
                    h('img', { src: props.info.img, class: styles.itemIcon }),
                ]),
                h(
                    'span',
                    {
                        class: styles.itemText,
                    },
                    props.info?.name
                ),
            ]);
    },
});
