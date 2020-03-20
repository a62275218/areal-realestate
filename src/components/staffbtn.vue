<template>
  <div class="staff-btn" @click="navigateStaff">
    <image src="/static/images/wuyejingli.png" mode="widthFix" />
  </div>
</template>

<script>
export default {
  methods:{
    navigateStaff(){
      mpvue.navigateTo({ url: '/pages/stafflist/main' });
    }
  }
};
</script>

<style lang="scss">
.staff-btn {
  width: 140rpx;
  height: 140rpx;
  position: fixed;
  bottom: 180rpx;
  right: 50rpx;
  image{
    width:100%;
  }
}
</style>