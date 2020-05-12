<template>
  <div id="orderDetail">
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" />
    <div class="add-box flexrbc">
      <div class="add-left">
        <div class="add-left-name-tel flexr0c">
          <div class="add-username col3 bold">用户名</div>
          <div class="add-tel col6">1506700xxxx</div>
        </div>
        <div class="add-item col9 fz14">河南省</div>
      </div>
      <div class="add-right iconfont">&#xe605;</div>
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
      <div class="goods-info-box flexr0s">
        <img
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
          alt
          class="goodsImg"
        />
        <div class="goods-info-content">
          <div
            class="goods-name"
          >产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名产品名</div>
          <div class="type-price-num flexrbc">
            <div class="type-price-num-left fz14 col9">规格： xxxx</div>
            <div class="type-price-num-right flexr0c">
              <div class="price fz14 col3">￥1999.00</div>
              <div class="num fz12 col9">X 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="deliver-pay">
      <div class="deliver flexrbc">
        <div class="deliver-title col3 bold fz14">配送方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">快递配送</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>
      <div class="deliver flexrbc">
        <div class="deliver-title col3 bold fz14">支付方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">线下支付</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>
    </div>

    <div class="bottom flexrbc">
      <div class="msg col3">
        共<span>1</span>件，合计：<span class="pink">￥1999</span>
      </div>
      <div class="submit fz16">提交订单</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
#orderDetail {
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
.bottom {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  line-height: 50px;
}
.bottom div {
  padding: 0 13px;
}
.submit {
  background-color: #ff48bd;
  color: #fff;
  line-height: 25px;
  border-radius: 25px;
  margin-right: 13px;
}
</style>