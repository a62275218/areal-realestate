<template>
  <div class="bg">
    <CustomModal :visible="confirmModalShow" :onClose="()=>this.confirmModalShow=false">
      <CustomDialog
        @confirm="handleModify"
        @cancel="()=>this.confirmModalShow=false"
      ></CustomDialog>
    </CustomModal>
    <FilterBar :list="houseList" searchKey="address" @change="handleSearchChange"></FilterBar>
    <div class="tabbar">
      <div
        v-for="(item,index) in tabbar"
        @click="handleActive(index)"
        :key="index"
        :class="{'tab active':item.active,'tab':!item.active}"
      >{{item.name}}</div>
    </div>
    <div class="gap" style="height:60rpx;"></div>
    <div class="white-card subtabbar">
      <div class="title">报修进度</div>
      <div
        v-for="(item,index) in subtabbar"
        @click="handleSubActive(index)"
        :key="index"
        :class="{'tab active':item.active,'tab':!item.active}"
      >{{item.name}}</div>
    </div>
    <div v-if="maintainList.length">
      <div class="white-card maintain-item" v-for="(item,index) in maintainList" :key="index">
        <div class="title">报修项目</div>
        <div v-if="item.quote.length">
          <div class="sub-item" v-for="(quote,idx) in item.quote" :key="idx">
            <div class="subtitle">
              <div>{{item.type}}</div>
              <div class="status pending" v-if="quote.status ==='待同意'">
                <div class="round" />
                <div>等待批准报价</div>
              </div>
              <div class="status approve" v-if="quote.status ==='已批准'">
                <div class="round" />
                <div>已批准</div>
              </div>
              <div class="status processing" v-if="quote.status ==='处理中'">
                <div class="round" />
                <div>处理中</div>
              </div>
            </div>
            <div class="price" v-if="quote.status ==='待同意'">报价: ${{quote.price}}</div>
            <div class="approve-price" v-if="quote.status ==='已批准'">报价: ${{quote.price}}</div>
            <div class="description">{{quote.description}}</div>
            <div class="agree" v-if="quote.status ==='待同意'">
              <div class="left"></div>
              <div class="white-btn">同意报价</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="subtitle">
            <div>{{item.type}}</div>
            <div class="status pending">
              <div class="round" />报价中
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty white-card" v-else>暂时没有项目</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterBar from "@/components/filterbar";
import CustomDialog from "@/components/dialog";
import CustomModal from "@/components/custommodal";
export default {
  data() {
    return {
      maintainList: [],
      confirmModalShow:false,
      tabbar: [
        {
          name: "最新详情",
          active: true
        },
        {
          name: "历史记录",
          active: false
        }
      ],
      subtabbar: [
        {
          name: "待报价",
          value: "待批准",
          active: true
        },
        {
          name: "已批准",
          value: "已批准",
          active: false
        },
        {
          name: "处理中",
          value: "处理中",
          active: false
        },
        {
          name: "已完成",
          value: "已完成",
          active: false
        }
      ]
    };
  },
  computed: {
    ...mapState(["houseList", "activeIndex"]),
    activeTab() {
      return this.tabbar.find(item => item.active);
    },
    activeSubTab() {
      return this.subtabbar.find(item => item.active);
    }
  },
  components: {
    FilterBar,
    CustomDialog,
    CustomModal
  },
  onShow() {
    this.$store.dispatch("getUserHouse", {
      id: this.$store.state.userInfo.id,
      callback: () => {
        this.searchID = this.houseList
          ? this.houseList[this.activeIndex].id
          : "";
        this.getFilterInfo();
      }
    });
  },
  methods: {
    handleActive(index) {
      this.tabbar.forEach(item => {
        item.active = false;
      });
      this.tabbar[index].active = true;
      this.getFilterInfo();
    },
    handleSubActive(index) {
      this.subtabbar.forEach(item => {
        item.active = false;
      });
      this.subtabbar[index].active = true;
      this.getFilterInfo();
    },
    handleSearchChange(item) {
      this.searchID = item.id || "";
      this.getFilterInfo();
    },
    async getFilterInfo() {
      const date = new Date();
      const previousOneMonth =
        Date.parse(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;
      const startTime =
        this.activeTab.name === "最新详情" ? previousOneMonth : 0;
      const endTime =
        this.activeTab.name === "最新详情"
          ? Date.parse(date) / 1000
          : previousOneMonth;
      const hasDateRange = this.startDate && this.endDate;
      if (this.searchID) {
        const maintainList = await this.$request(
          "fetchMaintainByHouseIdWithStatus",
          {
            data: {
              id: this.searchID,
              status: this.activeSubTab.value,
              startTime,
              endTime
            }
          }
        );
        this.maintainList = maintainList;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.empty {
  padding: 80rpx 0;
  color: $dark-gray-color;
  text-align: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.tabbar {
  display: flex;
  width: 100%;
  height: 100rpx;
  .tab {
    &:nth-child(1) {
      border-right: 2rpx solid $bg-color;
      border-bottom-left-radius: 20rpx;
    }
    &:nth-child(2) {
      border-bottom-right-radius: 20rpx;
    }
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-color;
    background: #fff;
  }
  .active {
    background: $font-color;
    color: #fff;
    position: relative;
    &:before {
      content: "";
      width: 0;
      height: 0;
      border-left: 14rpx solid transparent;
      border-right: 14rpx solid transparent;
      border-top: 8rpx solid $font-color;
      position: absolute;
      bottom: -8rpx;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
.subtabbar {
  display: flex;
  color: $gray-color;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2rpx solid $bg-color;
  padding: 24rpx 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  .title {
    color: $dark-gray-color !important;
    font-weight: 500;
  }
  .active {
    color: $font-color;
    border-bottom: 4rpx solid $font-color;
  }
}
.maintain-item {
  padding: 32rpx;
  margin-bottom: 40rpx;
  .sub-item {
    border-bottom: 2rpx solid $bg-color;
    padding-bottom: 30rpx;
    &:nth-last-child(1) {
      border: none;
    }
  }
  &:nth-child(1) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .title {
    color: $dark-gray-color;
  }
  .subtitle {
    padding: 30rpx 0;
    width: 100%;
    display: flex;
    color: $gray-color;
    justify-content: space-between;
    .pending {
      color: $warn-color;
      .round {
        background: $warn-color;
      }
    }
    .approve {
      .round {
        background: $orange-color;
      }
      color: $orange-color;
    }
    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .round {
        margin-right: 20rpx;
        width: 18rpx;
        height: 18rpx;
        border-radius: 50%;
      }
    }
  }
  .price {
    color: $warn-color;
  }
  .approve-price{
    color: $orange-color;
    text-align:right;
  }
  .description {
    padding: 30rpx 0;
    color: $gray-color;
  }
  .agree {
    display: flex;
    .left {
      flex: 1;
    }
    .white-btn {
      width: 130rpx;
    }
  }
}
</style>