<template>
    <div class="mark-line">
        <div
            v-for="line in lines"
            v-show="lineStatus[line] || false"
            :key="line"
            :ref="line"
            class="line"
            :class="line.includes('x') ? 'xline' : 'yline'"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia';
import { useEditStore } from '@/store/modules/edit';
import eventBus from '../eventBus';
import { getComponentRotatedStyle } from '../style';

const editStore = useEditStore();
const { usingComponents, curComponent } = storeToRefs(editStore);

const com = getCurrentInstance();

const diff = 3; // 相距 dff 像素将自动吸附
const lines = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']; // 分别对应三条横线和三条竖线
const lineStatus = ref<Record<(typeof lines)[number], boolean>>({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
});

const hideLine = () => {
    lineStatus.value = {
        xt: false,
        xc: false,
        xb: false,
        yl: false,
        yc: false,
        yr: false,
    };
};

const showLine = (isDownward: boolean, isRightward: boolean) => {
    const lines = com?.refs as any;
    if (!curComponent.value) {
        return;
    }
    // 只能通过ID来获得了？
    const curComponentStyle = getComponentRotatedStyle(
        curComponent.value.shapeStyle,
        curComponent.value.style
    );
    console.log('curComponentStyle :>> ', curComponentStyle);
    const curComponentHalfWidth = curComponentStyle.width / 2;
    const curComponentHalfHeight = curComponentStyle.height / 2;
    hideLine();
    usingComponents.value.forEach(component => {
        if (component == curComponent.value) return;
        const componentStyle = getComponentRotatedStyle(
            component.shapeStyle,
            component.style
        );
        console.log('componentStyle :>> ', componentStyle);
        const { top, left, bottom, right } = componentStyle;
        const componentHalfWidth = componentStyle.width / 2;
        const componentHalfHeight = componentStyle.height / 2;

        const conditions: any = {
            top: [
                {
                    isNearly: isNearly(curComponentStyle.top, top),
                    lineNode: lines?.xt?.[0], // xt
                    line: 'xt',
                    dragShift: top,
                    lineShift: top,
                },
                {
                    isNearly: isNearly(curComponentStyle.bottom, top),
                    lineNode: lines?.xt?.[0], // xt
                    line: 'xt',
                    dragShift: top - curComponentStyle.height,
                    lineShift: top,
                },
                {
                    // 组件与拖拽节点的中间是否对齐
                    isNearly: isNearly(
                        curComponentStyle.top + curComponentHalfHeight,
                        top + componentHalfHeight
                    ),
                    lineNode: lines?.xc?.[0], // xc
                    line: 'xc',
                    dragShift:
                        top + componentHalfHeight - curComponentHalfHeight,
                    lineShift: top + componentHalfHeight,
                },
                {
                    isNearly: isNearly(curComponentStyle.top, bottom),
                    lineNode: lines?.xb?.[0], // xb
                    line: 'xb',
                    dragShift: bottom,
                    lineShift: bottom,
                },
                {
                    isNearly: isNearly(curComponentStyle.bottom, bottom),
                    lineNode: lines?.xb?.[0], // xb
                    line: 'xb',
                    dragShift: bottom - curComponentStyle.height,
                    lineShift: bottom,
                },
            ],
            left: [
                {
                    isNearly: isNearly(curComponentStyle.left, left),
                    lineNode: lines?.yl?.[0], // yl
                    line: 'yl',
                    dragShift: left,
                    lineShift: left,
                },
                {
                    isNearly: isNearly(curComponentStyle.right, left),
                    lineNode: lines?.yl?.[0], // yl
                    line: 'yl',
                    dragShift: left - curComponentStyle.width,
                    lineShift: left,
                },
                {
                    // 组件与拖拽节点的中间是否对齐
                    isNearly: isNearly(
                        curComponentStyle.left + curComponentHalfWidth,
                        left + componentHalfWidth
                    ),
                    lineNode: lines?.yc?.[0], // yc
                    line: 'yc',
                    dragShift:
                        left + componentHalfWidth - curComponentHalfWidth,
                    lineShift: left + componentHalfWidth,
                },
                {
                    isNearly: isNearly(curComponentStyle.left, right),
                    lineNode: lines?.yr?.[0], // yr
                    line: 'yr',
                    dragShift: right,
                    lineShift: right,
                },
                {
                    isNearly: isNearly(curComponentStyle.right, right),
                    lineNode: lines?.yr?.[0], // yr
                    line: 'yr',
                    dragShift: right - curComponentStyle.width,
                    lineShift: right,
                },
            ],
        };

        const needToShow: string[] = [];
        const { rotate } = curComponent.value!.shapeStyle;
        Object.keys(conditions).forEach(key => {
            // 遍历符合的条件并处理
            conditions[key].forEach(
                (condition: {
                    isNearly: any;
                    dragShift: any;
                    lineNode: { style: { [x: string]: string } };
                    lineShift: any;
                    line: string;
                }) => {
                    if (!condition.isNearly) return;
                    // 修改当前组件位移
                    (curComponent.value as any).shapeStyle[key] =
                        rotate != 0
                            ? translatecurComponentShift(
                                  key,
                                  condition,
                                  curComponentStyle
                              )
                            : condition.dragShift;
                    condition.lineNode.style[key] = `${condition.lineShift}px`;
                    needToShow.push(condition.line);
                }
            );
        });
        console.log('needToShow :>> ', needToShow);
        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
            chooseTheTureLine(needToShow, isDownward, isRightward);
        }
    });
};

