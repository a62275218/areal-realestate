<template>
  <div class="bg">
    <div class="top-card">
      <div class="avatar">
        <img src="/static/images/areal.png" />
      </div>
      <div>用户ID xxx</div>
    </div>
    <div class="gap"></div>
    <div class="white-card">
      <div class="row" v-for="(item,idx) in menu" :key="idx">
        <div>{{item.title}}</div>
        <div><i class="iconfont icon-iconfontjiantou2"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "手机号",
          url: ""
        },
        {
          title: "邮箱",
          url: ""
        },
        {
          title: "地址",
          url: ""
        }
      ]
    };
  },
  created() {
    mpvue.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#1fa637"
    });
  }
};
</script>

<style lang="scss" scoped>
.top-card {
  padding: 120rpx 60rpx;
  background: $font-color;
  color: #fff;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  align-items: center;
  .avatar {
    width: 160rpx;
    height: 160rpx;
    margin-right: 60rpx;
  }
}
</style>