<template>
  <div id="content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="value in 16" :key="value">
          <div class="content-box">
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
              alt
              class="goods-img"
            />
            <div class="content-detail-box">
              <div class="content-detail-title col3 fz13">妙而曼红参阿胶五谷素1231351</div>
              <div class="content-detail-tags flexr fz9">
                <div class="content-detail-tag fz9">
                  <span>通气血</span>
                </div>
                <div class="content-detail-tag fz9">
                  <span>排毒素</span>
                </div>
                <div class="content-detail-tag fz9">
                  <span>补能量</span>
                </div>
              </div>
              <div class="content-detail-bottom flexrbe">
                <div class="content-detail-price red fz13">￥139</div>
                <div class="content-detail-cart-icon iconfont" @click="addCart(1)">&#xe668;</div>
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
      isLoading: false
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
  methods: {
    addCart(id) {
      this.$toast("添加购物车，ID为" + id);
    },
    jiekou() {
      this.$axios
        .get("https://yesno.wtf/api")
        .then(function(response) {
          console.log(response.data.answer);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //下拉刷新操作事件
    onRefresh() {
      setTimeout(() => {
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
  margin-bottom: 10px;
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