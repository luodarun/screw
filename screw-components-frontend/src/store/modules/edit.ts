import { defineStore } from 'pinia';
import type {
    ComponentStaticScheme,
    CanvasStyleData,
    ComponentScheme,
    CommonStyle,
} from '@/types/component';
import { deepCopy } from '@/utils';

export const useEditStore = defineStore('editStore', {
    state: () => ({
        allComponentList: [
            {
                lib: 'element-plus',
                components: [
                    {
                        icon: 'icon-park:arithmetic-buttons',
                        name: '按钮',
                        libName: 'element-plus',
                        component: 'ElButton',
                        configUrl: '@/AsyncComponent/ElementPlus/button',
                        iconStyle: {
                            width: '24',
                            height: '24',
                            color: 'red',
                        },
                    },
                    {
                        icon: 'icon-park:add-text',
                        name: '文字',
                        libName: 'element-plus',
                        component: 'ElText',
                        configUrl: '@/AsyncComponent/ElementPlus/text',
                        iconStyle: {
                            width: '24',
                            height: '24',
                            color: 'red',
                        },
                    },
                    // {
                    //     icon: 'icon-park:add-text',
                    //     name: '图片',
                    //     component: 'ElImage',
                    //     iconStyle: {
                    //         width: '24',
                    //         height: '24',
                    //         color: 'red',
                    //     },
                    // },
                ],
            },
        ] as Array<{lib: string, components: ComponentStaticScheme[]}>, // 收录的组件，这些组件在使用之前必须要先在全局注册
        showLeft: false,
        showRight: false,
        editor: null as null | HTMLElement,
        usingComponents: [] as ComponentScheme[],
        lastScale: 100, // 记录快照上次的缩放比例，用于判断是否需要更新快照
        snapshotData: [] as Array<ComponentScheme[]>,
        snapshotIndex: -1,
        isClickComponent: false,
        isInEdiotr: false,
        curComponent: null as null | ComponentScheme,
        curComponentIndex: null as null | number,
        menuShow: false,
        canvasStyleData: {
            // 页面全局数据
            width: 1200,
            height: 740,
            scale: 100,
            color: '#000',
            opacity: 1,
            background: '#fff',
            fontSize: 14,
            position: 'absolution'
        } as CanvasStyleData,
        isDarkMode: false,
    }),
    getters: {},
    actions: {
        addComponent(params: { component: any; index?: number }) {
            if (params.index !== undefined) {
                this.usingComponents.splice(params.index, 0, params.component);
            } else {
                this.usingComponents.push(params.component);
            }
        },
        // 添加新的快照
        recordSnapshot() {
            let copyData = deepCopy(this.usingComponents);
            copyData.forEach(
                (v: ComponentScheme) => (v.lastScale = this.lastScale)
            );
            this.snapshotData[++this.snapshotIndex] = copyData;
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(
                    0,
                    this.snapshotIndex + 1
                );
            }
        },
        setClickComponentStatus(isClickComponent: boolean) {
            this.isClickComponent = isClickComponent;
        },
        setInEditorStatus(isInEdiotr: boolean) {
            this.isInEdiotr = isInEdiotr;
        },
        setCurComponent(params: {
            component: null | ComponentScheme;
            index: null | number;
        }) {
            this.curComponent = params.component;
            this.curComponentIndex = params.index;
        },
        hideContextMenu() {
            this.menuShow = false;
        },
        setShapeStyle({
            top,
            left,
            width,
            height,
            rotate,
            padding,
        }: CommonStyle) {
            if (!this.curComponent) {
                return;
            }
            if (top !== undefined)
                this.curComponent.style.top = Math.round(top);
            if (left !== undefined)
                this.curComponent.style.left = Math.round(left);
            if (width) this.curComponent.style.width = Math.round(width);
            if (padding) this.curComponent.style.padding = Math.round(padding);
            if (height) this.curComponent.style.height = Math.round(height);
            if (rotate) this.curComponent.style.rotate = Math.round(rotate);
        },
    },
    // 稍后将由插件读取
    debounce: {},
});
