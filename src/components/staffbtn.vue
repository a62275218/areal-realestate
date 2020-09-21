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
  position:fixed;
  width: 140rpx;
  height: 140rpx;
  top:60%;
  right: 50rpx;
  z-index:9999999999999999999999;
  image{
    width:100%;
    display:block;
  }
}
</style>