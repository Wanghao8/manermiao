<template>
  <div id></div>
</template>
<script>
import { wxApi } from "../assets/js/wxApi.js";
export default {
  beforeRouteEnter(to, from, next) {
    var _self = this;
    var token = window.localStorage.getItem("userinfo")
    if (token) {
      next("/home");
    } else {
      next("/registered");
    }
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      // console.log(vm); //当前组件的实例
    });
  },
  data() {
    return {};
  },
  created() {
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>