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
      chosenAddressId: "0",
      from: "",
      list: []
    };
  },
  created() {
    var aaa = this.$route.params.from;
    this.from = this.$route.params.from;
    this.goods = this.$route.params.goods;
    console.log(aaa);
  },
  mounted() {
    if (this.$route.params.isDefault) {
      this.chosenAddressId = this.$route.params.defaultId;
    }
    this.getinfo();
  },
  methods: {
    onClickLeft() {
      if (this.goods) {
        this.$toast("请选择地址");
      } else {
        this.$router.back();
      }
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
    chooseAdd(item, index) {
      var from = this.from;
      var _self = this;
      console.log("index is", item.id);
      this.chosenAddressId = item.id
      this.$toast("选择此条地址");
      if (from) {
        console.log(555);
        this.$router.push({
          name: from,
          params: { info: item, goods: _self.goods }
        });
      } else {
        console.log(666);
      }
    },
    getinfo() {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/addrlist",
          params: {
            token: token,
            page: 1
          }
        })
        .then(function(response) {
          console.log(response, "dizhi");
          var addlist = response.data.data;
          _self.list = addlist.map(function(item) {
            var list = {}
            list.id = item.id;
            list.name = item.userName;
            list.tel = item.userPhone;
            list.address = item.areaIdPath + item.userAddress;
            list.isDefault = item.isDefault==1?true:false
            return list
          });
          console.log(_self.list, "dizhi++++");
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
.van-address-item:last-child{
  margin-bottom: 60px;
}
</style>