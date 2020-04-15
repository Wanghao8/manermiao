<template>
  <div id="sellCenter">
    <van-nav-bar
      title="分销中心"
      right-text="编辑"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="top-info-box">
      <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1351835355,520411539&fm=26&gp=0.jpg" alt class="user-avatar" />
      <div class="user-info-box">
        <div class="username">安琪拉</div>
        <div class="level">等级：</div>
      </div>
    </div>
    <div class="order-card-box">
      <div class="order" @click="toMyorder">
        <img src="../../static/image/dingdan.png" class="order-icon"/>
        <div class="order-txt">我的订单</div>
      </div>
      <div class="myteam" @click="toMyteam">
        <img src="../../static/image/team.png" class="myteam-icon"/>
        <div class="myteam-txt">我的团队</div>
      </div>
      <div class="withdraw" @click="toWithdraw">
        <img src="../../static/image/money.png" class="withdraw-icon"/>
        <div class="withdraw-txt">佣金提现</div>
      </div>
    </div>
    <div class="number-box fz16">
      <div class="total-num fz16">累计佣金：￥5000.00</div>
      <div class="last-withdraw">
        <div class="last-withdraw-left fz16">可提现余额：<span class="pink">￥2000.00</span></div>
        <div class="last-withdraw-right">
          <div class="last-withdraw-right-txt pink fz16">提现</div>
          <div class="last-withdraw-right-icon iconfont">&#xe605;</div>
        </div>
      </div>
    </div>
<div class="grid-box">
    <van-grid :border="false" :column-num="3">
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe61c;</div>
    <div class="grid-txt">升级时间</div>
  </van-grid-item>
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe63c;</div>
    <div class="grid-txt">升级规则</div>
  </van-grid-item>
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe627;</div>
    <div class="grid-txt">分销商升级</div>
  </van-grid-item>
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe629;</div>
    <div class="grid-txt">推荐人</div>
  </van-grid-item>
  <van-grid-item @click="toQR">
    <div class="grid-icon iconfont pink">&#xe651;</div>
    <div class="grid-txt">我的二维码</div>
  </van-grid-item>
  <van-grid-item>
    <!-- <div class="grid-icon iconfont pink">&#xe627;</div>
    <div class="grid-txt">推荐人</div> -->
  </van-grid-item>
 
</van-grid>
</div>
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
    onClickRight() {
      this.$router.push('');
    },
    toMyorder(){
      this.$router.push('')
    },
    toMyteam(){
      this.$router.push('')
    },
    toWithdraw(){
      this.$router.push('')
    },
    toQR(){
      this.$router.push('spreadQRcode')
    }
  }
};
</script>

<style scoped>
.pink{color: #FF49BD;}
.fz16{font-size: 16px;}
#sellCenter {
  background-color: #e4e4e4;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.van-nav-bar {width: 100% !important;background-color: #FF48BD;}
.van-nav-bar >>> .van-icon {color: #fff !important;}
.van-nav-bar >>> .van-nav-bar__title{color: #fff;font-size: 16px;}
.van-nav-bar >>> .van-nav-bar__text{font-size: 13px;color: #fff;}
.top-info-box{height: 154px;background-color: #FE4CBE;padding:0 20px;display: flex;align-items: center;}
.user-avatar{width: 70px;height: 70px;border-radius: 50%;}
.user-info-box{margin-left: 12px;}
.username{color: #fff;font-size: 18px;margin-bottom: 11px;}
.level{color: #fff;font-size: 15px;}
.order-card-box{margin: -25px 3% 12px 3%;display: flex;justify-content: space-around;align-items: center;background-color: #fff;padding: 15px;border-radius: 5px;box-shadow: #ddd 0px 0px 4px;}
.order-icon,.myteam-icon,.withdraw-icon{width: 40px;height: 40px;margin-bottom: 8px;}
.order,.myteam,.withdraw{display: flex;flex-direction: column;align-items: center;}
.number-box{margin: 0 3% 18px 3%;box-shadow: #ddd 0px 0px 4px;border-radius: 5px;background-color: #fff;}
.total-num{border-bottom: 1px solid #F0F0F0;padding: 20px 10px;}
.last-withdraw{padding: 20px 10px;display: flex;justify-content: space-between;}
.last-withdraw-right{display: flex;align-items: center;}
.last-withdraw-right-txt{margin-right: 12px;}
#sellCenter >>> .grid-box{margin: 0 3%;}
.grid-box>>>.van-grid{border-radius: 5px;}
.grid-txt{font-size: 14px;margin-top: 7px;}
.grid-icon{font-size: 24px;border-radius: 5px;}
</style>