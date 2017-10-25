<template>
  <div class="about-me" :style="parentStyle">
    <div class="arrows">
      <arrow-button direction="left" :startClick="prevActive"></arrow-button>
    </div>
    <div class="icons-spinner" :style="spinnerStyle">
      <div class="ring" :style="ringStyle"></div>
      <div class="info" :class="{ closed: changingIdx }"></div>
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
    <div class="current-title" :style="titleStyle">{{ infos[icons[activeIdx]].displayTitle }}</div>
  </div>
</template>

<script>
import Github from './icons/Github';
import Portfolio from './icons/Portfolio';
import Achievement from './icons/Achievement';
import Me from './icons/Me';
import Contact from './icons/Contact';
import ArrowButton from '../reusable/ArrowButton';

const colors = {
  orange: '#F29D2C',
  yellow: '#FFC127',
  warmRed: '#EF548F',
  purple: '#7D4896',
  aqua: '#27CED6',
  grey: '#A0A0A0',
  lightGrey: '#DBDBDB',
  white: '#F7F9FF',
  offWhite: 'rgb(237, 240, 248)',
  lightRed: '#FFBA9C',
  black: '#232222',
};

const dampPerspectiveX = 5;
const dampPerspectiveY = 20;
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
      infos: {
        Me: {
          color: {
            main: colors.offWhite,
            sec: colors.black,
          },
          displayTitle: 'Me in Brief',
        },
        Achievement: {
          color: {
            main: colors.aqua,
            sec: colors.white,
          },
          displayTitle: 'Achievements',
        },
        Portfolio: {
          color: {
            main: colors.orange,
            sec: colors.white,
          },
          displayTitle: 'Portfolios',
        },
        Github: {
          color: {
            main: colors.yellow,
            sec: colors.white,
          },
          displayTitle: 'Github Profile',
        },
        Contact: {
          color: {
            main: colors.purple,
            sec: colors.white,
          },
          displayTitle: 'Contact Me',
        },
      },
      active: 0,
      cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      timeId: null,
      changingIdx: false,
    };
  },
  watch: {
    activeIdx() {
      this.changingIdx = true;
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.changingIdx = false;
      }, 700);
    },
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
      const { color } = this.infos[this.icons[this.activeIdx]];
      const { main } = color;
      return {
        'perspective-origin': `
          ${((center.x - this.cursor.x) / dampPerspectiveX) + center.x}px
          ${((center.y - this.cursor.y) / dampPerspectiveY) + (center.y - 250)}px`,
        // background: `radial-gradient(at 50% 150%, ${main}, ${sec})`,
        background: main,
      };
    },
    titleStyle() {
      const { color } = this.infos[this.icons[this.activeIdx]];
      const { sec } = color;
      return {
        color: sec,
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
  transition: all .1s linear, background-color .5s ease .4s;
  perspective: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  // transform-style: preserve-3d;
  .current-title {
    position: fixed;
    width: 500px;
    left: calc(50vw - 240px);
    bottom: calc(25vh - 100px);
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    transition: color .5s ease .5s;
    transform: translateZ(50px);
  }
  .info {
    position: fixed;
    width: 500px;
    height: 600px;
    max-height: 600px;
    left: calc(50vw - 250px);
    opacity: .90;
    transform: translate3d(calc(-50vw + 100px), -500px, 100px);
    border-radius: 10px;
    background: $white;
    // border: 2px solid $aqua;
    transform-style: preserve-3d;
    transition: max-height .5s ease .15s, margin-top .6s ease, opacity .3s ease .2s;
    &.closed {
      max-height: 0;
      margin-top: -50px;
      opacity: 0.5;
    }
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
