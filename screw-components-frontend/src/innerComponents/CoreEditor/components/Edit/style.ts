import type { CanvasStyleData, CommonStyle } from '@/types/component';
import { sin, cos, toPercent } from './translate'

// 宽高和放大指数在其它地方控制,position不做修改
const canvasFilterKeys = ['width', 'height', 'scale', 'position'];
export function getCanvasStyle(canvasStyleData: Record<string, any>) {
    const result: any = {};
    Object.keys(canvasStyleData)
        .filter(key => !canvasFilterKeys.includes(key))
        .forEach(key => {
            result[key] = canvasStyleData[key];
            if (key === 'fontSize') {
                result[key] += 'px';
            }
        });

    return result;
}

export function getShapeStyle(style: Record<string, any>) {
    const result: any = {};
    ['top', 'left', 'rotate'].forEach(attr => {
        if (attr != 'rotate') {
            result[attr] = style[attr] + 'px';
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)';
        }
    });

    return result;
}

export const needUnit: string[] = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
];

export function getStyle(style: Record<string, any>, filter: string[] = []) {
    const result: any = {};
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                if (style[key] !== '') {
                    result[key] = style[key];

                    if (needUnit.includes(key)) {
                        result[key] += 'px';
                    }
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)';
            }
        }
    });
    return result;
}

export const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate'];


// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(shapeStyle: any, style: any) {
    const finalStyle: Record<string, any> = {};
    if (shapeStyle.rotate != 0) {
        const newWidth = style.width * cos(shapeStyle.rotate) + style.height * sin(shapeStyle.rotate)
        const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
        finalStyle.left += diffX
        finalStyle.right = finalStyle.left + newWidth

        const newHeight = style.height * cos(shapeStyle.rotate) + style.width * sin(shapeStyle.rotate)
        const diffY = (newHeight - style.height) / 2 // 始终是正
        finalStyle.top -= diffY
        finalStyle.bottom = finalStyle.top + newHeight

        finalStyle.width = newWidth
        finalStyle.height = newHeight
    } else {
        finalStyle.bottom = shapeStyle.top + style.height
        finalStyle.right = shapeStyle.left + style.width
    }

    return finalStyle
}