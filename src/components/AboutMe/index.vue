<template>
  <div class="about-me" :style="parentStyle">
    <div class="arrows">
      <arrow-button direction="left" :startClick="prevActive"></arrow-button>
    </div>
    <div class="icons-spinner" :style="spinnerStyle">
      <div class="ring" :style="ringStyle"></div>
      <div class="info"></div>
      <div v-for="(icon, idx) in icons" :key="idx" class="icon" :style="iconStyle(idx + active)">
        <component :is="icon" :active="activeIdx === idx"></component>
        <div class="shadow-container">
          <div class="shadow" :class="{ hidden: activeIdx !== idx }"></div>
        </div>
      </div>
    </div>
    <div class="arrows">
      <arrow-button direction="right" :startClick="nextActive"></arrow-button>
    </div>
    <!-- <div class="guide-line"></div> -->
    <div class="current-title">{{ icons[activeIdx] }}</div>
  </div>
</template>

<script>
import Github from './icons/Github';
import Portfolio from './icons/Portfolio';
import Achievement from './icons/Achievement';
import Me from './icons/Me';
import Contact from './icons/Contact';
import ArrowButton from '../reusable/ArrowButton';

const dampPerspectiveX = 4;
const dampPerspectiveY = 4;
const spinRadiusFunc = width => (width / 5) + 200;

export default {
  components: {
    Github,
    Portfolio,
    Achievement,
    Me,
    Contact,
    ArrowButton,
  },
  data() {
    return {
      icons: ['Me', 'Achievement', 'Portfolio', 'Github', 'Contact'],
      active: 0,
      cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    };
  },
  computed: {
    activeIdx() {
      return ((-this.active % this.icons.length) + this.icons.length) % this.icons.length;
    },
    parentStyle() {
      const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      return {
        'perspective-origin': `
        ${((center.x - this.cursor.x) / dampPerspectiveX) + center.x}px
        ${((center.y - this.cursor.y) / dampPerspectiveY) + (center.y - 150)}px`,
      };
    },
    spinnerStyle() {
      return {
        transform: `translateZ(${-spinRadiusFunc(window.innerWidth) + 100}px) translateY(100px)`,
      };
    },
    iconStyle() {
      const { length } = this.icons;
      const rotateMul = 360 / length;
      return idx => ({
        transform: `rotateY(${rotateMul * idx}deg) translateZ(${spinRadiusFunc(window.innerWidth)}px) rotateY(${-rotateMul * idx}deg)`,
        opacity: `${(Math.abs(((((idx % length) + length) % length) - (length / 2)) / length) * 2) + 0.1}`,
      });
    },
    ringStyle() {
      const diameter = (spinRadiusFunc(window.innerWidth) * 2) - 200;
      return {
        width: `${diameter}px`,
        height: `${diameter}px`,
        transform: `translate(${-(diameter / 2) + 100}px, ${-(diameter / 2) + 100}px) rotateX(90deg)`,
      };
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
  // background: radial-gradient(at 50% 150%, $yellow, $aqua);
  background: $offWhite;
  transition: all .1s linear;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  .current-title {
    position: fixed;
    width: 500px;
    left: calc(50vw - 240px);
    bottom: 15vh;
    text-align: center;
    font-size: 36px;
    color: $black;
    font-weight: 500;
  }
  .info {
    position: fixed;
    width: 500px;
    height: 600px;
    top: -50px;
    left: calc(50vw - 250px);
    background: $white;
    opacity: .95;
    transform: translate3d(calc(-50vw + 100px), -500px, 100px);
    border-radius: 10px;
    border: 2px solid $aqua;
    transform-style: preserve-3d;
  }
  .icons-spinner {
    transform-style: preserve-3d;
    width: 200px;
    height: 250px;
    .icon {
      position: absolute;
      transform-style: preserve-3d;
      transition: all .5s ease;
    }
    .shadow-container {
      left: 45px;
      position: absolute;
      transform: rotateX(90deg) translateZ(50px);
      .shadow {
        background: $black;
        height: 120px;
        width: 120px;
        border-radius: 50%;
        opacity: .2;
        transition: opacity .4s ease .5s;
        filter: blur(20px);
        &.hidden {
          opacity: 0;
        }
      }
    }
    .ring {
      position: absolute;
      box-shadow: 0 25px 50px -20px $grey;
      opacity: .5;
      border-radius: 50%;
    }
  }
  .arrows {
    margin: 0 80px;
    z-index: 2;
    transform: translateZ(5px) translateY(80px);
  }
  .guide-line {
    position: absolute;
    transform: translateZ(75px);
    height: calc(37.5vh - 200px);
    width: 3px;
    background: $grey;
    top: 57.5vh;
  }
}
</style>
