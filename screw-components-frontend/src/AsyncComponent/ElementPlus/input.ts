import {
    ComponentPropItem,
    ComponentSlotItem,
    SupportCssItem,
} from '@/types/component';

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
        key: 'type',
        desc: '类型',
        type: 'string',
        defaultValue: 'text',
    },
    {
        key: 'model-value / v-model',
        desc: '绑定值',
        type: ['string', 'number'],
        defaultValue: '',
    },
    {
        key: 'maxlength',
        desc: '同原生 maxlength 属性',
        type: ['string', 'number'],
        defaultValue: '',
    },
    {
        key: 'minlength',
        desc: '原生属性，最小输入长度',
        type: ['string', 'number'],
        defaultValue: '',
    },
    {
        key: 'show-word-limit',
        desc: "是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效",
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'placeholder',
        desc: '输入框占位文本',
        type: 'string',
        defaultValue: '',
    },
    {
        key: 'clearable',
        desc: '是否显示清除按钮，只有当 type 不是 textarea时生效',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'formatter',
        desc: '指定输入值的格式。(只有当 type 是"text"时才能工作)',
        type: 'Function',
        defaultValue: '',
    },
    {
        key: 'parser',
        desc: '指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)',
        type: 'Function',
        defaultValue: '',
    },
    {
        key: 'show-password',
        desc: '是否显示切换密码图标',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'disabled',
        desc: '是否禁用',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'size',
        desc: "输入框尺寸，只在 type 不为 'textarea' 时有效",
        type: 'enum',
        enumValues: ['large', 'default', 'small'],
        defaultValue: '',
    },
    {
        key: 'prefix-icon',
        desc: '自定义前缀图标',
        type: ['string', 'Component'],
        defaultValue: '',
    },
    {
        key: 'suffix-icon',
        desc: '自定义后缀图标',
        type: ['string', 'Component'],
        defaultValue: '',
    },
    {
        key: 'rows',
        desc: "输入框行数，仅 type 为 'textarea' 时有效",
        type: 'number',
        defaultValue: '2',
    },
    {
        key: 'autosize',
        desc: "textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }",
        type: ['boolean', 'object'],
        defaultValue: 'false',
    },
    {
        key: 'autocomplete',
        desc: '原生 autocomplete 属性',
        type: 'string',
        defaultValue: 'off',
    },
    {
        key: 'name',
        desc: '等价于原生 input name 属性',
        type: 'string',
        defaultValue: '',
    },
    {
        key: 'readonly',
        desc: '原生 readonly 属性，是否只读',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'max',
        desc: '原生 max 属性，设置最大值',
        type: '',
        defaultValue: '',
    },
    {
        key: 'min',
        desc: '原生属性，设置最小值',
        type: '',
        defaultValue: '',
    },
    {
        key: 'step',
        desc: '原生属性，设置输入字段的合法数字间隔',
        type: '',
        defaultValue: '',
    },
    {
        key: 'resize',
        desc: '控制是否能被用户缩放',
        type: 'enum',
        enumValues: ['none', 'both', 'horizontal', 'vertical'],
        defaultValue: '',
    },
    {
        key: 'autofocus',
        desc: '原生属性，自动获取焦点',
        type: 'boolean',
        defaultValue: 'false',
    },
    {
        key: 'form',
        desc: '原生属性',
        type: 'string',
        defaultValue: '',
    },
    {
        key: 'label a11y deprecated',
        desc: '等价于原生 input aria-label 属性',
        type: 'string',
        defaultValue: '',
    },
    {
        key: 'aria-label a11y 2.7.2',
        desc: '等价于原生 input aria-label 属性',
        type: 'string',
        defaultValue: '',
    },
    {
        key: 'tabindex',
        desc: '输入框的 tabindex',
        type: ['string', 'number'],
        defaultValue: '',
    },
    {
        key: 'validate-event',
        desc: '输入时是否触发表单的校验',
        type: 'boolean',
        defaultValue: 'true',
    },
    {
        key: 'input-style',
        desc: 'input 元素或 textarea 元素的 style',
        type: ['string', 'object'],
        defaultValue: '{}',
    },
];

const slots: ComponentSlotItem[] = [
    {
        name: 'prefix',
        type: 'dom',
        value: '',
    },
    {
        name: 'suffix',
        type: 'dom',
        value: '',
    },
    {
        name: 'prepend',
        type: 'dom',
        value: '',
    },
    {
        name: 'append',
        type: 'dom',
        value: '',
    },
];

export default {
    supportCss,
    propsAttrs,
    slots,
    enableScale: true,
    url: 'element-plus/es/components/input/index',
};
