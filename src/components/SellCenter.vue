<template>
  <div id="sellCenter">
    <van-nav-bar title="分销中心" left-arrow @click-left="onClickLeft" />
    <div class="top-info-box">
      <img :src="avatar" alt class="user-avatar" />
      <div class="user-info-box">
        <div class="username">{{userInfo.username}}</div>
        <div class="user-info-level-box flexr0c fz12 white">
          <div class="level fz12">等级：{{level}}</div>
          <div class="recommend fz12">推荐人：{{userInfo.referrer}}</div>
        </div>
        <div class="upgrade-time fz11 white">升级时间：{{userInfo.upgradeTime}}</div>
      </div>
    </div>
    <div class="order-card-box">
      <div class="order" @click="toMyorder">
        <img src="../../static/image/dingdan.png" class="order-icon" />
        <div class="order-txt">我的订单</div>
      </div>
      <div class="myteam" @click="toMyteam">
        <img src="../../static/image/team.png" class="myteam-icon" />
        <div class="myteam-txt">我的团队</div>
      </div>
      <div class="withdraw" @click="toWithdraw">
        <img src="../../static/image/money.png" class="withdraw-icon" />
        <div class="withdraw-txt">佣金提现</div>
      </div>
    </div>
    <div class="number-box fz16">
      <div class="total-num fz16">累计佣金：￥{{totalMoney}}</div>
      <div class="last-withdraw" @click="toWithdraw">
        <div class="last-withdraw-left fz16">
          可提现余额：
          <span class="pink">￥{{canWithdraw}}</span>
        </div>
        <div class="last-withdraw-right">
          <div class="last-withdraw-right-txt pink fz16">提现</div>
          <div class="last-withdraw-right-icon iconfont">&#xe605;</div>
        </div>
      </div>
    </div>
    <div class="grid-box">
      <van-grid :border="false" :column-num="3">
        <van-grid-item @click="toQR">
          <div class="grid-icon iconfont pink">&#xe651;</div>
          <div class="grid-txt">我的二维码</div>
        </van-grid-item>
        <van-grid-item @click="toUpgradeRule">
          <div class="grid-icon iconfont pink">&#xe627;</div>
          <div class="grid-txt">升级规则</div>
        </van-grid-item>
        <!-- <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe61c;</div>
    <div class="grid-txt">升级时间</div>
  </van-grid-item>
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe63c;</div>
    <div class="grid-txt">分销商升级</div>
  </van-grid-item>
  <van-grid-item>
    <div class="grid-icon iconfont pink">&#xe629;</div>
    <div class="grid-txt">推荐人</div>
        </van-grid-item>-->

        <van-grid-item>
          <!-- <div class="grid-icon iconfont pink">&#xe627;</div>
          <div class="grid-txt">推荐人</div>-->
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: "",
      canWithdraw: "",
      totalMoney: 0,
      userInfo: {
        userName: "安琪拉",
        level: "2",
        referrer: "张三",
        upgradeTime: "2020.04.06",
        totalMoney: "5000.00",
        canWithdraw: "2000.00"
      }
    };
  },
  created() {
    this.avatar = JSON.parse(window.localStorage.getItem("wxinfo")).headimgurl;
    this.level = JSON.parse(window.localStorage.getItem("userinfo")).level;
    this.canWithdraw = JSON.parse(
      window.localStorage.getItem("userinfo")
    ).commmoney;
  },
  mounted() {
    // this.getInfo();
    this.getMoney();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    toMyorder() {
      this.$router.push({ name: "myOrder", params: { index: 3 } });
    },
    toMyteam() {
      this.$router.push("myTeam");
    },
    toWithdraw() {
      this.$router.push("withdraw");
    },
    toQR() {
      this.$router.push("spreadQRcode");
    },
    toUpgradeRule() {
      this.$router.push("upgradeRule");
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
          // _self.userInfo = response
          // _self.swiperImages = response
        })
        .catch(function(error) {
          console.log(error);
        });
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
              _self.totalMoney = item.sum;
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
[class*="van-hairline"]::after {
  border: none;
}
.van-progress >>> .van-progress__pivot {
  display: none;
}
.pink {
  color: #ff49bd;
}
.fz16 {
  font-size: 16px;
}
#sellCenter {
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
.top-info-box {
  height: 154px;
  background-color: #fe4cbe;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.user-info-box {
  margin-left: 12px;
}
.username {
  color: #fff;
  font-size: 18px;
  margin-bottom: 11px;
}
.user-info-level-box {
  margin-bottom: 5px;
}
.level {
  color: #fff;
  font-size: 12px;
}
.recommend {
  margin-left: 20px;
}
.order-card-box {
  margin: -25px 3% 12px 3%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: #ddd 0px 0px 4px;
}
.order-icon,
.myteam-icon,
.withdraw-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}
.order,
.myteam,
.withdraw {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.number-box {
  margin: 0 3% 18px 3%;
  box-shadow: #ddd 0px 0px 4px;
  border-radius: 5px;
  background-color: #fff;
}
.total-num {
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 10px;
}
.last-withdraw {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
}
.last-withdraw-right {
  display: flex;
  align-items: center;
}
.last-withdraw-right-txt {
  margin-right: 12px;
}
#sellCenter >>> .grid-box {
  margin: 0 3%;
}
.grid-box >>> .van-grid {
  border-radius: 5px;
}
.grid-txt {
  font-size: 14px;
  margin-top: 7px;
}
.grid-icon {
  font-size: 24px;
  border-radius: 5px;
}
.grid-box >>> .van-grid-item__content--center {
  border-radius: 5px;
}
</style>