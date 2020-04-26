<template>
  <div id="myOrder">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="orderStatus" sticky color="#ff48bd">
      <van-tab title="待付款" name="0">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="我的订单是空的"
        />
        <div class="order-list-box fixed-margin9">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderId}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待付款</div>
            </div>
            <div class="order-list-item-content">
              <img :src="item.img" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item.name}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item.price}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item.quantity}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.time}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.totalPrice}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.quantity}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="cancelOrder(1)">取消订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="toPay(1)">去支付</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货" name="1">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="我的订单是空的"
        />
        <div class="order-list-box">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderId}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待收货</div>
            </div>
            <div class="order-list-item-content">
              <img :src="item.img" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item.name}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item.price}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item.quantity}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.time}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.totalPrice}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.quantity}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="deleteOrder(1)">删除订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="requestRefund(1)">申请退款</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成" name="3">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="我的订单是空的"
        />
        <div class="order-list-box">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderId}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">已完成</div>
            </div>
            <div class="order-list-item-content">
              <img :src="item.img" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item.name}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item.price}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item.quantity}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.time}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.totalPrice}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.quantity}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="deleteOrder(1)">删除订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="buyAgain(1)">再次购买</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="退换货" name="2">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="我的订单是空的"
        />
        <div class="order-list-box">
          <div class="order-list-item" v-for="item in list1" :key="item.id">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">{{item.orderId}}</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">退款中</div>
            </div>
            <div class="order-list-item-content">
              <img :src="item.img" alt class="goods-img" />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">{{item.name}}</div>
                  <div class="order-list-item-content-right-price red fz12">￥{{item.price}}</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：{{item.type}}</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">{{item.quantity}}</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：{{item.time}}</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥{{item.totalPrice}}</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共{{item.quantity}}件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="chooseSurvice(1)">挑选服务</div>
              <div class="order-list-item-bottom-pay fz13" @click="lookDetail(1)">查看详情</div>
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
      orderStatus: -1,
      list1: [
        {
          id: 1,
          orderId: "C012354693522",
          img:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg",
          name: "果蔬果冻（10袋装）",
          price: "1639.00",
          type: "酵素果冻",
          quantity: "1",
          time: "2019-02-10",
          totalPrice: "1639.00"
        },
        {
          id: 2,
          orderId: "C012354693522",
          img:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg",
          name: "果蔬果冻（10袋装）",
          price: "1639.00",
          type: "酵素果冻",
          quantity: "1",
          time: "2019-02-10",
          totalPrice: "1639.00"
        }
      ]
    };
  },
  created() {
    this.orderStatus = this.$route.params.index + "";
    console.log("订单状态码是" + this.orderStatus);
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    cancelOrder(e) {
      var _self = this;
      // _self
      //   .$axios({
      //     url: "",
      //     method: "get"
      //   })
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      this.$toast("点击取消订单");
    },
    toPay(e) {
      var _self = this;
      this.$toast("点击去支付");
    },
    deleteOrder(e) {
      var _self = this;
      this.$toast("点击删除订单");
    },
    requestRefund(e) {
      var _self = this;
      this.$toast("点击申请退款");
    },
    confirmRecive(e) {
      var _self = this;
      this.$toast("点击确认收货");
    },
    lookDetail(e) {
      var _self = this;
      this.$toast("点击查看详情");
    },
    buyAgain(e) {
      var _self = this;
      this.$toast("点击再次购买");
    },
    chooseSurvice(e) {
      var _self = this;
      this.$toast("点击挑选服务");
    },
    getInfo() {
      var _self = this;
      _self
        .$axios({
          method: "get",
          url: "https://yesno.wtf/api"
          // data: {

          // }
        })
        .then(function(response) {
          console.log(response);
          // _self.list = response
          // _self.swiperImages = response
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
</style>