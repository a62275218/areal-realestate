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
      <div class="white-card newscard" v-for="(ne,index) in news" :key="index">
        <image :src="ne.imgUrls[0]" mode="widthFix" style="width:100%;max-height:300rpx;" />
        <div class="content">
          <div class="title">{{ne.title}}</div>
          <div class="bot">
            <div class="text">by {{ne.author}} | {{ne.time}}</div>
            <div class="read">阅读全文</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="navbar[1].active">
      <div class="wrap">
        <scroll-view class="navbar" scroll-y="true">
          <div
            v-for="(cate,index) in baikeCate"
            :key="index"
            :class="{'nav-item active': index == baikeActiveIndex}"
            class="nav-item"
            @click="changeActive(index)"
          >{{cate}}</div>
        </scroll-view>
        <scroll-view class="content" scroll-y="true">
          <div>
              <div>{{baikeItem.subCate}}</div>
              <image
                :src="baikeItem.imgUrls[0]"
                mode="scaleToFill"
                lazy-load="false">
              </image>
            </div>
          <div v-for="(baikeItem,index) in baike" :key="index">
            
          </div>
        </scroll-view>
      </div>
    </template>
    <div class="large-gap" v-if="!navbar[1].active"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDate } from "@/utils/index";
export default {
  data() {
    return {
      aboutImg: [],
      aboutText: "",
      news: [],
      baikeCate: [],
      baike:{},
      baikeActiveIndex: undefined,
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
  watch: {
    baikeActiveIndex: {
      async handler(val) {
        const baike = await this.$request("fetchEncyclopediaBySubCate", {
          data: {
            subCate: this.baikeCate[val]
          }
        });
        this.baike = baike
      }
    }
  },
  methods: {
    async initData() {
      const news = await this.$request("fetchNews", {
        data: {}
      });
      if (news) {
        news.forEach(item => {
          item.time = formatDate(item.createTime);
        });
        this.news = news;
      }
      const baikeCate = await this.$request("fetchAllEncyclopediaSubCate", {
        data: {}
      });
      if (baikeCate) {
        this.baikeActiveIndex = 0;
        this.baikeCate = baikeCate;
      }
    },
    formatDate,
    changeActive(index) {
      this.baikeActiveIndex = index;
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
.flex {
  display: flex;
  flex-direction: column;
  .wrap {
    flex: 1;
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
      color: #8b8b8b;
      font-size: 30rpx;
      border-bottom: 2rpx solid #dfdfdf;
    }
    .active {
      background: #fff;
      color: $font-color;
    }
  }
}
</style>