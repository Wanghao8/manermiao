<template>
  <div id="registered">
    <van-nav-bar title="注册信息" left-arrow @click-left="onClickLeft" />

    <!-- 弹出框 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <img @click.stop src="../../static/image/register.png" alt class="registered" />
      </div>
    </van-overlay>

    <!-- 表单 -->
    <div class="label">
      <div class="left-icon"></div>
      <div class="base-info" @click="login">基本信息</div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field name="radio" label="单选框">
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
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入您的邮箱"
        :rules="[{required: true, pattern:  emailRE, message: '请填写正确的邮箱号' }]"
      />
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
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeout: null,
      show: false,
      username: "",
      phoneNum: "",
      email: "",
      location: "",
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
  created() {},
  mounted() {
    var _self = this;

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     //locationSuccess 获取成功的话
    //     function(position) {
    //       _self.getLongitude = position.coords.longitude;
    //       _self.getLatitude = position.coords.latitude;
    //       alert(_self.getLongitude); //弹出经度测试
    //       alert(_self.getLatitude);
    //     },
    //     //locationError  获取失败的话
    //     function(error) {
    //       var errorType = [
    //         "您拒绝共享位置信息",
    //         "获取不到位置信息",
    //         "获取位置信息超时"
    //       ];
    //       alert(errorType[error.code - 1]);
    //     }
    //   );
    // }

    // _self.$axios.get("https://yesno.wtf/api").then(res => {
    //   _self.wx.config({
    //     debug: true, // 开启调试模式,
    //     appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    //     timestamp: res.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: res.nonceStr, // 必填，生成签名的随机串
    //     signature: res.signature, // 必填，签名，见附录1
    //     jsApiList: ["openLocation", "getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //   });
    //   _self.wx.ready(function() {
    //     console.log("jssdk成功");
    //   });
    //   _self.wx.error(function(res) {
    //     console.log("jssdk失败");
    //   });
    // });
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      var _self = this;
      console.log("submit", values);
      // window.localStorage.setItem("isSignup", true);
      this.show = true;
      this.upload();
      // this.timeout = null;
      // this.timeout = setTimeout(function() {
      //   _self.$router.push("mine");
      // }, 2000);
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.showDate = false;
    },
    getLocation() {
      var _self = this;
      // 腾讯地图逆地址解析API,跨域使用vue-jsonp
      // let url = "https://apis.map.qq.com/ws/geocoder/v1";
      // this.$jsonp(url, {
      //   location: "34.7593666700,113.6606653000",
      //   key: "JO5BZ-HWOKU-QSUV5-2MGN5-VYSQT-EPFTQ"
      // })
      //   .then(e => {
      //     console.log(e);
      //     //终于不会报跨域错误了！真乃神器也！
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });

      // _self.$axios
      //   .get("/ws/geocoder/v1", {
      //     params: {
      //       location: "34.7593666700,113.6606653000",
      //       key: "JO5BZ-HWOKU-QSUV5-2MGN5-VYSQT-EPFTQ"
      //     }
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //     // _self.list = response
      //     // _self.swiperImages = response
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      // 微信js-sdk获取当前位置的经纬度
      // _self.wx.getLocation({
      //   type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: function(res) {
      //     var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //     var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //     var speed = res.speed; // 速度，以米/每秒计
      //     var accuracy = res.accuracy; // 位置精度
      //     console.log(res)
      //   },
      //   fail(error){
      //     console.log(error)
      //   }
      // });

      // 高德地图逆地址解析
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "010"
        });

        // 经纬度
        var lnglat = [113.665412, 34.757993];

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
            username: _self.username,
            password: "123456",
            email: _self.email,
            mobile: _self.phoneNum,
            areaPath: _self.location,
            gender: radio,
            birthday: _self.value,
            lon: _self.lon,
            lat: _self.lat
          }
        })
        .then(function(res) {
          console.log(res);
          _self.token = res.data
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    login(){
      var _self = this;
      var radio = parseInt(_self.radio);
      _self
        .$axios({
          method: "post",
          url: "/api/user/login",
          params: {
            account: 'aaaaa',
            password: "123456",
          }
        })
        .then(function(res) {
          console.log(res);
          var userInfo = JSON.stringify(res.data.data.userinfo)
          window.localStorage.setItem('userinfo', userInfo)
        })
        .catch(function(err) {
          console.log(err);
        });
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
.van-cell /deep/ .van-radio__icon--checked .van-icon {
  background-color: #ff49bd;
  border-color: #ff49bd;
}
</style>