import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
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
import UpgradeRule from '../components/UpgradeRule.vue'
import SignupCenter from '../components/SignupCenter.vue'
import Meeting from '../components/Meeting.vue'
import MyTeam from '../components/MyTeam.vue'
import Registered from '../components/Registered.vue'
import Pay from '../components/Pay.vue'
import Withdraw from '../components/Withdraw.vue'
import GoodsDetail from '../components/GoodsDetail.vue'
import OrderDetail from '../components/OrderDetail.vue'
import ConfirmOrder from '../components/ConfirmOrder.vue'
import Refund from '../components/Refund.vue'
import RefundDetail from '../components/RefundDetail.vue'
import RequestRefund from '../components/RequestRefund.vue'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      // redirect: '/home',
      component: Index, meta: { requiresAuth: true }
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
      children: [{
        path: 'content',
        name: 'content',
        component: Content
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
      component: MyAddress,
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
    {
      path: '/upgradeRule',
      name: 'upgradeRule',
      component: UpgradeRule
    },
    {
      path: '/signupCenter',
      name: 'signupCenter',
      component: SignupCenter
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: Meeting
    },
    {
      path: '/myTeam',
      name: 'myTeam',
      component: MyTeam
    },
    {
      path: '/registered',
      name: 'registered',
      component: Registered
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: GoodsDetail,
      meta: {
        keepAlive: true 
      },
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/refund',
      name: 'refund',
      component: Refund
    },
    {
      path: '/refundDetail',
      name: 'refundDetail',
      component: RefundDetail
    },
    {
      path: '/requestRefund',
      name: 'requestRefund',
      component: RequestRefund
    },
   
  ]
})
