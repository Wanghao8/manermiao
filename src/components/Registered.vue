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
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" color="#ff48bd" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
        username: '',
      password: '',
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
     onSubmit(values) {
      console.log('submit', values);
    },
  }
};
</script>

<style scoped>
.fz18{font-size: 18px;}
.col6{color: #666;}
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
.label{display: flex;align-items: center;padding: 20px;}
.left-icon{width: 4px;height: 20px;border-radius: 4px;background-color: #FF49BD;margin-right: 8px;}


</style>