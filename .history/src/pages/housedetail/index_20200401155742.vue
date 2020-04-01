<template>
  <div class="bg">
    <CustomModal :visible="houseValueModalShow" :onClose="()=>this.houseValueModalShow=false">
      <CustomDialog
        :content="houseValueContent"
        @confirm="sendHouseValueReq"
        @cancel="()=>this.houseValueModalShow=false"
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
          <image class="full-img" :src="item" mode="heightFix" />
        </swiper-item>
      </swiper>
      <div class="carousel-desc">
        <div class="address">
          <image src="/static/images/location.png" mode="widthFix" />
          {{houseDetail.address}}
        </div>
        <div class="desc">
          <div>{{houseDetail.houseDetail.roomNumber || 0}}房{{houseDetail.houseDetail.hallNumber || 0}}厅{{houseDetail.houseDetail.bathNumber || 0}}卫</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card">
      <div class="header">
        <!-- <div class="avatar">
          <img src="/static/images/areal.png" />
        </div>
        <div class="center-content">
          <div>物业主管</div>
          <div>John Smith 张小明</div>
        </div>-->
        <div class="green-btn inline-btn" @click="()=>this.houseValueModalShow = true">免费房屋价值评估服务</div>
        <div class="white-btn inline-btn" @click="()=>this.visitCardShow = true">免费租金评估服务</div>
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
          <div>{{formatDate(houseDetail.tenantInfo.paymentDate)}</div>
        </div>
        <div class="flex-between info-row">
          <div>租约结束日期</div>
          <div>{{houseDetail.tenantInfo.endDate}}</div>
        </div>
        <div class="flex-between info-row">
          <div>最后一次租金上调日期</div>
          <div>{{houseDetail.tenantInfo.lastRiseRentalDate}}</div>
        </div>
      </div>
      <div class="card-info">
        <div class="flex-between info-row">
          <div>姓名</div>
          <div>{{houseDetail.tenantInfo.name}}</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card name-card" v-for="item in houseDetail.staffs" :key="item">
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
    <div class="page-gap"></div>
  </div>
</template>

<script>
import CustomModal from "@/components/custommodal";
import CustomDialog from "@/components/dialog";
import NameCard from "@/components/namecard";
import { formatDate } from "@/utils/index";
export default {
  data() {
    return {
      nameCardShow: false,
      houseValueModalShow: false,
      houseValueContent: "是否需要免费房屋价值评估服务？",
      visitCardShow: false,
      houseDetail: false
    };
  },
  onShow() {
    const { id } = this.$root.$mp.query;
    this.houseDetail = this.$store.state.houseList.find(item => {
      return item.id == id;
    });
  },
  methods: {
    showCard(info) {
      this.nameCardShow = true;
      this.info = info;
    },
    async sendHouseValueReq() {
      const reqRes = await this.$request("requestHouseValueAssessmentById", {
        data: {
          id: this.houseDetail.id,
          errorMsg: "申请失败"
        }
      });
      console.log(reqRes);
    }
  },
  components: {
    CustomModal,
    CustomDialog,
    NameCard
  }
};
</script>

<style lang="scss">
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