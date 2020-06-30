<template>
  <div class="bg">
    <NavBar title="澳睿VIP业主中心" />
    <div class="title" v-if="!msgList.length">暂无消息</div>
    <div v-for="item in msgList" :key="item">
      <div class="title">{{item.date}}</div>
      <div class="white-card msg-card">{{item.description}}</div>
    </div>
    <div class="large-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "@/components/navbar";
import { formatDate } from "@/utils/index";
export default {
  data() {
    return {
      msgList: []
    };
  },
  components: {
    NavBar
  },
  methods: {
    async initData() {
      console.log('init')
      const msgList = await this.$request("fetchMsgByUserId", {
        data: {
          id: this.userInfo.id
        }
      });
      
      // this.$request("readMsgByUserId", {
      //   data: {
      //     id: this.userInfo.id
      //   }
      // });
      msgList.forEach(item => {
        console.log(item)
        item.date = formatDate(item.createTime * 1000);
        console.log(item)
      });
      console.log(msgList);
      msgList.sort((a, b) => {
        return b.createTime - a.createTime;
      });
      this.msgList = msgList;
      
    }
  },
  computed: mapState(["userInfo"]),
  onShow() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: $gray-color;
  padding: 20rpx 0;
  text-align: center;
}
.msg-card {
  padding: 40rpx;
  width: 90%;
  color: $dark-gray-color;
  margin: 0 auto;
}
</style>