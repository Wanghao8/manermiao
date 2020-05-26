<template>
  <div id="requestRefund">
    <van-nav-bar :title="refundType" left-arrow @click-left="onClickLeft" />
    <van-action-sheet v-model="showStatus" :actions="express" @select="selectStatus" />
    <van-action-sheet v-model="showReason" :actions="reasonList" @select="selectReason" />
    <div class="container">
      <div class="goods-box">
        <div class="goods-info flexr">
          <img :src="refundGoods.goodsImg" alt class="goodsImg" />
          <div class="goods-name-desc" style="flex:1">
            <div class="goods-name">{{refundGoods.goodsName}}</div>
            <div class="goods-desc">{{refundGoods.goodsDesc}}</div>
            <div class="goods-price red">￥{{refundGoods.goodsPrice}}</div>
            <div class="goods-num">数量：X{{refundGoods.goodsNum}}</div>
          </div>
        </div>
      </div>
      <div class="write-refund-box">
        <div class="goods-stauts-box flexrbc" @click="showStatusFun">
          <div class="goods-stauts-label">退货物流</div>
          <div class="goods-stauts-icon flexr0c">
            <div class="goods-stauts">{{expressName}}</div>
            <div class="iconfont">&#xe605;</div>
          </div>
        </div>
        <div class="refund-reason-box flexrbc" @click="showReasonFun">
          <div class="refund-reason-box">退款原因</div>
          <div class="refund-reason-icon flexr0c">
            <div class="refund-reason">{{reason}}</div>
            <div class="iconfont">&#xe605;</div>
          </div>
        </div>
        <div class="refund-money-box flexr0c">
          <div class="refund-money-label">退款金额：</div>
          <div class="refund-money">￥{{total_money}}</div>
        </div>
        <div class="refund-money-box flexr0c">
          <div class="refund-money-label">退款备注：</div>
          <input
            name="refundRemark"
            id="refundRemark"
            v-model="refundRemark"
            style="width:70%;"
            placeholder="选填"
          />
        </div>
      </div>
      <div class="upImg-box">
        <div class="upImg-label">上传凭证</div>
        <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="6" />
      </div>
      <div class="submit-btn" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      refundType: "申请退款",
      fileList: [],
      showStatus: false,
      expressName: "请选择",
      expressCode: "",
      showReason: false,
      reason: "请选择",
      reasonId: -1,
      imgstring: "",
      refundInfo: {},
      refundGoods: {},
      express: [],
      expressId: -1,
      reasonList: [
        { name: "退款原因1", reasonId: 1 },
        { name: "退款原因2", reasonId: 2 }
      ],
      reasonId: 0,
      total_money: 0,
      refundRemark: ""
    };
  },
  created() {
    this.refundType = this.$route.params.refundType;
    this.refundInfo = this.$route.params.info;
    this.refundGoods = this.$route.params.goods;
    this.total_money = this.refundGoods.goodsPrice * this.refundGoods.goodsNum;
    console.log(this.refundInfo, "---", this.refundGoods);
  },
  mounted() {
    this.getExpress();
    this.getReason();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    selectStatus(item) {
      this.showStatus = false;
      this.expressName = item.expressName;
      this.expressCode = item.expressCode;
      this.expressId = item.id;
    },
    selectReason(item) {
      this.showReason = false;
      this.reason = item.name;
      this.reasonId = item.resonId;
    },
    showStatusFun() {
      this.showStatus = true;
    },
    showReasonFun() {
      this.showReason = true;
    },
    afterRead() {
      console.log("shangchuanchenggong");
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/uploadimg",
          params: {
            token: token,
            type: "refundimg",
            image: _self.fileList[_self.fileList.length - 1].content
          }
        })
        .then(function(res) {
          console.log(res.data.data, "chutupian");
          _self.imgstring += res.data.data + ",";
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getReason() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/reson",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res.data.data, "reason");
          var list = res.data.data;
          list.forEach(function(item) {
            item.name = item.reson;
          });
          _self.reasonList = list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getExpress() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/expresslist",
          params: {
            token: token
          }
        })
        .then(function(res) {
          console.log(res.data.data, "wuliu");
          var list = res.data.data;
          list.forEach(function(item) {
            item.name = item.expressName;
          });
          _self.express = list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    submit() {
      var _self = this;
      var type = _self.refundType == "申请退款" ? 1 : 2;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      if (_self.expressName === "请选择") {
        _self.$toast("请选择物流");
      } else if (_self.reason === "请选择") {
        _self.$toast("请选择退货原因");
      } else if (_self.fileList.length === 0) {
        _self.$toast("请上传凭证");
      } else {
        // return;
        _self
          .$axios({
            method: "post",
            url: "/api/order/addrefund",
            params: {
              token: token,
              type: type,
              orderGoodsId: _self.refundGoods.orderId,
              resonId: _self.reasonId,
              reson: _self.reason,
              refundimg: _self.imgstring,
              backMoney: _self.total_money,
              refundExpress: _self.refundInfo.orderNo,
              refundRemark: _self.refundRemark,
              expressId: _self.expressId,
              expressCode: _self.expressCode,
              orderId: _self.refundInfo.id
            }
          })
          .then(function(res) {
            console.log(res, "success");
            var goodsinfo = {
              goodsImg: _self.refundGoods.goodsImg,
              goodsName: _self.refundGoods.goodsName,
              goodsDesc: _self.refundGoods.goodsDesc,
              reson: _self.reason,
              money: _self.total_money,
              refundTradeNo: _self.refundInfo.orderNo,
              requestTime: new Date()
            };
            _self.$router.push({
              name: "refundDetail",
              params: { goods: goodsinfo }
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
#requestRefund {
  background-color: #e4e4e4;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow-x: hidden;
  top: 0px;
  bottom: 0px;
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
.write-refund-box {
  padding: 0 10px;
}
.write-refund-box > div {
  line-height: 30px;
}
.container {
  margin-top: 46px;
}
.goods-info {
  margin-bottom: 10px;
  padding: 10px;
}
.goods-info,
.write-refund-box,
.upImg-box {
  margin-bottom: 10px;
  background-color: #fff;
}
.goodsImg {
  width: 100px;
  height: 100px;
}
#refundRemark {
  /* border: none; */
  max-width: 90%;
}
.upImg-box {
  padding: 10px;
}
.upImg-label {
  margin-bottom: 4px;
}
.submit-btn {
  width: 80%;
  margin: 40px 10%;
  text-align: center;
  background-color: #ff48bd;
  color: #fff;
  height: 44px;
  line-height: 44px;
  border-radius: 44px;
}
.goods-name-desc > div {
  margin: 4px;
}
</style>