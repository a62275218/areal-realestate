<template>
  <div class="bg">
    <CustomModal :visible="tipVisible" :onClose="()=>this.tipVisible=false">
      <div class="white-card tip">
        <image class="icon-question" mode="widthFix" src="/static/images/question.png" />澳大利亚财政年度是每年的7月1日到第二年的6月30日
      </div>
    </CustomModal>
    <FilterBar
      :list="newHouseList"
      searchKey="address"
      @change="handleSearchChange"
      defaultIndex="0"
    ></FilterBar>
    <div class="page-gap"></div>
    <div class="white-card">
      <div class="date-picker">
        <div style="min-width:110rpx;">查找日期</div>
        <image
          @click.stop="showTip"
          class="icon-question"
          style="padding-left:20rpx;"
          mode="widthFix"
          src="/static/images/question.png"
        />
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
    <div class="white-card annual-card">
      <div class="row">
        <div class="col">
          <div class="title" style="padding-bottom:20rpx;">年度总租金收入</div>
          <div class="number" style="padding-bottom:20rpx;">${{income}}</div>
        </div>
        <div class="col">
          <div class="title" style="padding-bottom:20rpx;">年度总支出</div>
          <div class="number" style="padding-bottom:20rpx;">${{output}}</div>
        </div>
      </div>
      <div class="count">
        <div class="date-range" style="padding-bottom:20rpx;">{{dateRange}}</div>
        <div class="title" style="padding-bottom:20rpx;">
          年度租金结算
          <span class="number">${{income - output}}</span>
        </div>
      </div>
    </div>
    <div v-for="item in rentalInfo" :key="item">
      <div class="page-gap"></div>
      <div class="white-card detail-card">
        <div class="title">{{item.recordDate}}</div>
        <div class="row" v-for="(row,idx) in item.info" :key="idx">
          <div>{{row.title}}</div>
          <div v-if="row.type === '收入'" class="in">${{row.content}}</div>
          <div v-else-if="row.type === '支出'" class="out">${{row.content}}</div>
          <div v-else class="normal">{{row.content}}</div>
        </div>
        <div class="row bottom">
          <div class="subtitle">本月租金盈余</div>
          <div class="number">$23321</div>
        </div>
      </div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import FilterBar from "@/components/filterbar";
import { mapState } from "vuex";
import { formatTime } from "@/utils/index";
import CustomModal from "@/components/custommodal";
export default {
  data() {
    return {
      rentalInfo: [],
      tipVisible: false,
      searchID: "",
      startDate: "",
      endDate: "",
      dateRange: "",
      income: 0,
      output: 0
    };
  },
  components: {
    FilterBar,
    CustomModal
  },
  computed: {
    ...mapState(["houseList"]),
    newHouseList() {
      return [{ address: "全部房屋" }].concat(this.houseList);
    }
  },
  async onShow() {
    this.getDateRange();
    this.$store.dispatch("getUserHouse", {
      id: this.$store.state.userInfo.id
    });
    this.getTotalInfo();
    this.getFilterInfo();
  },
  methods: {
    async handleSearchChange(item) {
      this.searchID = item.id || "";
      this.getFilterInfo();
    },
    async getTotalInfo() {
      const rentalInfo = await this.$request("fetchRentalByUserIdWithTime", {
        data: {
          id: this.$store.state.userInfo.id,
          startTime:
            Date.parse(new Date(new Date().getFullYear() - 1, 7, 1)) / 1000,
          endTime: Date.parse(new Date(new Date().getFullYear(), 6, 30)) / 1000
        }
      });
      let income = 0,
        output = 0;
      rentalInfo.forEach(item => {
        item.info.forEach(bill => {
          if (bill.type === "收入") {
            income += Number(bill.content);
          } else if (bill.type === "支出") {
            output += Number(bill.content);
          }
        });
      });
      this.income = income;
      this.output = output;
    },
    getDateRange() {
      this.dateRange = `${new Date().getFullYear() -
        1}年7月1日 - ${new Date().getFullYear()}年6月30日`;
    },
    bindDateChangeStart(e) {
      this.startDate = e.mp.detail.value;
      this.getFilterInfo();
    },
    bindDateChangeEnd(e) {
      this.endDate = e.mp.detail.value;
      this.getFilterInfo();
    },
    async getFilterInfo() {
      const hasDateRange = this.startDate && this.endDate;
      if (!this.searchID) {
        if (hasDateRange) {
          const rentalInfo = await this.$request(
            "fetchRentalByUserIdWithTime",
            {
              data: {
                id: this.$store.state.userInfo.id,
                startTime: Date.parse(new Date(this.startDate)) / 1000,
                endTime: Date.parse(new Date(this.endDate)) / 1000
              }
            }
          );
          this.rentalInfo = rentalInfo;
        } else {
          const rentalInfo = await this.$request(
            "fetchRentalByUserIdWithTime",
            {
              data: {
                id: this.$store.state.userInfo.id,
                startTime: 0,
                endTime: Date.parse(new Date()) / 1000
              }
            }
          );
          this.rentalInfo = rentalInfo;
        }
      } else {
        if (hasDateRange) {
          const rentalInfo = await this.$request(
            "fetchRentalByHouseIdWithTime",
            {
              data: {
                id: this.searchID,
                startTime: Date.parse(new Date(this.startDate)) / 1000,
                endTime: Date.parse(new Date(this.endDate)) / 1000
              }
            }
          );
          this.rentalInfo = rentalInfo;
        } else {
          const rentalInfo = await this.$request(
            "fetchRentalByHouseIdWithTime",
            {
              data: {
                id: this.searchID,
                startTime: 0,
                endTime: Date.parse(new Date()) / 1000
              }
            }
          );
          this.rentalInfo = rentalInfo;
        }
      }
    },
    showTip() {
      this.tipVisible = true;
    }
  }
};
</script>

<style lang="scss">
.page-gap {
  height: 20rpx;
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
.icon-question {
  width: 32rpx;
  padding-right: 30rpx;
}
.tip {
  padding: 30rpx;
  color: $font-color;
  display: flex;
  align-items: center;
}
.annual-card {
  .title {
    color: $dark-gray-color;
    font-weight: 600;
    font-size: 30rpx;
  }
  .number {
    color: $font-color;
    font-weight: 600;
  }
  .date-range {
    color: $gray-color;
  }
  .row {
    padding: 0 !important;
    display: flex;
    .col {
      padding: 30rpx;
      &:nth-child(1) {
        border-right: 2rpx solid $bg-color;
      }
      flex: 1;
      text-align: center;
    }
  }
  .count {
    padding: 30rpx;
    text-align: center;
  }
}

.detail-card {
  .row {
    border: none !important;
  }
  .in {
    color: $font-color;
  }
  .out {
    color: $warn-color;
  }
  .normal {
    color: #000;
  }
  .title {
    color: $dark-gray-color;
    font-weight: 500;
    font-size: 30rpx;
    padding: 30rpx 60rpx;
    border-bottom: 2rpx solid $bg-color !important;
  }
  .subtitle {
    color: $dark-gray-color;
    font-weight: 500;
  }
  .number {
    color: $font-color;
    font-weight: 500;
  }
  .bottom {
    border-top: 2rpx solid $bg-color !important;
  }
}
</style>