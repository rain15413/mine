// import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Mine from './views/Mine.vue'
import Form from './views/nav1/Form.vue'
import Table from './views/nav1/Table.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "group-foo" */'./views/Login.vue'),
        // component: Login,
        name: 'login',
        hide: true  //自定义属性，用于判断是否在侧边栏显示、隐藏
    },
    // {
    //     path: '/',
    //     redirect: '/login',
    //     hide: true
    // },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hide: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'fa fa-id-card',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hide: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'nav3',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '我的',
        iconCls: 'fa fa-bar-chart',
        leaf: true,//只有一个节点
        children: [
            { path: '/Mine', component: Mine, name: 'Mine' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hide: true,
        redirect: { path: '/404' }
    }
];

export default routes;