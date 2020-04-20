<template>
  <div id="rechargeRecord">
    <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
     <van-empty
      v-if="empty"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无充值记录"
    />
    <div class="month-record-box">
      <div class="month-record-title fz16 col9">本月</div>
      <div class="month-record-list-box">
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">11/12</div>
          <div class="month-record-list-item-content fz14 col9">充值3000元</div>
        </div>
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">11/05</div>
          <div class="month-record-list-item-content col9 fz14">充值500元</div>
        </div>
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">11/01</div>
          <div class="month-record-list-item-content fz14 col9">充值950元</div>
        </div>
      </div>
      <div class="month-record-title fz16 col9">10月</div>
      <div class="month-record-list-box">
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">10/28</div>
          <div class="month-record-list-item-content fz14 col9">充值12490元</div>
        </div>
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">10/16</div>
          <div class="month-record-list-item-content fz14 col9">充值1000元</div>
        </div>
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">10/12</div>
          <div class="month-record-list-item-content fz14 col9">充值5020元</div>
        </div>
        <div class="month-record-list-item">
          <div class="month-record-list-item-date fz16 col9">10/05</div>
          <div class="month-record-list-item-content fz14 col9">充值3011元</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty:false
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped>
.fz16 {
  font-size: 16px;
}
.fz14 {
  font-size: 14px;
}
.col6{color: #666;}
.col9{color: #999;}
#rechargeRecord {
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
.month-record-title{padding: 12px;}
.month-record-list-box{background-color: #fff;}
.month-record-list-item{padding: 18px 12px;border-bottom: 1px solid #eee;display: flex;justify-content: flex-start;align-items: center;}
.month-record-list-item-content{margin-left: 70px;}



</style>