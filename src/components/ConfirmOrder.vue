<template>
  <div id="orderDetail">
    <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
    <div class="add-box flexrbc" @click="gotoAdd">
      <div class="add-left" v-if="defaultAdd">
        <div class="add-left-name-tel flexr0c">
          <div class="add-username col3 bold">{{addrInfo.userName}}</div>
          <div class="add-tel col6">{{addrInfo.userPhone}}</div>
        </div>
        <div class="add-item col9 fz14">{{addrInfo.areaIdPath}}</div>
      </div>
      <div class="add-left" v-if="!defaultAdd">
        <div class="add-left-name-tel flexr0c">
          <div class="add-username col3 bold">{{addrInfo.name}}</div>
          <div class="add-tel col6">{{addrInfo.tel}}</div>
        </div>
        <div class="add-item col9 fz14">{{addrInfo.address}}</div>
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
      <div class="goods-info-box flexr0s" v-for="item in goods" :key="item.id">
        <img :src="item.goodsImg" alt class="goodsImg" />
        <div class="goods-info-content">
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="type-price-num flexrbc">
            <div class="type-price-num-left fz14 col9">规格： xxxx</div>
            <div class="type-price-num-right flexr0c">
              <div class="price fz14 col3">￥{{item.goodsPrice}}</div>
              <div class="num fz12 col9">X {{item.cartNum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="deliver-pay">
      <div class="deliver flexrbc" @click="deliver(0)">
        <div class="deliver-title col3 bold fz14">配送方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">{{deliverType}}</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>
      <div class="deliver flexrbc" @click="deliver(1)">
        <div class="deliver-title col3 bold fz14">支付方式</div>
        <div class="deliver-options flexr0c">
          <div class="deliver-txt col9 fz14">{{payType}}</div>
          <div class="iconfont right-row">&#xe605;</div>
        </div>
      </div>
    </div>

    <!-- 底部弹出组件 -->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-action-sheet v-model="showPay" :actions="actions" @select="onSelectPay" />

    <div class="bottom flexrbc">
      <div class="msg col3">
        共
        <span>{{total_num}}</span>件，合计：
        <span class="pink">￥{{total_money}}</span>
      </div>
      <div class="submit fz16" @click="submit">提交订单</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addrInfo: {},
      goods: [],
      defaultAdd: true,
      show: false, //配送方式底部弹出控制器
      showPay: false, //支付方式底部弹出控制器
      actions: [],
      deliverType: "快递配送",
      payType: "线下支付"
    };
  },
  created() {
    var _self = this;

    if (this.$route.params.goods) {
      console.log(this.$route.params.goods, 88888888888);
      _self.goods = this.$route.params.goods;
      var orderinfo = JSON.stringify(_self.goods);
      window.localStorage.setItem("confirmorder", orderinfo);
    } else {
      _self.goods = JSON.parse(window.localStorage.getItem("confirmorder"));
    }
    _self.from = _self.$route.params.from;
  },
  mounted() {
    if (this.$route.params.info) {
      this.defaultAdd = false;
      this.addrInfo = this.$route.params.info;
    } else {
      this.defaultAdd = true;
      this.getAddr();
      this.getGoods();
    }
  },
  computed: {
    total_num: function() {
      var _self = this;
      var num = 0;
      _self.goods.forEach(function(item) {
        num += parseInt(item.cartNum);
        console.log(item, item.cartNum, 7777777, num);
      });
      console.log("num is", num);
      return num;
    },
    total_money: function() {
      var _self = this;
      var money = 0;
      _self.goods.forEach(function(item) {
        money += parseInt(item.goodsPrice) * item.cartNum;
        console.log(item, item.goodsPrice, 88888888);
      });
      console.log("money is", money);
      return money;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onSelect(item) {
      this.show = false;
      this.deliverType = item.name;
    },
    onSelectPay(item) {
      this.showPay = false;
      this.payType = item.name;
    },
    deliver(type) {
      if (type == 0) {
        this.actions = [{ name: "快递配送" }, { name: "慢递配送" }];
        this.show = true;
      } else {
        this.actions = [{ name: "线下支付" }, { name: "线上支付" }];
        this.showPay = true;
      }
    },
    gotoAdd() {
      var _self = this;
      this.$router.push({
        name: "myAddress",
        params: { from: "confirmOrder", goods: _self.goods }
      });
    },
    getGoods() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      var from = _self.from;
      var type = "goods";
      var cartId = 0;
      var goodsId = 0;
      var num = 0;
      if (from === "c") {
        type = "cart";
        cartId = _self.goods.map(function(item) {
          return item.id;
        });
      } else if (from === "myOrder") {
        goodsId = _self.goods[0].goodsId;
        num = _self.goods[0].cartNum;
      } else {
        goodsId = _self.goods[0].goodsId;
        num = _self.goods[0].num;
      }
      console.log("type is ", type, "cartId is ", cartId);
      _self
        .$axios({
          method: "post",
          url: "/api/order/writeorder",
          params: {
            token: token,
            cartId: cartId,
            type: type,
            goodsId: goodsId,
            num: num,
            shareId: 0
          }
        })
        .then(function(res) {
          console.log(res, "success");
          _self.goods = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAddr() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      var addrId = JSON.parse(window.localStorage.getItem("userinfo")).addrId;
      _self
        .$axios({
          method: "post",
          url: "/api/order/address",
          params: {
            token: token,
            addrId: addrId
          }
        })
        .then(function(response) {
          console.log(response);
          _self.addrInfo = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      var payType = 2;
      if (_self.payType === "线上支付") {
        payType = 1;
      } else {
        payType = 2;
      }
      var goods = _self.goods.map(function(item) {
        var good2 = {};
        good2.goodsId = item.goodsId;
        good2.shareId = 0;
        good2.cartNum = item.cartNum;
        good2.goodsPrice = item.goodsPrice;
        good2.goodsName = item.goodsName;
        good2.goodsImg = item.goodsImg;
        good2.goodsDesc = item.goodsDesc;
        good2.goodsattrNames = item.goodsattrNames;
        return good2;
      });
      console.log("userADD IS", userAddress);
      if (!_self.addrInfo.name) {
        var userAddress =
          _self.addrInfo.areaIdPath + _self.addrInfo.userAddress;
        var userName = _self.addrInfo.userName;
        var userPhone = _self.addrInfo.userPhone;
      } else {
        var userAddress = _self.addrInfo.address;
        var userName = _self.addrInfo.name;
        var userPhone = _self.addrInfo.tel;
      }

      console.log(goods, 5454);
      _self.$toast("提交订单");
      _self
        .$axios({
          method: "post",
          url: "/api/order/generateorder",
          params: {
            token: token,
            deliverMoney: 0,
            totalMoney: _self.total_money,
            payType: payType,
            payCode: 1,
            // payType: payType,
            // payCode: payCode,
            areaId: _self.addrInfo.id,
            areaIdPath: userAddress,
            userName: userName,
            userAddress: userAddress,
            userPhone: userPhone,
            orderRemarks: "testAPI",
            goods: goods,
            realTotalMoney: _self.total_money + 0
          }
        })
        .then(function(res) {
          console.log(res, "success");
        })
        .catch(function(error) {
          console.log(error);
        });
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