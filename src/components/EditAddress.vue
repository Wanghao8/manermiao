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
      @delete="onDelete"
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
      info: {},
      areaList
    };
  },
  created() {
    if (this.$route.params.id < 0) {
      this.navTitle = "新增地址";
    } else {
      this.info = this.$route.params.info;
    }
  },
  mounted(){
    this.getinfo()
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onSave(content) {
      console.log(content);
      
      if (this.$route.params.id < 0) {
        this.$toast("保存成功");
      } else {
        this.$toast("修改成功");
      }
      this.$router.push({name:'myAddress',params:{isDefault:this.isDefault,defaultId:this.info.id}})
    },
    changeDefault(e){
      this.isDefault = e
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
     getinfo() {
      var _self = this
      _self.$axios({
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