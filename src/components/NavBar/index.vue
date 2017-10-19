<template>
  <div class="navbar">
    <svg class="container">
      <path :d="curvePath" class="elastic-wrapper"></path>
    </svg>
    <nav-item-list :open="open" :curvePos="curvePos" :curveHeight="curveHeight.value"></nav-item-list>
    <div class="hamburger-button" :style="hamburgerPos" @mousedown="startDrag" @touchstart="startDrag">
      <hamburger-icon :open="open" :dragging="dragging"></hamburger-icon>
    </div>
    <transition name="fade">
      <div class="overlay" :style="overlayBgStyle" v-if="open" @mousedown="closeNavbar" @touchstart="closeNavbar"/>
    </transition>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';
import HamburgerIcon from './HamburgerIcon';
import NavItemList from './NavItemList';

const startCurvePos = {
  x: 0,
  y: 50,
};
const curveInitWidth = 100;
const screenHeight = window.innerHeight;
const openTresholdDistance = 250;
const closeTresholdDistance = 100;
const dampX = 1;
const curveDampX = 1.5;
const curveDampOpened = 1.25;

export default {
  components: {
    HamburgerIcon,
    NavItemList,
  },
  data() {
    return {
      curvePos: { ...startCurvePos },
      curveSpanWidth: curveInitWidth,
      startDragPos: { x: 0, y: 0 }, // unset
      lastDragPos: { ...startCurvePos },
      dragging: false,
      click: false,
      open: false,
      width: { value: 0 },
      curveHeight: { value: 0 },
    };
  },
  computed: {
    curvePath() {
      const spreadConstantY = 0.25;
      return `
      M ${this.width.value}, -200
      S ${this.width.value}, ${this.curvePos.y - 200 - (spreadConstantY * this.curvePos.x)}
      ${this.width.value}, ${this.curvePos.y - 150 - (spreadConstantY * this.curvePos.x)}
      S ${this.width.value}, ${this.curvePos.y - 75}
      ${this.width.value + this.curveHeight.value}, ${this.curvePos.y}
      S ${this.width.value}, ${this.curvePos.y + 75 + (spreadConstantY * this.curvePos.x)}
      ${this.width.value}, ${this.curvePos.y + 250 + (spreadConstantY * this.curvePos.x)}
      V ${screenHeight}
      H -100
      V 0
      Z`;
    },
    hamburgerPos() {
      return {
        top: `${this.curvePos.y}px`,
        left: `${this.curvePos.x + 30}px`,
      };
    },
    overlayBgStyle() {
      const y = ((screenHeight / 2) - this.curvePos.y) + 50;
      const x = openTresholdDistance * 3;
      const deg = 90 + (Math.atan(y / x) * (180 / Math.PI));
      return {
        background: `linear-gradient(${deg}deg, #EF548F -5%, #7D4896 60%)`,
      };
    },
  },
  watch: {
    open(val) {
      dynamics.animate(this.width, {
        value: val ? openTresholdDistance : -5,
      }, {
        type: dynamics.spring,
        duration: 750,
        frequency: 650,
        friction: 350,
      });
      dynamics.animate(this.curveHeight, {
        value: val ? 0 : this.curvePos.x / curveDampX,
      }, {
        type: dynamics.spring,
        duration: 750,
        frequency: 650,
        friction: 350,
      });
    },
  },
  methods: {
    startDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      this.click = true;
      this.startDragPos.x = evt.pageX;
      this.startDragPos.y = evt.pageY;
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
      window.addEventListener('touchmove', this.onDrag);
      window.addEventListener('touchend', this.stopDrag);
    },
    onDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      if (this.click || this.dragging) {
        dynamics.stop(this.curvePos);
        dynamics.stop(this.curveHeight);
        this.click = false;
        this.dragging = true;
        this.curvePos.y = Math.min(
          Math.max(
            this.lastDragPos.y + (evt.pageY - this.startDragPos.y),
            startCurvePos.y),
            screenHeight - startCurvePos.y - 80);
        const newCurvePosX = this.lastDragPos.x + ((evt.pageX - this.startDragPos.x) / dampX);
        this.curvePos.x = Math.max(Math.min(newCurvePosX, openTresholdDistance), 0);
        this.curveHeight.value = this.curvePos.x / curveDampX;
        if (!this.open) {
          if (newCurvePosX > openTresholdDistance) {
            this.open = true;
          }
        } else if (this.curvePos.x < closeTresholdDistance) {
          this.open = false;
        } else {
          this.curveHeight.value = (this.curvePos.x - openTresholdDistance) / curveDampOpened;
        }
      }
    },
    stopDrag() {
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
      window.removeEventListener('touchmove', this.onDrag);
      window.removeEventListener('touchend', this.stopDrag);
      this.click = false;
      if (this.dragging) {
        this.dragging = false;
        this.lastDragPos.y = this.curvePos.y;
        dynamics.animate(this.curveHeight, {
          value: 0,
        }, {
          type: dynamics.spring,
          duration: 750,
          frequency: 600,
          friction: 350,
        });
        if (!this.open) {
          this.lastDragPos.x = startCurvePos.x;
          dynamics.animate(this.curvePos, {
            x: startCurvePos.x,
          }, {
            type: dynamics.spring,
            duration: 750,
            frequency: 600,
            friction: 350,
          });
        } else {
          this.lastDragPos.x = openTresholdDistance;
          dynamics.animate(this.curvePos, {
            x: openTresholdDistance,
          }, {
            type: dynamics.spring,
            duration: 750,
            frequency: 600,
            friction: 350,
          });
        }
      } else if (this.open) {
        this.closeNavbar();
      } else {
        this.open = true;
        this.lastDragPos.x = openTresholdDistance;
        dynamics.animate(this.curvePos, {
          x: openTresholdDistance,
        }, {
          type: dynamics.spring,
          duration: 750,
          frequency: 600,
          friction: 350,
        });
      }
    },
    closeNavbar() {
      this.open = false;
      this.lastDragPos.x = startCurvePos.x;
      dynamics.stop(this.curvePos);
      this.curvePos.x = 0;
    },
  },
  mounted() {
    setInterval(() => {
      if (!this.open) {
        if (this.width.value > 0) {
          this.width.value -= 2; // Adjusting width where sometimes altered during spring animation
        }
      } else {
        this.width.value = openTresholdDistance;
      }
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 0;
  .container {
    height: 100vh;
    pointer-events: none;
    .elastic-wrapper {
      fill: $white;
    }
  }
  .hamburger-button {
    position: fixed;
    z-index: 11;
    width: 80px;
    height: 80px;
    background: $aqua;
    transition: .3s background-color ease-out;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    cursor: pointer;
    &:hover {
      background: $orange;
    }
    &:active {
      cursor: grabbing;
    }
  }
  .overlay {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
  }
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
