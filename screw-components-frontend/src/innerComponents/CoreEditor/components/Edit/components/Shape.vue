<template>
    <div
        ref="$el"
        :class="{ shape: true, active }"
        :style="innerShapeStyle"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @click="selectCurComponent"
        @mousedown="handleMouseDownOnShape"
    >
        <el-icon
            v-show="isActive()"
            class="rotate-icon"
            @mousedown="handleRotate"
            ><RefreshRight
        /></el-icon>
        <span v-show="element.isLock" class="iconfont icon-suo"></span>
        <div
            v-for="item in isActive() && element.enableScale
                ? getPointList()
                : []"
            :key="item"
            class="shape-point"
            :style="getPointStyle(item)"
            @mousedown="handleMouseDownOnPoint(item, $event)"
        ></div>
        <component
            :is="element.componentInstance"
            :id="'component' + element.id"
            class="component"
            :style="getComponentStyle(element.style)"
            v-bind="element.propValue"
        >
            <template
                v-for="(slotItem, index2) in element.slots"
                v-slot:[slotItem.name]="slotProps"
            >
                <!-- 如何即时更改此处效果？其实一般人根本到不了这里 -->
                <template v-if="typeof slotItem.value === 'string'">
                    {{ slotItem.value }}
                </template>
                <!-- 是不是又需要一层shape？ -->
                <template v-else>
                    <Shape
                        v-for="(slotItemChild, slotItemChildIndex) in slotItem.value"
                        :key="slotItemChild.id"
                        is-inner
                        :default-style="slotItemChild.style"
                        :active="slotItemChild.id === (curComponent || {}).id"
                        :element="slotItemChild"
                        :index="index"
                        :class="{ lock: slotItemChild.isLock }"
                    ></Shape>
                </template>
            </template>
        </component>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, nextTick, computed } from 'vue';
import type { PropType } from 'vue';
import { ElLoading } from 'element-plus';
import { RefreshRight } from '@element-plus/icons-vue';
import { useEditStore } from '@/store/modules/edit';
import eventBus from '../eventBus';
import runAnimation from '../runAnimation';
import calculateComponentPositionAndSize from '../calculateComponentPositionAndSize';
import { mod360 } from '../translate';
import { isPreventDrop } from '../utils';
import type { ComponentScheme, CommonStyle } from '@/types/component';
import type { HandleDirection } from '../calculateComponentPositionAndSize';
import { deepCopy } from '@/utils';
import { nanoid } from 'nanoid';
import loadAsyncComponent from '../loadAsyncComponent';
import { changeComponentSizeWithScale } from '../changeComponentsSizeWithScale';
import {
    getStyle,
    getShapeStyle,
} from '../style';

defineOptions({
    name: 'Shape',
});

const editStore = useEditStore();
const { editor, curComponent, canvasStyleData, allComponentList } =
    storeToRefs(editStore);

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    isInner: {
        type: Boolean,
        default: false,
    },
    element: {
        required: true,
        type: Object as PropType<ComponentScheme>,
        default: () => {},
    },
    index: {
        required: true,
        type: Number,
        default: 0,
    },
});

const $el = ref<null | HTMLElement>(null);

const pointList = ref<HandleDirection[]>([
    'lt',
    't',
    'rt',
    'r',
    'rb',
    'b',
    'lb',
    'l',
]); // 八个方向
const pointList2 = ref<HandleDirection[]>(['r', 'l']); // 左右两个方向
const initialAngle = ref<Record<string, any>>({
    // 每个点对应的初始角度
    lt: 0,
    t: 45,
    rt: 90,
    r: 135,
    rb: 180,
    b: 225,
    lb: 270,
    l: 315,
});
const angleToCursor = ref([
    // 每个范围的角度对应的光标
    { start: 338, end: 23, cursor: 'nw' },
    { start: 23, end: 68, cursor: 'n' },
    { start: 68, end: 113, cursor: 'ne' },
    { start: 113, end: 158, cursor: 'e' },
    { start: 158, end: 203, cursor: 'se' },
    { start: 203, end: 248, cursor: 's' },
    { start: 248, end: 293, cursor: 'sw' },
    { start: 293, end: 338, cursor: 'w' },
]);
const cursors = ref<Record<string, any>>({});

