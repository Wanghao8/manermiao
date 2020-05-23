<template>
  <div id="editAddress">
    <van-nav-bar :title="navTitle" left-arrow @click-left="onClickLeft" />

    <van-address-edit
      :area-list="areaList"
      :address-info="info"
      show-delete
      show-set-default
      :tel-validator="phoneRE"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="editAdd(info.id,'del')"
      @change-default="changeDefault"
    />
  </div>
</template>
<script>
import areaList from "../../static/area.js";
export default {
  data() {
    return {
      navTitle: "修改地址",
      isDefault: false,
      info: {},
      areaList
    };
  },
  created() {
    if (this.$route.params.id < 0) {
      this.navTitle = "新增地址";
    } else {
      this.info = this.$route.params.info;
      this.isDefault = this.info.isDefault;
      console.log(this.info, 555);
    }
  },
  mounted() {},
  methods: {
    onClickLeft() {
      if (this.goods) {
        this.$toast("请选择地址");
      } else {
        this.$router.back();
      }
    },
    onSave(content) {
      console.log(content, "表单信息");
      if (this.$route.params.id < 0) {
        this.$toast("保存成功");
      } else {
        this.$toast("修改成功");
      }
      if (this.navTitle == "新增地址") {
        this.addAdd(content);
      } else {
        this.editAdd(this.$route.params.id, "edit", content);
      }
    },
    changeDefault(e) {
      this.isDefault = !this.isDefault;
    },
    onDelete() {
      this.$toast("delete");
    },
    phoneRE() {
      //这里定义校验规则
      let reg = /^1[3|4|5|7|8][0-9]{9}$/; //如果校验不通过会返回false，如果校验通过会返回true
      //校验手机号规则
      if (reg.test(this.$children[1].data.tel)) {
        return true;
      } else {
        console.log("正则失败");
      }
    },
    addAdd(content) {
      var _self = this;
      var isDefault;
      if (content.isDefault) {
        isDefault = 1;
      } else {
        isDefault = 0;
      }
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      _self
        .$axios({
          method: "post",
          url: "/api/user/addaddr",
          params: {
            token: token,
            userName: content.name,
            userPhone: content.tel,
            areaIdPath: content.province + content.city + content.county,
            userAddress: content.addressDetail,
            isDefault: isDefault
          }
        })
        .then(function(response) {
          console.log(response);
          _self.$router.back();
          // _self.$router.go({
          //   name: "myAddress",
          //   params: { isDefault: _self.isDefault, defaultId: _self.info.id }
          // });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editAdd(id, type, content) {
      var _self = this;
      var token = JSON.parse(window.localStorage.getItem("userinfo")).token;
      if (_self.isDefault) {
        var isDefault = 1;
      }else{
        var isDefault = 0;
      }

      if (type == "edit") {
        var userName = content.name;
        var userPhone = content.tel;
        var areaIdPath = content.province + content.city + content.county;
        var userAddress = content.addressDetail;
      }
      _self
        .$axios({
          method: "post",
          url: "/api/user/editaddr",
          params: {
            token: token,
            addrId: id,
            type: type,
            isDefault: isDefault,
            userName: userName,
            userPhone: userPhone,
            areaIdPath: areaIdPath,
            userAddress: userAddress
          }
        })
        .then(function(response) {
          console.log(response);
          _self.$router.back();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#editAddress {
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
.van-address-edit >>> .van-button--danger {
  background-color: #ff48bd !important;
  border: 1px solid #ff48bd !important;
}
</style>