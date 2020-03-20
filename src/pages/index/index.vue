<template>
  <div class="bg">
    <div class="top-card" v-if="houseList">
      <div class="index-title">
        <div>我的物业</div>
        <image src="/static/images/green-logo.png" mode="widthFix" />
      </div>
      <swiper
        indicator-dots
        circular
        class="carousel"
        :style="'min-height:'+carouselHeight"
        previous-margin="30rpx"
        next-margin="30rpx"
        indicator-active-color="#1fa637"
      >
        <swiper-item @click="navigateHouse(item.id)" v-for="item in houseList" :key="item.id">
          <div class="carousel-card">
            <img :src="item.imgUrl[0]" />
          </div>
          <div class="carousel-desc">
            <div class="address">
              <image src="/static/images/location.png" mode="widthFix" />
              {{item.address}}
            </div>
            <div class="desc">
              <div>{{item.houseDetail.roomNumber || 0}}房{{item.houseDetail.hallNumber || 0}}厅{{item.houseDetail.bathNumber || 0}}卫</div>
              <div class="status">分享</div>
            </div>
          </div>
        </swiper-item>
      </swiper>
      <div class="more">查看房源列表 >></div>
    </div>
    <div class="gap"></div>
    <div class="white-card menu">
      <div class="menu-item" v-for="(item,idx) in menuList" :key="idx" @click="navigate(item.url)">
        <image :src="item.img" alt mode="widthFix" />
        <div>{{item.content}}</div>
      </div>
    </div>
    <div class="footer">
      <div>微信公众号: xxxxxxxxxxxxxxxx</div>
      <div>澳瑞网站: www.areal.com</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      carouselHeight: "",
      menuList: [
        {
          img: "/static/images/Component6.png",
          content: "租金一览",
          url: "/pages/housedetail/main"
        },
        {
          img: "/static/images/Component4.png",
          content: "账单明细"
        },
        {
          img: "/static/images/Component4.png",
          content: "物业维护"
        },
        {
          img: "/static/images/Component4.png",
          content: "例行检查"
        }
      ]
    };
  },
  async mounted() {
    const sys = wx.getSystemInfoSync();
    this.carouselHeight = sys.windowWidth > 320 ? "92vw" : "94vw";
  },
  onShow() {
    if (!this.userInfo) {
      mpvue.switchTab({ url: "/pages/myself/main" });
    } else {
      this.$store.dispatch("getUserHouse", {
        id: this.userInfo.id
      });
      console.log(this);
    }
  },
  computed: mapState(["userInfo", "houseList"]),

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    navigateHouse(id) {
      mpvue.navigateTo({ url: `/pages/housedetail/main?id=${id}` });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.top-card {
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  padding: 40rpx 0 20rpx 0;
  background: #fff;
  .index-title {
    padding: 50rpx 50rpx 30rpx 50rpx;
    display: flex;
    justify-content: space-between;
    position: relative;
    font-size: 32rpx;
    font-weight: bold;
    image {
      position: absolute;
      width: 20%;
      bottom: 2rpx;
    }
  }
  .more {
    text-align: center;
    color: $gray-color;
    font-size: 24rpx;
    padding: 20rpx;
  }
}

.carousel {
  //min-height: 85vw;
  .carousel-card {
    overflow: hidden;
    margin: 0 auto;
    width: 95%;
    background: #fff;
    @include shadow-card;
    height: 0;
    padding-bottom: 65%;
    img {
      width: 100%;
    }
  }
  .carousel-desc {
    padding: 0 30rpx;
    .address {
      color: $font-color;
      padding: 24rpx 0;
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        padding-right: 10rpx;
      }
    }
    .desc {
      display: flex;
      justify-content: space-between;
      .status {
        color: $font-color;
        font-weight: bold;
      }
    }
  }
}

.menu {
  display: flex;
  flex-wrap: wrap;
  .menu-item {
    width: 50%;
    border: 2rpx solid $bg-color;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $gray-color;
    padding: 60rpx 0;
    image {
      width: 50rpx;
      margin-right: 20rpx;
    }
  }
}

.footer {
  color: $font-color;
  text-align: center;
  font-size: 24rpx;
  div {
    padding-top: 20rpx;
  }
}
</style>
