<template>
  <div class="bg">
    <NavBar title="支付账单" />
    <!-- <ServiceBtn /> -->
    <FilterBar
      :showAll="true"
      :list="houseList"
      searchKey="address"
      @change="handleSearchChange"
      defaultIndex="0"
    ></FilterBar>
    <div class="tabbar">
      <div
        v-for="(item,index) in tabbar"
        @click="handleActive(index)"
        :key="index"
        :class="{'tab active':item.active,'tab':!item.active}"
      >{{item.name}}</div>
    </div>
    <div class="page-gap"></div>
    <div class="white-card" v-if="tabbar[1].active">
      <div class="date-picker">
        <div style="min-width:110rpx;">查找日期</div>
        <div class="search-row">
          <div class="col">
            <picker
              mode="date"
              :value="startDate"
              :start="pickerStart"
              end="2217-09-01"
              @change="bindDateChangeStart"
            >
              <div class="date">{{startDate || '起始日期'}}</div>
            </picker>
          </div>
          <div class="col">
            <picker
              mode="date"
              :value="endDate"
              :start="pickerEnd"
              end="2217-09-01"
              @change="bindDateChangeEnd"
            >
              <div class="date">{{endDate || '结束日期'}}</div>
            </picker>
          </div>
        </div>
      </div>
    </div>
    <div class="page-gap"></div>
    <div v-for="item in paymentList" :key="item.id">
      <div class="date-gap" v-if="item.active">{{item.date}}</div>
      <div class="white-card billcard" v-if="item.active">
        <div class="title">{{item.address}}</div>
        <div class="content">{{item.description}}</div>
        <div class="price">${{item.price}}</div>
        <div v-if="item.status==='待支付'" class="green-btn" @click="scanCode(item.id)">扫码支付</div>
        <div v-else-if="item.status==='已成功'" class="white-btn">支付成功</div>
        <div v-else-if="item.status==='确认中'">
          <div class="white-btn pending-btn">正在后台审核</div>
          <div class="green-btn" @click="scanCode(item.id)">重新支付</div>
        </div>
      </div>
      <div class="page-gap"></div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import FilterBar from "@/components/filterbar";
import { mapState } from "vuex";
import { formatDate } from "@/utils/index";
import NavBar from "@/components/navbar";
import ServiceBtn from "@/components/servicebtn";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      paymentList: [],
      tabbar: [
        {
          name: "最新详情",
          active: true
        },
        {
          name: "历史记录",
          active: false
        }
      ]
    };
  },
  components: {
    FilterBar,
    ServiceBtn,
    NavBar
  },
  onUnload() {
    this.startDate = "";
    this.endDate = "";
  },
  onShow() {
    this.$store.dispatch("getUserHouse", {
      id: this.$store.state.userInfo.id,
      callback: () => {
        this.getFilterInfo();
      }
    });
  },
  computed: {
    ...mapState(["houseList", "userInfo"]),
  },
  methods: {
    async handleSearchChange(item) {
      console.log('item',item)
      this.startDate = "";
      this.endDate = "";
      this.searchID = item.id || "";
      this.getFilterInfo();
    },
    handleActive(index) {
      this.startDate = "";
      this.endDate = "";
      this.tabbar.forEach(item => {
        item.active = false;
      });
      this.tabbar[index].active = true;
      this.getFilterInfo();
    },
    bindDateChangeStart(e) {
      this.startDate = e.mp.detail.value;
      this.getFilterInfo();
    },
    bindDateChangeEnd(e) {
      this.endDate = e.mp.detail.value;
      this.getFilterInfo();
    },
    scanCode(id) {
      mpvue.previewImage({
        urls: ["https://areal.weboostapp.com/image/arealpay.png"]
      });
      this.$request("postChangePaymentStatusByPaymentId", {
        data: {
          id,
          status: "确认中"
        }
      });
    },
    async getFilterInfo() {
      const startTime = this.startDate
        ? Date.parse(new Date(this.startDate)) / 1000
        : 0;
      const endTime = this.endDate
        ? (Date.parse(new Date(this.endDate)) + 86400000) / 1000
        : (Date.parse(new Date()) + 86400000) / 1000;
      let requestParam;
      console.log('tab',this.tabbar)
      console.log('searchID',this.searchID)
      if (this.tabbar[1].active) {
        if (this.searchID) {
          console.log('userId',this.userInfo)
          requestParam = {
            userId: this.userInfo.id,
            houseId: this.searchID,
            startTime,
            endTime
          };
        } else {
          requestParam = {
            userId: this.userInfo.id,
            startTime,
            endTime
          };
        }
      } else {
        if (this.searchID) {
          requestParam = {
            houseId: this.searchID,
            userId: this.userInfo.id
          };
        } else {
          requestParam = {
            userId: this.userInfo.id
          };
        }
      }
      let paymentList = await this.$request(
        "fetchPaymentByHouseIdorUserIdWithTime",
        {
          data: requestParam
        }
      );
      console.log('paymentList',paymentList)
      console.log(this.houseList)
      paymentList.forEach(item => {
        item.date = item.recordTimeStamp
          ? formatDate(item.recordTimeStamp * 1000)
          : "";
          console.log(item.belongHouseId)
        console.log(this.houseList.find(i => {
          return i.id === item.belongHouseId;
        }))
        const belongHouse = this.houseList.find(i => {
          return i.id === item.belongHouseId;
        })
        if(belongHouse){
          item.address = belongHouse.address;
        }
        item.active =
          (item.status === "已成功" && this.tabbar[1].active) ||
          (item.status !== "已成功" && this.tabbar[0].active);
      });
      console.log('then',paymentList)
      
      this.paymentList = paymentList;
    }
  }
};
</script>

<style lang="scss" scoped>
.date-gap {
  padding-bottom: 30rpx;
  text-align: center;
  color: $gray-color;
}
.date-picker {
  color: $dark-gray-color;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  .date {
    color: $font-color;
    text-align: right;
  }
  .search-row {
    color: $dark-gray-color;
    padding: 20rpx;
    display: flex;
    align-items: center;
    width: 100%;
    .col {
      text-align: right;
      flex: 1;
      display: flex;
    }
  }
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
.billcard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx;
  .title {
    color: $dark-gray-color;
    font-weight: 500;
  }
  .content {
    padding: 10rpx;
    color: $gray-color;
  }
  .price {
    font-size: 34rpx;
    color: $font-color;
    padding: 20rpx 0;
    font-weight: bold;
  }
}
.white-btn {
  padding: 14rpx 44rpx;
}
.pending-btn {
  margin-bottom: 20rpx;
  color: $orange-color;
  border-color: $orange-color;
}
</style>