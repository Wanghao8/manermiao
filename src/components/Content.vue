<template>
  <div id="content">
    <van-grid :border="false" :column-num="2">
      <van-grid-item v-for="value in 16" :key="value" >
        <div class="content-box">
          <img src="" alt="" class="goods-img">
          <div class="content-detail-box">
            <div class="content-detail-title">妙而曼红参阿胶五谷素···</div>
            <div class="content-detail-tags">
              <div class="content-detail-tag1">通气血</div>
              <div class="content-detail-tag2">排毒素</div>
              <div class="content-detail-tag3">补能量</div>
            </div>
            <div class="content-detail-bottom">
              <div class="content-detail-price">￥139</div>
              <div class="content-detail-cart-icon iconfont">&#xe668;</div>
            </div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
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
  margin: 10px 0 0 10px;flex-basis: 46%!important;
}
</style>