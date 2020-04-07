<template>
  <div class="bg">
    <NavBar title="澳睿集团业主客户端" />
    <div v-for="item in msgList" :key="item">
      <div class="title">{{item.date}}</div>
      <div class="white-card msg-card">{{item.description}}</div>
    </div>
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
    formatDate
  },
  computed: mapState(["userInfo"]),
  async onShow() {
    const msgList = await this.$request("fetchMsgByUserId", {
      data: {
        id: this.userInfo.id
      }
    });
    this.$request("readMsgByUserId", {
      data: {
        id: this.userInfo.id
      }
    });
    msgList.forEach(item => {
      item.date = formatDate(item.createTime);
    });
    this.msgList = msgList;
    console.log(msgList);
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