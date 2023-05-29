/// <reference types="vite/client" />
/// <reference types="unplugin-vue-define-options" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.md' {
    // When "Mode.HTML" is requested， 为什么不生效
    const html: string;

    // Modify below per your usage
    export { html };
}
