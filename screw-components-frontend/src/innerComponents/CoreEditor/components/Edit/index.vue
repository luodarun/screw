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
                    @mousedown="handleEditorMouseDown"
                >
                    <!-- 网格线 -->
                    <Grid :is-dark-mode="isDarkMode" />
                    <!--页面组件列表展示-->
                    <Shape
                        v-for="(item, index) in usingComponents"
                        :key="item.id"
                        :style="getShapeStyle(item.shapeStyle)"
                        :active="item.id === (curComponent || {}).id"
                        :element="item"
                        :index="index"
                        :class="{ lock: item.isLock }"
                    >
                    </Shape>
                    <!-- 标线 -->
                    <MarkLine></MarkLine>
                    <!-- 选中区域 -- 只是为了组合 -->
                    <Area
                        v-show="isShowArea"
                        :areaStart="areaStart"
                        :areaSize="areaSize"
                    />
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { nanoid } from 'nanoid';
import { ElLoading } from 'element-plus';
import { useEditStore } from '@/store/modules/edit';
import { deepCopy } from '@/utils/index';
import { isPreventDrop } from './utils';
import { changeComponentSizeWithScale } from './changeComponentsSizeWithScale';
import {
    getCanvasStyle,
    getComponentRotatedStyle,
    getShapeStyle,
} from './style';
import { changeStyleWithScale } from './translate';
import Grid from './components/Grid.vue';
import Shape from './components/Shape.vue';
import loadAsyncComponent from './loadAsyncComponent';
import Area from './components/Area.vue';
import MarkLine from './components/MarkLine.vue';
import UniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue';
import { ComponentScheme } from '@/types/component';

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

const handleDrop = async (e: DragEvent) => {
    console.log('handleDrop');
    const loadingInstance = ElLoading.service({ fullscreen: true });
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer?.getData('index');
    const index2 = e.dataTransfer?.getData('index2');
    const rectInfo = editor.value?.getBoundingClientRect();
    if (index && index2 && rectInfo) {
        const component = deepCopy(
            allComponentList.value[Number(index)]['components'][Number(index2)]
        );
        component.shapeStyle = {
            rotate: 0,
            top: e.clientY - rectInfo.y,
            left: e.clientX - rectInfo.x,
        };
        component.id = nanoid();
        await loadAsyncComponent(component);

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);
        editStore.addComponent({ component });
        editStore.recordSnapshot();
    }
    loadingInstance.close();
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

const isShowArea = ref(false);
const areaStart = ref({ x: 0, y: 0 }); // 选中区域的起点位置
const editorPosition = ref({ x: 0, y: 0 }); // 编辑器起点位置
const areaSize = ref({ width: 0, height: 0 }); // 选中区域的大小
const hideArea = () => {
    isShowArea.value = false;
    areaSize.value = { width: 0, height: 0 };
    editStore.areaData = {
        style: {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        },
        components: [],
    };
};
const getSelectArea = () => {
    const result: ComponentScheme[] = [];
    // 区域起点坐标
    const { x, y } = areaStart.value;
    // 计算所有的组件数据，判断是否在选中区域内
    usingComponents.value.forEach(component => {
        if (component.isLock) return;

        const { left, top, width, height } = getComponentRotatedStyle(
            component.shapeStyle,
            component.style
        );
        if (
            x <= left &&
            y <= top &&
            left + width <= x + areaSize.value.width &&
            top + height <= y + areaSize.value.height
        ) {
            result.push(component);
        }
    });

    // 返回在选中区域内的所有组件
    return result;
};
// 这东西存在的意义就是为了组合
const createGroup = () => {
    // 获取选中区域的组件数据
    const areaData = getSelectArea();
    if (areaData.length <= 1) {
        hideArea();
        return;
    }

    // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
    // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
    let top = Infinity,
        left = Infinity;
    let right = -Infinity,
        bottom = -Infinity;
    areaData.forEach(component => {
        const style: Record<string, any> = getComponentRotatedStyle(
            component.shapeStyle,
            component.style
        );
        if (style.left < left) left = style.left;
        if (style.top < top) top = style.top;
        if (style.right > right) right = style.right;
        if (style.bottom > bottom) bottom = style.bottom;
    });

    areaStart.value = {
        x: left,
        y: top,
    };
    areaSize.value = {
        width: right - left,
        height: bottom - top,
    };
    // 设置选中区域位移大小信息和区域内的组件数据
    editStore.areaData = {
        style: {
            left,
            top,
            width: areaSize.value.width,
            height: areaSize.value.height,
        },
        components: areaData,
    };
};

const handleEditorMouseDown = (e: MouseEvent) => {
    // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
    if (!curComponent.value || isPreventDrop(curComponent.value.component)) {
        e.preventDefault();
    }
    hideArea();

    // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
    const rectInfo = editor.value!.getBoundingClientRect();
    editorPosition.value = {
        x: rectInfo.x,
        y: rectInfo.y,
    };
    const startX = e.clientX;
    const startY = e.clientY;
    areaStart.value = {
        x: startX - rectInfo.x,
        y: startY - rectInfo.y,
    };
    // 展示选中区域
    isShowArea.value = true;

    const move = (moveEvent: MouseEvent) => {
        areaSize.value = {
            width: Math.abs(moveEvent.clientX - startX),
            height: Math.abs(moveEvent.clientY - startY),
        };
        if (moveEvent.clientX < startX) {
            areaStart.value.x = moveEvent.clientX - editorPosition.value.x;
        }

        if (moveEvent.clientY < startY) {
            areaStart.value.y = moveEvent.clientY - editorPosition.value.y;
        }
    };

    const up = (e: MouseEvent) => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);

        if (e.clientX == startX && e.clientY == startY) {
            hideArea();
            return;
        }
        createGroup();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
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
    overflow: hidden;
    box-sizing: border-box;
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
