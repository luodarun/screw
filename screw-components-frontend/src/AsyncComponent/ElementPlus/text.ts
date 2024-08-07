import type { SupportCssItem, ComponentPropItem } from '@/types/component';

const supportCss: SupportCssItem[] = [
    {
        key: 'fontSize',
        defaultValue: '14',
    },
    {
        key: 'color',
        defaultValue: '',
    },
];
const propsAttrs: ComponentPropItem[] = [
    {
        key: 'size',
        desc: '尺寸',
        type: 'enum',
        enumValues: ['large', 'default', 'small'],
        defaultValue: '',
    },
    {
        key: 'type',
        desc: '类型',
        type: 'enum',
        enumValues: ['primary', 'success', 'warning', 'danger', 'info'],
        defaultValue: '',
    },
    {
        key: 'truncated',
        desc: '显示省略号',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'line-clamp',
        minVersion: '2.4.0',
        desc: '最大行数',
        type: ['string', 'number'],
        defaultValue: '',
    },
    
    {
        key: 'tag',
        desc: '自定义元素标签',
        type: 'string',
        defaultValue: 'span',
    },
];
export default {
    supportCss,
    propsAttrs,
    url: 'element-plus/es/components/text/index'
};
