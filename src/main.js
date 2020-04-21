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
import { Lazyload,Toast,RadioGroup, Radio } from 'vant';


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

//  setHtmlFontSize();
 
//  function setHtmlFontSize() {
//  // 1. 获取当前屏幕的宽度
//  var windowWidth = document.documentElement.offsetWidth;
//  // console.log(windowWidth);
//  // 2. 定义标准屏幕宽度 假设375
//  var standardWidth = 375;
//  // 3. 定义标准屏幕的根元素字体大小 假设100px 1rem=100px 10px = 0.1rem 1px 0.01rem
//  var standardFontSize = 100;
//  // 4. 计算当前屏幕对应的根元素字体大小
//  var nowFontSize = windowWidth / standardWidth * standardFontSize + 'px';
//  // console.log(nowFontSize);
//  // 5. 把当前计算的根元素的字体大小设置到html上
//  document.querySelector('html').style.fontSize = nowFontSize;
//  }
//  // 6. 添加一个屏幕宽度变化的事件 屏幕变化就触发变化根元素字体大小计算的js 
//  window.addEventListener('resize', setHtmlFontSize)