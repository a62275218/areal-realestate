<template>
  <div class="service-btn">
    <image src="/static/images/service.png" mode="widthFix" />
    <button open-type="contact"></button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.service-btn {
  width: 140rpx;
  height: 140rpx;
  position: fixed;
  bottom: 50rpx;
  right: 50rpx;
  image{
    width:100%;
  }
  button{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    opacity:0;
    // visibility:hidden;
  }
}
</style>