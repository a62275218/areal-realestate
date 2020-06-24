<template>
  <div class="bg">
    <NavBar title="澳睿VIP业主中心"/>
    <CustomModal :visible="nameCardShow" :onClose="()=>this.nameCardShow=false" customStyle="width:90%;">
      <NameCard :info="info"/>
    </CustomModal>
    <div v-for="item in staffList" :key="item">
      <div class="gap"></div>
      <div class="white-card name-card">
        <div class="avatar">
          <image :src="item.avatarUrl" />
        </div>
        <div class="center">
          <div class="card-title">{{item.subTitle}}</div>
          <div>{{item.name}}</div>
        </div>
        <div class="right">
          <button class="white-btn name-btn" @click="()=>showCard(item)">查看名片</button>
        </div>
      </div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CustomModal from "@/components/custommodal";
import NameCard from "@/components/namecard";
import NavBar from "@/components/navbar";
export default {
  components: {
    CustomModal,
    NameCard,
    NavBar
  },
  data() {
    return {
      nameCardShow: false,
      info: false
    };
  },
  onShow() {
    this.$store.dispatch("fetchAllStaff");
  },
  onReady() {
    mpvue
      .createSelectorQuery()
      .select("#dddd")
      .fields({
        node: true
      })
      .exec(function(res) {
        console.log(res);
      });
  },
  computed: mapState(["staffList"]),
  methods: {
    showCard(info) {
      this.nameCardShow = true;
      this.info = info;
    },
  }
};
</script>

<style lang="scss">
.name-card {
  width: 98%;
  margin: 0 auto;
  padding: 20rpx 40rpx;
  display: flex;
  word-break: break-all;
  .center {
    .card-title {
      color: $dark-gray-color;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .name-btn {
      font-size: 24rpx;
      padding: 0 2rpx;
      border-radius: 20rpx;
    }
  }
}
</style>