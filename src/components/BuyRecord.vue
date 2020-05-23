<template>
  <div id="buyRecord">
    <div class="container">
      <van-nav-bar title="消费记录" left-arrow @click-left="onClickLeft" />
      <div class="top-box">
        <img src="static/image/buyRecordBack.jpg" alt class="backimg fixed-margin" />
        <div class="top-box-content flexc0c">
          <div class="deal-price fz16">交易总额</div>
          <div class="divider-line"></div>
          <div class="price-num fz30">{{total_money}}</div>
        </div>
      </div>
      <van-empty
        v-if="empty"
        class="custom-image fixed-margin"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无购买记录"
      />
      <!-- <van-collapse v-model="activeNames" class="fixed-margin">
        <van-collapse-item
          :title="item[0].date"
          :name="index"
          v-for="(item,index) in list"
          :key="index"
      >-->
      <div class="deal-detail-box">
        <div class="deal-detail-item" v-for="item in list" :key="item.id">
          <div v-for="items in item.goods" :key="items.id" class="flexr0c goods-info-box">
            <img :src="items.goodsImg" class="deal-detail-item-left" />
            <div class="deal-detail-item-right flexcb">
              <div class="deal-detail-item-right-top">
                <div class="deal-detail-item-right-title fz12 bold col24">{{items.goodsName}}</div>
                <div class="deal-detail-item-right-txt fz10">{{items.goodsDesc}}</div>
              </div>
              <div class="flexrbc">
                <div class="deal-detail-item-right-price pink fz12">￥{{items.goodsPrice}}</div>
                <div class="deal-detail-item-right-price fz12">X{{items.goodsNum}}</div>
              </div>
            </div>
          </div>
          <div class="time fz14">消费日期：{{item.dateTime}}</div>
        </div>
      </div>
      <!-- </van-collapse-item>
      </van-collapse>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      activeNames: [0],
      total_money: 0,
      list: []
    };
  },
  created() {},
  mounted() {
    // this.getInfo();
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
          url: "/api/user/moneylog",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res, "jilu");
          _self.total_money = res.data.data.totalmoney;
          res.data.data.info.forEach(function(item) {
            var time = new Date(item.createtime * 1000);
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
            item.dateTime = dateTime;
          });
          _self.list = res.data.data.info;
          if(_self.list.length==0){
            _self.empty=true
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
[class*="van-hairline"]::after {
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
  margin-top: 100px;
}
.deal-detail-item {
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
  padding: 20px;
  flex: 2;
}
.van-collapse >>> .van-collapse-item__content {
  background-color: #e6e3e6;
  padding: 5px;
}
.deal-detail-item-right-txt {
  margin-top: 5px;
}
.goods-info-box {
  background-color: #fff;
  position: relative;
  top: 50px;
}
.time {
  margin: 0 12px;
}
</style>