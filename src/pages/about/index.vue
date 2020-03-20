<template>
  <div class="bg">
    <div class="top">
      <div class="intro">
        <div>关于澳睿</div>
        <div>澳睿团队</div>
      </div>
    </div>
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
        {{item.mobile}}
      </div>
      <div class="detail">
        <span>W</span>
        {{item.mobile}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>

<style lang="scss">
.top {
  background: $font-color;
  height:300rpx;
  margin-bottom:-20rpx;
}
.namecard {
  text-align: center;
  position: relative;
  margin-bottom: 40rpx;
  .avatar {
    width:200rpx;
    height:200rpx;
    position: absolute;
    left: 50%;
    transform:translate(-50%,-20rpx);
    image{
      width:100%;
    }
  }
  .title {
    padding: 190rpx 20rpx;
    color:$dark-gray-color;
    font-size:32rpx;
    font-weight:500;
  }
}
</style>