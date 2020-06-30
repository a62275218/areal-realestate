<template>
  <div class="bg">
    <NavBar title="澳睿VIP业主中心" />
    <CustomModal :visible="houseValueModalShow" :onClose="()=>this.houseValueModalShow=false">
      <CustomDialog
        :content="houseValueContent"
        @confirm="sendHouseValueReq"
        @cancel="()=>this.houseValueModalShow=false"
        :hideCancel="houseValueContent === '您的申请已成功发出，我们的团队会尽快联系您'"
      ></CustomDialog>
    </CustomModal>
    <CustomModal
      :visible="nameCardShow"
      :onClose="()=>this.nameCardShow=false"
      customStyle="width:90%;"
    >
      <NameCard :info="info" />
    </CustomModal>
    <div class="top-card">
      <swiper indicator-dots circular style="min-height:580rpx" indicator-active-color="#1fa637">
        <swiper-item v-for="item in houseDetail.imgUrl" :key="item">
          <image class="full-img" :src="item" mode="aspectFill" />
        </swiper-item>
      </swiper>
      <div class="carousel-desc">
        <div class="address">
          <image class="addimg" src="/static/images/location.png" mode="widthFix" />
          <div class="add">{{houseDetail.address}}</div>
        </div>
        <div class="desc">
          <div>{{houseDetail.houseDetail.roomNumber || 0}}房{{houseDetail.houseDetail.hallNumber || 0}}厅{{houseDetail.houseDetail.bathNumber || 0}}卫</div>
          <button open-type="share" class="share-btn">分享</button>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card">
      <div class="header" v-if="!share">
        <!-- <div class="avatar">
          <img src="/static/images/areal.png" />
        </div>
        <div class="center-content">
          <div>物业主管</div>
          <div>John Smith 张小明</div>
        </div>-->
        <div class="green-btn inline-btn" @click="showSendReuqest('是否需要免费房屋价值评估服务？')">免费房屋价值评估服务</div>
        <div class="white-btn inline-btn" @click="showSendReuqest('是否需要免费租金评估服务？')">免费租金评估服务</div>
      </div>
      <div class="card-info">
        <div class="info-row card-title">租户信息</div>
        <div class="flex-between info-row">
          <div>姓名</div>
          <div>{{houseDetail.tenantInfo.name}}</div>
        </div>
        <div class="flex-between info-row">
          <div>月租金</div>
          <div>${{houseDetail.tenantInfo.monthRental}}</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>${{houseDetail.tenantInfo.weekRental}}</div>
        </div>
        <div class="flex-between info-row">
          <div>押金</div>
          <div>${{houseDetail.tenantInfo.deposit}}</div>
        </div>
        <div class="flex-between info-row">
          <div>租金支付日期</div>
          <div>{{houseDetail.tenantInfo.paymentDate}}</div>
        </div>
        <div class="flex-between info-row">
          <div>租约日期</div>
          <div>{{houseDetail.tenantInfo.endDate}}</div>
        </div>
        <div class="flex-between info-row">
          <div>最后一次租金上调日期</div>
          <div>{{houseDetail.tenantInfo.lastRiseRentalDate}}</div>
        </div>
      </div>
      <div class="card-info">
        <div class="flex-between info-row" v-for="item in houseDetail.additionInfo" :key="item">
          <div>{{item.title}}</div>
          <div>{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div v-for="item in houseDetail.staffs" :key="item">
      <div class="white-card name-card">
        <div class="avatar">
          <image :src="item.avatarUrl" />
        </div>
        <div class="center">
          <div class="card-title">{{item.subTitle}}</div>
          <div style>{{item.name}}</div>
        </div>
        <div class="right">
          <button class="white-btn name-btn" @click="()=>showCard(item)">查看名片</button>
        </div>
      </div>
      <div class="gap"></div>
    </div>
    <div class="page-gap"></div>
  </div>
</template>

<script>
import CustomModal from "@/components/custommodal";
import CustomDialog from "@/components/dialog";
import NameCard from "@/components/namecard";
import { formatDate } from "@/utils/index";
import NavBar from "@/components/navbar";
export default {
  data() {
    return {
      nameCardShow: false,
      houseValueModalShow: false,
      share: false,
      houseValueContent: "是否需要免费房屋价值评估服务？",
      visitCardShow: false,
      houseDetail: false
    };
  },
  onShow() {
    const { detail, id, type } = this.$root.$mp.query;
    this.share = type === "share";
    if (this.share) {
      this.houseDetail = JSON.parse(detail);
    } else {
      this.houseDetail = this.$store.state.houseList.find(item => {
        item.tenantInfo.paymentDate = `每月${item.tenantInfo.paymentDate}号`;
        item.tenantInfo.lastRiseRentalDate = formatDate(
          item.tenantInfo.lastRiseRentalDate
        );
        return item.id == id;
      });
    }
  },
  onShareAppMessage() {
    const { id } = this.$root.$mp.query;
    return {
      title: "房源分享",
      path: `/pages/housedetail/main?detail=${JSON.stringify(
        this.houseDetail
      )}&type=share`,
      success: res => {},
      fail: () => {},
      complete: () => {}
    };
  },
  methods: {
    formatDate,
    showCard(info) {
      this.nameCardShow = true;
      this.info = info;
    },
    showSendReuqest(request) {
      this.houseValueContent = request;
      this.houseValueModalShow = true;
    },
    async sendHouseValueReq() {
      const req =
        this.houseValueContent === "是否需要免费房屋价值评估服务？"
          ? "requestHouseValueAssessmentById"
          : "requestRentalAssessmentById";
      if (
        this.houseValueContent === "您的申请已成功发出，我们的团队会尽快联系您"
      ) {
        this.houseValueModalShow = false;
        return;
      }
      const reqRes = await this.$request(req, {
        data: {
          id: this.houseDetail.id,
          errorMsg: "申请失败",
          successMsg: "申请成功"
        }
      });
      if (reqRes && reqRes.code == 0) {
        this.houseValueContent = "您的申请已成功发出，我们的团队会尽快联系您";
      }
    }
  },
  components: {
    CustomModal,
    CustomDialog,
    NameCard,
    NavBar
  }
};
</script>

<style lang="scss">
.share-btn {
  color: $font-color;
  border: none;
  background: transparent;
  border-color: transparent;
  font-size: 30rpx;
  font-weight: bold;
  line-height: normal;
  padding: 0;
  margin: 0;
  &::after {
    border: none;
  }
}
.top-card {
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  padding: 0 0 20rpx 0;
  background: #fff;
  .full-img {
    width: 100%;
    height: 100%;
  }
  .carousel-desc {
    padding: 0 50rpx;
    .address {
      word-break: break-all;
      color: $font-color;
      padding: 24rpx 0;
      display: flex;
      align-items: center;
      .addimg {
        width: 24rpx;
        padding-right: 10rpx;
        height: 100%;
        image {
          width: 100%;
        }
      }
      .add {
        flex: 1;
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

.name-card {
  width: 98%;
  margin: 0 auto;
  padding: 20rpx 40rpx;
  display: flex;
  .center {
    word-break: break-all;
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

.card-info {
  padding: 10rpx 30rpx;
  border-bottom: 2rpx solid $bg-color;
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
</style>