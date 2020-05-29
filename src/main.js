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
import VueJsonp from 'vue-jsonp'
import AMapLoader from '@amap/amap-jsapi-loader';


Vue.use(Vant).use(Lazyload).use(Toast).use(RadioGroup).use(Radio)
Vue.prototype.$axios = Axios
Vue.prototype.$common = Common
Vue.prototype.wx = wx
Vue.config.productionTip = false
Vue.use(VueJsonp)

// Axios.defaults.baseURL = 'http://miao.ayunu.net';
Axios.defaults.baseURL = 'https://www.hnkmx.com';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

AMapLoader.load({
  "key": "3f8af947f3de0c8bb9f6c5f19f5b2760",   // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": ['AMap.Geocoder']  //插件列表
}).then((AMap) => {
  map = new AMap.Map('container', {
    resizeEnable: true
  });
}).catch(e => {
  console.log(e);
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  var token = window.localStorage.getItem("userinfo")
  // 未登录状态；当路由到 nextRoute 指定页时，跳转至 UserLogIn
  if (token) {
    next();
  } else {
    next("/registered");
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})