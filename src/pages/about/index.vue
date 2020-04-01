<template>
  <div class="bg">
    <div class="top">
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
        <swiper indicator-dots circular style="min-height:580rpx" indicator-active-color="#1fa637">
          <swiper-item v-for="item in []" :key="item">
            <image class="full-img" :src="item" mode="heightFix" />
          </swiper-item>
        </swiper>
      </div>
      <div class="white-card description">
        <div
          class="paragraph"
        >在Areal，我们致力于通过提供真正一流的物业管理体验来使我们的品牌与众不同。无论您居住在澳洲本地还是海外，拥有澳大利亚住宅投资物业都应该简单且在经济上有所回报。</div>
        <div
          class="paragraph"
        >
        我们渴望以出色的客户服务和即时的沟通而闻名。并相信这将使我们在未来五年内成为领先的澳大利亚房地产公司，并在未来成为标志性的国际品牌。</div>
        作为专业的房产公司，为本地和国际住宅投资者提供及时、优质的服务是我们唯一的重点。我们的使命是通过为业主提供高质量的服务，从而不断扩展我们管理的物业规模。
        我们很理解房东的难处，尤其如果您是一位海外投资者，持续确保投资物业的获利性是需要耗费大量时间和精力的，我们的行业经验和对卓越服务的承诺使得我们有能力代您照管您的物业，而您可以专注于扩大您的投资组合。
        Areal团队高度关注客户。我们欢迎房东和租户的反馈，并使用此反馈不断改善我们的服务质量。我们利用各项在线服务来确保在您需要时可以随时与我们联系，并且我们的移动客户端使您可以随时随地查看您的财产信息。
        要获得更高级别的物业管理经验，请将您的投资委托给Areal。
      </div>
    </div>
    <div v-if="navbar[1].active">
      <div class="white-card namecard" v-for="item in staffList" :key="item">
        <div class="avatar">
          <image :src="item.avatarUrl" mode="widthFix" />
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
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
  onShow() {
    this.$store.dispatch("fetchAllStaff");
  },
  computed: mapState(["staffList"]),
  methods: {
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
  padding: 40rpx;
}
.top {
  background: $font-color;
  height: 300rpx;
  margin-bottom: -20rpx;
  position: relative;
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