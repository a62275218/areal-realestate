<template>
  <div v-if="modalShow" class="mask" @click="closeModal">
    <div class="center-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false
    };
  },
  props: ["visible","onClose"],
  watch: {
    visible: function(val) {
      this.modalShow = val;
    }
  },
  methods: {
    closeModal() {
      this.modalShow = false;
      this.onClose()
    }
  }
};
</script>

<style lang="scss" scpoed>
.mask {
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  .center-content {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>