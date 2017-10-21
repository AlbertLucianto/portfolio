<template>
  <div class="about-me" :style="parentStyle">
    <div>
      <div v-for="idx in [0,1,2,3]" :key="idx" class="icon" :style="iconStyle(idx)">
        <github></github>
      </div>
    </div>
  </div>
</template>

<script>
import Github from './icons/Github';

const dampPerspectiveX = 2.5;
const dampPerspectiveY = 5;

export default {
  components: {
    Github,
  },
  data() {
    return {
      cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
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
        ${((center.x - this.cursor.x) / dampPerspectiveX) + center.x}px
        ${((center.y - this.cursor.y) / dampPerspectiveY) + (center.y - 500)}px`,
      };
    },
    iconStyle() {
      return idx => ({
        transform: `rotateY(${90 * idx}deg) translateZ(200px) rotateY(${-90 * idx}deg)`,
      });
    },
  },
  methods: {
    changePrespective(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      this.cursor = {
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
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    position: absolute;
    transform-style: preserve-3d;
  }
}
</style>
