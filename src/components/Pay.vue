<template>
  <div id="registered">
    <van-nav-bar title="在线支付" left-arrow @click-left="onClickLeft" />
    <div class="pay-box">
        <div class="title fz15">支付二维码</div>
        <div class="sub-title fz15">在线扫码支付</div>
        <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=376029017,2622921745&fm=26&gp=0.jpg" alt="" class="QRcode">
        <div class="saveImg fz15 pink" @click="save">保存至相册</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted(){},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    save(){
        this.$toast("保存到相册")
    }
  }
};
</script>

<style scoped>
.fz15{font-size: 15px;}
.pink{color: #FF49BD;}
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
.pay-box{display: flex;flex-direction: column;align-items: center;}
.QRcode{width: 180px;height: 180px;margin: 12px 0 40px 0;}
.title{margin: 30px 0 4px 0;}
</style>