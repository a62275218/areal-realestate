<template>
  <div class="bg">
    <NavBar title="物业维护" />
    <FilterBar :list="houseList" searchKey="address" @change="handleSearchChange"></FilterBar>
    <div class="none" v-if="!urgentList.length && !pendingList.length">点查看详情看维修状态</div>
    <div v-else>
      <div class="white-card urgent-card" v-for="item in urgentList" :key="item">
        <div class="content">
          <div class="title">紧急报修项目</div>
          <div class="subtitle">因此项目为紧急维修项目, 我们会按照紧急维修程序进行处理, 以减少您财产的损失和对租客的不便</div>
          <div class="description">{{item.description}}</div>
        </div>
        <swiper
          v-if="item.img.length"
          indicator-dots
          circular
          indicator-active-color="#1fa637"
          style="height:550rpx;"
        >
          <block v-for="(image,idx) in item.img" :key="idx">
            <swiper-item>
              <image style="width:100%;" mode="aspectFill" :src="image" />
            </swiper-item>
          </block>
        </swiper>
        <div class="bottom" @click="changeStatus(item)">申请报价</div>
      </div>
      <div class="white-card pending-card" v-for="item in pendingList" :key="item">
        <div class="content">
          <div class="title">报修项目</div>
          <div class="description">{{item.description}}</div>
        </div>
        <swiper
          v-if="item.img.length"
          indicator-dots
          circular
          indicator-active-color="#1fa637"
          style="height:550rpx;"
        >
          <block v-for="(image,idx) in item.img" :key="idx">
            <swiper-item>
              <image style="width:100%;" mode="widthFix" :src="image" />
            </swiper-item>
          </block>
        </swiper>
        <div class="bottom" @click="changeStatus(item)">维修报价申请</div>
      </div>
    </div>
    <div>
      <button class="green-btn navigate" @click="navigate">前往查看详情</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "@/components/navbar";
import FilterBar from "@/components/filterbar";
export default {
  data() {
    return {
      urgentList: [],
      pendingList: []
    };
  },
  computed: {
    ...mapState(["houseList", "activeIndex"])
  },
  components: {
    FilterBar,
    NavBar
  },
  async onShow() {
    this.$store.dispatch("getUserHouse", {
      id: this.$store.state.userInfo.id,
      callback: () => {
        this.searchID = this.houseList
          ? this.houseList[this.activeIndex === 999?0:this.activeIndex].id
          : "";
        this.getFilterInfo();
      }
    });
  },
  methods: {
    handleSearchChange(item) {
      this.searchID = item.id || "";
      this.getFilterInfo();
    },
    navigate() {
      mpvue.navigateTo({ url: "/pages/wuye/main" });
    },
    async changeStatus(item) {
      let requestStatus;
      if (item.status === "待确认") {
        requestStatus = "待批准";
      } else if (item.status === "待报价") {
        requestStatus = "待批准";
      }
      if (requestStatus) {
        const changeStatusRes = await this.$request(
          "postModifyMaintainStatus",
          {
            data: {
              id: item.id,
              status: requestStatus,
              sendMail:'one'
            },
            successMsg: "处理成功"
          }
        );
        mpvue.showToast({
          title: '请前往查看详情，查看维修详细信息',
          icon: 'none',
          duration:5000
        });
        this.getFilterInfo();
      }
    },
    async getFilterInfo() {
      if (this.searchID) {
        const pendingList = await this.$request(
          "fetchMaintainByHouseIdWithStatus",
          {
            hideLoading:true,
            data: {
              id: this.searchID,
              status: "待报价",
              startTime: 0,
              endTime: Date.parse(new Date()) / 1000
            }
          }
        );
        this.pendingList = pendingList;
        const urgentList = await this.$request(
          "fetchMaintainByHouseIdWithStatus",
          {
            hideLoading:true,
            data: {
              id: this.searchID,
              status: "待确认",
              startTime: 0,
              endTime: Date.parse(new Date()) / 1000
            }
          }
        );
        this.urgentList = urgentList;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.none {
  color: $dark-gray-color;
  text-align: center;
  padding: 60rpx 0 0 0;
}
.navigate {
  margin-top: 40rpx;
  border-radius: 30rpx;
  margin-bottom: 40rpx;
  font-size: 28rpx;
  width: 300rpx;
  padding: 10rpx 40rpx;
}
.white-card {
  margin: 30rpx 0;
  overflow: hidden;
  .content {
    padding: 40rpx;
  }
  .description {
    color: $gray-color;
  }
  .bottom {
    height: 100rpx;
    text-align: center;
    font-size: 30rpx;
    line-height: 90rpx;
  }
}
.urgent-card {
  .title {
    color: $warn-color;
    font-size: 32rpx;
    text-align: center;
    font-weight: 500;
    padding-bottom: 20rpx;
  }
  .subtitle {
    color: $warn-color;
    padding-bottom: 20rpx;
  }
  .bottom {
    background: $warn-color;
    color: #fff;
  }
}
.pending-card {
  .title {
    color: $dark-gray-color;
    font-size: 32rpx;
    text-align: center;
    font-weight: 500;
    padding-bottom: 20rpx;
  }
  .bottom {
    background: $font-color;
    color: #fff;
  }
}
</style>