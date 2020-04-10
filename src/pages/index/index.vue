<template>
  <div class="bg">
    <StaffBtn />
    <ServiceBtn />
    <NavBar title="澳睿集团业主客户端" />
    <div class="top-card" v-if="houseList">
      <div class="index-title">
        <div>我的物业</div>
        <image src="/static/images/green-logo.png" mode="widthFix" />
      </div>
      <swiper
        indicator-dots
        circular
        class="carousel"
        @change="handleSwiperChange"
        :style="'min-height:'+carouselHeight"
        previous-margin="30rpx"
        next-margin="30rpx"
        indicator-active-color="#1fa637"
      >
        <swiper-item v-for="item in houseList" :key="item">
          <div class="carousel-card" @click="navigateHouse(item.id)">
            <image style="width:100%;" :src="item.imgUrl[0]" mode="aspectFill" />
          </div>
          <div class="carousel-desc">
            <div class="address">
              <div class="addimg">
                <image src="/static/images/location.png" mode="widthFix" />
              </div>
              <div class="add">{{item.address}}</div>
            </div>
            <div class="desc">
              <div>{{item.houseDetail.roomNumber || 0}}房{{item.houseDetail.hallNumber || 0}}厅{{item.houseDetail.bathNumber || 0}}卫</div>
              <div class="status">户主</div>
            </div>
          </div>
        </swiper-item>
      </swiper>
      <div class="more" @click="navigate('/pages/houselist/main')">查看房源列表 >></div>
    </div>
    <div class="page-gap"></div>
    <div class="msg-box" v-if="message" @click="navigate('/pages/message/main')">
      {{message}}
      <i class="right-arrow">></i>
    </div>
    <div class="page-gap"></div>
    <div class="white-card menu">
      <div
        :class="item.active?'menu-item active':'menu-item'"
        v-for="(item,idx) in menuList"
        :key="idx"
        @click="navigateItem({item,idx})"
      >
        <image :src="item.active?item.activeImg:item.img" alt mode="widthFix" />
        <div>{{item.content}}</div>
      </div>
    </div>
    <div class="footer">
      <div>微信公众号: ArealPropertyGroup</div>
      <div>澳瑞网站: www.areal.com</div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ServiceBtn from "@/components/servicebtn";
import StaffBtn from "@/components/staffbtn";
import NavBar from "@/components/navbar";

export default {
  data() {
    return {
      carouselHeight: "",
      menuList: [
        {
          img: "/static/images/zujin.png",
          activeImg: "/static/images/zujin-active.png",
          content: "租金一览",
          url: "/pages/bill/main"
        },
        {
          img: "/static/images/doc.png",
          activeImg: "/static/images/doc-active.png",
          content: "相关文件",
          url: "/pages/document/main"
        },
        {
          img: "/static/images/wuye.png",
          activeImg: "/static/images/wuye-active.png",
          content: "物业维护",
          url: "/pages/wuyeindex/main"
        },
        {
          img: "/static/images/lixing.png",
          activeImg: "/static/images/lixing-active.png",
          content: "例行检查",
          url: "/pages/checklist/main"
        }
      ]
    };
  },
  components: {
    ServiceBtn,
    StaffBtn,
    NavBar
  },
  async mounted() {
    const sys = wx.getSystemInfoSync();
    this.carouselHeight = sys.windowWidth > 320 ? "90vw" : "93vw";
  },
  onShow() {
    if (!this.userInfo) {
      mpvue.switchTab({ url: "/pages/myself/main" });
    } else {
      this.$store.dispatch("getUserHouse", {
        id: this.userInfo.id
      });
    }
  },
  computed: {
    ...mapState(["userInfo", "houseList"]),
    message() {
      return this.$store.state.userInfo.uncheckedMsgNum
        ? `您有${this.$store.state.userInfo.uncheckedMsgNum}条新消息`
        : "";
    }
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    handleSwiperChange(e) {
      this.$store.commit("searchChange", e.mp.detail.current);
    },
    navigateHouse(id) {
      mpvue.navigateTo({ url: `/pages/housedetail/main?id=${id}` });
    },
    navigate(url) {
      mpvue.navigateTo({ url });
    },
    navigateItem({ item, idx }) {
      const list = this.menuList;
      list.forEach((tab, i) => {
        tab.active = i === idx;
      });
      setTimeout(() => {
        list.forEach((tab, i) => {
          tab.active = false;
        });
        this.menuList = list.reverse().reverse();
      },1000);
      this.menuList = list.reverse().reverse();
      mpvue.navigateTo({ url: item.url });
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

.msg-box {
  width: 85%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 10rpx 0;
  border-radius: 20rpx;
  background: rgba(31, 166, 55, 0.2);
  color: $font-color;
  .right-arrow {
    position: absolute;
    right: 20rpx;
    top: 50%;
    transform: translate(0, -50%);
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
    padding-bottom: 62%;
  }
  .carousel-desc {
    padding: 0 30rpx;
    .address {
      color: $font-color;
      padding: 24rpx 0;
      display: flex;
      word-break: break-all;
      .addimg {
        width: 24rpx;
        padding-right: 10rpx;
        height: 100%;
        image {
          width: 100%;
        }
      }
      .add {
        flex: 1;
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
  .active {
    color: $font-color !important;
  }
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
