export type ComponentScheme = {
    name: string;
};
// 每个组件数据大概是这样
// {
//     component: 'v-text', // 组件名称，需要提前注册到 Vue
//     label: '文字', // 左侧组件列表中显示的名字
//     propValue: '文字', // 组件所使用的值
//     platform: 'h5', // 组件适用场景 h5还是web端
//     icon: 'el-icon-edit', // 左侧组件列表中显示的名字
//     thumbnail: 'https://xxxx.png', // 左侧组件列表中显示的缩略图
//     animations: [], // 动画列表
//     events: {}, // 事件列表
//     style: { // 组件样式
//         width: 200,
//         height: 33,
//         fontSize: 14,
//         fontWeight: 500,
//         lineHeight: '',
//         letterSpacing: 0,
//         textAlign: '',
//         color: '',
//     },
// }