const getPointList = () => {
    return props.element.component === 'line-shape'
        ? pointList2.value
        : pointList.value;
};
const isActive = () => {
    return props.active && !props.element.isLock;
};

const innerShapeStyle = computed(() => {
    const style: Record<string, any> = {};
    if (props.isInner) {
        style.position = '';
    } else {
        style.position = canvasStyleData.value.position === 'absolute' ? 'absolute' : '';
    }
    return style;
});

// 处理旋转
const handleRotate = (e: MouseEvent) => {
    editStore.setClickComponentStatus(true);
    e.preventDefault();
    e.stopPropagation();
    // 初始坐标和初始角度
    const pos = { ...props.element.shapeStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    const startRotate = pos.rotate;

    // 获取元素中心点位置
    const rect = $el.value!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 旋转前的角度
    const rotateDegreeBefore =
        Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent: MouseEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        // 旋转后的角度
        const rotateDegreeAfter =
            Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
        // 获取旋转的角度值
        pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
        // 修改当前组件样式
        editStore.setStyle(pos);
    };

    const up = () => {
        hasMove && editStore.recordSnapshot();
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        cursors.value = getCursor(); // 根据旋转角度获取光标位置
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};

const getPointStyle = (point: string) => {
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    const style: Record<string, any> = {
        cursor: cursors.value[point],
    };

    if (hasL) {
        style.left = '-4px';
    }
    if (hasR) {
        style.right = '-4px';
    }
    if (hasT) {
        style.top = '-4px';
    }
    if (hasB) {
        style.bottom = '-4px';
    }
    // 需要居中
    if (point.length === 1) {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            style.left = `calc(50% - 4px)`;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            style.top = `calc(50% - 4px)`;
        }
    }
    return style;
};

const getCursor = () => {
    const rotate = curComponent.value?.style?.rotate
        ? mod360(curComponent.value.style.rotate)
        : 0; // 取余 360
    const result: Record<string, string> = {};
    let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    pointList.value.forEach(point => {
        const angle = mod360(initialAngle.value[point] + rotate);
        const len = angleToCursor.value.length;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            lastMatchIndex = (lastMatchIndex + 1) % len;
            const angleLimit = angleToCursor.value[lastMatchIndex];
            if (angle < 23 || angle >= 338) {
                result[point] = 'nw-resize';

                return;
            }

            if (angleLimit.start <= angle && angle < angleLimit.end) {
                result[point] = angleLimit.cursor + '-resize';

                return;
            }
        }
    });

    return result;
};

