import type { CanvasStyleData } from '@/types/component';

const filterKeys = ['width', 'height', 'scale']
export function getCanvasStyle(canvasStyleData: Record<string, any>) {
    const result: any = {}
    Object.keys(canvasStyleData).filter((key) => !filterKeys.includes(key)).forEach(key => {
        result[key] = canvasStyleData[key];
        if (key === 'fontSize') {
            result[key] += 'px'
        }
    })

    return result
}