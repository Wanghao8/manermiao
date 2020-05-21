<template>
  <div id="Home">
    <van-nav-bar title="首页" />

    <div class="swiperbox">
      <van-swipe :autoplay="3000" indicator-color="#FE18FB">
        <van-swipe-item v-for="(image, index) in swiperImages" :key="index">
          <img class="swiperImg" v-lazy="image.adFile" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="bottomTxt">
      <div class="left-icon">
        <div class="sign"></div>
        <div class="label">爆单信息</div>
      </div>
      <div class="right-icon">
        <!-- <div class="content">更多</div>
        <van-icon name="arrow" />-->
      </div>
    </div>

    <div class="list-container">
      <van-empty
        v-if="empty"
        class="custom-image fixed-margin"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无爆单信息"
      />
      <div class="list-item" v-for="item in hotSell" :key="item.id">
        <div class="list-item-top">
          <div class="list-item-top-left">
            <div class="list-avatar">
              <img :src="item.user.avatar" alt class="list-avatar-img" />
            </div>
            <div class="list-username">{{item.user.username}}</div>
          </div>
          <div class="list-level">Lv.{{item.user.level}}</div>
        </div>
        <div class="list-item-content">
          <div class="list-item-content-left">
            <img :src="item.ordergoods[0].goodsImg" alt class="list-item-content-img" />
          </div>
          <div class="list-item-content-right">
            <div class="list-item-content-title">{{item.ordergoods[0].goodsName}}</div>
            <div class="list-item-content-detail two-line">{{item.ordergoods[0].goodsDesc}}</div>
          </div>
        </div>
        <div class="list-item-bottom">{{item.createTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchContent: "",
      empty: false,
      swiperImages: [
        "../../static/image/homeSwiper1.jpg",
        "../../static/image/homeSwiper2.jpg",
        "../../static/image/homeSwiper3.png"
      ],

      hotSell: []
    };
  },
  mounted() {
    // this.login();
    var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
    this.getSwiper(token);
    this.getHot(token);
  },
  methods: {
    navigate() {
      console.log(123);
      this.$router.push({ path: "/list" });
    },
    gotoDetail() {
      console.log("123detail");
      this.$router.push({ path: "/detail" });
    },
    getSwiper(token) {
      var _self = this;
      console.log(token);
      _self
        .$axios({
          url: "/api/index/focus",
          method: "post",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          _self.swiperImages = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getHot(token) {
      var _self = this;
      _self
        .$axios({
          url: "/api/index/orderlist",
          method: "post",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res.data.data, 123);
          var hotSell = res.data.data;
          hotSell.forEach(item => {
            var timestamp = new Date(item.createTime * 1000);
            var date =
              timestamp.getFullYear() +
              "-" +
              (timestamp.getMonth() + 1 + "").padStart(2, "0") +
              "-" +
              (timestamp.getDate() + "").padStart(2, "0");
            item.createTime = date;
          });
          _self.hotSell = hotSell;
          if (_self.hotSell.length == 0) {
            _self.empty = true;
          }
          console.log(
            _self.hotSell[0].user.avatar,
            _self.hotSell[0].createTime,
            1111
          );
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getInfo() {
      var _self = this;
      _self
        .$axios({
          method: "get",
          url: "/index/index",
          data: {}
        })
        .then(function(response) {
          console.log(response);
          // _self.list = response
          // _self.swiperImages = response
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    login() {
      var _self = this;
      var radio = parseInt(_self.radio);
      _self
        .$axios({
          method: "post",
          url: "/api/user/login",
          params: {
            account: "aaaaa",
            password: "123456"
          }
        })
        .then(function(res) {
          console.log(res);
          var userInfo = JSON.stringify(res.data.data.userinfo);
          window.localStorage.setItem("userinfo", userInfo);
          var token = res.data.data.userinfo.token;
          // _self.getSwiper(token);
          // _self.getHot(token);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
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
#Home {
  background-color: #f1f1f1;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.topNav {
  width: 100%;
  height: 44px;
  display: flex;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #ff49bd;
}
.leftIcon,
.rightIcon {
  background-color: #ff49bd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: #eee;
  flex-shrink: 0;
}
.botword {
  font-size: 12px;
}
.van-search {
  flex-grow: 1;
}
.van-search__content {
  height: 120%;
  padding: 0;
  background-color: #fec4ea;
}
.van-cell {
  font-size: 10px;
}
.van-field__control {
  color: #fff;
}
.swiperbox {
  background-color: #fff;
  margin-top: 46px;
  overflow: hidden;
}
.van-swipe-item {
  height: 160px;
}
.van-field__left-icon {
  width: 0;
}
.swiperImg {
  width: 100%;
  height: 100%;
}
.bottomTxt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  background-color: #fff;
  padding: 10px 7px;
}
.left-icon,
.right-icon {
  display: flex;
  align-items: center;
}
.label {
  font-size: 15px;
}
.sign {
  width: 2.5px;
  height: 20px;
  border-radius: 2.5px;
  background-color: #ff49bd;
  margin-right: 9px;
}
.content {
  font-size: 11px;
}
.van-icon-arrow {
  font-size: 11px;
}
.van-button--normal {
  margin: 0 10px;
}
.van-button {
  line-height: 20px;
  height: 20px;
}
.list-container {
  background-color: #f1f1f1;
  margin: 7px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 60px;
}
.list-item {
  margin-bottom: 3px;
  padding: 10px;
  background-color: #fff;
}
.list-item:last-child {
  margin-bottom: 0;
}
.list-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-item-top-left {
  display: flex;
  align-items: center;
}
.list-avatar-img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.list-username {
  font-size: 13px;
  margin-left: 5px;
}
.list-level {
  font-size: 10px;
}
.list-item-content {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.list-item-content-right {
  margin-left: 9px;
}
.list-item-content-title {
  font-size: 12px;
}
.list-item-content-detail {
  font-size: 10px;
}
.list-item-content-left {
  margin-left: 33px;
}
.list-item-content-img {
  width: 40px;
  height: 40px;
  border-radius: 6%;
}
.list-item-bottom {
  font-size: 9px;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>