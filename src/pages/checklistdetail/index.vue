<template>
  <div class="bg">
    <NavBar :title="navTitle" />
    <FilterBar :list="houseList" searchKey="address" @change="handleSearchChange"></FilterBar>
    <div class="gap"></div>
    <div class="white-card">
      <div class="date-picker">
        <div style="min-width:110rpx;">检查日期</div>
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
    <div class="gap"></div>
    <div v-for="(item,index) in inSpectionList" :key="item">
      <video style="width:100%;margin:20rpx 0;" :src="item.videoLink"></video>
      <div class="white-card">
        <div class="subtabbar">
          <div
            v-for="(tab,idx) in item.otherInfo"
            @click="handleSubActive({index,idx})"
            :key="tab"
            :class="{'tab active':tab.active,'tab':!tab.active}"
          >{{tab.title}}</div>
        </div>
        <div v-for="(detail,idx) in item.otherInfo" :key="idx">
          <div v-if="detail.active">
            <div v-for="(img,i) in detail.img" :key="i">
              <image :src="img" mode="widthFix" style="width:100%;" />
              <div class="gap"></div>
            </div>
            <div class="desc">{{detail.description}}</div>
          </div>
        </div>
      </div>
      <div class="gap"></div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterBar from "@/components/filterbar";
import NavBar from "@/components/navbar";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
      inSpectionList: []
    };
  },
  onUnload() {
    this.startDate = "";
    this.endDate = "";
  },
  onShow() {
    const { name } = this.$root.$mp.query;
    this.navTitle = name;
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
  components: {
    FilterBar,
    NavBar
  },
  computed: {
    ...mapState(["houseList", "activeIndex"])
  },
  methods: {
    handleSearchChange(item) {
      this.startDate = "";
      this.endDate = "";
      this.searchID = item.id || "";
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
    handleSubActive(param) {
      const { index, idx } = param;
      const t = this.inSpectionList;
      t.forEach((item, i) => {
        if (i === index) {
          item.otherInfo.forEach((info, j) => {
            info.active = j === idx;
          });
        }
      });
      this.inSpectionList = t.reverse().reverse();
    },
    async getFilterInfo() {
      const { name } = this.$root.$mp.query;
      const startTime = this.startDate
        ? Date.parse(new Date(this.startDate)) / 1000
        : 0;
      const endTime = this.endDate
        ? (Date.parse(new Date(this.endDate)) + 86400000) / 1000
        : (Date.parse(new Date()) + 86400000) / 1000;
      if (this.searchID) {
        const inSpectionList = await this.$request(
          "fetchInspectionByHouseIdWithTime",
          {
            data: {
              id: this.searchID,
              startTime,
              endTime
            }
          }
        );
        this.inSpectionList = inSpectionList.filter(item => {
          if (item.otherInfo && item.otherInfo.length) {
            item.otherInfo[0].active = true;
          }
          return item.type === name;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

.desc {
  padding: 40rpx;
  color: $dark-gray-color;
  font-size: 28rpx;
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
</style>