<template>
  <div class="page">
    <div>Areal 房产管理</div>
    <div>
      <div class="index-title">
        <div>我的房源</div>
        <div>添加房源</div>
      </div>
      <div>
        <img src="/static/images/areal.png" />
      </div>
      <div>关于公司</div>
      <div>
        在2010年7月26日成立的公司针对满足项目投资者的利益要求并帮助他们得赢。
        分布范围地产有限公司是一家在开发、投资与资产管理范围内提供全面服务的公司。
        分布范围地产有限公司在发展和实施贸易、商业、住宅物业的项目上采用国际经验。
        我公司针对满足项目投资者的利益要求并帮助他们得赢。
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  async mounted() {
    console.log("mounted");

    const api = await this.$request("api");
  },
  computed: mapState(["userInfo"]),

  components: {},

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.index-title {
  display: flex;
  justify-content: space-between;
}
</style>
