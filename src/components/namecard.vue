<template>
  <div>
    <painter :customStyle="customStyle" @imgOK="onImgOk" :palette="template" />
    <div class="green-btn save-card" @click="saveNameCard">保存名片</div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      imgPath:'',
      customStyle: "margin:0 auto",
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
              borderRadius:'120rpx'
            }
          },
          {
            type: "text",
            text: this.info.name,
            css: {
              top: "42rpx",
              left: "230rpx",
              fontSize:'30rpx'
            }
          },
          {
            type: "text",
            text: this.info.subTitle,
            css: {
              top: "92rpx",
              left: "230rpx",
              fontSize:'26rpx'
            }
          },
          {
            type: "text",
            text: this.info.occupation,
            css: {
              top: "132rpx",
              left: "230rpx",
              fontSize:'26rpx'
            }
          },
          {
            type: "text",
            text: 'M',
            css: {
              top: "230rpx",
              left: "296rpx",
              fontSize:'26rpx'
            }
          },
          {
            type: "text",
            text: 'T',
            css: {
              top: "280rpx",
              left: "298rpx",
              fontSize:'26rpx'
            }
          },
          {
            type: "text",
            text: 'E',
            css: {
              top: "330rpx",
              left: "298rpx",
              fontSize:'26rpx'
            }
          },
          {
            type: "text",
            text: 'A',
            css: {
              top: "380rpx",
              left: "298rpx",
              fontSize:'26rpx'
            }
          },
           {
            type: "text",
            text: this.info.mobile,
            css: {
              top: "230rpx",
              left: "330rpx",
              fontSize:'26rpx',
              width:'344rpx',
              color:'rgb(31,166,55)',
              whiteSpace:'break-all'
            }
          },
          {
            type: "text",
            text: this.info.telephone,
            css: {
              top: "280rpx",
              left: "330rpx",
              fontSize:'26rpx',
              width:'344rpx',
              color:'rgb(31,166,55)',
              whiteSpace:'break-all'
            }
          },
          {
            type: "text",
            text: this.info.email,
            css: {
              top: "330rpx",
              left: "330rpx",
              fontSize:'26rpx',
              width:'344rpx',
              color:'rgb(31,166,55)',
              whiteSpace:'break-all'
            }
          },
          {
            type: "text",
            text: this.info.address,
            css: {
              top: "380rpx",
              left: "330rpx",
              fontSize:'26rpx',
              width:'344rpx',
              color:'rgb(31,166,55)',
              whiteSpace:'break-all'
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
            url: '/static/images/logo.png',
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
    onImgOk(e){
      console.log('pl')
      console.log(e.mp.detail.path)
      this.imgPath = e.mp.detail.path
    },
    saveNameCard() {
      console.log(this.imgPath)
      mpvue.previewImage({
        urls: [this.imgPath] //需要预览的图片链接列表,
      });
      return
      mpvue.saveImageToPhotosAlbum({
        filePath: this.imgPath, //图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径,
        success: res => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>

<style lang="scss">
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
.save-card {
  margin: 30rpx auto 0;
}
</style>    