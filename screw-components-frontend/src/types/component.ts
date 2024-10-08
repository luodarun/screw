export type ComponentStaticScheme = {
    name: string;
    libName: string;
    component: string;
    configUrl: string;
    icon?: string;
    iconStyle?: Record<string, any>;
    img?: string;
};

export type SupportCssItem = {
    key: string,
    defaultValue: any,
};

export type ComponentPropItem = {
    key: string,
    type: string | string[],
    enumValues?: string[];
    minVersion?: string,
    maxVersion?: string;
    desc?: string,
    defaultValue?: any,
};

export type ComponentPlatformStaticScheme = {
    id: string;
    componentInstance?: any;
    propsAttrs: ComponentPropItem[];
    supportCss?: SupportCssItem[];
    slots?: ComponentSlotItem[];
    isLock?: boolean;
};

export type ComponentPlatformValueScheme = {
    lastScale?: number;
    propValue?: Record<string, any>;
    animations: Animation[];
    tempStyle: CommonStyle;
    style: CommonStyle;
    shapeStyle: { left: number; top: number; rotate: number;};
    enableScale?: boolean;
};

export type ComponentSlotItem = {
    name: string,
    type: 'string' | 'dom',
    value?: string | ComponentScheme[];
};

export type Point = {
    x: number;
    y: number;
};
export type CommonStyle = { left: number; width: number; top: number; height: number; rotate: number; padding: number; };
export type CanvasStyleData = {
    width: number;
    height: number;
    scale: number;
    color: string;
    opacity: number;
    background: string;
    fontSize: number;
    position: 'relative' | 'absolute';
}
export type ComponentScheme = ComponentStaticScheme & ComponentPlatformStaticScheme & ComponentPlatformValueScheme;

export type Animation = {
    animationTime: number;
    value: string;
    isLoop: boolean;
};
// 每个组件数据大概是这样
// {
//     component: 'v-text', // 组件名称，需要提前注册到 Vue
//     label: '文字', // 左侧组件列表中显示的名字
//     propValue: '文字', // 组件所使用的值
//     platform: 'h5', // 组件适用场景 h5还是web端
//     icon: 'el-icon-edit', // 左侧组件列表中显示的名字
//     thumbnail: 'https://xxxx.png', // 左侧组件列表中显示的缩略图
//     animations: [], // 动画列表
//     events: {}, // 事件列表
//     style: { // 组件样式
//         width: 200,
//         height: 33,
//         fontSize: 14,
//         fontWeight: 500,
//         lineHeight: '',
//         letterSpacing: 0,
//         textAlign: '',
//         color: '',
//     },
// }
