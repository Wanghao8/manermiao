<template>
  <div id="content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="item in list" :key="item.id">
          <div class="content-box" @click="gotoDetail(item.id)">
            <img :src="item.goodsImg" alt='load fail' class="goods-img" />
            <div class="content-detail-box">
              <div class="content-detail-title col3 fz13">{{item.goodsName}}</div>
              <div class="content-detail-tags flexr fz9">
                <!-- <div class="content-detail-tag fz9" v-for="items in item.tags" :key="items">
                  <span>{{items}}</span>
                </div>-->
              </div>
              <div class="content-detail-bottom flexrbe">
                <div class="content-detail-price red fz13">￥{{item.level1Price}}</div>
                <div
                  class="content-detail-cart-icon iconfont"
                  @click.stop="addCart(item.id)"
                >&#xe668;</div>
                <!-- <div class="content-detail-cart-icon iconfont" @click="addCart(item.id)">&#xe668;</div> -->
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeout: null,
      isLoading: false,
      list: []
    };
  },
  props: {
    packageIndex: {
      type: Number,
      required: true
    }
  },
  created() {},
  mounted() {
    console.log(this.packageIndex);
    this.jiekou();
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    addCart(id) {
      this.$toast("添加购物车，ID为" + id);
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          methods: "post",
          url: "/api/goods/addcart",
          params: {
            token: token,
            goodsId: id,
            cartNum: 1
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gotoDetail(id) {
      this.$router.push({ name: "goodsDetail", params: { id: id } });
    },
    jiekou() {
      var _self = this;
      var id = this.packageIndex;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      console.log("diaoyongjiekou");
      this.$axios({
        method: "post",
        url: "/api/goods/goodslist",
        params: {
          page: 1,
          token: token
        }
      })
        .then(function(response) {
          console.log(response.data.data);
          _self.list = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //下拉刷新操作事件
    onRefresh() {
      this.timeout = null;
      this.timeout = setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    }
  }
};
</script>

<style scoped>
#content {
  background-color: #e4e4e4;
  overflow: auto;
  height: 80vh;
  width: 100%;
}
.van-grid {
  margin-bottom: 20px;
}
.van-grid >>> .van-grid-item {
  margin: 10px 0 0 10px;
  flex-basis: 46% !important;
}
.van-grid /deep/ .van-grid-item__content {
  padding: 0;
}
.goods-img {
  width: 100%;
  height: 173px;
}
.content-detail-box {
  padding: 10px;
}
.van-grid >>> .content-detail-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
}
.top-tab {
  line-height: normal;
}
.content-detail-tag {
  width: 33px;
  height: 10px;
  border: 1px solid #ef9def;
  color: #ef9def;
  font-size: 60%;
  -webkit-text-size-adjust: none;
  padding: 1px;
  margin-right: 2px;
  margin-bottom: 10px;
}
.content-detail-tag span {
  transform: scale(0.6);
}
</style>