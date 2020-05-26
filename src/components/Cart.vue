<template>
  <div id="cart">
    <van-nav-bar title="购物车" :right-text="operate" @click-right="onClickRight" />
    <van-empty
      v-if="empty"
      class="custom-image fixed-margin"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="购物车是空的"
    />
    <van-checkbox-group v-model="choosed" ref="checkboxGroup">
      <div class="goods-list-box" v-for="item in list" :key="item.id">
        <van-checkbox @click="chooseGoods" checked-color="#FF02FE" :name="item"></van-checkbox>
        <img class="goods-img" :src="item.goodsImg" alt />
        <div class="goods-list-right flexcb">
          <div class="goods-list-right-title fz13">{{item.goodsName}}</div>
          <!-- <div class="goods-list-right-format">
            <div class="goods-list-right-format-txt fz11 col9">20袋装</div>
            <div class="goods-list-right-format-icon iconfont">&#xe60b;</div>
          </div>-->
          <div class="goods-list-right-price-num">
            <div class="goods-list-right-price fz13 red">￥{{item.goodsPrice}}</div>
            <div class="goods-list-right-num">
              <van-stepper
                @plus="addNum(item.id)"
                @minus="delNum(item.id)"
                v-model="item.cartNum"
                disable-input
                input-width="20px"
                button-size="16px"
              />
            </div>
          </div>
        </div>
      </div>
    </van-checkbox-group>

    <div class="bottom-allcheck-box">
      <div class="bottom-allcheck-left">
        <van-checkbox
          checked-color="#FF02FE"
          class="all-checked"
          v-model="allChecked"
          @click="checkAll"
        ></van-checkbox>
        <div class="fz10 col3">全选</div>
      </div>
      <div class="bottom-allcheck-right">
        <div v-show="!isDelete" class="total-txt fz10">
          合计：
          <span class="red">￥{{total_price}}</span>
        </div>
        <div v-show="!isDelete" class="pay-button fz10" @click="settle">结算（{{total_quantity}}）</div>
        <div v-show="isDelete" class="delete-button" @click="deletaGoods">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeout: null,
      empty: false,
      choosed: [],
      allChecked: false,
      isDelete: false,
      operate: "编辑",
      list: []
    };
  },
  created() {
    var _self = this;
  },
  mounted() {
    this.getInfo();
  },
  computed: {
    total_price: function() {
      var _self = this;
      var total_price_now = 0;
      if (_self.choosed.length == 0) {
        return 0;
      } else {
        var total_price1 = _self.choosed.map(function(item) {
          if (_self.list[_self.list.indexOf(item)]) {
            total_price_now +=
              _self.list[_self.list.indexOf(item)].cartNum *
              _self.list[_self.list.indexOf(item)].goodsPrice;
          }
          return total_price_now;
        });
        return total_price1[total_price1.length - 1];
      }
    },
    total_quantity: function() {
      var _self = this;
      var total_quantity_now = 0;
      if (_self.choosed.length == 0) {
        return 0;
      } else {
        var total_quantity1 = _self.choosed.map(function(item) {
          if (_self.list[_self.list.indexOf(item)]) {
            total_quantity_now += _self.list[_self.list.indexOf(item)].cartNum;
          }
          return total_quantity_now;
        });
        return total_quantity1[total_quantity1.length - 1];
      }
    }
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight() {
      if (!this.isDelete) {
        this.isDelete = true;
        this.operate = "完成";
      } else {
        this.isDelete = false;
        this.operate = "编辑";
      }
    },
    editCart() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      var cartId = [];
      _self.choosed.forEach(item => {
        cartId.push(item.id);
      });
      _self
        .$axios({
          method: "post",
          url: "/api/goods/editcart",
          params: {
            token: token,
            cartId: cartId
          }
        })
        .then(function(response) {
          _self.getInfo();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeNum(type, id) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/goods/numbercart",
          params: {
            token: token,
            type: type,
            cartId: id
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addNum(item) {
      this.changeNum("add", item);
    },
    delNum(item) {
      this.changeNum("del", item);
    },
    getInfo() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/goods/cartslist",
          params: {
            token: token
          }
        })
        .then(function(response) {
          if (response.data.data.length === 0) {
            _self.empty = true;
          }
          _self.list = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    chooseGoods() {
      this.timeout = null;
      this.timeout = setTimeout(() => {
        if (this.choosed.length == this.list.length) {
          this.allChecked = true;
        } else {
          this.allChecked = false;
        }
      }, 100);
    },
    deletaGoods() {
      var _self = this;
      this.editCart();
      this.$toast("点击删除按钮");
      // _self.choosed.forEach(item2 => {
      //   _self.list.splice(item2,1)
      // });
    },
    settle() {
      if (this.choosed.length == 0) {
        this.$toast("您还没有选择商品");
      } else {
        this.$toast("点击结算按钮");
        this.$router.push({
          name: "confirmOrder",
          params: { goods: this.choosed, from: "c" }
        });
      }
    },
    checkAll() {
      if (!this.allChecked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    }
  }
};
</script>

<style scoped>
.red {
  color: #c1181a;
}
.marginleft8 {
  margin-left: 8px;
}
#cart {
  background-color: #e6e3e4;
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
.van-checkbox-group {
  margin-top: 56px;
  margin-bottom: 110px;
}
.goods-list-box {
  display: flex;
  background-color: #fff;
  margin: 3%;
  padding: 12px;
}
.goods-img {
  width: 100px;
  height: 100px;
  margin: 0 13px 0 0;
}
.van-checkbox >>> .van-checkbox__icon {
  margin-right: 13px;
}
.goods-list-right-title {
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap; */
  width: 190px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-list-right-format {
  display: flex;
  align-items: center;
  background-color: #e6e3e4;
  width: 26%;
  padding: 5px 10px;
  margin-top: 7px;
}
.goods-list-right-price-num {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.goods-list-right-price-num {
  margin-top: 25px;
}
.bottom-allcheck-box {
  position: fixed;
  bottom: 50px;
  width: 94%;
  padding: 3%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.bottom-allcheck-left,
.bottom-allcheck-right {
  display: flex;
  align-items: center;
}
.pay-button {
  background-color: #ff48bd;
  color: #fff;
  border-radius: 25px;
  width: 65px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  margin-left: 10px;
}
.delete-button {
  width: 65px;
  height: 23px;
  line-height: 23px;
  border: 1px solid #d6559a;
  color: #ff49bd;
  border-radius: 25px;
  text-align: center;
  font-size: 10px;
  margin-left: 9px;
}
.all-checked {
  margin-left: 12px;
}
</style>