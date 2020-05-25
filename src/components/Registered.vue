<template>
  <div id="registered">
    <van-nav-bar title="注册信息" left-arrow @click-left="onClickLeft" />

    <!-- 注册成功弹出框 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <img @click.stop src="../../static/image/register.png" alt class="registered" />
      </div>
    </van-overlay>
    <!-- 表单 -->
    <div class="label">
      <div class="left-icon"></div>
      <div class="base-info">基本信息</div>
    </div>
    <van-form v-if="mail">
      <!-- 短信验证 -->
      <div class="verify-phone flexc">
        <van-field v-model="phone" type="digit" placeholder="请输入您的手机号" label="手机号" />
        <div class="flexrbc">
          <van-field v-model="verifyCode" placeholder="请输入验证码" type="digit" label="验证码" />
          <div class="verify-btn" @click="sendVerify">
            获取验证码
            <span v-if="lastTime!=''">({{lastTime}})</span>
          </div>
        </div>
        <div class="verify-submit" @click="submitVerify">提交验证</div>
      </div>
      <div class="signuped" @click="signup">注册</div>
    </van-form>
    <van-form @submit="onSubmit" v-if="!mail">
      <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="calendar"
        :value="value"
        label="生日"
        placeholder="点击选择日期"
        @click="showDate = true"
        :rules="[{ required: true, message: '请选择生日' }]"
      />
      <!-- <van-calendar v-model="showCalendar" @confirm="onConfirm" /> -->
      <van-popup v-model="showDate" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        v-model="phoneNum"
        name="手机"
        label="手机"
        placeholder="请输入您的手机号"
        :rules="[{required: true, pattern: phoneRE, message: '请填写正确的手机号' }]"
      />
      <!-- <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入您的邮箱"
        :rules="[{required: true, pattern:  emailRE, message: '请填写正确的邮箱号' }]"
      /> -->
      <van-field
        :value="location"
        name="位置"
        label="位置"
        placeholder="点击获取您的位置"
        @click="getLocation"
        :rules="[{ required: true, message: '请获取位置' }]"
      />

      <div style="margin: 16px;">
        <van-button class="fz18" round block type="info" color="#ff48bd" native-type="submit">提交</van-button>
      </div>

      <div class="signuped" @click="login2">已有账号</div>
    </van-form>
  </div>
