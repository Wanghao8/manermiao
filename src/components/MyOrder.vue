<template>
  <div id="myOrder">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-overlay :show="showOverlay" @click="showOverlay = false" />
    <div class="deliver-box" v-if="showOverlay">
      <div class="deliver-item" v-for="item in deliverMsg" :key="item.time">
        <div class="deliver-text">{{item.context}}</div>
        <div class="deliver-status">{{item.status}}</div>
        <div class="deliver-time" style="margin-top:10px;font-size:12px">{{item.time}}</div>
      </div>
    </div>
    <van-tabs v-model="orderStatus" sticky color="#ff48bd" @click="onClick">
      <van-tab title="全部" name="3">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您没有相关订单"
        />
        <div class="order-list-box" v-if="!empty">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderNo}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">{{item.status}}</div>
            </div>
            <div class="order-list-item-top-left fz11 col3" v-if="item.status=='待收货'">
              物流编号：
              <span class="col9">{{item.orderNo}}</span>
            </div>
            <div class="order-list-item-content" v-for="item1 in item.ordergoods" :key="item1.id">
              <img :src="item1.goodsImg" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item1.goodsName}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item1.goodsPrice}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item1.goodsNum}}</span>
                  </div>
                </div>
                <div
                  class="order-list-item-content-right-time col9 fz10"
                  v-if="item.status!='待发货'&&item.status!='待收货'"
                >订单时间：{{item.saveTime}}</div>
                <div class="flexrbc" v-if="item.status=='待发货'">
                  <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
                  <div
                    class="order-list-item-bottom-refund fz13"
                    @click="requestRefund('申请退款',item,item1)"
                  >申请退款</div>
                </div>
                <div class="flexrbc" v-if="item.status=='待收货'">
                  <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
                  <div
                    class="order-list-item-bottom-refund fz13"
                    @click="requestRefund('退货退款',item,item1)"
                  >退货退款</div>
                </div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.realTotalMoney}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.ordergoods.length}}件产品</div>
            </div>
            <van-divider />
            <!-- <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="chooseSurvice(1)">挑选服务</div>
              <div class="order-list-item-bottom-pay fz13" @click="lookDetail(1)">查看详情</div>
            </div>-->
            <div class="order-list-item-bottom" v-if="item.status=='已取消'">
              <div class="order-list-item-bottom-pay fz13" @click="dealOrder(item,2)">删除订单</div>
            </div>
            <div class="order-list-item-bottom" v-if="item.status=='待付款'">
              <div
                class="order-list-item-bottom-cancel fz13"
                @click="dealOrder(item,1,-1,'取消')"
              >取消订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="toPay(item)">去支付</div>
            </div>
            <div class="order-list-item-bottom" v-if="item.status=='待发货'">
              <div class="order-list-item-bottom-pay fz13" @click="remindOrder">提醒发货</div>
            </div>
            <div class="order-list-item-bottom" v-if="item.status=='待收货'">
              <div class="order-list-item-bottom-cancel fz13" @click="lookDelivery(item)">查看物流</div>
              <div class="order-list-item-bottom-pay fz13" @click="dealOrder(item,1,2,'确认收货')">确认收货</div>
            </div>
            <div class="order-list-item-bottom" v-if="item.status=='已完成'">
              <!-- <div class="order-list-item-bottom-cancel fz13" @click="dealOrder(item,2)">删除订单</div> -->
              <div class="order-list-item-bottom-pay fz13" @click="buyAgain(item)">再次购买</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款" name="-2">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您没有相关订单"
        />
        <div class="order-list-box fixed-margin9" v-if="!empty">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderNo}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待付款</div>
            </div>
            <div
              class="order-list-item-content"
              @click="toDetail(item)"
              v-for="item1 in item.ordergoods"
              :key="item1.id"
            >
              <img :src="item1.goodsImg" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item1.goodsName}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item1.goodsPrice}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item1.goodsNum}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.realTotalMoney}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.ordergoods.length}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div
                class="order-list-item-bottom-cancel fz13"
                @click="dealOrder(item,1,-1,'取消')"
              >取消订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="toPay(item)">去支付</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待发货" name="0">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您没有相关订单"
        />
        <div class="order-list-box" v-if="!empty">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderNo}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待发货</div>
            </div>
            <div class="order-list-item-content" v-for="item1 in item.ordergoods" :key="item1.id">
              <img :src="item1.goodsImg" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item1.goodsName}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item1.goodsPrice}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item1.goodsNum}}</span>
                  </div>
                </div>
                <div class="flexrbc">
                  <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
                  <div
                    class="order-list-item-bottom-refund fz13"
                    @click="requestRefund('申请退款',item,item1)"
                  >申请退款</div>
                </div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.realTotalMoney}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.ordergoods.length}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-pay fz13" @click="remindOrder">提醒发货</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货" name="1">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您没有相关订单"
        />
        <div class="order-list-box">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderNo}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待收货</div>
            </div>
            <div class="order-list-item-top-left fz11 col3">
              物流编号：
              <span class="col9">{{item.orderNo}}</span>
            </div>
            <div class="order-list-item-content" v-for="item1 in item.ordergoods" :key="item1.id">
              <img :src="item1.goodsImg" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item1.goodsName}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item1.goodsPrice}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item1.goodsNum}}</span>
                  </div>
                </div>
                <div class="flexrbc">
                  <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
                  <div
                    class="order-list-item-bottom-refund fz13"
                    @click="requestRefund('退货退款',item,item1)"
                  >退货退款</div>
                </div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.realTotalMoney}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.ordergoods.length}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="lookDelivery(item)">查看物流</div>
              <div class="order-list-item-bottom-pay fz13" @click="dealOrder(item,1,2,'确认收货')">确认收货</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成" name="2">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="您没有相关订单"
        />
        <div class="order-list-box" v-if="!empty">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderNo}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">已完成</div>
            </div>
            <div class="order-list-item-content" v-for="item1 in item.ordergoods" :key="item1.id">
              <img :src="item1.goodsImg" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item1.goodsName}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item1.goodsPrice}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item1.goodsNum}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.saveTime}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.realTotalMoney}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.ordergoods.length}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <!-- <div class="order-list-item-bottom-cancel fz13" @click="dealOrder(item,2)">删除订单</div> -->
              <div class="order-list-item-bottom-pay fz13" @click="buyAgain(item)">再次购买</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      showOverlay: false,
      orderStatus: -1,
      list1: [],
      deliverMsg: []
    };
  },
  created() {
    this.orderStatus = this.$route.params.index + "";
    console.log("订单状态码是" + this.orderStatus);
  },
  mounted() {
    if (this.orderStatus != "undefined") {
      this.getInfo(parseInt(this.orderStatus));
    } else {
      this.getInfo(3);
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    dealOrder(e, type, status, content) {
      var _self = this;
      var id = _self.orderStatus;
      if (type == 2) {
        _self.$toast("删除成功");
        content = "删除";
      }
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          url: "/api/order/saveorder",
          method: "post",
          params: {
            token: token,
            orderId: e.id,
            type: type,
            status: status,
            content: content
          }
        })
        .then(function(res) {
          _self.$router.go(0);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toDetail(item) {
      this.$router.push({ name: "orderDetail", params: { info: item } });
    },

    onClick(name, title) {
      this.empty = false;
      this.getInfo(name);
    },
    getInfo(status) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          url: "/api/order/orderlist",
          method: "post",
          params: {
            token: token,
            page: 1,
            status: status
          }
        })
        .then(function(res) {
          if (res.data.data.length == 0) {
            _self.empty = true;
            _self.list1 = [];
          } else {
            res.data.data.forEach(function(item) {
              switch (item.orderStatus) {
                case -2:
                  item.status = "待付款";
                  break;
                case -1:
                  item.status = "已取消";
                  break;
                case 0:
                  item.status = "待发货";
                  break;
                case 1:
                  item.status = "待收货";
                  break;
                case 2:
                  item.status = "已完成";
                  break;

                default:
                  break;
              }
              var time = new Date(item.saveTime * 1000);
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
              item.saveTime = dateTime;
            });
            _self.list1 = res.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toPay(item) {
      var _self = this;
      this.$toast("点击去支付");
      this.$router.push({ name: "orderDetail", params: { info: item } });
    },
    deleteOrder(e) {
      var _self = this;
      this.$toast("点击删除订单");
    },
    requestRefund(e, info, goods) {
      var _self = this;
      _self.$router.push({
        name: "requestRefund",
        params: { refundType: e, info: info, goods: goods }
      });
      // this.$toast("点击申请退款");
    },
    confirmRecive(e) {
      var _self = this;
      this.$toast("点击确认收货");
    },
    lookDetail(e) {
      var _self = this;
      this.$toast("点击查看详情");
    },
    lookDelivery(info) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/getlogistics",
          params: {
            token: token,
            orderId: info.id,
            orderGoodsId: info.ordergoods[0].id
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            _self.deliverMsg = res.data.data;
            _self.showOverlay = true;
          }else{
            _self.$toast(res.data.msg)
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    buyAgain(item) {
      var _self = this;
      // var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      // _self
      //   .$axios({
      //     method: "post",
      //     url: "/api/order/againorder",
      //     params: {
      //       token: token,
      //       orderId: id
      //     }
      //   })
      //   .then(function(res) {
      //     console.log(res);

      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      item.ordergoods.forEach(function(item) {
        item.cartNum = item.goodsNum;
      });
      _self.$router.push({
        name: "confirmOrder",
        params: { goods: item.ordergoods, from: "myOrder" }
      });
    },
    chooseSurvice(e) {
      var _self = this;
      this.$toast("点击挑选服务");
    },
    remindOrder(e) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/remindorder",
          params: {
            token: token
          }
        })
        .then(function(res) {
          _self.$toast("提醒成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.van-tabs >>> .van-sticky {
  position: fixed;
  width: 100%;
  top: 46px;
}
.van-tabs >>> .van-sticky--fixed {
  top: 46px;
}
.pink {
  color: #ff48bd;
}
.custom-image {
  margin-top: 90px;
}
#myOrder {
  background-color: #e4e4e4;
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
  position: fixed;
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
.order-list-box {
  margin-bottom: 10px;
  margin-top: 90px;
}
.order-list-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 3px;
}
.order-list-item:last-child {
  margin-bottom: 0;
}
.order-list-item-top {
  display: flex;
  justify-content: space-between;
}
.order-list-item-content {
  margin: 15px 0 12px 0;
  display: flex;
}
.goods-img {
  width: 70px;
  height: 60px;
}
.order-list-item-content-right {
  margin-left: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.order-list-item-content-right-titleprice,
.order-list-item-content-right-sortnum,
.order-list-item-total {
  display: flex;
  justify-content: space-between;
}
.goos-num {
  margin-left: 2px;
}
.van-divider {
  margin: 5px 0;
}
.order-list-item-bottom {
  display: flex;
  justify-content: flex-end;
}
.order-list-item-bottom-cancel {
  color: #ff48bd;
  border: 1px solid #ff48bd;
  border-radius: 3px;
  padding: 2px;
  margin-right: 10px;
}
.order-list-item-bottom-pay {
  background-color: #ff48bd;
  color: #fff;
  border-radius: 3px;
  padding: 2px;
}
.order-list-item-bottom-refund {
  color: #ff48bd;
  border: 1px solid #ff48bd;
  border-radius: 3px;
  padding: 2px;
  width: 20%;
  text-align: center;
}
.deliver-box {
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 80vw;
  height: 60vh;
  overflow: scroll;
}
.deliver-item {
  padding: 20px;
}
.deliver-item>div {
  line-height: 20px;
}
</style>