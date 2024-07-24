import { defineStore } from 'pinia';
import type { ComponentScheme } from '@/types/component';
import { deepCopy } from '@/utils';

export const useEditStore = defineStore('editStore', {
    state: () => ({
        allComponentList: [
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },


            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },

            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },

            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
            {
                icon: "material-symbols-light:10mp",
                name: '按钮',
                iconStyle: {
                    width: '24',
                    height: '24',
                    color: '#fff'
                }
            },
            {
                name: '图片',
                img: 'https://cnc-nerve.17zuoye.cn/17xue-nerve/disk/test/ceee.jpg',
            },
        ], // 收录的组件，这些组件在使用之前必须要先在全局注册
        showLeft: false,
        editor: null as null | HTMLElement,
        usingComponents: [] as ComponentScheme[],
        lastScale: 100, // 记录快照上次的缩放比例，用于判断是否需要更新快照
        snapshotData: [] as Array<ComponentScheme[]>,
        snapshotIndex: -1,
        isClickComponent: false,
        isInEdiotr: false,
    }),
    getters: {
        
    },
    actions: {
        addComponent(params: {component: any, index?: number}) {
            if (params.index !== undefined) {
                this.usingComponents.splice(params.index, 0, params.component)
            } else {
                this.usingComponents.push(params.component)
            }
        },
        // 添加新的快照
        recordSnapshot() {
            let copyData = deepCopy(this.usingComponents)
            copyData.forEach((v: ComponentScheme) => v.lastScale = this.lastScale)
            this.snapshotData[++this.snapshotIndex] = copyData
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (this.snapshotIndex < this.snapshotData.length - 1) {
                this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
            }
        },
        setClickComponentStatus(isClickComponent: boolean) {
            this.isClickComponent = isClickComponent;
        },
        setInEditorStatus(isInEdiotr: boolean) {
            this.isInEdiotr = isInEdiotr;
        },
    },
    // 稍后将由插件读取
    debounce: {
       
    },
});
