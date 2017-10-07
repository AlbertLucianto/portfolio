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
const startCurvePos = {
  x: 0,
  y: 30,
};
const curveInitWidth = 100;
const screenHeight = window.innerHeight;

export default {
  data() {
    return {
      curvePos: { ...startCurvePos },
      curveSpanWidth: curveInitWidth,
      startDragPos: { x: 0, y: 0 }, // unset
      lastDragPos: { ...startCurvePos },
      dragging: false,
    };
  },
  computed: {
    curvePath() {
      return `
      M 150, -200
      S 150, ${this.curvePos.y - 175}
      150, ${this.curvePos.y - 125}
      S 150, ${this.curvePos.y - 75}
      180, ${this.curvePos.y}
      S 150, ${this.curvePos.y + 100}
      150, ${this.curvePos.y + 175}
      V ${screenHeight}
      H 0
      V 0
      Z`;
    },
    hamburgerPos() {
      return {
        top: `${this.curvePos.y}px`,
      };
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
        this.curvePos.x = this.lastDragPos.x + (evt.pageX - this.startDragPos.x);
        this.curvePos.y = this.lastDragPos.y + (evt.pageY - this.startDragPos.y);
      }
    },
    stopDrag() {
      if (this.dragging) {
        this.dragging = false;
        this.lastDragPos.x = this.curvePos.x;
        this.lastDragPos.y = this.curvePos.y;
      }
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.stopDrag);
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
    top: 0;
    left: 200px;
    width: 80px;
    height: 80px;
    background: $warmRed;
  }
}
</style>