</template>
<script>
import { wxApi } from "../assets/js/wxApi.js";
export default {
  data() {
    return {
      code: "",
      timeout: null,
      show: false,
      mail: false,
      phone: "",
      verifyCode: "",
      lastTime: "",
      username: "",
      phoneNum: "",
      email: "",
      location: "",
      lnglat: [],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      radio: "1",
      value: "",
      lon: "113.665412",
      lat: "34.757993",
      showDate: false,
      phoneRE: /^1[3456789]\d{9}$/,
      emailRE: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
    };
  },
  beforeCreate() {
    // window.localStorage.clear();
  },
  created() {
    var _self = this;
    var code = wxApi.getUrlParams().code;
    if (wxApi.getUrlParams().code != undefined) {
      _self
        .$axios({
          method: "post",
          url: "/api/wei/getuseropenid",
          params: {
            code: code
          }
        })
        .then(function(res) {
          console.log(res, "openid");
          window.localStorage.setItem("wxinfo", JSON.stringify(res.data.data));
          window.localStorage.setItem("openid", res.data.data.openid);
          _self.login();
        })
        .catch(function(err) {
          console.log(err);
        });
    } else {
      _self
        .$axios({
          method: "post",
          url: "/api/wei/getcode"
        })
        .then(function(res) {
          console.log(res);
          // window.location.href = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    var _self = this;
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    getToken(code) {
      this.$ajax.get("", { code }, res => {
        if (res.data.code == 1) {
          localStorage.setItem("token", res.data.token);
          history.go(-2);
        }
      });
    },
    onClickLeft() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      var _self = this;
      console.log("submit", values);
      this.upload();
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.showDate = false;
    },
    getLocation() {
      var _self = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            _self.lnglat = result.rectangle.split(";")[0];
            _self.lnglat = _self.lnglat.split(",");
            _self.lon = parseFloat(_self.lnglat[0]);
            _self.lat = parseFloat(_self.lnglat[1]);
          }
        });
      });

      // AMap.plugin('AMap.Geolocation', function () {
      //   var geolocation = new AMap.Geolocation({
      //     // 是否使用高精度定位，默认：true
      //     enableHighAccuracy: true,
      //     // 设置定位超时时间，默认：无穷大
      //     timeout: 5000,
      //   })
      //   geolocation.getCurrentPosition()
      //   AMap.event.addListener(geolocation, 'complete', onComplete);
      //   AMap.event.addListener(geolocation, 'error', onError);
      //   // data是具体的定位信息
      //   function onComplete(data) {
      //     console.log('具体的定位信息',data)
      //   }
      //   function onError(data) {
      //     // 失败 启用 ip定位

      //   }
      // })

      // 高德地图逆地址解析
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "010"
        });

        // 经纬度
        var lnglat = [];
        lnglat.push(_self.lon);
        lnglat.push(_self.lat);
        console.log(lnglat, 12);
        // return

        geocoder.getAddress(lnglat, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            console.log(result.regeocode.formattedAddress);
            _self.location = result.regeocode.formattedAddress;
          }
        });
      });
      _self.$toast("获取位置");
    },
    upload() {
      var _self = this;
      var radio = parseInt(_self.radio);
      _self
        .$axios({
          method: "post",
          url: "/api/user/register",
          params: {
            pid: 0,
            username: _self.username,
            password: "123456",
            // email: _self.email,
            mobile: _self.phoneNum,
            areaPath: _self.location,
            gender: radio,
            birthday: _self.value,
            lon: _self.lon,
            lat: _self.lat,
            openid: window.localStorage.getItem("openid"),
            avatar:JSON.parse(window.localStorage.getItem("wxinfo")).headimgurl
          }
        })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 1) {
            _self.token = res.data;
            _self.show = true;
            _self.login();
          } else {
            _self.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    login() {
      var _self = this;
      var radio = parseInt(_self.radio);
      _self
        .$axios({
          method: "post",
          url: "/api/user/login",
          params: {
            openid: window.localStorage.getItem("openid")
          }
        })
        .then(function(res) {
          if (res.data.msg == "登录成功") {
            var userInfo = JSON.stringify(res.data.data.userinfo);
            window.localStorage.setItem("userinfo", userInfo);
            _self.$toast("登陆成功");
            _self.timeout = null;
            _self.timeout = setTimeout(function() {
              _self.$router.push({ name: "mine" });
            }, 2000);
          } else {
            _self.$toast(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    login2() {
      var _self = this;
      _self.mail = true;
    },
    sendVerify() {
      var _self = this;
      if (_self.lastTime == "") {
        _self
          .$axios({
            method: "post",
            url: "/api/Sms/send",
            params: {
              mobile: _self.phone,
              event: "register"
            }
          })
          .then(function(res) {
            console.log(res, res.data.msg, "res");
            _self.$toast(res.data.msg);
            _self.lastTime = 60;
            var daojishi = setInterval(function() {
              _self.lastTime--;
              if (_self.lastTime == 0) {
                _self.lastTime = "";
                clearInterval(daojishi);
              }
            }, 1000);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        _self.$toast("请稍后再获取");
      }
    },
    submitVerify() {
      // this.mail = false;
      var _self = this;
      _self
        .$axios({
          method: "post",
          url: "/api/user/verification",
          params: {
            mobile: _self.phone,
            wxopenid: window.localStorage.getItem("openid"),
            code: _self.verifyCode,
            avatar: JSON.parse(window.localStorage.getItem("wxinfo")).headimgurl
          }
        })
        .then(function(res) {
          console.log(res, res.data.msg, "res");
          _self.login();
          // var userInfo = JSON.stringify(res.data.data.userinfo);
          // window.localStorage.setItem("userinfo", userInfo);
          // _self.timeout = null;
          // _self.timeout = setTimeout(function() {
          //   _self.$router.push({ name: "mine" });
          // }, 2000);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    signup() {
      this.mail = false;
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.registered {
  width: 280px;
  height: 200px;
  /* background-color: #fff; */
  border-radius: 10px;
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
.label {
  display: flex;
  align-items: center;
  padding: 20px;
}
.left-icon {
  width: 4px;
  height: 20px;
  border-radius: 4px;
  background-color: #ff49bd;
  margin-right: 8px;
}
.van-cell {
  flex: 1;
}
.van-cell /deep/ .van-radio__icon--checked .van-icon {
  background-color: #ff49bd;
  border-color: #ff49bd;
}
.signuped {
  font-size: 16px;
  color: #3088ff;
  text-align: center;
}
.signuped:hover {
  cursor: pointer;
  text-decoration: underline;
}
/* .verify-phone {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
} */
.verify-btn {
  background-color: #fff;
  line-height: 42px;
  border: 1px solid #f4f4f4;
  padding: 0 10px;
}
.verify-submit {
  background-color: #ff48bd;
  color: #fff;
  text-align: center;
  line-height: 44px;
  border-radius: 44px;
  width: 90%;
  margin: 10px 0 10px 5%;
}
</style>