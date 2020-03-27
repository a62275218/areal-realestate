<template>
  <div class="white-card">
    <div class="date-picker">
      查找日期
      <image
        @click.stop="showTip"
        class="icon-question"
        style="padding-left:20rpx;"
        mode="widthFix"
        src="/static/images/question.png"
      />
      <div>{{ startDate }}</div>
    </div>
    <div class="search-row">
      <div class="col">
        <picker
          mode="date"
          :value="startDate"
          :start="pickerStart"
          end="2217-09-01"
          @change="bindDateChangeStart"
        >
          <div>起始日期</div>
          {{tip}}
        </picker>
      </div>
      <div class="col">
        <picker
          mode="date"
          :value="endDate"
          :start="pickerEnd"
          end="2217-09-01"
          @change="bindDateChangeEnd($event)"
        >
          <div>结束日期</div>
        </picker>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
export default {
  props:['show'],
  computed: mapState(["tipShow"]),
  methods: {
    showTip() {
      console.log('show')
      this.$store.commit("showTip");
    },
    bindDateChangeStart(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
</style>