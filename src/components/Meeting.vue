<template>
  <div id="meeting">
    <van-nav-bar title="会议信息" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" color="#ff48bd">
      <van-tab title="待开会议">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无待开会议"
        />
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">申请时间：</div>
            <div class="meeting-person-txt col6">2020-04-17 12:48:32</div>
          </div>
        </div>
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">申请时间：</div>
            <div class="meeting-person-txt col6">2020-04-17 12:48:32</div>
          </div>
        </div>
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">申请时间：</div>
            <div class="meeting-person-txt col6">2020-04-17 12:48:32</div>
          </div>
        </div>
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">申请时间：</div>
            <div class="meeting-person-txt col6">2020-04-17 12:48:32</div>
          </div>
        </div>
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">申请时间：</div>
            <div class="meeting-person-txt col6">2020-04-17 12:48:32</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="历史记录">
        <van-empty
          v-if="empty1"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无会议历史"
        />
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">参会人员：</div>
            <div class="meeting-person-txt col6">露西、黛西、安娜</div>
          </div>
        </div>
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">3月8日</div>
            <div class="meeting-time-week col6">周三</div>
            <div class="meeting-time-time col6">15:30~16:00</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">三八妇女节会议</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">未来城3F 302会议室</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">参会人员：</div>
            <div class="meeting-person-txt col6">露西、黛西、安娜</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      empty:false,
      empty1:false,
      active: 2
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  },
  components: {}
};
</script>

<style  scoped>
.fw400 {
  font-weight: 400;
}
#meeting {
  background-color: #e4e4e6;
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
.van-tabs>>>.van-tabs__wrap{
  position: fixed;
  width: 100%;
  top: 46px;
}
.van-tabs>>>.van-tabs__content{margin-top: 105px;}
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
.meeting-box {
  background-color: #fff;
  padding: 20px;
  margin: 15px 0;
}
.meeting-time,
.meeting-theme,
.meeting-address,
.meeting-person {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.meeting-person {
  margin-bottom: 0;
}
.meeting-time-label,
.meeting-theme-label,
.meeting-address-label,
.meeting-person-label {
  margin-right: 17px;
}
.meeting-time-week {
  margin: 0 30px 0 18px;
}
</style>
