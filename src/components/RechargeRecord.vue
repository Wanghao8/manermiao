<template>
  <div id="rechargeRecord">
    <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
    <van-empty
      v-if="empty"
      class="custom-image fixed-margin"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无充值记录"
    />
    <div class="month-record-box fixed-margin">
      <div class="month-record-title fz16 col9">本月</div>
      <div class="month-record-list-box">
        <div class="month-record-list-item" v-for="item in list" :key="item.id">
          <div class="month-record-list-item-date fz16 col9">{{item.date}}</div>
          <div class="month-record-list-item-content fz14 col9">{{item.event}}</div>
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
      empty: false,
      list: [
        {
          date:'11/12',
          event:'充值5020元'
      },
        {
          date:'11/05',
          event:'充值500元'
      },
        {
          date:'11/01',
          event:'充值20元'
      },
      ]
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
          // _self.list = response
          // _self.swiperImages = response
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
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
.month-record-title {
  padding: 12px;
}
.month-record-list-box {
  background-color: #fff;
}
.month-record-list-item {
  padding: 18px 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.month-record-list-item-content {
  margin-left: 70px;
}
</style>