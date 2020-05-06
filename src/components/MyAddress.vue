<template>
  <div id="myAddress">
    <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />
    <van-empty
      v-if="empty"
      class="custom-image fixed-margin"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无地址，请添加"
    />
    <van-address-list
      class="fixed-margin"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @click-item="chooseAdd"
    />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      empty: false,
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13812345678",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "13587654321",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        },
        {
          id: "3",
          name: "王二",
          tel: "13587654321",
          address: "江西省南昌市拱墅区莫干山路 50 号"
        },
        {
          id: "4",
          name: "里的",
          tel: "13587654321",
          address: "北京市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  created() {},
  mounted() {
    if (this.$route.params.isDefault) {
      this.chosenAddressId = this.$route.params.defaultId;
    }
    this.getinfo()
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onAdd() {
      this.$toast("新增地址");
      this.$router.push({ name: "editAddress", params: { id: -1 } });
    },
    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
      this.$router.push({
        name: "editAddress",
        params: { id: index, info: item }
      });
    },
    chooseAdd() {
      this.$toast("选择此条地址");
    },
    getinfo() {
      var _self = this;
      _self
        .$axios({
          method: "get",
          url: "/address/index"
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
  }
};
</script>

<style scoped>
#myAddress {
  background-color: #e4e4e4;
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
.van-address-list >>> .van-address-item .van-radio__icon--checked .van-icon {
  background-color: #ff48bd;
  border-color: #ff48bd;
}
.van-button--danger {
  background-color: #ff48bd;
  border: 1px solid #ff48bd;
}
</style>