<template>
  <div id="buyRecord">
    <div class="container">
      <van-nav-bar title="购买记录" left-arrow @click-left="onClickLeft" />
      <div class="top-box">
        <img src="../../static/image/buyRecordBack.jpg" alt class="backimg fixed-margin" />
        <div class="top-box-content">
          <div class="deal-price fz16">交易总额</div>
          <div class="divider-line"></div>
          <div class="price-num fz30">10500.00</div>
        </div>
      </div>
      <van-empty
        v-if="empty"
        class="custom-image fixed-margin"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无购买记录"
      />
      <van-collapse v-model="activeNames" class="fixed-margin">
        <van-collapse-item title="2019.03.08" name="1">
          <div class="deal-detail-box">
            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐一</div>
                  <div class="deal-detail-item-right-txt fz10">果蔬生鲜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥2200.00</div>
              </div>
            </div>

            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐二</div>
                  <div class="deal-detail-item-right-txt fz10">面膜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥3000.00</div>
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="2019.02.15" name="2">
          <div class="deal-detail-box">
            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐一</div>
                  <div class="deal-detail-item-right-txt fz10">果蔬生鲜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥2200.00</div>
              </div>
            </div>

            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐二</div>
                  <div class="deal-detail-item-right-txt fz10">面膜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥3000.00</div>
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="2019.02.04" name="3">
          <div class="deal-detail-box">
            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐一</div>
                  <div class="deal-detail-item-right-txt fz10">果蔬生鲜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥2200.00</div>
              </div>
            </div>

            <div class="deal-detail-item">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                class="deal-detail-item-left"
              />
              <div class="deal-detail-item-right">
                <div class="deal-detail-item-right-top">
                  <div class="deal-detail-item-right-title fz12 bold col24">套餐二</div>
                  <div class="deal-detail-item-right-txt fz10">面膜</div>
                </div>
                <div class="deal-detail-item-right-price pink fz12">￥3000.00</div>
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty:false,
      activeNames: ["1"],
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.col24 {
  color: #242424;
}
/* .van-hairline--bottom::after {
    border-bottom-width: 0;
} */
[class*=van-hairline]::after{
  border: none;
}
#buyRecord {
  background-color: #e6e3e6;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
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
.backimg {
  width: 100%;
  height: 140px;
}
.top-box {
  height: 140px;
}
.top-box-content {
  position: absolute;
  top: 46px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #fff;
  height: 140px;
}
.divider-line {
  background-color: #fff;
  width: 20px;
  height: 2px;
}
.deal-price {
  margin: 20px 0 13px 0;
}
.price-num {
  margin-top: 26px;
}
.deal-detail-box {
  background-color: #e6e3e6;
}
.deal-detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  background-color: #fff;
  border-radius: 5px;
}
.deal-detail-item-left {
  width: 84px;
  height: 84px;
  border-radius: 8px;
  margin-left: 12px;
}
.deal-detail-item-right {
  height: 84px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.van-collapse >>> .van-collapse-item__content {
  background-color: #e6e3e6;
  padding: 5px;
}
.deal-detail-item-right-txt {
  margin-top: 5px;
}
</style>