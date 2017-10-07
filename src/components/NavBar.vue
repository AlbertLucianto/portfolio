<template>
  <div class="navbar">
    <svg class="container">
      <path :d="curvePath" class="elastic-wrapper"></path>
    </svg>
    <svg class="hamburger-button" :style="hamburgerPos" @mousedown="startDrag">
    </svg>
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

export default {
  data() {
    return {
      curvePos: { ...startCurvePos },
      curveSpanWidth: curveInitWidth,
      startDragPos: { x: 0, y: 0 }, // unset
      lastDragPos: { ...startCurvePos },
      dragging: false,
      open: false,
      width: 0,
    };
  },
  computed: {
    curvePath() {
      const curveDampX = 1.5;
      const spreadConstantY = 0.25;
      return `
      M ${this.width}, -200
      S ${this.width}, ${this.curvePos.y - 200 - (spreadConstantY * this.curvePos.x)}
      ${this.width}, ${this.curvePos.y - 150 - (spreadConstantY * this.curvePos.x)}
      S ${this.width}, ${this.curvePos.y - 75}
      ${this.width + (this.curvePos.x / curveDampX)}, ${this.curvePos.y}
      S ${this.width}, ${this.curvePos.y + 75 + (spreadConstantY * this.curvePos.x)}
      ${this.width}, ${this.curvePos.y + 250 + (spreadConstantY * this.curvePos.x)}
      V ${screenHeight}
      H -1
      V 0
      Z`;
    },
    hamburgerPos() {
      return {
        top: `${this.curvePos.y}px`,
        left: `${this.curvePos.x + 30}px`,
      };
    },
  },
  watch: {
    open(val) {
      dynamics.animate(this, {
        width: val ? 200 : 0,
      }, {
        type: dynamics.spring,
        duration: 1000,
        frequency: 850,
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
      const dampX = 2;
      if (this.dragging) {
        const newCurvePosX = this.lastDragPos.x + ((evt.pageX - this.startDragPos.x) / dampX);
        if (newCurvePosX > openTresholdDistance) {
          this.open = true;
        }
        this.curvePos.x = Math.min(newCurvePosX, openTresholdDistance);
        this.curvePos.y = Math.min(
          Math.max(
            this.lastDragPos.y + (evt.pageY - this.startDragPos.y),
            startCurvePos.y),
            screenHeight - startCurvePos.y - 80);
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
      }
    },
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
    background: $white;
  }
}
</style>
