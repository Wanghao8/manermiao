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
            <img :src="props.active ? icon.active1 : icon.inactive1" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/sort">
          <span>商品列表</span>
          <template #icon="props">
            <img :src="props.active ? icon.active2 : icon.inactive2" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/cart">
          <span>购物车</span>
          <template #icon="props">
            <img :src="props.active ? icon.active3 : icon.inactive3" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine">
          <span>个人中心</span>
          <template #icon="props">
            <img :src="props.active ? icon.active4 : icon.inactive4" />
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
      active: 0,
      icon: {
        active1: "static/image/home-act.png",
        inactive1: "static/image/home.png",
        active2: "static/image/sort-act.png",
        inactive2: "static/image/sort.png",
        active3: "static/image/cart-act.png",
        inactive3: "static/image/cart.png",
        active4: "static/image/mine-act.png",
        inactive4: "static/image/mine.png"
      }
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
