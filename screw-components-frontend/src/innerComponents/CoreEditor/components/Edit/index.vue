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
                    <div v-for="(item, index) in usingComponents"
                    :key="item.id">
                        <component
                            :is="item.component"
                            :id="'component' + item.id"
                            class="component"
                            :style="getComponentStyle(item.style)"
                            :prop-value="item.propValue"
                            :element="item"
                            :request="item.request"
                        />
                    </div>
                    <!-- <Shape
                        v-for="(item, index) in componentData"
                        :key="item.id"
                        :default-style="item.style"
                        :style="getShapeStyle(item.style)"
                        :active="item.id === (curComponent || {}).id"
                        :element="item"
                        :index="index"
                        :class="{ lock: item.isLock }"
                    >
                        <component
                            :is="item.component"
                            v-if="item.component.startsWith('SVG')"
                            :id="'component' + item.id"
                            :style="getSVGStyle(item.style)"
                            class="component"
                            :prop-value="item.propValue"
                            :element="item"
                            :request="item.request"
                        />

                        <component
                            :is="item.component"
                            v-else-if="item.component != 'VText'"
                            :id="'component' + item.id"
                            class="component"
                            :style="getComponentStyle(item.style)"
                            :prop-value="item.propValue"
                            :element="item"
                            :request="item.request"
                        />

                        <component
                            :is="item.component"
                            v-else
                            :id="'component' + item.id"
                            class="component"
                            :style="getComponentStyle(item.style)"
                            :prop-value="item.propValue"
                            :element="item"
                            :request="item.request"
                            @input="handleInput"
                        />
                    </Shape> -->
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { nanoid } from 'nanoid';
import { useEditStore } from '@/store/modules/edit';
import { deepCopy } from '@/utils/index';
import { changeComponentSizeWithScale } from './changeComponentsSizeWithScale';
import { getCanvasStyle } from './style';
import { changeStyleWithScale } from './translate';
import Grid from './components/Grid.vue';
import VButton from '@/baseComponents/VButton/index.vue';
import VImage from '@/baseComponents/VImage/index.vue';

// 这种可选组件应该基本分为两类，第一类是在当前项目中维护的基本组件，第二类是不在项目中维护的组件，但是应该可以通过引入的方式来解决，这种方式除了使用$mount来生成对应的dom，还有其他办法吗？

// 参考这种风格
// import { defineAsyncComponent } from 'vue'

// const AsyncComp = defineAsyncComponent(() => {
//   return new Promise((resolve, reject) => {
//     // ...从服务器获取组件
//     resolve(/* 获取到的组件 */)
//   })
// })
// app.component('MyComponent', defineAsyncComponent(() =>
//   import('./components/MyComponent.vue')
// ))

// 如何对接一个组件库？只能使用cdn文件引入的方式解决，但是打包的时候可以考虑使用npm+按需引入的方式做优化，但是目前应该不会用到

const editStore = useEditStore();
const {
    editor,
    allComponentList,
    isClickComponent,
    canvasStyleData,
    isDarkMode,
    usingComponents,
} = storeToRefs(editStore);

const isEdit = ref(true);

const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const index = e.dataTransfer?.getData('index');
    const rectInfo = editor.value?.getBoundingClientRect();
    if (index && rectInfo) {
        const component = deepCopy(allComponentList.value[Number(index)]);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = nanoid();

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);

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
