<template>
  <div id="sort">
    <!-- <div class="topNav">
      <div class="leftIcon" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <van-search
        class="search"
        :value="searchContent"
        shape="round"
        background="#FF49BD"
        placeholder="搜索您想要的商品"
        use-action-slot
        left-icon="none"
        right-icon="search"
        bind:change="onChange"
        bind:search="onSearch"
      ></van-search>
      <div class="rightIcon" @click="navigate">
        <div class="iconfont">&#xe623;</div>
      </div>
    </div>-->
    <van-nav-bar title="商品列表" />

    <div class="top-tab">
      <van-tabs @click="onClick" color="#ff49bd">
        <van-tab v-for="index in taocan" :title="index" :key="index">
          <detail ref="detail" :packageIndex="packageIndex"></detail>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import detail from "../components/Content.vue";
export default {
  data() {
    return {
      searchContent: "",
      packageIndex:0,
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
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    navigate() {
      console.log(123);
      this.$router.replace({ path: "/list"});
    },
    gotoDetail() {
      console.log("123detail");
      this.$router.replace({ path: "/detail" });
    },
    onClick(name, title) {
      this.$toast(title);
      console.log(name, title);
      this.packageIndex = name;
      // this.$refs.detail[name].jiekou();
      
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
  /* line-height: 40px; */
}
</style>