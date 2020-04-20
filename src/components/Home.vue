<template>
  <div id="Home">
    <van-nav-bar
      title="首页"
    />
    <!-- <div class="topNav">
      <div class="leftIcon">
        <van-icon name="chat-o" size="16" />
        <div class="botword">消息</div>
      </div>
      <van-search
        class="search"
        :value="searchContent"
        shape="round"
        background="#FF49BD"
        placeholder="搜索您想要的商品"
        use-action-slot
        left-icon="none"
        right-icon="search"
        bind:change="onChange"
        bind:search="onSearch"
      ></van-search>
      <div class="rightIcon" @click="navigate">
        <van-icon name="apps-o" size="16" />
        <div class="botword">列表</div>
      </div>
    </div> -->
    <div class="swiperbox">
      <van-swipe :autoplay="3000" indicator-color="#FE18FB">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="swiperImg" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="bottomTxt">
      <div class="left-icon">
        <div class="sign"></div>
        <div class="label">爆单信息</div>
      </div>
      <div class="right-icon">
        <div class="content">更多</div>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="list-container">
      <div class="list-item">
        <div class="list-item-top">
          <div class="list-item-top-left">
            <div class="list-avatar">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="list-avatar-img"
              />
            </div>
            <div class="list-username">好好先生</div>
          </div>
          <div class="list-level">Lv.1</div>
        </div>
        <div class="list-item-content">
          <div class="list-item-content-left">
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
              alt
              class="list-item-content-img"
            />
          </div>
          <div class="list-item-content-right">
            <div class="list-item-content-title">富勒烯多肽面膜</div>
            <div class="list-item-content-detail two-line">富勒烯多肽黑面膜满足你肌肤的挑剔要求，减缓细纹，补水 保湿、收缩毛孔、肌肤透亮富勒烯多肽黑面膜满足你肌肤的挑剔要求，减缓细纹，补水 保湿、收缩毛孔、肌肤透亮</div>
          </div>
        </div>
        <div class="list-item-bottom">2020.03.06</div>
      </div>

      <div class="list-item">
        <div class="list-item-top">
          <div class="list-item-top-left">
            <div class="list-avatar">
              <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
                alt
                class="list-avatar-img"
              />
            </div>
            <div class="list-username">好好先生</div>
          </div>
          <div class="list-level">Lv.1</div>
        </div>
        <div class="list-item-content">
          <div class="list-item-content-left">
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=245502197,1356326955&fm=26&gp=0.jpg"
              alt
              class="list-item-content-img"
            />
          </div>
          <div class="list-item-content-right">
            <div class="list-item-content-title">富勒烯多肽面膜</div>
            <div class="list-item-content-detail two-line">富勒烯多肽黑面膜满足你肌肤的挑剔要求，减缓细纹，补水 保湿、收缩毛孔、肌肤透亮富勒烯多肽黑面膜满足你肌肤的挑剔要求，减缓细纹，补水 保湿、收缩毛孔、肌肤透亮</div>
          </div>
        </div>
        <div class="list-item-bottom">2020.03.06</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchContent: "",
      images: [
        "../../static/image/homeSwiper1.jpg",
        "../../static/image/homeSwiper2.jpg",
        "../../static/image/homeSwiper3.png",
      ]
    };
  },
  mounted(){

  },
  methods: {
    navigate() {
      console.log(123);
      this.$router.push({ path: "/list" });
    },
    gotoDetail() {
      console.log("123detail");
      this.$router.push({ path: "/detail" });
    },
    getinfo(){
      
    }
  }
};
</script>

<style scoped>

.van-nav-bar {width: 100% !important;background-color: #FF48BD;}
.van-nav-bar >>> .van-icon {color: #fff !important;}
.van-nav-bar >>> .van-nav-bar__title{color: #fff;font-size: 16px;}
.van-nav-bar >>> .van-nav-bar__text{font-size: 13px;color: #fff;}
#Home {
  background-color: #f1f1f1;
  overflow: auto;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
}
.topNav {
  width: 100%;
  height: 44px;
  display: flex;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #ff49bd;
}
.leftIcon,
.rightIcon {
  background-color: #ff49bd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: #eee;
  flex-shrink: 0;
}
.botword{font-size: 12px;}
.van-search {
  flex-grow: 1;
}
.van-search__content {
  height: 120%;
  padding: 0;
  background-color: #fec4ea;
}
.van-cell {
  font-size: 10px;
}
.van-field__control {
  color: #fff;
}
.swiperbox {
  background-color: #fff;
  /* margin-top: 44px; */
  overflow: hidden;
}
.van-swipe-item{height: 160px;}
.van-field__left-icon {
  width: 0;
}
.swiperImg {
  width: 100%;
  height: 100%;
}
.bottomTxt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  background-color: #fff;
  padding: 10px 7px;
}
.left-icon,
.right-icon {
  display: flex;
  align-items: center;
}
.label {
  font-size: 15px;
}
.sign {
  width: 2.5px;
  height: 20px;
  border-radius: 2.5px;
  background-color: #ff49bd;
  margin-right: 9px;
}
.content {
  font-size: 11px;
}
.van-icon-arrow {
  font-size: 11px;
}
.van-button--normal {
  margin: 0 10px;
}
.van-button {
  line-height: 20px;
  height: 20px;
}
.list-container {
  background-color: #f1f1f1;
  margin: 7px;
  overflow: hidden;
  border-radius: 5px;
}
.list-item {
  margin-bottom: 3px;
  padding: 10px;
  background-color: #fff;
}
.list-item:last-child {
  margin-bottom: 0;
}
.list-item-top {
  display: flex;
  justify-content: space-between;
}
.list-item-top-left {
  display: flex;
  align-items: center;
}
.list-avatar-img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.list-username {
  font-size: 13px;
  margin-left: 5px;
}
.list-level {
  font-size: 10px;
}
.list-item-content {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.list-item-content-right {
  margin-left: 9px;
}
.list-item-content-title {
  font-size: 12px;
}
.list-item-content-detail {
  font-size: 10px;
}
.list-item-content-left {
  margin-left: 33px;
}
.list-item-content-img {
  width: 40px;
  height: 40px;
  border-radius: 6%;
}
.list-item-bottom {
  font-size: 9px;
  display: flex;
  justify-content: flex-end;
}
</style>