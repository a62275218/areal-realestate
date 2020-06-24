<template>
  <div class="bg flex">
    <div class="top">
      <image src="/static/images/white-logo.png" mode="widthFix" style="width:40%;" />
      <div class="intro">
        <div
          v-for="(item,index) in navbar"
          :key="item"
          :class="item.active?'active':''"
          @click="switchActive(index)"
        >{{item.title}}</div>
      </div>
    </div>
    <div v-if="navbar[0].active">
      <div class="gap"></div>
      <div class="white-card newscard">
        <image
          :src="'/static/images/login-bg.png'"
          mode="widthFix"
          style="width:100%;max-height:300rpx;"
        />
        <div class="content">
          <div class="title">建造您梦想的大别墅————澳洲买地建房流程及贴士</div>
          <div class="bot">
            <div class="text">by dasdsadsa</div>
            <div class="read">阅读全文</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="navbar[1].active">
      <div class="wrap">
        <scroll-view class="navbar" scroll-y="true">
          <div :class="{'nav-item active': true}" class="nav-item" @click="changeActive(1)">测试</div>
        </scroll-view>
        <scroll-view class="content" scroll-y="true">scroll</scroll-view>
      </div>
    </template>
    <div class="large-gap" v-if="!navbar[1].active"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      aboutImg: [],
      aboutText: "",
      navbar: [
        {
          title: "新鲜资讯",
          active: true
        },
        {
          title: "房屋百科",
          active: false
        },
        {
          title: "FAQs",
          active: false
        }
      ]
    };
  },
  mounted() {
    this.initData();
  },
  computed: mapState(["staffList"]),
  methods: {
    async initData() {
      this.$store.dispatch("fetchAllStaff");
      const aboutContent = await this.$request("fetchAllAboutDetail", {
        data: {}
      });
      const { aboutImg, aboutText } = aboutContent;
      this.aboutImg = aboutImg;
      this.aboutText = `<div class="white-card description">${aboutText}</div>`;
    },
    changeActive() {},
    switchActive(index) {
      const navbar = this.navbar;
      navbar.forEach((item, idx) => {
        item.active = false;
        if (idx === index) {
          item.active = true;
        }
      });
      this.navbar = navbar;
    }
  }
};
</script>

<style lang="scss">
.flex{
  display:flex;
  flex-direction: column;
  .wrap{
    flex:1;
  }
}
.description {
  padding: 80rpx 60rpx 60rpx 60rpx;
  word-break: break-all;
}
.swiper {
  border-radius: 20rpx;
  margin-bottom: -20rpx;
  overflow: hidden;
  background: $bg-color;
}
.top {
  background: $font-color;
  height: 350rpx;
  padding-top: 80rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    margin: 0 auto;
  }
  .intro {
    position: absolute;
    bottom: 30rpx;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-around;
    color: rgba(255, 255, 255, 0.5);
    width: 100%;
    margin: 0 auto;
    div {
      padding-bottom: 6rpx;
    }
    .active {
      color: #fff;
      border-bottom: 6rpx solid #fff;
    }
  }
}
.newscard {
  width: calc(100% - 20px);
  margin: 20rpx auto 0;
  overflow: hidden;
  .content {
    padding: 20rpx;
    .title {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
    .bot {
      display: flex;
      justify-content: space-between;
      .text {
        color: $dark-gray-color;
      }
      .read {
        color: $font-color;
      }
    }
  }
}
.namecard {
  text-align: center;
  position: relative;
  margin-bottom: 40rpx;
  & > div {
    max-width: 80%;
    margin: 0 auto;
    word-break: break-all;
  }
  .avatar {
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -20rpx);
    image {
      width: 100%;
    }
  }
  .title {
    padding: 190rpx 0 10rpx 0;
    color: $dark-gray-color;
    font-size: 32rpx;
    font-weight: 500;
  }

  .name {
    font-size: 30rpx;
    font-weight: 500;
    padding-bottom: 20rpx;
  }

  .detail {
    span {
      color: #000;
      font-weight: 500;
    }
    color: $font-color;
    :nth-child(1) {
      padding-top: 30rpx;
    }
    padding: 10rpx 0;
  }
}
.wrap {
  display: flex;
  height: 100%;
  .navbar {
    width: 200rpx;
    min-width: 200rpx;
    background: #f7f7f7;
    .nav-item {
      padding: 40rpx;
      text-align: center;
      color: #666666;
      font-size: 30rpx;
    }
    .active {
      background: #fff;
      color: #ffcb34;
    }
  }
}
</style>