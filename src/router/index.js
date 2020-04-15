import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Sort from '../components/Sort.vue'
import Mine from '../components/Mine.vue'
import Cart from '../components/Cart.vue'
import Content from '../components/Content.vue'
import SellCenter from '../components/SellCenter.vue'
import RechargeRecord from '../components/RechargeRecord.vue'
import MyAddress from '../components/MyAddress.vue'
import BuyRecord from '../components/BuyRecord.vue'
import EditAddress from '../components/EditAddress.vue'
import MyOrder from '../components/MyOrder.vue'
import SpreadQRcode from '../components/SpreadQRcode.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home, meta: { navShow: true, }
    },
    {
      path: '/sort',
      name: 'sort',
      component: Sort, meta: { navShow: true, },
      children:[{
        path:'content',
        name:'content',
        component:Content
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart, meta: { navShow: true, }
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine, meta: { navShow: true, }
    },
    {
      path: '/sellCenter',
      name: 'sellCenter',
      component: SellCenter
    },
    {
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      component: RechargeRecord
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: MyAddress
    },
    {
      path: '/buyRecord',
      name: 'buyRecord',
      component: BuyRecord
    },
    {
      path: '/editAddress',
      name: 'editAddress',
      component: EditAddress
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: MyOrder
    },
    {
      path: '/spreadQRcode',
      name: 'spreadQRcode',
      component: SpreadQRcode
    },
    


  ]
})
