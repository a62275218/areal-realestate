<template>
  <div class="bg">
    <swiper indicator-dots circular indicator-active-color="#1fa637" style="min-height:580rpx">
      <swiper-item v-for="item in article.imgUrls" :key="item">
        <image style="width:100%;height:100%;" :src="item" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <div class="article">
      <div class="title">{{article.title}}</div>
      <div class="share">
        <div class="text">by {{article.author}} | {{article.time}}</div>
        <button class="share-btn" open-type="share">
          <image src="/static/images/share.png" mode="widthFix" style="width:40rpx;" />
        </button>
      </div>
      <div class="desc" v-html="article.description"></div>
    </div>
    <div class="gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDate } from "@/utils/index";
export default {
  data() {
    return {
      article: {}
    };
  },
  onShareAppMessage() {
    return {
      title: this.article.title,
      path: `/pages/article/main?detail=${JSON.stringify(this.article)}`
    };
  },
  onShow() {
    const { detail } = this.$root.$mp.query;
    const article = JSON.parse(detail);
    article.time = formatDate(article.createTime);
    this.article = article;
  }
};
</script>

<style lang="scss">
.article {
  padding: 50rpx;
  background: #fff;
  .title {
    font-size: 40rpx;
    font-weight: bold;
  }
  .share {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $gray-color;
    padding: 30rpx 0;
    .share-btn {
      display: flex;
      background: transparent;
      margin: 0;
      &::after {
        border: none;
      }
    }
  }
}
</style>