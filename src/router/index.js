// import Login from './views/Login.vue'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from '../views/404.vue'
import Main from '../views/Main.vue'
// import Home from '../views/Home.vue'
// import Mine from '../views/Mine.vue'
// import Form from '../views/nav1/Form.vue'
// import Table from '../views/nav1/Table.vue'
// import user from '../views/nav1/user.vue'
// import Page4 from '../views/nav2/Page4.vue'
// import Page5 from '../views/nav2/Page5.vue'
// import Page6 from '../views/nav3/Page6.vue'
// import echarts from '../views/charts/echarts.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Login'),
            // component: Login,
            name: 'login',
            hide: true  //自定义属性，用于判断是否在侧边栏显示、隐藏
        },
        {
            path: '/nav1',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: '导航一',
            iconCls: 'fa fa-id-card',//图标样式class
            children: [
                { path: '/main', component: Main, name: '主页', hide: true },
                { 
                    path: '/table', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav1/Table'), 
                    name: 'Table' 
                },
                { 
                    path: '/form', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav1/Form'),
                    name: 'Form' 
                },
                { 
                    path: '/user', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav1/user'), 
                    name: '列表' 
                },
            ]
        },
        {
            path: '/nav2',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: '导航二',
            iconCls: 'fa fa-id-card-o',
            children: [
                { 
                    path: '/page4', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav2/Page4'), 
                    name: '页面4' 
                },
                { 
                    path: '/page5', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav2/Page5'), 
                    name: '页面5' 
                }
            ]
        },
        {
            path: '/nav3',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: '导航三',
            iconCls: 'fa fa-address-card',
            children: [
                { 
                    path: '/page6', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav3/Page6'), 
                    name: '页面6' 
                },
                { 
                    path: '/page7', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/nav3/Page7'), 
                    name: '页面7' 
                }
            ]
        },
        {
            path: '/mine',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: '我的',
            iconCls: 'fa fa-meh-o',
            leaf: true,//只有一个节点
            children: [
                { 
                    path: '/Mine', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/Mine'),
                    name: 'Mine' 
                }
            ]
        },
        {
            path: '/test',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: '测试页',
            iconCls: 'fa fa-bath',
            leaf: true,//只有一个节点
            children: [
                { 
                    path: '/test', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/Test'),
                    name: 'Test' 
                }
            ]
        },
        {
            path: '/charts',
            component: () => import(/* webpackChunkName: "group-foo" */'../views/Home'),
            name: 'Charts',
            iconCls: 'fa fa-bar-chart',
            children: [
                { 
                    path: '/echarts', 
                    component: () => import(/* webpackChunkName: "group-foo" */'../views/charts/echarts'),
                    name: 'echarts' 
                }
            ]
        },
        {
            path: '/404',
            component: NotFound,
            name: '404',
            hide: true
        },
        // 页面不存在时重定向到404
        {
            path: '*',
            hide: true,
            redirect: { path: '/404' } 
        }
    ]
})

router.beforeEach((to, from, next) => {
    // console.log(111)
    NProgress.start();
    // next()
    if (to.path == '/login') {
        // console.log(222)
        sessionStorage.removeItem('user')
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        // console.log(333)
        next({ path: '/login' })
        NProgress.done() // 不加会一直有滚动条在加载
    } else {
        // console.log(444)
        if (to.name != 'login') {
            var params={}
            params.name = to.name
            params.path = to.path
            store.commit('ADD_TAG', params)
            // console.log(111)
        }
        next()
    }
})
  
router.afterEach(transition => {
    NProgress.done();
});

export default router