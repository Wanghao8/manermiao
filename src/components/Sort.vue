<template>
  <div id="sort">

    <van-nav-bar title="商品列表" />

    <div class="top-tab">
      <detail ref="detail" :packageIndex="packageIndex"></detail>
    </div>
  </div>
</template>
<script>
import detail from "../components/Content.vue";
export default {
  data() {
    return {
      timeout: null,
      searchContent: "",
      packageIndex: 0,
      taocan: [
        "套餐一",
        "套餐二",
        "套餐三",
        "套餐四",
        "套餐五",
        "套餐六",
        "其他"
      ]
    };
  },
  created() {},
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    navigate() {
      this.$router.replace({ path: "/list" });
    },
    gotoDetail() {
      this.$router.replace({ path: "/detail" });
    },
    onClick(name, title) {
      var _self = this;
      this.$toast(title);
      this.packageIndex = name;
      this.timeout = null;
      this.timeout = setTimeout(function() {
        _self.$refs.detail[name].jiekou();
      }, 200);
    },
    goback() {
      this.$router.back(-1);
    }
  },
  components: {
    detail
  }
};
</script>

<style scoped>
.van-nav-bar {
  width: 100% !important;
  background-color: #ff48bd;
}
.van-nav-bar >>> .van-icon {
  color: #fff !important;
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #fff;
  font-size: 16px;
}
.van-nav-bar >>> .van-nav-bar__text {
  font-size: 13px;
  color: #fff;
}
.van-nav-bar {
  width: 100% !important;
  background-color: #ff48bd;
}
.van-nav-bar >>> .van-icon {
  color: #fff !important;
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #fff;
  font-size: 16px;
}
.van-nav-bar >>> .van-nav-bar__text {
  font-size: 13px;
  color: #fff;
}
.van-tabs >>> .van-tab {
  width: 62px;
  padding: 0;
  flex-basis: 20% !important;
}
.van-tabs >>> .van-tabs__wrap--scrollable .van-tab {
  flex: 0 0 20%;
}
.topNav {
  width: 100%;
  height: 44px;
  display: flex;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #ff49bd;
}
.leftIcon,
.rightIcon {
  background-color: #ff49bd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: #eee;
  flex-shrink: 0;
}
.botword {
  font-size: 12px;
}
.van-search {
  flex-grow: 1;
}
.van-search__content {
  height: 120%;
  padding: 0;
  background-color: #fec4ea;
}
.van-cell {
  font-size: 10px;
}
.van-field__control {
  color: #fff;
}
.van-tab__text {
  font-size: 12px;
}
.top-tab {
  position: relative;
  top: 0px;
}
</style>