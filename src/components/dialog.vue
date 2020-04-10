<template>
  <div class="white-card dialog">
    <div class="title" v-if="title">{{title}}</div>
    <div class="content">
      <div class="text" v-if="content">{{content}}</div>
      <div class="emphasize" v-if="emphasize">{{emphasize}}</div>
      <input
        v-if="type==='input'"
        type="text"
        :placeholder="placeholder"
        auto-focus
        class="dialog-input"
        v-model="input"
      />
      <textarea
        v-if="type==='textarea'"
        type="text"
        auto-focus
        :placeholder="placeholder"
        class="dialog-input textarea"
        v-model="input"
      />
    </div>
    <div class="bottom-control">
      <div class="confirm" @click="()=>this.$emit('confirm',this)">确认</div>
      <div class="cancel" @click="()=>this.$emit('cancel')">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "type", "placeholder", "content", "emphasize","hideCancel"],
  data() {
    return {
      input: ""
    };
  },
  watch: {
    title(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
.dialog {
  display: flex;
  flex-direction: column;
  .title {
    height: 30rpx;
    padding-top: 50rpx;
    text-align: center;
    color: $dark-gray-color;
    font-size: 36rpx;
  }

  .content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding:80rpx;
    position:relative;
    .emphasize {
      position:absolute;
      bottom:60rpx;
      color: $warn-color !important;
      font-size: 32rpx;
    }
    .text {
      color: $dark-gray-color;
      font-size: 32rpx;
    }
    .dialog-input {
      margin: 0 auto;
      height: 50rpx;
      font-size: 32rpx;
      width: 70%;
      border-bottom: 2rpx solid $bg-color;
    }
    .textarea {
      height: 150rpx;
      border-bottom: none;
    }
  }
  .bottom-control {
    height: 100rpx;
    display: flex;
    border-top: 2rpx solid $bg-color;
    font-size: 34rpx;
    div {
      width: 50%;
      text-align: center;
      line-height: 100rpx;
    }
    .confirm {
      border-right: 2rpx solid $bg-color;
      color: $font-color;
    }
    .cancel {
      color: $gray-color;
    }
  }
}
</style>