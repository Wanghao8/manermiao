<template>
  <div id="myOrder">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="orderStatus" sticky color="#ff48bd">
      <van-tab title="待付款" name="0">
        <div class="order-list-box">
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待付款</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="cancelOrder(1)">取消订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="toPay(1)">去支付</div>
            </div>
          </div>
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待付款</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
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
        <div class="order-list-box">
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">待收货</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
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
        <div class="order-list-box">
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">已完成</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
            </div>
            <van-divider />
            <div class="order-list-item-bottom">
              <div class="order-list-item-bottom-cancel fz13" @click="deleteOrder(1)">删除订单</div>
              <div class="order-list-item-bottom-pay fz13" @click="buyAgain(1)">再次购买</div>
            </div>
          </div>
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">已完成</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
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
        <div class="order-list-box">
          <div class="order-list-item">
            <div class="order-list-item-top">
              <div class="order-list-item-top-left fz11 col3">
                订单编号：
                <span class="col9">C01254639522</span>
              </div>
              <div class="order-list-item-top-right col9 fz11">退款中</div>
            </div>
            <div class="order-list-item-content">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="goods-img"
              />
              <div class="order-list-item-content-right">
                <div class="order-list-item-content-right-titleprice">
                  <div class="order-list-item-content-right-title fz13">果蔬果冻（10袋装）</div>
                  <div class="order-list-item-content-right-price red fz12">￥1639.00</div>
                </div>
                <div class="order-list-item-content-right-sortnum">
                  <div class="order-list-item-content-right-sort col9 fz10">类别：酵素果冻</div>
                  <div class="order-list-item-content-right-num col9 fz11">
                    X
                    <span class="goos-num">1</span>
                  </div>
                </div>
                <div class="order-list-item-content-right-time col9 fz10">订单时间：2019-02-10</div>
              </div>
            </div>
            <div class="order-list-item-total">
              <div class="order-list-item-total-left col6 fz11">
                订单合计:
                <span class="fz11 red">￥1639.00</span>
              </div>
              <div class="order-list-item-total-right col6 fz11">共1件产品</div>
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
      orderStatus: -1
    };
  },
  created() {
    this.orderStatus = this.$route.params.index + "";
    console.log("订单状态码是" + this.orderStatus);
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    cancelOrder(e) {
      this.$toast("点击取消订单");
    },
    toPay(e) {
      this.$toast("点击去支付");
    },
    deleteOrder(e) {
      this.$toast("点击删除订单");
    },
    requestRefund(e) {
      this.$toast("点击申请退款");
    },
    confirmRecive(e) {
      this.$toast("点击确认收货");
    },
    lookDetail(e) {
      this.$toast("点击查看详情");
    },
    buyAgain(e) {
      this.$toast("点击再次购买");
    },
    chooseSurvice(e) {
      this.$toast("点击挑选服务");
    }
  }
};
</script>

<style scoped>
.fz10 {
  font-size: 10px;
}
.fz11 {
  font-size: 11px;
}
.fz12 {
  font-size: 12px;
}
.fz13 {
  font-size: 13px;
}
.red {
  color: red;
}
.col6 {
  color: #666;
}
.col9 {
  color: #999;
}
.pink {
  color: #ff48bd;
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