<template>
  <div>
    <cover-view :style="{height: statusBarHeight+titleBarHeight + 'px',background:'transparent' }"></cover-view>
    <cover-view class="nav">
      <cover-view :style="{height: statusBarHeight + 'px'}"></cover-view>
      <cover-view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
        <!-- home及后退键 -->
        <cover-view class="bar-options">
          <cover-view v-if="showBack" class="opt opt-back" @click="backClick">
            <cover-image class="back-image" src="/static/images/Right arrow.png" mode="heightFix"></cover-image>
          </cover-view>
          <!-- <cover-view class="line" v-if="backVisible && homePath"></cover-view>
          <cover-view class="opt opt-home" @click="homeClick">
            <cover-image class="home-image" src="/static/images/home.png"></cover-image>
          </cover-view>-->
        </cover-view>
        <!-- 标题 -->
        <cover-view
          class="bar-title"
          :style="{lineHeight: titleBarHeight + 'px' }"
        >{{title}}</cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showBack: false
    };
  },
  computed: mapState(["titleBarHeight", "statusBarHeight"]),
  props: ["title"],
  beforeMount() {
    if (getCurrentPages().length > 1) {
      this.showBack = true;
    }
  },
  methods: {
    backClick() {
      if (getCurrentPages().length == 1) {
        // 打开分享卡片无法回退
        wx.redirectTo({
          url: this.homePath
        });
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
    },
    homeClick() {
      mpvue.redirectTo({
        url: "/pages/index/main"
      });
    }
  }
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  flex-direction: column;
  background: #fff;
  color: $font-color;
  z-index: 9999;
  .nav-titlebar {
    display: flex;
    position: relative;
    .bar-options {
      z-index: 99999;
      width: 170rpx;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      background: hsla(0, 0%, 100%, 0.6);
      border-radius: 27px;
      padding: 0 20rpx;
      .opt {
        width: 50rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .opt-back {
        .back-image {
          height: 44rpx;
          transform: rotate(180deg) scale(0.8);
        }
      }
    }
    .bar-title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      font-size: 30rpx;
    }
  }
  .content {
    flex: 1;
  }
}
</style>