const handleMouseDownOnShape = (e: MouseEvent) => {
    // 将当前点击组件的事件传播出去
    nextTick(() => eventBus.emit('componentClick'));

    editStore.setInEditorStatus(true);
    editStore.setClickComponentStatus(true);
    if (isPreventDrop(props.element.component)) {
        e.preventDefault();
    }

    e.stopPropagation();
    editStore.setCurComponent({
        component: props.element,
        index: props.index,
    });
    if (props.element.isLock) return;

    cursors.value = getCursor(); // 根据旋转角度获取光标位置

    const pos = { ...props.element.shapeStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent: MouseEvent) => {
        hasMove = true;
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.top = curY - startY + startTop;
        pos.left = curX - startX + startLeft;
        // 修改当前组件样式
        editStore.setStyle(pos);
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        nextTick(() => {
            // 触发元素移动事件，用于显示标线、吸附功能
            // 后面两个参数代表鼠标移动方向
            // curY - startY > 0 true 表示向下移动 false 表示向上移动
            // curX - startX > 0 true 表示向右移动 false 表示向左移动
            eventBus.emit('move', {
                vertical: curY - startY > 0,
                horizontal: curX - startX > 0,
            });
        });
    };

    const up = () => {
        hasMove && editStore.recordSnapshot();
        // 触发元素停止移动事件，用于隐藏标线
        eventBus.emit('unmove');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};

const selectCurComponent = (e: MouseEvent) => {
    // 阻止向父组件冒泡
    e.stopPropagation();
    e.preventDefault();
    editStore.hideContextMenu();
    // 打开右侧组件列表
    if (!editStore.showRight) {
        editStore.showRight = true;
    }
};

const handleMouseDownOnPoint = (point: HandleDirection, e: MouseEvent) => {
    editStore.setInEditorStatus(true);
    editStore.setClickComponentStatus(true);
    e.stopPropagation();
    e.preventDefault();

    const rect = $el.value!.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const style = { ...props.element.style, ...props.element.shapeStyle, width, height };

    // 组件宽高比
    const proportion = style.width / style.height;

    // 组件中心点
    const center = {
        x: props.element.shapeStyle.left + style.width / 2,
        y: props.element.shapeStyle.top + style.height / 2,
    };

    // 获取画布位移信息
    const editorRectInfo = editor.value!.getBoundingClientRect();

    // 获取 point 与实际拖动基准点的差值 @justJokee
    const targetEl = e.target as HTMLElement;
    const pointRect = targetEl?.getBoundingClientRect();
    // 当前点击圆点相对于画布的中心坐标
    const curPoint = {
        x: Math.round(
            pointRect.left - editorRectInfo.left + targetEl.offsetWidth / 2
        ),
        y: Math.round(
            pointRect.top - editorRectInfo.top + targetEl.offsetHeight / 2
        ),
    };

    // 获取对称点的坐标
    const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y),
    };

    // 是否需要保存快照
    let needSave = false;
    let isFirst = true;

    const needLockProportion = isNeedLockProportion();
    const move = (moveEvent: MouseEvent) => {
        // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
        // 因此第一次点击时不触发 move 事件
        if (isFirst) {
            isFirst = false;
            return;
        }

        needSave = true;
        const curPositon = {
            x: moveEvent.clientX - Math.round(editorRectInfo.left),
            y: moveEvent.clientY - Math.round(editorRectInfo.top),
        };
        calculateComponentPositionAndSize(
            point,
            style,
            curPositon,
            proportion,
            needLockProportion,
            {
                center,
                curPoint,
                symmetricPoint,
            }
        );
        editStore.setStyle({
            left: style.left,
            top: style.top,
            rotate: style.rotate,
        }, {
            width: style.width,
            height: style.height,
        });
    };

    const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
        needSave && editStore.recordSnapshot();
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};

const isNeedLockProportion = () => {
    // if (props.element.component != 'Group') return false;
    // const rotates = [0, 90, 180, 360];
    // for (const component of props.element.propValue) {
    //     if (!rotates.includes(mod360(parseInt(component.style.rotate)))) {
    //         return true;
    //     }
    // }

    return false;
};

onMounted(() => {
    // 用于 Group 组件
    if (curComponent.value) {
        cursors.value = getCursor(); // 根据旋转角度获取光标位置
    }
    eventBus.on('runAnimation', () => {
        if (props.element == curComponent.value) {
            runAnimation($el.value!, curComponent.value.animations);
        }
    });
    eventBus.on('stopAnimation', () => {
        $el.value!.classList.remove('animated', 'infinite');
    });
});

const handleDragOver = (e: DragEvent) => {
    console.log('111 :>> ', 111);
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
    }
};

const handleDrop = async (e: DragEvent) => {
    // 如果组件有申明default slot 将作为组件的default slot存在
    const defaultSlot = props.element.slots?.find(
        item => item.name === 'default'
    );
    if (!defaultSlot) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    const loadingInstance = ElLoading.service({ fullscreen: true });
    const index = e.dataTransfer?.getData('index');
    const index2 = e.dataTransfer?.getData('index2');
    if (index && index2) {
        const component = deepCopy(
            allComponentList.value[Number(index)]['components'][Number(index2)]
        );
        component.tempStyle = {
            rotate: 0,
        };
        component.id = nanoid();
        await loadAsyncComponent(component);

        // 根据画面比例修改组件样式比例
        changeComponentSizeWithScale(component);
        defaultSlot.value = [component];
        editStore.recordSnapshot();
    }
    loadingInstance.close();
};

const getComponentStyle = (style: CommonStyle) => {
    return getStyle(style, []);
};
</script>

<style lang="scss" scoped>
.shape {
    width: fit-content;
    &:hover {
        cursor: move;
    }
}

.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}

.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
}

.rotate-icon {
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
    cursor: grab;
    color: #59c7f9;
    font-size: 20px;
    font-weight: 600;

    &:active {
        cursor: grabbing;
    }
}

.icon-suo {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
