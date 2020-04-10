<template>
  <div class="bg">
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
      <div class="swiper">
        <swiper indicator-dots circular style="min-height:450rpx" indicator-active-color="#1fa637">
          <swiper-item v-for="item in aboutImg" :key="item">
            <image style="width:100%;background:#fff;" :src="item.url" mode="aspectFill" />
          </swiper-item>
        </swiper>
      </div>
      <div v-html="aboutText"></div>
    </div>
    <div v-if="navbar[1].active">
      <div class="white-card namecard" v-for="item in staffList" :key="item">
        <div class="avatar">
          <image :src="item.avatarUrl" style="width:100%;height:100%" />
        </div>
        <div class="title">{{item.subTitle}}</div>
        <div class="name">{{item.name}}</div>
        <div class="detail">
          <span>M</span>
          {{item.mobile}}
        </div>
        <div class="detail">
          <span>E</span>
          {{item.email}}
        </div>
        <div class="detail">
          <span>W</span>
          {{item.wechat}}
        </div>
      </div>
    </div>
    <div class="large-gap"></div>
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
          title: "关于澳睿",
          active: true
        },
        {
          title: "澳睿团队",
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
      const aboutContent = await this.$request("fetchAllAboutDetail",{
        data:{
          
        }
      });
      const { aboutImg, aboutText } = aboutContent;
      this.aboutImg = aboutImg;
      this.aboutText = `<div class="white-card description">${aboutText}</div>`;
    },
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
.description {
  padding: 80rpx 60rpx 60rpx 60rpx;
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
  margin-bottom: -40rpx;
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
    bottom: 100rpx;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.5);
    width: 400rpx;
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
.namecard {
  text-align: center;
  position: relative;
  margin-bottom: 40rpx;
  &>div{
    max-width:80%;
    margin:0 auto;
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
</style>