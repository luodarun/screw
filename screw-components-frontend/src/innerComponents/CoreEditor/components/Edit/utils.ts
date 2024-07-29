const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component: string) {
    return !components.includes(component) && !component.startsWith('SVG')
}