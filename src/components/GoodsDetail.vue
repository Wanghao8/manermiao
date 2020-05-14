<template>
  <div id="goodsDetail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="swiperbox">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="info.goodsImg" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goods-info-box">
      <div class="goods-price red fz24">￥{{info.level1Price}}</div>
      <div class="goods-name fz18">{{info.goodsName}}</div>
      <div class="goods-intro fz14">{{info.goodsDesc}}</div>
    </div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      disable-stepper-input
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <van-goods-action>
      <!-- <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />-->
      <van-goods-action-button type="warning" text="加入购物车" @click="add2Cart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsId: "-1",
      info: {},
      show: false,
      sku: {
        // 数据结构见下方文档
        tree: [],
        list: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        none_sku: true // 是否无规格商品
      },
      goods: {
        // 数据结构见下方文档
        picture: ""
      }
    };
  },
  created() {
    var goodsId = this.$route.params.id;
    console.log(goodsId);
    this.goodsId = goodsId;
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getInfo() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/goods/goodsdetail",
          params: {
            token: token,
            goodsId: _self.goodsId
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          _self.info = res.data.data;
          _self.goods.picture = res.data.data.goodsImg;
          _self.sku.price = res.data.data.level1Price;
          _self.sku.stock_num = res.data.data.stockNumber;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    onBuyClicked(skuData) {
      var _self = this;
      var goodsInfo = [];
      goodsInfo.push({
        goodsId: _self.info.id,
        num: skuData.selectedNum
      });
      _self.$router.push({
        name: "confirmOrder",
        params: { from: "b", goods: goodsInfo }
      });
    },
    onAddCartClicked(skuData) {},
    add2Cart() {
      this.show = true;
      this.$toast("加入购物车");
    },
    buy() {
      this.show = true;
      var _self = this;
      _self.$toast("购买");
    }
  }
};
</script>

<style scoped>
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
.van-nav-bar[data-v-dea0f472] {
  top: 0;
}
.swiperbox {
  margin-top: 46px;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 300px;
  text-align: center;
  background-color: #39a9ed;
}
.goods-info-box {
  padding: 10px;
}
.goods-info-box > div {
  margin-top: 10px;
}
.goods-name {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
