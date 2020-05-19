<template>
  <div id="upgradeRule">
    <van-nav-bar title="升级规则" left-arrow @click-left="onClickLeft" />
    <div class="top-box">
      <div class="top-tltle-level">
        <div class="top-title fz18 bold white">{{userInfo.username}}</div>
        <div class="top-level fz10">LV.{{userInfo.level}}</div>
      </div>
      <div class="status fz14 white">已获得{{userInfo.title}}级称号</div>
    </div>
    <div class="content-box">
      <div class="content-left">
        <img src="../../static/image/shangsheng.png" class="content-icon" />
        <div class="content-right-title fz14 col3">升级规则</div>
      </div>
      <div class="content-right">
        <div class="content-right-txt col3 fz12">
          <p>当需要晋级时，晋级前基础累计清0，到达晋级指标时则晋级下一级。</p>
          <p>晋级总代理时需要一次性付清4.68w或者首付1w不发货，1月内付完4.68w。否则晋级失败。</p>
          <p>晋级条件为自身和自身下级的所以账目为基准。</p>
          <p>如果三个月未有进货则取消身份（仅限于最低级用户）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      userInfo:{
        userName:'安琪拉',
        level:'3',
        title:'XX'
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    // this.getInfo();
  },
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getInfo() {
      var _self = this;
      _self
        .$axios({
          method: "get",
          url: "https://yesno.wtf/api"
          // data: {

          // }
        })
        .then(function(response) {
          console.log(response);
          // _self.list = response
          // _self.swiperImages = response
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
[class*="van-hairline"]::after {
  border: none;
}
.van-progress >>> .van-progress__pivot {
  display: none;
}
#upgradeRule {
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
.top-box {
  background-color: #ff48bd;
  height: 83px;
  padding: 20px;
}
.top-tltle-level {
  display: flex;
  margin: 12px;
  align-items: center;
}
.top-level {
  width: 44px;
  height: 15px;
  border: 1px solid #ff48bd;
  border-radius: 17px;
  background-color: #feb9e7;
  color: #d860ad;
  text-align: center;
  line-height: 17px;
  margin-left: 5px;
}
.status {
  margin-left: 12px;
}
.content-icon {
  height: 20px;
  width: 20px;
  margin-right: 3px;
}
.content-box {
  display: flex;
  flex-direction: column;
}
.content-left {
  display: flex;
  align-items: center;
  margin: 15px 0 0 12px;
}

.content-right-txt {
  padding: 12px 32px;
}
</style>
