<template>
  <div class="detail-container-outer">
    <div class="detail-container-inner" ref="detailContainer">
      <me-in-brief></me-in-brief>
    </div>
    <div class="gradient-bottom"></div>
  </div>
</template>

<script>
import MeInBrief from './MeInBrief';

export default {
  components: {
    MeInBrief,
  },
  mounted() {
    console.log(this.$refs.detailContainer);
    this.$refs.detailContainer.addEventListener('scroll', (e) => { console.log(e); });
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.detail-container-outer {
  padding: 0 20px;
  font-size: 24px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .detail-container-inner {
    height: 100%;
    width: calc(100% - 40px);
    overflow: auto;
    padding-right: 40px;
  }
  .gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, $offWhite, rgba(237, 240, 248, 0));
    pointer-events: none;
  }
}
</style>
