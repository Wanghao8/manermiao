<template>
  <div id="mine">
    <div class="top">
      <div class="top-box">
        <img class="back-img" src="../../static/image/mine-back.png" alt />
        <van-nav-bar
          title="个人中心"
          right-text="编辑"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <div class="top-nav"></div>
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
          alt
          class="top-avatar"
        />
      </div>
      <div class="mylist">
        <div class="mylist-username">安琪拉</div>
        <van-progress color="#FF49BD" :percentage="progressRat" />
        <div class="mylist-exp-level">
          <div class="exp">经验：12345</div>
          <div class="level">等级2/5</div>
        </div>
        <div class="mylist-list">
          <div class="mylist-list-left">
            <div class="mylist-list-left-icon iconfont col6">&#xe62e;</div>
            <div class="mylist-list-left-title col3">我的订单</div>
          </div>
          <div class="mylist-list-right">
            <div class="mylist-list-right-title">查看全部订单</div>
            <div class="mylist-list-right-icon iconfont col6">&#xe605;</div>
          </div>
        </div>
        <div class="mylist-icon-box">
          <div class="mylist-icon-pending-pay" @click="toMyOrder(0)">
            <div class="mylist-icon-pending-pay-icon iconfont">&#xe669;</div>
            <div class="mylist-icon-pending-pay-txt">待付款</div>
          </div>
          <div class="mylist-icon-pending-delivery" @click="toMyOrder(1)">
            <div class="mylist-icon-pending-delivery-icon iconfont">&#xe600;</div>
            <div class="mylist-icon-pending-delivery-txt">待发货</div>
          </div>
          <div class="mylist-icon-pending-received" @click="toMyOrder(2)">
            <div class="mylist-icon-pending-received-icon iconfont">&#xe63e;</div>
            <div class="mylist-icon-pending-received-txt">待收货</div>
          </div>
          <div class="mylist-icon-return" @click="toMyOrder(3)">
            <div class="mylist-icon-return-icon iconfont">&#xe607;</div>
            <div class="mylist-icon-return-txt">退换货</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-center-box">
      <div class="info-center-top">
        <div class="info-center-top-left">
          <div class="info-center-top-left-icon iconfont col6">&#xe662;</div>
          <div class="info-center-top-left-txt col3">信息中心</div>
        </div>
        <div class="info-center-top-right iconfont col6">&#xe605;</div>
      </div>
      <div class="info-center-icon-box">
        <div class="info-center-icon-center" @click="toSellCenter">
          <img src="../../static/image/fenxiao.png" class="info-center-icon-center-icon" />
          <div class="info-center-icon-center-txt">分销中心</div>
        </div>
        <div class="info-center-icon-pay-record" @click="toRechargeRecord">
          <img src="../../static/image/chongzhi.png" class="info-center-icon-pay-record-icon" />
          <div class="info-center-icon-pay-record-txt">充值记录</div>
        </div>
        <div class="info-center-icon-buy-record" @click="toBuyRecord">
          <img src="../../static/image/goumai.png" class="info-center-icon-buy-record-icon" />
          <div class="info-center-icon-buy-record-txt">购买记录</div>
        </div>
        <div class="info-center-icon-location" @click="toMyAddress">
          <img src="../../static/image/dizhi.png" class="info-center-icon-location-icon" />
          <div class="info-center-icon-location-txt">我的地址</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progressRat: 48
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$toast("返回");
    },
    onClickRight() {
      this.$toast("按钮");
    },
    toSellCenter() {
      this.$router.push("sellCenter");
    },
    toRechargeRecord() {
      this.$router.push("rechargeRecord");
    },
    toBuyRecord(){
      this.$router.push("buyRecord");
    },
    toMyAddress(){
      this.$router.push("myAddress");
    },
    toMyOrder(e){
      this.$router.push({name:"myOrder",params:{index:e}});
    }
  }
};
</script>

<style scoped>
.col3 {
  color: #333;
}
.col6 {
  color: #666;
}
#mine {
  background-color: #e4e4e4;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.top {
  background-color: #fff;
}
.back-img {
  width: 100%;
  height: 147px;
  position: absolute;
  top: 0;
  z-index: 0;
}
.top-box {
  height: 147px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.top-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  z-index: 1;
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
.mylist {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}
.mylist-username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.mylist-exp-level {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 10px;
}
.exp,
.level {
  font-size: 10px;
  color: #666;
}
.van-progress {
  width: 50%;
}
.van-progress__portion /deep/ .van-progress__pivot {
  visibility: hidden !important;
}
.mylist-list,
.mylist-list-left,
.mylist-list-right {
  display: flex;
  align-items: center;
}
.mylist-list {
  justify-content: space-between;
  width: 96%;
  padding: 12px;
}
.mylist-list-left-title {
  font-size: 14px;
  margin-left: 9px;
}
.mylist-list-right-title {
  font-size: 13px;
  margin-right: 9px;
  color: #888;
}
.mylist-icon-box {
  width: 94%;
  margin: 0 3%;
  display: flex;
  border-radius: 5px;
  justify-content: space-around;
  box-shadow: #ddd 0px 0px 10px;
  padding: 13px 0;
  margin-bottom: 15px;
}
.mylist-icon-pending-pay-icon,
.mylist-icon-pending-delivery-icon,
.mylist-icon-pending-received-icon,
.mylist-icon-return-icon {
  color: #e957b1;
  font-size: 25px;
}
.mylist-icon-pending-pay,
.mylist-icon-pending-delivery,
.mylist-icon-pending-received,
.mylist-icon-return {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mylist-icon-pending-pay-txt,
.mylist-icon-pending-delivery-txt,
.mylist-icon-pending-received-txt,
.mylist-icon-return-txt {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}
.info-center-box {
  background-color: #fff;
  margin-top: 12px;
}
.info-center-top {
  display: flex;
  align-items: center;
  padding: 15px 12px;
  border-bottom: 1px solid #e5e2e5;
  justify-content: space-between;
}
.info-center-top-left {
  display: flex;
  align-items: center;
}
.info-center-top-left-txt {
  font-size: 14px;
  margin-left: 9px;
}
.info-center-icon-center-icon,
.info-center-icon-buy-record-icon,
.info-center-icon-pay-record-icon,
.info-center-icon-location-icon {
  width: 25px;
  height: 25px;
  margin-bottom: 9px;
}
.info-center-icon-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
}
.info-center-icon-pay-record,
.info-center-icon-center,
.info-center-icon-buy-record,
.info-center-icon-location {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-center-icon-center-txt,
.info-center-icon-pay-record-txt,
.info-center-icon-buy-record-txt,
.info-center-icon-location-txt {
  font-size: 12px;
  color: #666;
}
</style>