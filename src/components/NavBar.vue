<template>
  <div class="navbar">
    <svg class="container">
      <path :d="curvePath" class="elastic-wrapper"></path>
    </svg>
    <svg class="hamburger-button" :style="hamburgerPos" @mousedown="startDrag">
    </svg>
    <transition name="fade">
      <div class="overlay" :style="overlayBgStyle" v-if="open"/>
    </transition>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

const startCurvePos = {
  x: 0,
  y: 30,
};
const curveInitWidth = 100;
const screenHeight = window.innerHeight;
const openTresholdDistance = 200;
const closeTresholdDistance = 100;
const dampX = 1;
const curveDampX = 1.5;

export default {
  data() {
    return {
      show: true,
      curvePos: { ...startCurvePos },
      curveSpanWidth: curveInitWidth,
      startDragPos: { x: 0, y: 0 }, // unset
      lastDragPos: { ...startCurvePos },
      dragging: false,
      open: false,
      width: 0,
      curveHeight: 0,
    };
  },
  computed: {
    curvePath() {
      const spreadConstantY = 0.25;
      return `
      M ${this.width}, -200
      S ${this.width}, ${this.curvePos.y - 200 - (spreadConstantY * this.curvePos.x)}
      ${this.width}, ${this.curvePos.y - 150 - (spreadConstantY * this.curvePos.x)}
      S ${this.width}, ${this.curvePos.y - 75}
      ${this.width + this.curveHeight}, ${this.curvePos.y}
      S ${this.width}, ${this.curvePos.y + 75 + (spreadConstantY * this.curvePos.x)}
      ${this.width}, ${this.curvePos.y + 250 + (spreadConstantY * this.curvePos.x)}
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
      dynamics.animate(this, {
        width: val ? 200 : -5,
        curveHeight: val ? 0 : this.curvePos.x / curveDampX,
      }, {
        type: dynamics.spring,
        duration: 1000,
        frequency: 650,
        friction: 350,
      });
    },
  },
  methods: {
    startDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      this.dragging = true;
      this.startDragPos.x = evt.pageX;
      this.startDragPos.y = evt.pageY;
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging) {
        this.curvePos.y = Math.min(
          Math.max(
            this.lastDragPos.y + (evt.pageY - this.startDragPos.y),
            startCurvePos.y),
            screenHeight - startCurvePos.y - 80);
        const newCurvePosX = this.lastDragPos.x + ((evt.pageX - this.startDragPos.x) / dampX);
        this.curvePos.x = Math.max(Math.min(newCurvePosX, openTresholdDistance), 0);
        this.curveHeight = this.curvePos.x / curveDampX;
        if (!this.open) {
          if (newCurvePosX > openTresholdDistance) {
            this.open = true;
          }
        } else if (this.curvePos.x < closeTresholdDistance) {
          this.open = false;
        } else {
          this.curveHeight = this.curvePos.x - openTresholdDistance;
        }
      }
    },
    stopDrag() {
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
      if (this.dragging) {
        this.dragging = false;
        this.lastDragPos.x = this.curvePos.x;
        this.lastDragPos.y = this.curvePos.y;
      }
      if (!this.open) {
        this.lastDragPos.x = startCurvePos.x;
        dynamics.animate(this.curvePos, {
          x: startCurvePos.x,
        }, {
          type: dynamics.spring,
          duration: 1000,
          frequency: 850,
          friction: 350,
        });
        dynamics.animate(this, {
          curveHeight: 0,
        }, {
          type: dynamics.spring,
          duration: 1000,
          frequency: 850,
          friction: 350,
        });
      }
    },
  },
  mounted() {
    setInterval(() => {
      if (!this.open) {
        if (this.width > 0) {
          this.width -= 2; // Adjusting width where sometimes altered during spring animation
        }
      } else {
        this.width = openTresholdDistance;
      }
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
@import './styles/colors.scss';

.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  .container {
    height: 100vh;
    .elastic-wrapper {
      fill: $white;
    }
  }
  .hamburger-button {
    position: fixed;
    width: 80px;
    height: 80px;
    background: $aqua;
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    cursor: pointer;
  }
  .overlay {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
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
