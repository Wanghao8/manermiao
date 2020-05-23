<template>
  <div id="goodsDetail">
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    <div class="swiperbox">
      <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in imglist" :key="index">
          <img class="swiper-img" v-lazy="image" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goods-info-box">
      <div class="goods-price red fz24">￥{{info.goodsPrice}}</div>
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
      },
      imglist: []
    };
  },
  created() {
    var goodsId = this.$route.params.id;
    console.log(goodsId);
    this.goodsId = goodsId;
    if (goodsId) {
      window.localStorage.setItem("goodsDetail", goodsId);
    }
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
      var goodsId = _self.goodsId
        ? _self.goodsId
        : window.localStorage.getItem("goodsDetail");
      console.log(window.localStorage.getItem("goodsDetail"), "ididididi");
      _self
        .$axios({
          method: "post",
          url: "/api/goods/goodsdetail",
          params: {
            token: token,
            goodsId: goodsId
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          _self.imglist = res.data.data.goodsImgs.split(",");
          _self.info = res.data.data;
          _self.goods.picture = res.data.data.goodsImg;
          _self.sku.price = res.data.data.goodsPrice;
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
    onAddCartClicked(skuData) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          methods: "post",
          url: "/api/goods/addcart",
          params: {
            token: token,
            goodsId: _self.info.id,
            cartNum: skuData.selectedNum
          }
        })
        .then(function(response) {
          console.log(response);
          _self.$router.push("cart");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
  top:0
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
  text-align: center;
  /* background-color: #39a9ed; */
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
.swiper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
