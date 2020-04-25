<template>
  <div id="withdraw">
    <van-nav-bar title="佣金提现" left-arrow @click-left="onClickLeft" />
    <div class="content-box bgwhite fixed-margin">
      <div class="card-box flexcac white">
        <div class="last-money flexc0c white">
          <div class="last-money-num fz24">{{userInfo.overage}}</div>
          <div class="last-money-txt fz14">账户余额（元）</div>
        </div>
        <div class="last-money-detail flexrcc">
          <div class="income-box flexc0c">
            <div class="income-num fz18">{{userInfo.income}}</div>
            <div class="income-txt fz11">总收入（元）</div>
          </div>
          <div class="divider bgwhite"></div>
          <div class="withdraw-box flexc0c">
            <div class="withdraw-num fz18">{{userInfo.withdrawed}}</div>
            <div class="withdraw-txt fz11">已提取（元）</div>
          </div>
        </div>
      </div>
      <div class="withdraw-button-box flexrbc">
        <div class="withdraw-left flexr0c">
          <div class="withdraw-left-label fz15 col3">可提现（元）</div>
          <div class="withdraw-left-num fz21 pink bold">{{userInfo.canWithdraw}}</div>
        </div>
        <div class="withdraw-button white fz16" @click="withdraw">提现</div>
      </div>
      <van-divider />
      <div class="withdraw-detail-box flexrbc">
        <div class="withdraw-detail-left flexr0c">
          <div class="withdraw-detail-left-label"></div>
          <div class="withdraw-detail-left-txt fz18">提现明细</div>
        </div>
        <div class="withdraw-detail-right iconfont">&#xe605;</div>
      </div>
      <van-divider />
      <van-empty
        v-if="empty"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无提现记录"
      />
      <div class="withdraw-list-box">
        <div class="withdraw-list-item flexrbc" v-for="item in list" :key="item.id">
          <div class="withdraw-list-item-left flexc">
            <div class="withdraw-list-item-left-title fz14 col3">{{item.userName}}</div>
            <div class="withdraw-list-item-left-time fz11 col9">{{item.time}}</div>
          </div>
          <div class="withdraw-list-item-right fz16 pink">+{{item.money}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      userInfo: {
        overage: "8690.20",
        income: "300.20",
        withdrawed: "253.20",
        canWithdraw: "47.00"
      },
      list: [
        { userName: "王包子", time: "2019-02-03", money: "2.30", id: 0 },
        { userName: "王包子", time: "2019-02-03", money: "2.30", id: 1 },
        { userName: "王包子", time: "2019-02-03", money: "2.30", id: 2 }
      ]
    };
  },
  created() {},
  mounted() {
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    withdraw() {
      this.$toast("点击提现按钮");
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
#withdraw {
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
.content-box {
  overflow: hidden;
}
.card-box {
  margin: 15px 3%;
  width: 94%;
  height: 125px;
  background-image: linear-gradient(to right, #ff8cd6, #df53c8);
  border-radius: 5px;
}
.divider {
  width: 1px;
  height: 30px;
  margin: 0 56px;
}
.withdraw-button-box {
  padding: 15px 30px 30px 30px;
}
.withdraw-left-num {
  margin-left: 30px;
}
.withdraw-button {
  background-color: #fd5dc3;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
}
.van-divider {
  margin: 0;
}
.withdraw-detail-box,
.withdraw-list-item {
  padding: 10px;
}
.withdraw-detail-left-label {
  width: 4px;
  height: 20px;
  background-color: #ff48bd;
  margin-right: 10px;
}
.withdraw-list-item-left-time {
  margin-top: 5px;
}
</style>