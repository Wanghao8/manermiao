<template>
  <div id="withdraw">
    <van-nav-bar title="佣金提现" left-arrow @click-left="onClickLeft" />
    <div class="content-box bgwhite fixed-margin">
      <div class="card-box flexcac white">
        <!-- <div class="last-money flexc0c white">
          <div class="last-money-num fz24">{{userInfo.overage}}</div>
          <div class="last-money-txt fz14">账户余额（元）</div>
        </div>-->
        <div class="last-money-detail flexrcc">
          <div class="income-box flexc0c">
            <div class="income-num fz18">{{income}}</div>
            <div class="income-txt fz11">总收入（元）</div>
          </div>
          <div class="divider bgwhite"></div>
          <div class="withdraw-box flexc0c">
            <div class="withdraw-num fz18">{{withdrawed}}</div>
            <div class="withdraw-txt fz11">已提取（元）</div>
          </div>
        </div>
      </div>
      <div class="withdraw-button-box flexrbc">
        <div class="withdraw-left flexr0c">
          <div class="withdraw-left-label fz15 col3">可提现（元）</div>
          <div class="withdraw-left-num fz21 pink bold">{{canWithdraw}}</div>
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
            <div class="withdraw-list-item-left-title fz14 col3">{{item.status}}</div>
            <div class="withdraw-list-item-left-time fz11 col9">{{item.time}}</div>
          </div>
          <div class="withdraw-list-item-right fz16 pink">+{{item.money}}元</div>
        </div>
      </div>
    </div>
    <van-overlay :show="showOverlay" @click="showOverlay = false" />
    <div class="pop-box" v-if="showOverlay">
      <div class="pop-content">
        <van-field v-model="money" type="number" label="提现金额" />
        <van-field v-model="account" type="digit" label="提现账户" />
        <van-field v-model="remark" label="备注" />
        <div class="submit-btn" @click="submit">确定提现</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      showOverlay: false,
      money: "",
      account: "",
      remark: "",
      income: "0",
      canWithdraw: "",
      withdrawed: "0",
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
  created() {
    this.canWithdraw = JSON.parse(
      window.localStorage.getItem("userinfo")
    ).commmoney;
  },
  mounted() {
    this.getMoney();
    this.getWithDrawList();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getWithDrawList() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/caselist",
          params: {
            token: token,
            page: 1
          }
        })
        .then(function(res) {
          console.log(res, "liebiao");
          var list = res.data.data;
          list.forEach(function(item) {
            var date = new Date(1000 * item.createTime);
            item.time =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1 + "").padStart(2, "0") +
              "-" +
              (date.getDate() + "").padStart(2, "0");
            item.status = ["待处理", "审核成功", "审核失败"][item.cashSatus];
          });
          console.log(list, "8989");
          _self.list = list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    submit() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      if (_self.money == "") {
        _self.$toast("请输入提现金额");
        return;
      } else if (_self.account == "") {
        _self.$toast("请输入提现金额");
        return;
      }
      _self
        .$axios({
          method: "post",
          url: "/api/user/addcase",
          params: {
            token: token,
            money: _self.money,
            accTargetName: _self.account,
            cashRemarks: _self.remark
          }
        })
        .then(function(res) {
          console.log(res, "tixian");
          _self.showOverlay = false;
          window.localStorage.setItem(
            "userinfo",
            JSON.stringify(res.data.data.userinfo)
          );
          _self.$toast("提现申请成功");
          _self.$router.go(0);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    withdraw() {
      var _self = this;
      _self.showOverlay = true;
      _self.$toast("点击提现按钮");
    },
    getMoney() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/mydistribution",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res);
          var data = res.data.data;
          data.forEach(function(item) {
            if (item.type == 1) {
              _self.income = item.sum;
            } else if (item.type == 2) {
              _self.withdrawed = item.sum;
            }
          });
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
.pop-box {
  z-index: 3;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.submit-btn {
  background-color: #ff48bd;
  color: #fff;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>