import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Sort from '../components/Sort.vue'
import Mine from '../components/Mine.vue'
import Cart from '../components/Cart.vue'
import Content from '../components/Content.vue'

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
      component: Home
    },
    {
      path: '/sort',
      name: 'sort',
      component: Sort,
      children:[{
        path:'content',
        name:'content',
        component:Content
      }]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    


  ]
})
