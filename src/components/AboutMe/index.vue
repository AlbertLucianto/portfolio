<template>
  <div class="about-me" :style="parentStyle">
    <ripple></ripple>
  </div>
</template>

<script>
import Ripple from './Ripple';

const dampPerspectiveX = 4;
const dampPerspectiveY = 8;

export default {
  components: {
    Ripple,
  },
  data() {
    return {
      perspectiveOrigin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    };
  },
  computed: {
    parentStyle() {
      const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      return {
        'perspective-origin': `
        ${((this.perspectiveOrigin.x - center.x) / dampPerspectiveX) + center.x}px
        ${((this.perspectiveOrigin.y - center.y) / dampPerspectiveY) + center.y}px`,
      };
    },
  },
  methods: {
    changePrespective(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      this.perspectiveOrigin = {
        x: evt.pageX,
        y: evt.pageY,
      };
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.changePrespective);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.changePrespective);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.about-me {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: $white;
  transition: all .1s linear;
  perspective: 1200px;
}
</style>
