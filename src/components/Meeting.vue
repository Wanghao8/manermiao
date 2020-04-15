<template>
  <div id="meeting">
    <van-nav-bar title="会议信息" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
  <van-tab title="待开会议">内容 1</van-tab>
  <van-tab title="历史记录">内容 2</van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        active: 2,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  },
  components: {}
};
</script>

<style  scoped>
#meeting {
  background-color: #E4E4E6;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
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
</style>
