<template>
  <div id="refund">
    <van-nav-bar title="退款/退货" left-arrow @click-left="onClickLeft" />

    <div class="order-list-box">
      <van-empty
        v-if="empty"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="您没有相关订单"
      />
      <div class="list-box" v-if="!empty">
        <div class="list-box" v-for="item in list" :key="item.id">
          <van-panel title="退款状态" :status="status[item.refundStatus]">
            <div class="goods-info-box flexr0c">
              <img :src="item.goodsImg" class="goodsImg" alt />
              <div class="goods-info-right flexcb">
                <div class="goods-name-desc">
                  <div class="goods-name">{{item.goodsName}}</div>
                  <div class="goods-desc fz14 col6">{{item.goodsDesc}}</div>
                </div>
                <div class="goods-price-num flexrbc">
                  <div class="goods-price pink">￥{{item.goodsPrice}}</div>
                  <div class="goods-num fz12 col9">X{{item.goodsNum}}</div>
                </div>
              </div>
            </div>
            <template #footer>
              <van-button size="small" round type="danger" @click="lookDetail(item.id)">查看详情</van-button>
            </template>
          </van-panel>
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
      list: [],
      status: ["未退款", "审核中", "已退款"]
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
    lookDetail(id) {
      this.$router.push({ name: "refundDetail", params: { id: id } });
    },
    getInfo() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/order/refundlist",
          params: {
            token: token,
            page: 0
          }
        })
        .then(function(res) {
          console.log(res, "success");
          _self.list = res.data.data;
          if (_self.list.length == 0) {
            _self.empty = true;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#refund {
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
.order-list-box {
  margin-top: 46px;
}
.list-box {
  margin-bottom: 10px;
}
.goods-info-box {
  background-color: #f4f4f4;
  padding: 10px;
}
.van-panel__footer {
  text-align: right;
}
.goodsImg {
  width: 100px;
  height: 100px;
}
.goods-desc {
  margin-top: 2px;
}
.goods-info-right {
  height: 100px;
  width: 100%;
  margin: 0 10px;
}
.van-button--danger {
  background-color: #ff48bd;
  border: 1px solid #ff48bd;
}
</style>