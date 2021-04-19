import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import _ from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype._ = _
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   // next()
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user')
//   }
  
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   console.log(user)
//   console.log(to.path)
//   if (!user && to.path != '/login') {
//   // if (!user) {
//     next({ path: '/login' })
//   } else {
//     if (to.name != 'login') {
//       var params={}
//       params.name = to.name
//       params.path = to.path
//       store.commit('ADD_TAG', params)
//       // console.log(111)
//     }
//     next()
//   }
// })

// router.afterEach(transition => {
//   NProgress.done();
// });