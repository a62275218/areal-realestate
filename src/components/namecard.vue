<template>
  <div>
    <div class="white-card calling-card" id="namecard">
      <div class="header">
        <div class="avatar">
          <img src="/static/images/areal.png" />
        </div>
        <div class="header-content">
          <div>John Smith 张小明</div>
          <div>Director</div>
          <div>Agent</div>
        </div>
      </div>
      <div class="card-info">
        <div>META</div>
        <div>
          <div>410671821</div>
          <div>1212@qq.com</div>
          <div>Boxhill 12321321321321</div>
        </div>
      </div>
    </div>
    <div class="green-btn save-card" @click="saveNameCard">保存名片</div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  methods: {
    saveNameCard() {
      wx
        .createSelectorQuery()
        .select("#namecard")
        .context(res => {
          console.log(res);
        })
        .exec();
    }
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  padding: 30rpx 60rpx;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid $bg-color;
  .inline-btn {
    width: 44%;
    border-radius: 18rpx;
    padding: 13rpx;
  }
  .center-content {
    flex: 1;
    padding-left: 40rpx;
  }
}
.card-info {
  padding: 10rpx 30rpx;
  .card-title {
    color: $dark-gray-color;
    font-size: 28rpx;
    font-weight: bold;
  }
  .info-row {
    padding: 18rpx;
    & > div:nth-child(1) {
      color: $gray-color;
    }
  }
}
.save-card {
  margin: 30rpx auto 0;
}
</style>    