<template>
  <div id="spreadQRcode">
    <van-nav-bar title="我的推广码" left-arrow @click-left="onClickLeft" />
    <div class="top-background"></div>
    <div class="QR-box">
      <img src="../../static/image/QR-border.png" alt class="QR-border" />
      <!-- <div class="QR-border"></div>
      <div id="qrcode" ref="qrcode" class="QRcode"></div>-->
      <div id="code">
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <div class="look-myQR bold" @click="saveQR">长按图片保存推广码</div>
    <div class="look-myteam bold" @click="lookTeam">查看我的团队</div>
  </div>
</template>
<script>
// import QRCode from "qrcodejs2";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
  data() {
    return {};
  },
  components: {
    QRcode: QRCode //注册组件
  },
  mounted() {
    var pid = JSON.parse(window.localStorage.getItem("userinfo")).id;
    // this.payOrder(pid);
    var url = "https://www.hnkmx.com/index/index/register?pid=" + pid;
    this.getUrl(url)
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    getUrl(xxx) {
      var canvas = document.getElementById("canvas"); //获取到canvas
      var code = document.getElementById("code"); //获取到code容器
      QRCode.toCanvas(canvas, xxx, error => {
        if (error) console.error(error);
        console.log("success!");
      });
      var image = new Image(); //实例一个img
      image.src = canvas.toDataURL("image/png"); //转换成base64格式路径的png图片
      image.style.width = "180px"; //设置样式
      image.style.height = "180px"; //设置样式
      image.style.position = "absolute"; //设置样式
      image.style.top = "50%"; //设置样式
      image.style.left = "50%"; //设置样式
      image.style.transform = "translate(-50%, -50%)"; //设置样式
      image.style.borderRadius = "20px"; //设置样式
      code.appendChild(image); //添加到code 容器中
      canvas.style.display = "none"; //隐藏掉canvas
    },
    saveQR() {
      this.$toast("长按图片保存推广码");
      // 微信js-sdk保存图片
      // _self.wx.downloadImage({
      //   serverId: "", // 需要下载的图片的服务器端ID，由uploadImage接口获得
      //   isShowProgressTips: 1, // 默认为1，显示进度提示
      //   success: function(res) {
      //     var localId = res.localId; // 返回图片下载后的本地ID
      //   }
      // });
    },
    lookTeam() {
      this.$router.push("myTeam");
    },
    createPicture() {
      html2canvas(this.$refs.qrcode, {
        backgroundColor: null,
        width: 165,
        height: 165
      })
        .then(canvas => {
          var imgData = canvas.toDataURL("image/jpeg");
          this.imgData = imgData;
          console.log(imgData, "imgdata");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 展示二维码
    payOrder(pid) {
      this.innerVisible = true;
      // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
      this.qrcode = "https://www.hnkmx.com/index/index/register?pid=" + pid;
      console.log(this.qrcode);
      // 使用$nextTick确保数据渲染
      this.$nextTick(() => {
        this.crateQrcode();
      });
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 165,
        height: 165, // 高度
        text: this.qrcode // 二维码内容
      });
      // console.log(this.qrcode)
      // this.createPicture()
    },
    // 关闭弹框,清除已经生成的二维码
    closeCode() {
      this.$refs.qrcode.innerHTML = "";
    }
  }
};
</script>

<style scoped>
[class*="van-hairline"]::after {
  border: none;
}
.van-progress >>> .van-progress__pivot {
  display: none;
}
.fz19 {
  font-size: 19px;
}
.bold {
  font-weight: bold;
}
#spreadQRcode {
  background-color: #f8f6f9;
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
.top-background {
  background-color: #ff48bd;
  height: 150px;
}

.QR-box {
  width: 350px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 60px;
  margin-left: -175px;
  background-color: #fff;
}
.QR-border {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -113px;
  width: 220px;
  height: 220px;
  background: url(../../static/image/QR-border.png);
  background-size: 220px 220px;
}
.QRcode {
  width: 165px;
  height: 165px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25%;
}
.look-myQR,
.look-myteam {
  width: 312px;
  height: 45px;
  line-height: 45px;
  border: 1px solid #ff48bd;
  border-radius: 31px;
  margin-left: 40px;
}
.look-myQR {
  background-color: #ff48bd;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 440px;
}
.look-myteam {
  color: #ff48bd;
  position: absolute;
  top: 500px;
  text-align: center;
}
</style>