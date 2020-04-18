// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import Axios from 'axios'
import 'vant/lib/index.css';
import './assets/common.css';
import '../static/iconfont.css';
import { Lazyload,Toast,RadioGroup, Radio } from 'vant';


Vue.use(Vant).use(Lazyload).use(Toast).use(RadioGroup).use(Radio)
Vue.prototype.$axios = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
