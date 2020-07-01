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
    <template v-if="navTitle=== '常规物业检查报告'">
      <div v-for="(item,index) in inSpectionList" :key="index">
        <div class="top-date">{{item.recordDate}}</div>
        <div class="white-card">
          <video style="width:100%;" :src="item.videoLink"></video>
          <!-- <div class="subtabbar">
            <div
              v-for="(tab,idx) in item.otherInfo"
              @click="handleSubActive({index,idx})"
              :key="tab"
              :class="{'tab active':tab.active,'tab':!tab.active}"
            >{{tab.title}}</div>
          </div>-->
          <div v-for="(detail,idx) in item.otherInfo" :key="idx">
            <div v-if="detail.active">
              <div v-for="(img,i) in detail.img" :key="i">
                <image :src="img" mode="widthFix" style="width:100%;" />
                <div class="gap"></div>
              </div>
              <div class="desc">
                <div>{{detail.description}}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div>{{item.recordDate}}</div>
            <div class="lookup" @click="previewDoc(item.pdfLink)">查看文件</div>
          </div>
        </div>
        <div class="gap"></div>
      </div>
    </template>
    <div class="white-card" v-else>
      <div v-for="(item,index) in inSpectionList" :key="index">
        <div class="row">
          <div>{{item.recordDate}}</div>
          <div class="lookup" @click="previewDoc(item.pdfLink)">查看文件</div>
        </div>
      </div>
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
      inSpectionList: [],
      navTitle: ""
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
    previewDoc(link) {
      const regExp = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/;
      if (regExp.test(link)) {
        mpvue.showLoading({
          title: "预览文件中"
        });
        mpvue.downloadFile({
          url: link,
          success: res => {
            mpvue.openDocument({
              filePath: res.tempFilePath
            });
            mpvue.hideLoading();
          },
          fail: () => {
            mpvue.showToast({
              title: "下载文件失败",
              icon: "none"
            });
          }
        });
      } else {
        console.log("image");
        mpvue.previewImage({
          urls: [link]
        });
      }
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
        if (!inSpectionList.length && name === "新房交割物业检查报告") {
          mpvue.showToast({
            title: "该项不符合该房屋情况",
            icon: "none"
          });
        }
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

.top-date {
  text-align: center;
  color: $font-color;
  margin-bottom: 10rpx;
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
  flex-wrap: wrap;
  border-bottom: 2rpx solid $bg-color;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-bottom: 10rpx;
  .tab {
    padding: 12rpx 0;
    text-align: center;
    min-width: 20%;
  }
  .title {
    color: $dark-gray-color !important;
    font-weight: 500;
  }
  .active {
    color: $font-color;
    border-bottom: 4rpx solid $font-color;
  }
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $gray-color;
  padding: 30rpx !important;
  .lookup {
    color: $font-color;
    min-width: 110rpx;
  }
}
</style>