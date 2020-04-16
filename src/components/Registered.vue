<template>
  <div id="registered">
    <van-nav-bar title="注册信息" left-arrow @click-left="onClickLeft" />

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
        v-model="username"
        name="手机"
        label="手机"
        placeholder="请输入您的手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="username"
        name="邮箱"
        label="邮箱"
        placeholder="请输入您的邮箱"
        :rules="[{ required: true, message: '请填写邮箱号' }]"
      />
      <van-field v-model="username" name="位置" label="位置" placeholder="点击获取您的位置" @click="getLocation" />

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
      username: "",
      password: "",
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2020, 0, 1),
      currentDate: new Date(),
      radio: "1",
      value: "",
      showDate: false
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.showDate = false;
    },
    getLocation(){
      this.$toast("获取位置")
    }
  }
};
</script>

<style scoped>
.fz18 {
  font-size: 18px;
}
.col6 {
  color: #666;
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
</style>