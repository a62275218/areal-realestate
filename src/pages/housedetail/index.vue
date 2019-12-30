<template>
  <div class="bg">
    <CustomModal :visible="visitCardShow" :onClose="()=>this.visitCardShow=false">
      <div class="white-card calling-card">
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
      <div class="green-btn save-card">保存名片</div>
    </CustomModal>
    <div class="top-card">
      <swiper indicator-dots circular style="min-height:580rpx" indicator-active-color="#1fa637">
        <swiper-item>
          <img class="full-img" src="/static/images/areal.png" />
        </swiper-item>
      </swiper>
      <div class="carousel-desc">
        <div class="address">1038 / 33 kosdfns streest Boxhill VIC 3128</div>
        <div class="desc">
          <div>X房X厅X卫</div>
          <div class="status">OWNED</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card">
      <div class="header">
        <div class="avatar">
          <img src="/static/images/areal.png" />
        </div>
        <div class="center-content">
          <div>物业主管</div>
          <div>John Smith 张小明</div>
        </div>
        <div class="white-btn" @click="()=>this.visitCardShow = true">查看名片</div>
      </div>
      <div class="card-info">
        <div class="info-row card-title">租户信息</div>
        <div class="flex-between info-row">
          <div>姓名</div>
          <div>xxxxxx</div>
        </div>
        <div class="flex-between info-row">
          <div>月租金</div>
          <div>$232</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>$232</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>$232</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>$232</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>$232</div>
        </div>
        <div class="flex-between info-row">
          <div>周租金</div>
          <div>$232</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomModal from "@/components/custommodal";
export default {
  data() {
    return {
      visitCardShow: false
    };
  },
  methods: {
    showModal() {
      console.log(this.visitCardShow);
    }
  },
  components: {
    CustomModal
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
    height: 100%;
  }
  .carousel-desc {
    padding: 0 20rpx;
    .address {
      color: $font-color;
      padding: 24rpx 0;
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
  padding: 30rpx;
  align-items: center;
  border-bottom: 2rpx solid $bg-color;
  .center-content {
    flex: 1;
    padding-left: 20rpx;
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

.calling-card {
}

.save-card {
  margin: 30rpx auto 0;
}
</style>