<template>
  <div id="spreadQRcode">
    <van-nav-bar title="我的推广码" left-arrow @click-left="onClickLeft" />
    <div class="top-background"></div>
    <div class="QR-box">
        <img src="../../static/image/QR-border.png" alt="" class="QR-border">
        <img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=376029017,2622921745&fm=26&gp=0.jpg" alt="" class="QRcode">
    </div>
    <div class="look-myQR bold" @click="saveQR">保存我的推广码</div>
    <div class="look-myteam bold" @click="lookTeam">查看我的团队</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
      onClickLeft() {
      this.$router.back(-1);
    },
    saveQR(){
        this.$toast('保存推广码')
    },
    lookTeam(){
        this.$toast('查看我的团队')
    }
  }
};
</script>

<style scoped>
.fz19{font-size: 19px;}
.bold{font-weight: bold;}
#spreadQRcode {
  background-color: #F8F6F9;
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
.top-background{background-color: #ff48bd;height: 150px;}
.QR-box{width: 350px;height: 350px;position: absolute;left: 50%;top: 60px;margin-left: -175px;background-color: #fff;}
.QR-border{position: absolute;top: 50%;left: 50%;margin: -113px;width: 220px;height: 220px;}
.QRcode{width: 165px;height: 165px;position: absolute;top: 50%;left: 50%;margin: -25%;}
.look-myQR,.look-myteam{width: 312px;height: 45px;line-height: 45px;border: 1px solid #ff48bd;border-radius: 31px;margin-left: 40px;}
.look-myQR{background-color: #ff48bd;color: #fff;text-align: center; position: absolute; top: 440px;}
.look-myteam{color: #ff48bd; position: absolute; top: 500px;text-align: center;}
</style>