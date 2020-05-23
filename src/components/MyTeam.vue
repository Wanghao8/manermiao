<template>
  <div id="myTeam">
    <van-nav-bar title="我的团队" left-arrow @click-left="onClickLeft" />
    <div class="top-card-box fixed-margin">
      <div class="top-card">
        <div class="top-cad-left">
          <img :src="avatar" alt class="avatar" />
          <div class="card-info">
            <div class="card-info-left">
              <div class="card-username">{{username}}</div>
              <div class="card-level">Lv.{{level}}</div>
            </div>
          </div>
        </div>
        <div class="my-team-num fz12">我的团队{{list.totalnum}}人</div>
      </div>
    </div>
    <div class="team-menber-box">
      <van-empty
        v-if="empty"
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无团队成员，快去邀请"
      />
      <div v-for="item in list.info" :key="item.userId">
        <div class="meeting-box fz12">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">用户编号：</div>
            <div class="meeting-time-date col6">{{item.id}}</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">用户姓名：</div>
            <div class="meeting-theme-txt col6">{{item.username}}</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">手机号码：</div>
            <div class="meeting-address-txt col6">{{item.mobile}}</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-person-label col3">佣金价格：</div>
            <div class="meeting-person-txt col6">{{item.commmoney}}元</div>
          </div>
          <div class="meeting-person">
            <div class="meeting-person-label col3">注册时间：</div>
            <div class="meeting-person-txt col6">{{item.dateTime}}</div>
          </div>
        </div>
        <!-- <div class="team-num-spread">
          <div class="team-num-spnum">
            <div class="team-num">
              团队人数：
              <span class="nunber">{{item.teamNum}}</span>
            </div>
            <div class="spread-num">
              推广人数：
              <span class="nunber">{{item.speardNum}}</span>
            </div>
          </div>
          <div class="iconfont right-icon">&#xe605;</div>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      userInfo: {
        userName: "张三",
        level: 5,
        avatar:
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg",
        teamNum: 204
      },
      list: []
    };
  },
  created() {
    this.avatar = JSON.parse(window.localStorage.getItem("wxinfo")).headimgurl;
    this.username = JSON.parse(
      window.localStorage.getItem("userinfo")
    ).username;
    this.level = JSON.parse(window.localStorage.getItem("userinfo")).level;
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getInfo() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/myteam",
          params: {
            token: token,
            page: 1
          }
        })
        .then(function(res) {
          console.log(res);
          _self.list = res.data.data;
          console.log(res, "123", res.data.data);
          if (res.data.data.info.length == 0) {
            _self.empty = true;
          }
          res.data.data.info.forEach(function(item) {
            var time = new Date(item.createtime * 1000);
            var dateTime =
              time.getFullYear() +
              "." +
              (time.getMonth() + 1 + "").padStart(2, "0") +
              "." +
              (time.getDate() + "").padStart(2, "0") +
              " " +
              (time.getHours() + "").padStart(2, "0") +
              ":" +
              (time.getMinutes() + "").padStart(2, "0");
            item.dateTime = dateTime;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
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
.top-card-box {
  background-color: #fff;
  overflow: hidden;
  height: 130px;
  margin-bottom: 2px;
}
.top-card {
  width: 94%;
  height: 110px;
  background-color: #e569ab;
  margin: 9px 3%;
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