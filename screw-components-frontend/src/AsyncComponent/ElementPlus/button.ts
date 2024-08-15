import type { SupportCssItem, ComponentPropItem, ComponentSlotItem } from '@/types/component';

const supportCss: SupportCssItem[] = [
    {
        key: 'fontSize',
        defaultValue: '14',
    },
    {
        key: 'width',
        defaultValue: '',
    },
    {
        key: 'height',
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
        key: 'plain',
        desc: '是否为朴素按钮',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'text',
        minVersion: '2.2.0',
        desc: '是否为文字按钮',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'bg',
        minVersion: '2.2.0',
        desc: '是否显示文字按钮背景颜色',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'link',
        minVersion: '2.2.1',
        desc: '是否为链接按钮',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'round',
        desc: '是否为圆角按钮',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'circle',
        desc: '是否为圆形按钮',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'loading',
        desc: '是否为加载中状态',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'loading-icon',
        desc: '自定义加载中状态图标组件',
        type: ['string', 'Component'],
        defaultValue: 'Loading',
    },
    {
        key: 'disabled',
        desc: '按钮是否为禁用状态',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'icon',
        desc: '图标组件',
        type: ['string', 'Component'],
        defaultValue: '',
    },
    {
        key: 'autofocus',
        desc: '原生 autofocus 属性',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'native-type',
        desc: '原生 type 属性',
        type: 'enum',
        enumValues: ['button', 'submit', 'reset'],
        defaultValue: 'button',
    },
    {
        key: 'auto-insert-space',
        desc: '自动在两个中文字符之间插入空格',
        type: 'boolean',
        defaultValue: '',
    },
    {
        key: 'color',
        desc: '自定义按钮颜色, 并自动计算 hover 和 active 触发后的颜色',
        type: 'color',
        defaultValue: '',
    },
    {
        key: 'dark',
        desc: 'dark 模式, 意味着自动设置 color 为 dark 模式的颜色',
        type: 'boolean',
        defaultValue: false,
    },
    {
        key: 'tag',
        minVersion: '2.3.4',
        desc: '自定义元素标签',
        type: ['string', 'Component'],
        defaultValue: 'button',
    },
];

const slots: ComponentSlotItem[] = [
    {
        name: 'default',
        type: 'dom',
        value: 'default',
    },
];

export default {
    supportCss,
    propsAttrs,
    slots,
    enableScale: true,
    url: 'element-plus/es/components/button/index'
};
