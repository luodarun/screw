import { ElMessage } from 'element-plus';
import { defineAsyncComponent, markRaw } from 'vue';
import type { ComponentScheme, ComponentPropItem, CommonStyle } from '@/types/component';

function loadJS(url: string) {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}

async function loadAsyncComponent(baseComponent: ComponentScheme) {
    const { libName, configUrl, component } = baseComponent;
    console.log('libName :>> ', libName);
    console.log('configUrl :>> ', configUrl);
    // libName: string, componentName: string
    // 应该需要从远程服务器来取数据！！！！那些组件库
    if (libName !== 'element-plus') {
        ElMessage.warning('暂不支持');
        return;
    }
    // 这个也应该是来自配置
    // const { default: ComponentConfig } = await import(configUrl);
    const componentName = component.toLowerCase().slice(2);
    const { default: ComponentConfig } = await import(`../../../../AsyncComponent/ElementPlus/${componentName}.ts`);

    baseComponent.propsAttrs = ComponentConfig.propsAttrs;
    baseComponent.supportCss = ComponentConfig.supportCss || [];
    baseComponent.style = baseComponent.supportCss!.reduce(
        (total, item) => {
            if (item.defaultValue !== '') {
                total[item.key] = item.defaultValue;
            }
            return total;
        },
        baseComponent.tempStyle as any
    );
    baseComponent.propValue = baseComponent.propsAttrs.reduce(
        (total, item) => {
            if (item.defaultValue !== '') {
                total[item.key] = item.defaultValue;
            }
            return total;
        },
        {} as Record<string, any>
    );
    baseComponent.slots = ComponentConfig.slots || [];
    baseComponent.componentInstance = component;

    // const targetComponent = defineAsyncComponent(async () => {
    //     // const { default: CurrentCom } = await import(ComponentConfig.url);
    //     const componentName = component.toLowerCase().slice(2);
    //     const { default: CurrentCom } = await import(`../../../../../node_modules/element-plus/es/components/${componentName}/index`);
    //     if (ComponentConfig.propsAttrs) {
    //         baseComponent.propsAttrs = ComponentConfig.propsAttrs;
    //     } else {
    //         const params: ComponentPropItem[] = [];
    //         for (const key in CurrentCom.props) {
    //             const keyInfo: ComponentPropItem = { key, type: 'String' };
    //             const val = CurrentCom['props'][key];
    //             if (val instanceof Function) {
    //                 keyInfo.type = val.name;
    //             } else if (val instanceof Object) {
    //                 if (val.type instanceof Function) {
    //                     keyInfo.type = val.type.name;
    //                 } else if (val.type instanceof Array) {
    //                     keyInfo.type = val.type.map((item: any) => item.name);
    //                 }
    //             }
    //             params.push(keyInfo);
    //         }
    //         baseComponent.propsAttrs = params;
    //     }
    //     baseComponent.supportCss = ComponentConfig.supportCss || [];
    //     baseComponent.propValue = baseComponent.propsAttrs.reduce(
    //         (total, item) => {
    //             if (item.defaultValue !== '') {
    //                 total[item.key] = item.defaultValue;
    //             }
    //             return total;
    //         },
    //         {} as Record<string, any>
    //     );
    //     return CurrentCom;
    // });
    // baseComponent.componentInstance = markRaw(targetComponent);
}

export default loadAsyncComponent;
