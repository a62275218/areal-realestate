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
    </div>
    <div v-if="navbar[1].active"> 
      <div class="white-card namecard" v-for="item in stafflist" :key="item">
        <div class="avatar">
          <image :src="item.avatar" mode="widthFix" />
        </div>
        <div class="title">{{item.title}}</div>
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
      ],
      stafflist: [
        {
          avatar: "/static/images/jimmy.png",
          title: "创始人&董事总经理",
          name: "Jimmy Lim 林泰鸿",
          mobile: "+61 (0) 415 089 332",
          email: "jimmy.lim@areal.com.au",
          wechat: "Jimmy lim88888"
        },
        {
          avatar: "/static/images/jimmy.png",
          title: "创始人&董事总经理",
          name: "Jimmy Lim 林泰鸿",
          mobile: "+61 (0) 415 089 332",
          email: "jimmy.lim@areal.com.au",
          wechat: "Jimmy lim88888"
        },
        {
          avatar: "/static/images/jimmy.png",
          title: "创始人&董事总经理",
          name: "Jimmy Lim 林泰鸿",
          mobile: "+61 (0) 415 089 332",
          email: "jimmy.lim@areal.com.au",
          wechat: "Jimmy lim88888"
        },
        {
          avatar: "/static/images/jimmy.png",
          title: "创始人&董事总经理",
          name: "Jimmy Lim 林泰鸿",
          mobile: "+61 (0) 415 089 332",
          email: "jimmy.lim@areal.com.au",
          wechat: "Jimmy lim88888"
        },
        {
          avatar: "/static/images/jimmy.png",
          title: "创始人&董事总经理",
          name: "Jimmy Lim 林泰鸿",
          mobile: "+61 (0) 415 089 332",
          email: "jimmy.lim@areal.com.au",
          wechat: "Jimmy lim88888"
        }
      ]
    };
  },
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