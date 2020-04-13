<template>
  <div class="card">
    <painter :palette="template" />
    <painter :palette="btnTemplate" :customStyle="customStyle" @click="saveNameCard" />
    <painter
      customStyle="position:fixed;bottom:-1000vh;"
      @imgOK="onImgOk"
      :palette="template"
      widthPixels="680"
    />
  </div>
</template>

<script>
import { downloadFile } from "@/utils";
export default {
  props: ["info"],
  data() {
    return {
      imgPath: "",
      customStyle: "margin:30rpx auto;",
      btnTemplate: {
        background: "#1fa637",
        width: "200rpx",
        height: "70rpx",
        borderRadius: "10rpx",
        views: [
          {
            type: "text",
            text: "保存名片",
            css: {
              color: "#fff",
              width: "200rpx",
              lineHeight: "70rpx",
              textAlign: "center",
              top: "14rpx",
              fontSize: "30rpx"
            }
          }
        ]
      },
      template: {
        background: "#fff",
        width: "680rpx",
        height: "480rpx",
        borderRadius: "20rpx",
        views: [
          {
            type: "image",
            url: this.info.avatarUrl,
            css: {
              top: "40rpx",
              left: "40rpx",
              width: "120rpx",
              height: "120rpx",
              borderRadius: "120rpx"
            }
          },
          {
            type: "text",
            text: this.info.name,
            css: {
              top: "42rpx",
              left: "230rpx",
              fontSize: "30rpx",
              width: "344rpx",
              whiteSpace: "break-all"
            }
          },
          {
            type: "text",
            text: this.info.subTitle,
            css: {
              top: "92rpx",
              left: "230rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: this.info.occupation,
            css: {
              top: "132rpx",
              left: "230rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: "M",
            css: {
              top: "230rpx",
              left: "296rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: "T",
            css: {
              top: "280rpx",
              left: "298rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: "E",
            css: {
              top: "330rpx",
              left: "298rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: "A",
            css: {
              top: "380rpx",
              left: "298rpx",
              fontSize: "26rpx"
            }
          },
          {
            type: "text",
            text: this.info.mobile,
            css: {
              top: "230rpx",
              left: "330rpx",
              fontSize: "26rpx",
              width: "344rpx",
              color: "rgb(31,166,55)",
              whiteSpace: "break-all"
            }
          },
          {
            type: "text",
            text: this.info.telephone,
            css: {
              top: "280rpx",
              left: "330rpx",
              fontSize: "26rpx",
              width: "344rpx",
              color: "rgb(31,166,55)",
              whiteSpace: "break-all"
            }
          },
          {
            type: "text",
            text: this.info.email,
            css: {
              top: "330rpx",
              left: "330rpx",
              fontSize: "26rpx",
              width: "344rpx",
              color: "rgb(31,166,55)",
              whiteSpace: "break-all"
            }
          },
          {
            type: "text",
            text: this.info.address,
            css: {
              top: "380rpx",
              left: "330rpx",
              fontSize: "26rpx",
              width: "344rpx",
              color: "rgb(31,166,55)",
              whiteSpace: "break-all"
            }
          },
          {
            type: "image",
            url: this.info.qrcode,
            css: {
              top: "190rpx",
              left: "50rpx",
              width: "96rpx",
              height: "96rpx"
            }
          },
          {
            type: "image",
            url: "/static/images/logo.png",
            css: {
              top: "320rpx",
              left: "40rpx",
              width: "210rpx",
              height: "93rpx"
            }
          }
        ]
      }
    };
  },
  methods: {
    onImgOk(e) {
      this.imgPath = e.mp.detail.path;
    },
    saveNameCard() {
      console.log("save");
      mpvue.getSetting({
        success: res => {
          console.log(res);
          if (res.authSetting["scope.writePhotosAlbum"]) {
            mpvue.showLoading({
              title: "保存中"
            });
            mpvue.saveImageToPhotosAlbum({
              filePath: this.imgPath, //图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径,
              success: res => {
                mpvue.showToast({
                  title: "保存名片成功"
                });
              },
              fail: err => {
                console.log(err);
                mpvue.showToast({
                  title: "保存名片失败",
                  icon: "none"
                });
              },
              complete: () => {}
            });
          } else if (res.authSetting["scope.writePhotosAlbum"] === false) {
            mpvue.showToast({
              title: "未获得授权",
              icon: "none"
            });
            mpvue.openSetting();
          }
        },
        fail: () => {
          mpvue.showToast({
            title: "获取授权失败",
            icon: "none"
          });
        }
      });
      // return;
      // mpvue.previewImage({
      //   urls: [this.imgPath] //需要预览的图片链接列表,
      // });
    }
  }
};
</script>

<style lang="scss">
.card {
  .save-card {
    position: absolute;
    top: 0;
    left: 0;
    margin: 30rpx auto 0;
    z-index: 9999999999999999999999999999999999;
  }
}
.header {
  display: flex;
  padding: 30rpx 60rpx;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid $bg-color;
  .inline-btn {
    width: 44%;
    border-radius: 18rpx;
    padding: 13rpx;
  }
  .center-content {
    flex: 1;
    padding-left: 40rpx;
  }
}
.card-info {
  padding: 10rpx 30rpx;
  .card-title {
    color: $dark-gray-color;
    font-size: 28rpx;
    font-weight: bold;
  }
  .info-row {
    padding: 18rpx;
    & > div:nth-child(1) {
      color: $gray-color;
    }
  }
}
</style>    