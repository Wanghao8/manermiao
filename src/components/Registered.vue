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
      <div class="base-info">基本信息</div>
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
        v-model="location"
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
      showDate: false,
      phoneRE: /^1[3456789]\d{9}$/,
      emailRE: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
    };
  },
  created() {
    
  },
  mounted(){},
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
      this.show = true;
      var timeout = null;
      timeout = setTimeout(function() {
        _self.$router.push("mine");
      }, 2000);
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.showDate = false;
    },
    getLocation() {
      this.$toast("获取位置");
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