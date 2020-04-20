<template>
  <div id="myTeam">
    <van-nav-bar title="我的团队" left-arrow @click-left="onClickLeft" />
    <div class="top-card-box">
      <div class="top-card">
        <div class="top-cad-left">
          <img
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
            alt
            class="avatar"
          />
          <div class="card-info">
            <div class="card-info-left">
              <div class="card-username">王包子</div>
              <div class="card-level">Lv.5</div>
            </div>
          </div>
        </div>
        <div class="my-team-num fz12">我的团队204人</div>
      </div>
    </div>
    <div class="team-menber-box">
      <van-empty
        v-if="empty"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无团队成员，快去邀请"
      />
      <div class="meeting-box fz12">
        <div class="meeting-time">
          <div class="meeting-time-label col3 fw400">用户编号：</div>
          <div class="meeting-time-date col6">yhdsyhaya</div>
        </div>
        <div class="meeting-theme">
          <div class="meeting-theme-label col3">用户姓名：</div>
          <div class="meeting-theme-txt col6">王二狗</div>
        </div>
        <div class="meeting-address">
          <div class="meeting-address-label col3">手机号码：</div>
          <div class="meeting-address-txt col6">12345678958</div>
        </div>
        <div class="meeting-address">
          <div class="meeting-person-label col3">佣金价格：</div>
          <div class="meeting-person-txt col6">12元</div>
        </div>
        <div class="meeting-person">
          <div class="meeting-person-label col3">注册时间：</div>
          <div class="meeting-person-txt col6">2019-02-20 10:20:30</div>
        </div>
      </div>
      <div class="team-num-spread">
        <div class="team-num-spnum">
          <div class="team-num">
            团队人数：
            <span class="nunber">280</span>
          </div>
          <div class="spread-num">
            推广人数：
            <span class="nunber">10</span>
          </div>
        </div>
        <div class="iconfont right-icon">&#xe605;</div>
      </div>
    </div>
    <div class="team-menber-box">
      <div class="meeting-box fz12">
        <div class="meeting-time">
          <div class="meeting-time-label col3 fw400">用户编号：</div>
          <div class="meeting-time-date col6">yhdsyhaya</div>
        </div>
        <div class="meeting-theme">
          <div class="meeting-theme-label col3">用户姓名：</div>
          <div class="meeting-theme-txt col6">王二狗</div>
        </div>
        <div class="meeting-address">
          <div class="meeting-address-label col3">手机号码：</div>
          <div class="meeting-address-txt col6">12345678958</div>
        </div>
        <div class="meeting-address">
          <div class="meeting-person-label col3">佣金价格：</div>
          <div class="meeting-person-txt col6">12元</div>
        </div>
        <div class="meeting-person">
          <div class="meeting-person-label col3">注册时间：</div>
          <div class="meeting-person-txt col6">2019-02-20 10:20:30</div>
        </div>
      </div>
      <div class="team-num-spread">
        <div class="team-num-spnum">
          <div class="team-num">
            团队人数：
            <span class="nunber">280</span>
          </div>
          <div class="spread-num">
            推广人数：
            <span class="nunber">10</span>
          </div>
        </div>
        <div class="iconfont right-icon">&#xe605;</div>
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
.fz12 {
  font-size: 12px;
}
.fz14 {
  font-size: 14px;
}
.fz16 {
  font-size: 16px;
}
.fz18 {
  font-size: 18px;
}
.white {
  color: #fff;
}
.col6 {
  color: #666;
}
#myTeam {
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
.top-card-box {
  background-color: #fff;
  overflow: hidden;
  height: 130px;
  margin-bottom: 2px;
}
.top-card {
  width: 350px;
  height: 110px;
  background-color: #e569ab;
  margin: 9px 14px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-cad-left {
  display: flex;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 30px;
}
.card-info-left {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.meeting-box {
  background-color: #fff;
  padding: 20px;
  /* margin: 15px 0; */
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
.team-num-spread {
  background-color: #ffe6f6;
  color: #e37bb3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 2px;
}
.team-num-spnum {
  display: flex;
  margin-left: 15px;
}
.spread-num {
  margin-left: 28px;
}
.my-team-num {
  background-color: #ffe859;
  color: #fff;
  text-align: right;
  border-radius: 30px 0 0 30px;
  width: 95px;
  height: 30px;
  line-height: 30px;
}
</style>