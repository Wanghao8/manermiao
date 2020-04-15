<template>
  <div id="signupCenter">
    <van-nav-bar title="报名中心" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="姓名"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="phone"
        name="手机"
        label="手机"
        placeholder="请输入您的手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="idcard"
        name="身份证号"
        label="身份证号"
        placeholder="请输入您的身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />
      <div class="addSignup" @click="addSignup">
        <img src="../../static/image/addIcon.png" alt class="addIcon" />
        <div class="addTxt pink fz14">添加报名人信息</div>
      </div>
      <div style="margin: 16px;" @click="comfirm">
        <van-button
          class="bold fz18"
          round
          block
          color="#ff48bd"
          type="info"
          native-type="submit"
        >确认报名</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      username: "",
      phone: "",
      idcard: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    addSignup() {
      this.$toast("添加报名人");
    },
    comfirm() {
      this.$toast("确认，表单提交");
    }
  },
  components: {}
};
</script>

<style  scoped>
.pink {
  color: #ff48bd;
}
.fz18 {
  font-size: 18px;
}
.fz14 {
  font-size: 14px;
}
#signupCenter {
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
.addSignup {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px;
  margin-bottom: 50px;
}
.addIcon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}
</style>
