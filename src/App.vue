<template>
  <div id="app">
    <router-view />

    <div
      class="tabbar"
      v-show="$route.meta.navShow"
      :class="$route.meta.navShow ? 'container-bot' : ''"
    >
      <van-tabbar active-color="#B01585" inactive-color="#666" route>
        <van-tabbar-item replace to="/home">
          <span>商品首页</span>
          <template #icon="props">
            <img :src="props.active ? 'static/image/home-act.png' : 'static/image/home.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/sort">
          <span>商品列表</span>
          <template #icon="props">
            <img :src="props.active ? 'static/image/sort-act.png' : 'static/image/sort.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/cart">
          <span>购物车</span>
          <template #icon="props">
            <img :src="props.active ? 'static/image/cart-act.png' : 'static/image/cart.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine">
          <span>个人中心</span>
          <template #icon="props">
            <img :src="props.active ? 'static/image/mine-act.png' : 'static/image/mine.png'" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped>
img {
  width: 20px;
  height: 20px;
}
</style>
