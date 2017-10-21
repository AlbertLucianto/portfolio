<template>
  <div class="about-me" :style="parentStyle">
    <div class="arrow-container">
      <arrow-button direction="left" :startClick="prevActive"></arrow-button>
    </div>
    <div class="icons-spinner" :style="spinnerStyle">
      <div v-for="(icon, idx) in icons" :key="idx" class="icon" :style="iconStyle(idx + active)">
        <component :is="icon" :active="((active % icons.length) + icons.length) % icons.length === idx"></component>
      </div>
    </div>
    <div class="arrow-container">
      <arrow-button direction="right" :startClick="nextActive"></arrow-button>
    </div>
  </div>
</template>

<script>
import Github from './icons/Github';
import Portfolio from './icons/Portfolio';
import ArrowButton from '../reusable/ArrowButton';

const dampPerspectiveX = 5;
const dampPerspectiveY = 5;
const spinRadiusFunc = width => (width / 5) + 100;

export default {
  components: {
    Github,
    Portfolio,
    ArrowButton,
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
        transform: `translateZ(${-spinRadiusFunc(window.innerWidth) + 100}px)`,
      };
    },
    iconStyle() {
      const { length } = this.icons;
      const rotateMul = 360 / length;
      return idx => ({
        transform: `rotateY(${rotateMul * idx}deg) translateZ(${spinRadiusFunc(window.innerWidth)}px) rotateY(${-rotateMul * idx}deg)`,
        opacity: `${Math.abs(((((idx % length) + length) % length) - (length / 2)) / length) * 2}`,
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
    prevActive() {
      this.active += 1;
    },
    nextActive() {
      this.active -= 1;
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
  background: radial-gradient(at 50% 200%, $aqua, $purple);
  transition: all .1s linear;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icons-spinner {
    transform-style: preserve-3d;
    width: 200px;
    height: 250px;
    .icon {
      position: absolute;
      transform-style: preserve-3d;
      transition: all .5s ease;
    }
  }
  .arrow-container {
    margin: 0 50px;
    z-index: 2;
  }
}
</style>
