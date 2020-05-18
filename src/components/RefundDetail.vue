<template>
  <div id="refundDetail">
    <van-nav-bar title="退款详情" left-arrow @click-left="onClickLeft" />
    <div class="top-box">
      <div class="status-time-box">
        <div class="fz16 status-msg">请等待处理</div>
        <div class="time fz14">还剩2天12时59分</div>
      </div>
      <div class="status fz14">您已成功发起退款申请，请耐心等待商家处理。</div>
      <div class="flexrec btn-box">
        <div class="cancel-btn fz12" @click="cancel">撤销申请</div>
        <div class="edit-btn fz12" @click="edit">修改申请</div>
      </div>
    </div>
    <div class="refund-goods-box">
      <div class="refund-title bold">退款信息</div>
      <div class="goods-info flexr">
        <img :src="goodsinfo.img" class="goodsImg" alt />
        <div class="goods-name-desc">
          <div class="goods-name bold">{{goodsinfo.name}}</div>
          <div class="goods-desc">{{goodsinfo.desc}}</div>
        </div>
      </div>
      <div class="refund-reason flexr0c">
        <div class="label">退款原因：</div>
        <div class="refund-reason-item">{{goodsinfo.reason}}</div>
      </div>
      <div class="refund-money flexr0c">
        <div class="label">退款金额：</div>
        <div class="refund-money-item">￥{{goodsinfo.money}}</div>
      </div>
      <div class="refund-time flexr0c">
        <div class="label">申请时间：</div>
        <div class="refund-time-item">{{time}}</div>
      </div>
      <div class="refund-orderId flexr0c">
        <div class="label">退款编号：</div>
        <div class="refund-id-item">{{goodsinfo.orderId}}</div>
      </div>
    </div>
    <div class="bottom-btn" @click="toHome">返回首页</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsinfo: {},
      time: ""
    };
  },
  created() {
    this.goodsinfo = this.$route.params.goods;
    var time = new Date(Date.parse(this.goodsinfo.requestTime));
    var dateTime =
      time.getFullYear() +
      "." +
      (time.getMonth() + 1 + "").padStart(2, "0") +
      "." +
      (time.getDate() + "").padStart(2, "0") +
      " " +
      (time.getHours() + "").padStart(2, "0") +
      ":" +
      (time.getMinutes() + "").padStart(2, "0");
    this.time = dateTime;
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    toHome() {
      this.$router.push({ name: "home" });
    },
    cancel() {
      this.$toast("点击取消");
    },
    edit() {
      this.$toast("点击修改");
    }
  }
};
</script>

<style scoped>
#refundDetail {
  background-color: #e4e4e4;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow-x: hidden;
  top: 0px;
  bottom: 0px;
}
.van-nav-bar {
  width: 100% !important;
  background-color: #fff;
  position: fixed;
}
[class*="van-hairline"]::after {
  border: none;
}
.van-nav-bar >>> .van-icon {
  color: #000 !important;
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #000;
  font-size: 16px;
}
.van-nav-bar >>> .van-nav-bar__text {
  font-size: 13px;
  color: #000;
}
.top-box {
  margin-top: 46px;
}
.status,
.btn-box {
  line-height: 40px;
  height: 40px;
  background-color: #fff;
}
.status {
  padding-left: 10px;
  border-bottom: 1px solid #f4f4f4;
}
.status-time-box {
  padding: 25px;
  background-color: #ff48bd;
  color: #fff;
}
.btn-box {
  text-align: right;
}
.btn-box > div {
  height: 20px;
  line-height: 20px;
  padding: 2px 10px;
  border-radius: 2px;
}
.cancel-btn {
  margin-right: 6px;
  border: 1px solid #000;
}
.edit-btn {
  margin-right: 10px;
  border: 1px solid #ff48bd;
  color: #ff48bd;
}
.refund-goods-box {
  background-color: #fff;
  margin-top: 10px;
}
.goodsImg {
  width: 90px;
  height: 90px;
  margin-right: 20px;
}
/* .refund-goods-box > div {
  margin-left: 20px;
} */
.goods-info {
  padding: 20px;
  background-color: #e4e4e4;
}
.goods-name {
  margin-bottom: 6px;
}
.refund-title,
.refund-reason,
.refund-money,
.refund-time,
.refund-orderId {
  line-height: 30px;
  margin-left: 20px;
}
.bottom-btn {
  border-radius: 4px;
  border: 1px solid #ff48bd;
  color: #ff48bd;
  width: 30%;
  padding: 8px 6px;
  font-size: 20px;
  text-align: center;
  position: relative;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>