<template>
    <div class="edit-panel">
        <el-scrollbar height="100%">
            <div
                class="content"
                @drop="handleDrop"
                @dragover="handleDragOver"
                @mousedown="handleMouseDown"
                @mouseup="deselectCurComponent"
            >
                <div
                    id="editor"
                    class="editor"
                    :class="{ edit: isEdit }"
                    :style="{
                        ...getCanvasStyle(canvasStyleData),
                        width:
                            changeStyleWithScale(canvasStyleData.width) + 'px',
                        height:
                            changeStyleWithScale(canvasStyleData.height) + 'px',
                    }"
                    @contextmenu="handleContextMenu"
                    @mousedown="handleMouseDown"
                >
                    <!-- 网格线 -->
                    <Grid :is-dark-mode="isDarkMode" />
                    <!--页面组件列表展示-->
                    <Shape
                        v-for="(item, index) in usingComponents"
                        :key="item.id"
                        :default-style="item.style"
                        :style="getShapeStyle(item.style)"
                        :active="item.id === (curComponent || {}).id"
                        :element="item"
                        :index="index"
                        :class="{ lock: item.isLock }"
                    >
                        <component
                            :is="item.componentInstance"
                            :id="'component' + item.id"
                            class="component"
                            :style="getComponentStyle(item.style)"
                            v-bind="item.componentProps"
                        >
                            <template
                                v-for="(slotItem, index2) in item.slots"
                                v-slot:[slotItem.name]="slotProps"
                            >
                                <!-- 如何即时更改此处效果？其实一般人根本到不了这里 -->
                                <template v-if="slotItem.type === 'text'">
                                    {{ slotItem.value || slotItem.default }}
                                </template>
                                <!-- 是不是又需要一层shape？ -->
                                <component
                                    v-else
                                    :is="slotItem.value || slotItem.default"
                                    v-bind="
                                        Object.assign(
                                            {},
                                            slotProps,
                                            slotItem.slotProps
                                        )
                                    "
                                ></component>
                            </template>
                        </component>
                        <!-- :prop-value="item.propValue"
                            :element="item" -->
                    </Shape>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, markRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { nanoid } from 'nanoid';
import { useEditStore } from '@/store/modules/edit';
import { deepCopy } from '@/utils/index';
import { changeComponentSizeWithScale } from './changeComponentsSizeWithScale';
import {
    getCanvasStyle,
    getStyle,
    svgFilterAttrs,
    getShapeStyle,
} from './style';
import { changeStyleWithScale } from './translate';
import Grid from './components/Grid.vue';
import Shape from './components/Shape.vue';
import type { CommonStyle } from '@/types/component';
import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue';

// 这种可选组件应该基本分为两类，第一类是在当前项目中维护的基本组件，第二类是不在项目中维护的组件，但是应该可以通过引入的方式来解决，这种方式除了使用$mount来生成对应的dom，还有其他办法吗？
// 如何通过validator获取到符合要求的数据？validator里面也不只是单纯的啊！应该分两套，一套是基本的属性设置，string就是string，一套是组件提供的，组件提供的优先级高于基本的

// 参考这种风格
// import { defineAsyncComponent } from 'vue'

// 如何对接一个组件库？只能使用cdn文件引入的方式解决，但是打包的时候可以考虑使用npm+按需引入的方式做优化，但是目前应该不会用到,我们应该先只对接vue3版本的组件！

// app.component('MyComponent', defineAsyncComponent(async () => {
//     const bb = await import('v-image');
//     console.log('bb.VImage :>> ', bb.VImage);
//     return bb.VImage;
// }))
// app.component('ElButton', defineAsyncComponent(async () => {
//     // const ElButtonFuck = await import('element-plus/lib/components/button/index.js');
//     const RIButtonFuck = await import('element-plus/es/components/button/index');
//     console.log('RIButtonFuck :>> ', RIButtonFuck);
//     return RIButtonFuck;
// }))

const editStore = useEditStore();
const {
    editor,
    allComponentList,
    isClickComponent,
    canvasStyleData,
    isDarkMode,
    usingComponents,
    curComponent,
} = storeToRefs(editStore);

const isEdit = ref(true);

const handleDrop = (e: DragEvent) => {
    console.log('handleDrop');
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer?.getData('index');
    console.log('index :>> ', index);
    const rectInfo = editor.value?.getBoundingClientRect();
    console.log('rectInfo :>> ', rectInfo);
    if (index && rectInfo) {
        const component = deepCopy(allComponentList.value[Number(index)]);
        component.style = {
            width: 200,
            height: 50,
            rotate: 0,
            top: e.clientY - rectInfo.y,
            left: e.clientX - rectInfo.x,
        };
        component.id = nanoid();
        const ButtonCounter = defineAsyncComponent(async () => {
            const { default: CurrentCom } = await import(
                'element-plus/es/components/button/index'
            );
            // 解析组件所要参数
            console.log('props :>> ', CurrentCom);
            const params = [];
            for (const key in CurrentCom.props) {
                const keyInfo = { key };
                const val = CurrentCom['props'][key];
                if (val instanceof Function) {
                    keyInfo.type = val.name;
                } else if (val instanceof Object) {
                    if (val.type instanceof Function) {
                        keyInfo.type = val.type.name;
                    } else if (val.type instanceof Array) {
                        keyInfo.type = val.type.map(item => item.name);
                    }
                }
                params.push(keyInfo);
            }
            console.log('params :>> ', params);
            component.supportCss = [
                {
                    key: 'fontSize',
                    defaultValue: '14',
                },
            ];
            component.propsAttrs = [
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
                    enumValues: [
                        'primary',
                        'success',
                        'warning',
                        'danger',
                        'info',
                    ],
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
            component.componentProps = component.propsAttrs.reduce(
                (total, item) => {
                    if (item.defaultValue !== '') {
                        total[item.key] = item.defaultValue;
                    }
                    return total;
                },
                {} as Record<string, any>
            );
            return CurrentCom;
        });
        component.componentInstance = markRaw(ButtonCounter);

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);
        console.log('component :>> ', component);
        editStore.addComponent({ component });
        editStore.recordSnapshot();
    }
};

const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
    }
};

const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    editStore.setClickComponentStatus(false);
    editStore.setInEditorStatus(true);
};

const deselectCurComponent = (e: MouseEvent) => {
    if (!isClickComponent.value) {
        editStore.setCurComponent({ component: null, index: null });
    }

    // 0 左击 1 滚轮 2 右击
    if (e.button != 2) {
        editStore.hideContextMenu();
    }
};

const handleContextMenu = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // 计算菜单相对于编辑器的位移
    let target = e.target;
    let top = e.offsetY;
    let left = e.offsetX;
    while (target instanceof SVGElement) {
        target = target.parentNode;
    }

    // while (!target.className.includes('editor')) {
    //     left += target.offsetLeft
    //     top += target.offsetTop
    //     target = target.parentNode
    // }

    // this.$store.commit('showContextMenu', { top, left })
};

const getComponentStyle = (style: CommonStyle) => {
    return getStyle(style, svgFilterAttrs);
};

onMounted(() => {
    editStore.editor = document.querySelector('#editor');
});
</script>
<style lang="scss" scoped>
.edit-panel {
    background: var(--secondary-bg-color);
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
    padding: 20px;
    transition: all 0.3s;

    .content {
        width: 100%;
        height: 100%;
    }
    .editor {
        position: relative;
        background: #fff;
        margin: auto;

        .lock {
            opacity: 0.5;

            &:hover {
                cursor: not-allowed;
            }
        }
    }

    .edit {
        .component {
            outline: none;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
