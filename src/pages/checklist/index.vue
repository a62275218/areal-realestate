<template>
  <div class="bg">
    <NavBar title="例行检查" />
    <FilterBar :list="houseList" searchKey="address" @change="handleSearchChange"></FilterBar>
    <div class="gap"></div>
    <div v-if="latestNormalInpect">
      <video :src="latestNormalInpect.videoLink" style="width:100%;display:block" />
    </div>
    <div class="gap"></div>
    <div class="white-card">
      <div class="row" v-for="item in menu" :key="item" @click="navigate(item)">
        <div>{{item.name}}</div>
        <div>
          <image style="width:30rpx;height:30rpx;" src="/static/images/Right-arrow.png" mode="widthFix" />
        </div>
      </div>
    </div>
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
      enableNew: false,
      searchID:"",
      latestNormalInpect:false,
      menu: [
        {
          name: "入住物业检查报告"
        },
        {
          name: "常规物业检查报告"
        },
        {
          name: "退房物业检查报告"
        },
        {
          name: "新房交割物业检查报告"
        }
      ]
    };
  },
  async onShow() {
    this.$store.dispatch("getUserHouse", {
      id: this.$store.state.userInfo.id,
      callback: () => {
        this.searchID = this.houseList
          ? this.houseList[this.activeIndex === 999 ? 0:this.activeIndex].id
          : "";
      }
    });
  },
  watch:{
    activeIndex:{
      handler(val){
        this.searchID = this.houseList
          ? this.houseList[val].id
          : "";
      }
    },
    searchID:{
      handler(val){
        this.fetchinSpectionList(val)
      }
    },
    immediate:true
  },
  methods: {
    async fetchinSpectionList(id){
      console.log('checklist change')
        if(!id){
          return
        }
        const inSpectionList = await this.$request(
          "fetchInspectionByHouseIdWithTime",
          {
            data: {
              id,
              startTime: 0,
              endTime: (Date.parse(new Date()) + 86400000) / 1000
            }
          }
        );
        const hasNew = inSpectionList.find(item => {
          return item.type == "新房交割物业检查报告";
        });
        if (hasNew) {
          this.enableNew = true;
        } else {
          this.enableNew = false;
        }
        const latestNormalInpect = inSpectionList.find(item => {
          return item.type == "常规物业检查报告";
        });
        if(latestNormalInpect){
          this.latestNormalInpect = latestNormalInpect
        }else{
          this.latestNormalInpect = ""
        }
    },
    navigate(item) {
      if (item.name === "新房交割物业检查报告" && !this.enableNew) {
        mpvue.showToast({
          title: "该项不符合业主房屋情况",
          icon: "none"
        });
        return;
      }
      mpvue.navigateTo({
        url: `/pages/checklistdetail/main?name=${item.name}`
      });
    }
  },
  components: {
    FilterBar,
    NavBar
  },
  computed: {
    ...mapState(["houseList", "activeIndex"])
  }
};
</script>

<style lang="scss" scoped>
.row {
  padding: 30rpx 50rpx 30rpx 30rpx !important;
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
</style>