const translatecurComponentShift = (
    key: string,
    condition: {
        isNearly?: any;
        dragShift: any;
        lineNode?: { style: { [x: string]: string } };
        lineShift?: any;
        line?: string;
    },
    curComponentStyle: Record<string, any>
) => {
    if (!curComponent.value) {
        return;
    }
    const { width, height } = curComponent.value.style;
    if (key == 'top') {
        return Math.round(
            condition.dragShift - (height - curComponentStyle.height) / 2
        );
    }

    return Math.round(
        condition.dragShift - (width - curComponentStyle.width) / 2
    );
};

const chooseTheTureLine = (needToShow: string | string[], isDownward: boolean, isRightward: boolean) => {
    // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
    // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
    if (isRightward) {
        if (needToShow.includes('yr')) {
            lineStatus.value.yr = true;
        } else if (needToShow.includes('yc')) {
            lineStatus.value.yc = true;
        } else if (needToShow.includes('yl')) {
            lineStatus.value.yl = true;
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes('yl')) {
            lineStatus.value.yl = true;
        } else if (needToShow.includes('yc')) {
            lineStatus.value.yc = true;
        } else if (needToShow.includes('yr')) {
            lineStatus.value.yr = true;
        }
    }

    if (isDownward) {
        if (needToShow.includes('xb')) {
            lineStatus.value.xb = true;
        } else if (needToShow.includes('xc')) {
            lineStatus.value.xc = true;
        } else if (needToShow.includes('xt')) {
            lineStatus.value.xt = true;
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (needToShow.includes('xt')) {
            lineStatus.value.xt = true;
        } else if (needToShow.includes('xc')) {
            lineStatus.value.xc = true;
        } else if (needToShow.includes('xb')) {
            lineStatus.value.xb = true;
        }
    }
    console.log('lineStatus.value :>> ', lineStatus.value);
};

const isNearly = (dragValue: number, targetValue: number) => {
    return Math.abs(dragValue - targetValue) <= diff;
};

onMounted(() => {
    // 监听元素移动和不移动的事件
    eventBus.on('move', data => {
        const { isDownward, isRightward } = data as {
            isDownward: boolean;
            isRightward: boolean;
        };
        showLine(isDownward, isRightward);
    });

    eventBus.on('unmove', () => {
        hideLine();
    });
});
</script>

<style lang="scss" scoped>
.mark-line {
    height: 100%;
}

.line {
    background: #59c7f9;
    position: absolute;
    z-index: 1000;
}

.xline {
    width: 100%;
    height: 1px;
}

.yline {
    width: 1px;
    height: 100%;
}
</style>
