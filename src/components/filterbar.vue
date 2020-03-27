<template>
  <div>
    <div class="filter-box">
      <div class="title">地址</div>
      <div class="search-field" @click="toggleFilterList">
        <div class="result" v-if="list[activeIndex]">{{list[activeIndex][searchKey]}}</div>
        <image src="/static/images/Right arrow.png" mode="widthFix" />
      </div>
    </div>
    <div class="filter-list" v-show="showFilter" @click="toggleFilterList">
      <div
        v-for="(item,index) in list"
        :key="item"
        class="filter-card"
        @click.stop="chooseItem(index)"
      >{{item[searchKey]}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["list", "searchKey", "defaultIndex"],
  computed: mapState(["showFilter", "activeIndex"]),
  methods: {
    toggleFilterList() {
      this.$store.commit("toggleFilterList");
    },
    chooseItem(index) {
      this.$emit("change", this.list[index]);
      this.$store.commit("toggleFilterList");
      this.$store.commit("searchChange", index);
    }
  }
};
</script>

<style lang="scss">
.filter-box {
  color: $dark-gray-color;
  display: flex;
  background: #fff;
  padding: 30rpx 0;
  border-bottom: 2rpx solid $bg-color;
  z-index: 100000;
  .title {
    color: $font-color;
    border-right: 2rpx solid $bg-color;
    padding: 0 20rpx;
    min-width: 80rpx;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .result {
    flex: 1;
    word-break: break-all;
  }
  .search-field {
    padding: 0 20rpx;
    flex: 1;
    display: flex;
    align-items: center;

    image {
      width: 30rpx;
      padding: 0 30rpx;
    }
  }
}
.filter-list {
  color: $dark-gray-color;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100vh;
  font-size: 24rpx;
  z-index: 99999;
  .filter-card {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 30rpx;
    background: #fff;
    border-bottom: 2rpx solid $bg-color;
    &:nth-last-child(1) {
      border-bottom-left-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
      border: none;
    }
  }
}
</style>