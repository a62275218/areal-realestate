<template>
  <div class="bg">
    <StaffBtn />
    <ServiceBtn />
    <CustomModal :visible="modifyModalShow" :onClose="()=>this.modifyModalShow=false">
      <CustomDialog
        :title="modifyTitle"
        :placeholder="originalInfo"
        :type="dialogType"
        @confirm="handleModify"
        @cancel="()=>this.modifyModalShow=false"
      ></CustomDialog>
    </CustomModal>
    <div v-if="userInfo">
      <div class="top-card">
        <div class="avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="right-info">
          <div>{{userInfo.id}}</div>
          <div>{{userInfo.name}}</div>
        </div>
        <image class="logo" src="/static/images/Group 35.png" alt mode="widthFix" />
      </div>
      <div class="gap"></div>
      <div class="white-card">
        <div class="row" v-for="(item,idx) in menu" :key="idx" @click="showModal(item.title)">
          <div>{{item.title}}</div>
          <div class="right-normal">{{userInfo[item.key]}}</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="white-card">
        <div class="row" v-for="(item,idx) in menu2" :key="idx">
          <div>{{item.title}}</div>
          <div>
            <i class="iconfont icon-iconfontjiantou2"></i>
          </div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="white-card">
        <div class="row" style="color:rgb(226,46,46);" @click="logout">退出登录</div>
      </div>
    </div>
    <div v-else>
      <div class="top-bg">
        <div class="login">
          <div class="input">
            <input type="text" placeholder="输入账号" placeholder-class="placeholder" v-model="account" />
            <span class="right-btn">忘记账号</span>
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="输入密码"
              placeholder-class="placeholder"
              v-model="password"
            />
            <span class="right-btn">忘记密码</span>
          </div>
        </div>
      </div>
      <button class="common-btn login-btn" @click="handleLogin">登录</button>
      <div class="intro-text">
        <div>澳睿微信公众号: ArealPropertyGroup</div>
        <div>澳睿网站: www.areal.com.au</div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomModal from "@/components/custommodal";
import CustomDialog from "@/components/dialog";
import ServiceBtn from "@/components/servicebtn";
import StaffBtn from "@/components/staffbtn";
import { mapState } from "vuex";
export default {
  components: {
    CustomModal,
    CustomDialog,
    ServiceBtn,
    StaffBtn
  },
  data() {
    return {
      account: "bleve",
      password: "1",
      modifyModalShow: false,
      modifyContent: "",
      originalInfo: "",
      modifyTitle: "",
      modifyKey: "",
      dialogType: "",
      menu: [
        {
          title: "手机号",
          url: "",
          key: "phone"
        },
        {
          title: "邮箱",
          url: "",
          key: "email"
        },
        {
          title: "地址",
          url: "",
          key: "address"
        }
      ],
      menu2: [
        {
          title: "我的消息",
          url: ""
        },
        {
          title: "支付账单",
          url: ""
        }
      ]
    };
  },
  computed: mapState(["userInfo"]),
  created() {
    mpvue.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#1fa637"
    });
  },
  methods: {
    async handleLogin() {
      this.$store.dispatch("userLogin", {
        account: this.account,
        password: this.password
      });
    },
    logout() {
      this.$store.commit("userLogout");
    },
    showModal(title) {
      switch (title) {
        case "手机号":
          this.modifyTitle = "更改手机号";
          this.originalInfo = this.userInfo.phone;
          this.modifyKey = "phone";
          this.dialogType = "input";
          break;
        case "邮箱":
          this.modifyTitle = "更改邮箱";
          this.originalInfo = this.userInfo.email;
          this.modifyKey = "email";
          this.dialogType = "input";
          break;
        case "地址":
          this.modifyTitle = "更改地址";
          this.originalInfo = this.userInfo.address;
          this.modifyKey = "address";
          this.dialogType = "textarea";
          break;
      }
      this.modifyModalShow = true;
    },
    async handleModify(state) {
      const { input } = state;
      if (!input) {
        mpvue.showToast({
          title: "请输入内容",
          icon: "none"
        });
        return;
      }
      if (this.modifyKey === "email") {
        const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        if (!reg.test(input)) {
          mpvue.showToast({
            title: "请输入合法邮箱",
            icon: "none"
          });
          return;
        }
      }
      const newUser = await this.$request("updateUserInfo", {
        data: {
          id: this.userInfo.id,
          [this.modifyKey]: input
        }
      });
      if (!newUser) {
        mpvue.showToast({
          title: "修改失败",
          icon: "none"
        });
      } else {
        this.$store.commit("updateUser", newUser);
        mpvue.showToast({
          title: "修改成功",
          complete: () => {
            this.modifyModalShow = false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.top-card {
  padding: 120rpx 60rpx;
  background: $font-color;
  color: #fff;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  .right-info {
    div {
      padding: 6rpx 0;
      &:nth-child(2) {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .logo {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40%;
  }
  .avatar {
    width: 160rpx;
    height: 160rpx;
    margin-right: 60rpx;
  }
}

.dialog-central {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-input {
    margin: 0 auto;
    height: 50rpx;
    font-size: 32rpx;
    width: 70%;
    border-bottom: 2rpx solid $bg-color;
  }
}

.top-bg {
  height: 50vh;
  background: gray;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  position: relative;
  .login {
    position: absolute;
    bottom: -140rpx;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 20rpx;
    height: 240rpx;
    width: 85%;
    background: #fff;
    .input {
      position: relative;
      padding: 30rpx 60rpx;
      box-sizing: border-box;
      height: 50%;
      .placeholder {
        color: $gray-color;
      }
      &:nth-child(1) {
        border-bottom: 2rpx solid $bg-color;
      }
    }
    .right-btn {
      top: 50%;
      transform: translate(0, -50%);
      position: absolute;
      right: 50rpx;
      color: $font-color;
      font-size: $normal-font-size;
    }
  }
}
.login-btn {
  margin-top: 200rpx;
}
.intro-text {
  margin-top: 40rpx;
  font-size: $normal-font-size;
  color: $font-color;
  text-align: center;
  div {
    margin-bottom: 10rpx;
  }
}
</style>