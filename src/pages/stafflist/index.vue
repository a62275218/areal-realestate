<template>
  <div class="bg">
    <NavBar title="澳睿集团业主客户端"/>
    <CustomModal :visible="nameCardShow" :onClose="()=>this.nameCardShow=false" customStyle="width:90%;">
      <NameCard :info="info"/>
    </CustomModal>
    <div v-for="item in staffList" :key="item" @imgOK="onImgOk">
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
      template: {
        background: "#eee",
        width: "654rpx",
        height: "400rpx",
        borderRadius: "20rpx",
        views: [
          {
            type: "text",
            text: "酷家乐 移动前端",
            css: {
              left: "50rpx",
              top: "48rpx",
              fontSize: "40rpx",
              align: "left"
            }
          },
        ]
      },
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
    onImgOk() {
      console.log("123");
    }
  }
};
</script>

<style lang="scss">
.name-card {
  width: 98%;
  margin: 0 auto;
  padding: 20rpx 40rpx;
  display: flex;
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