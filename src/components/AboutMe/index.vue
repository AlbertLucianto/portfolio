<template>
  <div class="about-me" :style="parentStyle">
    <div class="icons-spinner" :style="spinnerStyle">
      <div v-for="(icon, idx) in icons" :key="idx" class="icon" :style="iconStyle(idx + active)">
        <component :is="icon" :active="active === idx"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Github from './icons/Github';
import Portfolio from './icons/Portfolio';

const dampPerspectiveX = 5;
const dampPerspectiveY = 5;
const spinRadiusFunc = width => (width / 5) + 100;

export default {
  components: {
    Github,
    Portfolio,
  },
  data() {
    return {
      icons: ['Portfolio', 'Github', 'Github', 'Github', 'Github'],
      active: 0,
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
        ${((center.y - this.cursor.y) / dampPerspectiveY) + (center.y - 250)}px`,
      };
    },
    spinnerStyle() {
      return {
        transform: `translateZ(${-spinRadiusFunc(window.innerWidth) / 1.25}px)`,
      };
    },
    iconStyle() {
      const { length } = this.icons;
      const rotateMul = 360 / length;
      return idx => ({
        transform: `rotateY(${rotateMul * idx}deg) translateZ(${spinRadiusFunc(window.innerWidth)}px) rotateY(${-rotateMul * idx}deg)`,
        opacity: `${Math.abs(((idx % length) - (length / 2)) / length) * 2}`,
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
    changeActive() {
      this.active += 1;
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.changePrespective);
    window.addEventListener('mousedown', this.changeActive);
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
  .icons-spinner {
    transform-style: preserve-3d;
    width: 150px;
    height: 250px;
    .icon {
      position: absolute;
      transform-style: preserve-3d;
      transition: all .5s ease;
    }
  }
}
</style>
