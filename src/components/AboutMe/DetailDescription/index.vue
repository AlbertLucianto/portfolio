<template>
  <div class="detail-container-outer">
    <div class="detail-container-inner" ref="detailContainer">
      <transition name="info">
        <component :is="mapDescription[active]" :key="active"></component>
      </transition>
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
  props: {
    active: String,
  },
  data() {
    return {
      mapDescription: {
        Me: 'MeInBrief',
        Achievement: 'MeInBrief',
      },
    };
  },
  mounted() {
    // console.log(this.$refs.detailContainer);
    // this.$refs.detailContainer.addEventListener('scroll', (e) => { console.log(e); });
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.detail-container-outer {
  font-size: 24px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: rgba(237, 240, 248, .85); // == $offWhite transparent
  overflow: hidden;
  position: relative;
  .detail-container-inner {
    height: 100%;
    width: 100%;
    overflow: auto;
    padding-right: 20px;
  }
  .gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: linear-gradient(to top, $offWhite, rgba(237, 240, 248, 0));
    opacity: .8;
    pointer-events: none;
  }
}
.info-enter-active {
  transition: all .3s ease .4s;
}
.info-leave-active {
  transition: all .3s ease;
}
.info-enter, .slide-fade-leave-to {
  // transform: translateY(10px);
  opacity: 0;
}
</style>
