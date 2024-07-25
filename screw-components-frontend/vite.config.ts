import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import defineOptions from 'unplugin-vue-define-options/vite';
import progress from 'vite-plugin-progress';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig(env => {
    // env 环境变量
    const viteEnv = loadEnv(env.mode, process.cwd());
    return {
        base: viteEnv.VITE_CDN,
        plugins: [
            vue(),
            vueJsx(),
            mdPlugin({
                mode: [Mode.HTML],
            }),
            defineOptions(), // 扩展defineOptions全局方法
            svgLoader(),
            AutoImport({
                dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
                resolvers: [
                    ElementPlusResolver(),
                ],
            }),
            Components({
                dts: path.resolve(pathSrc, 'components.d.ts'),
                dirs: [],
                resolvers: [
                    ElementPlusResolver(),
                ],
            }),
            viteCompression({
                threshold: 100 * 1024, // 需要压缩的最小文件大小，这里是100K
            }),
            progress(),
        ],
        server: {
            host: true, // host设置为true才可以使用network的形式，以ip访问项目
            port: 9573, // 端口号
            open: true, // 自动打开浏览器
            cors: true, // 跨域设置允许
            strictPort: true, // 如果端口已占用直接退出
            // 接口代理
            proxy: {
                '/api': {
                    // 本地 8000 前端代码的接口 代理到 8888 的服务端口
                    target: viteEnv.VITE_API_HOST,
                    changeOrigin: true, // 允许跨域
                    rewrite: path => path.replace('/api/', '/'),
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: path.resolve(__dirname, 'src'),
                },
            ],
        },
        // css: {
        //     // 指定传递给 CSS 预处理器的选项
        //     preprocessorOptions: {
        //         // 全局引入了 scss 的文件
        //         scss: {
        //             additionalData: `
        //         @import "@/styles/variables.scss";
        //         @import "@/styles/function.scss";
        //       `,
        //             javascriptEnabled: true,
        //         },
        //     },
        // },
        build: {
            target: [ 'es2020' ]
        },
        optimizeDeps: {
            esbuildOptions: {
                target: 'es2020'
            }
        }
    };
});
