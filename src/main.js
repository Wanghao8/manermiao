// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import Axios from 'axios'
import Common from './assets/js/common.js'
import 'vant/lib/index.css';
import './assets/css/common.css';
import '../static/iconfont.css';
import wx from 'weixin-js-sdk'
import { Lazyload, Toast, RadioGroup, Radio } from 'vant';


Vue.use(Vant).use(Lazyload).use(Toast).use(RadioGroup).use(Radio)
Vue.prototype.$axios = Axios
Vue.prototype.$common = Common
Vue.prototype.$wx = wx
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // 判断是否授权登录条件（待修改）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      next({
        path: '/registered',
      })
    } else {
      next(
        {
          path: '/home',
        }
      )
    }
  } else {
    next() // 确保一定要调用 next()
  }
})