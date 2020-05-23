<template>
  <div id="confirmOrder">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <div class="add-box flexrbc">
      <div class="add-left">
        <div class="add-left-name-tel flexr0c">
          <div class="add-username col3 bold">{{addrInfo.userName?addrInfo.userName:'请先选择地址'}}</div>
          <div class="add-tel col6">{{addrInfo.userPhone}}</div>
        </div>
        <div class="add-item col9 fz14">{{addrInfo.areaIdPath}}{{addrInfo.userAddress}}</div>
      </div>
      <!-- <div class="add-right iconfont">&#xe605;</div> -->
    </div>

    <div class="goods-box">
      <div class="user flexr0c">
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
          alt
          class="avatar"
        />
        <div class="username bold">妙而曼</div>
      </div>
      <div class="goods-info-box flexr0s" v-for="item in goodslist" :key="item.id">
        <img :src="item.goodsImg" alt class="goodsImg" />
        <div class="goods-info-content">
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="type-price-num flexrbc">
            <div class="type-price-num-left fz14 col9">规格： xxxx</div>
            <div class="type-price-num-right flexr0c">
              <div class="price fz14 col3">￥{{item.goodsPrice}}</div>
              <div class="num fz12 col9">X {{item.goodsNum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="deliver-pay">
      <!-- <div class="deliver flexrbc">
        <div class="deliver-title col3 bold fz14">配送方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">快递配送</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>-->
      <!-- <div class="deliver flexrbc" @click="deliver(1)"> -->
      <div class="deliver flexrbc">
        <div class="deliver-title col3 bold fz14">支付方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">{{payType}}</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>
    </div>

    <div class="order-info-box col9 fz13">
      <div class="order-id-box flexrbc">
        <div class="order-id">订单编号：{{order.orderNo}}</div>
        <div class="copy-btn bold" @click="copy">复制</div>
      </div>
      <div class="creattime">创建时间：{{time}}</div>
    </div>

    <div class="pay-btn" @click="pay">支付</div>
    <van-action-sheet v-model="showPay" :actions="actions" @select="onSelectPay" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      addrInfo: {},
      goods: {},
      orderInfo: {},
      goodslist: [],
      order: {},
      showPay: false,
      actions: [],
      payType: "线上支付",
      time: "2020-05-12 12:54:24"
    };
  },
  created() {
    this.orderInfo = this.$route.params.info;
  },
  mounted() {
    this.getAddr();
    this.getDetail();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    deliver(type) {
      if (type == 0) {
        // this.actions = this.express;
        this.show = true;
      } else {
        this.actions = [{ name: "线下支付" }, { name: "线上支付" }];
        this.showPay = true;
      }
    },

    onSelectPay(item) {
      this.showPay = false;
      this.payType = item.name;
    },
    gotoAdd() {
      this.$router.push({
        name: "myAddress",
        params: { from: "confirmOrder" }
      });
    },
    getAddr() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      var addrId = JSON.parse(window.localStorage.getItem("userinfo")).addrId;
      _self
        .$axios({
          method: "post",
          url: "/api/order/address",
          params: {
            token: token,
            addrId: addrId
          }
        })
        .then(function(response) {
          _self.addrInfo = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDetail() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/orderdetail",
          params: {
            token: token,
            orderId: _self.orderInfo.id,
            orderGoodsId: _self.orderInfo.orderId
          }
        })
        .then(function(res) {
          var time = new Date(res.data.data.createTime * 1000);
          var dateTime =
            time.getFullYear() +
            "." +
            (time.getMonth() + 1 + "").padStart(2, "0") +
            "." +
            (time.getDate() + "").padStart(2, "0") +
            " " +
            (time.getHours() + "").padStart(2, "0") +
            ":" +
            (time.getMinutes() + "").padStart(2, "0") +
            ":" +
            (time.getSeconds() + "").padStart(2, "0");
          _self.time = dateTime;
          _self.order = res.data.data;
          _self.goodslist = res.data.data.ordergoods;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    copy() {},
    pay() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/pay/orderpay",
          params: {
            token: token,
            order_id: _self.order.id
          }
        })
        .then(function(res) {
          var params = res.data.data;
          console.log(params, "canshu");

          window.WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: params.appId, // 公众号名称，由商户传入
              timeStamp: params.timeStamp, // 时间戳，自1970年以来的秒数
              nonceStr: params.nonceStr, // 随机串
              package: params.package,
              signType: params.signType, // 微信签名方式：
              paySign: params.paySign // 微信签名
            },
            function(res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                _self.$router.push({ name: "mine" });
              } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                _self.$toast("支付失败");
              }
            }
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#confirmOrder {
  background-color: #e4e4e4;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.van-nav-bar {
  width: 100% !important;
  background-color: #ff48bd;
  position: fixed;
  top: 0;
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
.van-nav-bar[data-v-dea0f472] {
  top: 0;
}
.add-box {
  background-color: #fff;
  margin-top: 46px;
  height: 70px;
  padding: 0 13px;
  overflow: hidden;
}
.add-item {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.add-left-name-tel {
  margin-bottom: 16px;
}
.add-username {
  margin-right: 24px;
}
.goods-box {
  margin-top: 2px;
  background-color: #fff;
}
.avatar {
  width: 25px;
  height: 25px;
  margin: 7px 14px;
}
.goodsImg {
  width: 100px;
  height: 100px;
  margin: 0 14px 10px 14px;
}
/* .goods-info-content{
} */
.goods-name {
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap; */
  width: 220px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
}
.num {
  margin-left: 15px;
}
.deliver-pay {
  padding: 0 14px;
  background-color: #fff;
  margin-top: 2px;
}
.deliver {
  line-height: 30px;
  border-bottom: 1px solid #f5f5f5;
}
.deliver:last-child {
  border-bottom: none;
}
.right-row {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}
.order-info-box {
  padding: 4px 14px;
  background-color: #fff;
  margin-top: 2px;
}
.order-info-box > div {
  line-height: 30px;
}
.copy-btn {
  width: 48px;
  height: 20px;
  background-color: #e9e9e9;
  color: #333;
  text-align: center;
  border-radius: 2px;
  line-height: 20px;
}
.pay-btn {
  background-color: #ff48bd;
  color: #fff;
  text-align: center;
  line-height: 40px;
  width: 90%;
  margin: 20px 5% 0 5%;
  border-radius: 6px;
}
</style>