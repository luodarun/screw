import type { CanvasStyleData, CommonStyle } from '@/types/component';

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

export function getShapeStyle(style: Record<string, any>) {
    const result: any = {};
    ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr != 'rotate') {
            result[attr] = style[attr] + 'px'
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
        }
    })

    return result
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
]

export function getStyle(style: Record<string, any>, filter: string[] = []) {
  const result: any = {}
  console.log('style :>> ', style);
  Object.keys(style).forEach(key => {
        console.log('key :>> ', key, filter);
      if (!filter.includes(key)) {
        console.log('111 :>> ', 111);
          if (key != 'rotate') {
            console.log('style[key] :>> ', key, style[key]);
              if (style[key] !== '') {
                  result[key] = style[key]

                  if (needUnit.includes(key)) {
                      result[key] += 'px'
                  }
                  console.log('result[key] :>> ', result[key]);
              }
          } else {
              result.transform = key + '(' + style[key] + 'deg)'
          }
      }
  })
  console.log('result :>> ', result);
  return result
}

export const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate'];