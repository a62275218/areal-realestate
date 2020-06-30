<template>
  <div class="bg">
    <NavBar title="相关文件" />
    <CustomModal :visible="tipVisible" :onClose="()=>this.tipVisible=false">
      <div class="white-card tip">
        <image class="icon-question" mode="widthFix" src="/static/images/question.png" />澳大利亚财政年度是每年的7月1日到第二年的6月30日
      </div>
    </CustomModal>
    <FilterBar :list="houseList" searchKey="address" @change="handleSearchChange"></FilterBar>
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
    <div class="notfound" v-if="!documentList.length">无搜索结果</div>
    <div class="white-card">
      <scroll-view scroll-x="true">
        <div class="type-list">
          <div
            :class="{'active type':type == currentType,'type':type !== currentType}"
            v-for="type in typeList"
            :key="type"
            @click="switchType(type)"
          >{{type}}</div>
        </div>
      </scroll-view>
      <div
        v-for="item in documentList"
        :key="item"
      >
        <div v-if="item.type == currentType" class="file-card" @click="previewDoc(item.link)">
          <div>
            <div class="title">{{item.title}}</div>
            <div class="date">{{item.recordDate}}</div>
          </div>
          <div class="lookup">查看文件</div>
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
import NavBar from "@/components/navbar";
export default {
  data() {
    return {
      documentList: [],
      typeList: [],
      currentType: "",
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
    CustomModal,
    NavBar
  },
  computed: {
    ...mapState(["houseList", "activeIndex"])
  },
  onUnload() {
    this.startDate = "";
    this.endDate = "";
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
    async handleSearchChange(item) {
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
    async getFilterInfo() {
      const startTime = this.startDate
        ? Date.parse(new Date(this.startDate)) / 1000
        : 0;
      const endTime = this.endDate
        ? (Date.parse(new Date(this.endDate)) + 86400000) / 1000
        : (Date.parse(new Date()) + 86400000) / 1000;
      if (this.searchID) {
        {
          const documentList = await this.$request(
            "fetchFileByHouseIdWithTime",
            {
              data: {
                id: this.searchID,
                startTime,
                endTime
              }
            }
          );

          const typeList = [...new Set(documentList.map(item => item.type))];
          this.typeList = typeList;
          this.currentType = typeList[0];
          this.documentList = documentList;
        }
      }
    },
    showTip() {
      this.tipVisible = true;
    },
    switchType(type) {
      this.currentType = type;
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
        mpvue.previewImage({
          urls: [link]
        });
      }
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

.file-card {
  border-bottom: 2rpx solid $bg-color !important;
  padding: 30rpx 30rpx;
  display: flex;
  word-break: break-all;
  justify-content: space-between;
  align-items: center;
  .title {
    color: $dark-gray-color;
    font-weight: 500;
    font-size: 30rpx;
    margin-bottom: 10rpx;
  }
  .date {
    color: #000;
  }
  .lookup {
    color: $font-color;
    min-width: 110rpx;
  }
}

.type-list {
  display: flex;
  white-space:nowrap;
  padding:0 10rpx;
  .type {
    font-size: 28rpx;
    padding: 20rpx;
    color: $dark-gray-color;
  }
  .active {
    border-bottom: 2rpx solid $font-color;
    color: #000;
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
    border-top: 10rpx solid $bg-color !important;
  }
}
</style>