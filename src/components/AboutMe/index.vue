<template>
  <div class="about-me" :style="parentStyle">
    <div class="arrows">
      <arrow-button direction="left" :startClick="prevActive"></arrow-button>
    </div>
    <div class="icons-spinner" :style="spinnerStyle">
      <div class="ring" :style="ringStyle"></div>
      <div class="info" :class="{ closed: changingIdx }">
        <detail-description :active="icons[activeIdx]"></detail-description>
      </div>
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
    <div class="current-title" :style="textStyle">{{ infos[icons[activeIdx]].displayTitle }}</div>
  </div>
</template>

<script>
import Github from './icons/Github';
import Portfolio from './icons/Portfolio';
import Achievement from './icons/Achievement';
import Me from './icons/Me';
import Contact from './icons/Contact';
import DetailDescription from './DetailDescription';
import ArrowButton from '../reusable/ArrowButton';
import colors from '../styles/colors';

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
    DetailDescription,
    ArrowButton,
  },
  data() {
    return {
      icons: ['Me', 'Achievement', 'Portfolio', 'Contact', 'Github'],
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
            main: colors.yellow,
            sec: colors.black,
          },
          displayTitle: 'Portfolios',
        },
        Github: {
          color: {
            main: colors.orange,
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
    textStyle() {
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
      /*
      Transform issue with opacity! -- Google Chrome 53 Bug / new rule
      https://googlechrome.github.io/samples/css-opacity-force-flattening/
      -----------------------------
      opacity: `${(Math.abs(((((idx % length) + length) % length)
       - (length / 2)) / length) * 2) + 0.1}`,
      */
      return idx => ({
        transform: `rotateY(${rotateMul * idx}deg) translateZ(${spinRadiusFunc(window.innerWidth)}px) rotateY(${-rotateMul * idx}deg)`,
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
    width: 600px;
    height: calc(10vh + 450px);
    max-height: 600px;
    left: -200px;
    // bottom: -350px;
    top: calc(250px - 20vh);
    transform: translate3d(0, -500px, 100px);
    // background: $offWhite;
    // border: 3px solid $aqua;
    transform-style: preserve-3d;
    transition: max-height .5s ease .15s, margin-top .6s ease, opacity .3s ease .2s;
    &.closed {
      max-height: 10px;
      margin-top: -50px;
      opacity: 0.2;
    }
  }
  .icons-spinner {
    transform-style: preserve-3d;
    width: 200px;
    height: 250px;
    margin-top: 50px;
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
      box-shadow: 0 25px 60px -30px $black;
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
