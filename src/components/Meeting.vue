<template>
  <div id="meeting">
    <van-nav-bar title="会议信息" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" color="#ff48bd" @click="switchContent">
      <van-tab title="待开会议">
        <van-empty
          v-if="empty"
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无待开会议"
        />
        <div class="meeting-box fz12" v-for="item in list" :key="item.id">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">{{item.smonth}}月{{item.sday}}日</div>
            <div class="meeting-time-week col6">{{item.week}}</div>
            <div
              class="meeting-time-time col6"
            >{{item.shour}}:{{item.sminute}}~{{item.ehour}}:{{item.eminute}}</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">{{item.meetName}}</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">{{item.areapath}}</div>
          </div>
          <div class="join-meeting-box" v-if="item.ismeet==0">
            <div class="join-meeting" @click="join(item.id)">报名参加</div>
          </div>
          <div class="join-meeting-box" v-if="item.ismeet!=0">
            <div class="join-meeting" @click="joined">已参与</div>
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
        <div class="meeting-box fz12" v-for="item in list" :key="item.id">
          <div class="meeting-time">
            <div class="meeting-time-label col3 fw400">会议时间：</div>
            <div class="meeting-time-date col6">{{item.smonth}}月{{item.sday}}日</div>
            <div class="meeting-time-week col6">{{item.week}}</div>
            <div
              class="meeting-time-time col6"
            >{{item.shour}}:{{item.sminute}}~{{item.ehour}}:{{item.eminute}}</div>
          </div>
          <div class="meeting-theme">
            <div class="meeting-theme-label col3">会议主题：</div>
            <div class="meeting-theme-txt col6">{{item.meetName}}</div>
          </div>
          <div class="meeting-address">
            <div class="meeting-address-label col3">会议地址：</div>
            <div class="meeting-address-txt col6">{{item.areapath}}</div>
          </div>
          <!-- <div class="meeting-person">
            <div class="meeting-person-label col3">参会人员：</div>
            <div class="meeting-person-txt col6">露西、黛西、安娜</div>
          </div> -->
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
      empty: false,
      empty1: false,
      active: 2,
      list: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.toBeHeld();
  },
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    switchContent(name, title) {
      if (name === 0) {
        this.toBeHeld();
      } else {
        this.getHistory();
      }
    },
    join(id) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/addmeet",
          params: {
            token: token,
            meetId: id
          }
        })
        .then(function(res) {
          _self.$toast("报名成功");
          _self.$router.go(0)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    joined(){
      this.$toast('您已经参与')
    },
    toBeHeld() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/meetlist",
          params: {
            token: token,
            page: 1
          }
        })
        .then(function(res) {
          console.log(res.data.data, "daikai");
          var list = res.data.data;
          list.forEach(function(item) {
            var date = new Date(item.meetStarttime * 1000);
            item.smonth = date.getMonth() + 1;
            item.sday = date.getDate();
            item.shour = date.getHours();
            item.sminute = date.getMinutes();
            item.week = "周" + "日一二三四五六".charAt(date.getDay());
            var date2 = new Date(item.meetEndtime * 1000);
            item.ehour = date2.getHours();
            item.eminute = date2.getMinutes();
          });
          _self.list = list;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getHistory() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/meetlog",
          params: {
            token: token,
            page: 1
          }
        })
        .then(function(res) {
          console.log(res.data.data, "lishijilu");
          _self.list1 = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
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
.van-tabs >>> .van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 46px;
}
.van-tabs >>> .van-tabs__content {
  margin-top: 105px;
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
.join-meeting {
  background-color: #ff48bd;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  width: 60px;
  text-align: center;
  border-radius: 6px;
}
</style>
