<template>
  <div class="detail-container-outer">
    <transition name="info">
      <component :is="mapDescription[active]" :key="active"></component>
    </transition>
    <!-- <div class="gradient-bottom"></div> -->
  </div>
</template>

<script>
import MeInBrief from './MeInBrief';
import Achievements from './Achievements';
import Portfolios from './Portfolios';

export default {
  components: {
    MeInBrief,
    Achievements,
    Portfolios,
  },
  props: {
    active: String,
  },
  data() {
    return {
      mapDescription: {
        Me: 'MeInBrief',
        Achievement: 'Achievements',
        Portfolio: 'Portfolios',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.detail-container-outer {
  font-size: 21px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: $offWhite; // == $offWhite transparent
  position: relative;
  overflow: hidden;
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
