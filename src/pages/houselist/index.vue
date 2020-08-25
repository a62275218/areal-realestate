<template>
  <div>
    <NavBar title="澳睿VIP业主中心" />
    <div class="carousel">
      <div @click="navigateHouse(item.id)" v-for="item in houseList" :key="item">
        <div class="carousel-card">
          <image style="width:100%" :src="item.imgUrl[0]" mode="aspectFill" />
        </div>
        <div class="carousel-desc">
          <div class="address">
            <image src="/static/images/location.png" mode="widthFix" />
            {{item.address}}
          </div>
          <div class="desc">
            <div>{{item.houseDetail.roomNumber || 0}}室{{item.houseDetail.bathNumber || 0}}卫{{item.houseDetail.hallNumber || 0}}车位</div>
          </div>
        </div>
        <div class="page-gap"></div>
      </div>
      <div class="page-gap"></div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "@/components/navbar";
export default {
  computed: mapState(["userInfo", "houseList"]),
  components:{
    NavBar
  },
  methods: {
    navigateHouse(id) {
      mpvue.navigateTo({ url: `/pages/housedetail/main?id=${id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  //min-height: 85vw;
  .carousel-card {
    overflow: hidden;
    margin: 0 auto;
    width: 95%;
    background: #fff;
    @include shadow-card;
    height: 0;
    padding-bottom: 58%;
  }
  .carousel-desc {
    padding: 0 30rpx;
    .address {
      color: $font-color;
      padding: 24rpx 0;
      display: flex;
      align-items: center;
      image {
        width: 24rpx;
        padding-right: 10rpx;
      }
    }
    .desc {
      display: flex;
      justify-content: space-between;
      .status {
        color: $font-color;
        font-weight: bold;
      }
    }
  }
}
</style>