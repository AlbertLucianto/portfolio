<template>
  <div class="canvas">
      <svg class="hi-container">
        <circle cx="100" :cy="hCurveStart" r="90" class="line h-curve">
        </circle>
        <line x1="190" :y1="hLineRightStart" x2="190" :y2="hLineRightEnd" class="line h-right">
        </line>
        <line x1="10" y1="0" x2="10" :y2="hLineLeftEnd" class="line h-left">
        </line>
      </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frame: 0,
      totalFrame: 200,
    };
  },
  computed: {
    hCurveStart() {
      return (window.innerHeight / 2) - 75;
    },
    hLineRightEnd() {
      return (window.innerHeight / 2) - 75;
    },
    hLineLeftEnd() {
      return (window.innerHeight / 2) - 75;
    },
    hLineRightStart() {
      return window.innerHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #F7F9FF;
  .hi-container {
    width: 500px;
    height: 100%;
    margin: auto;
    .line {
      stroke-miterlimit: 50;
      stroke-width: 20;
      fill: none;
      stroke: #7D4896;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      &.h-curve {
        animation: h-curve 0.75s forwards ease;
        animation-delay: 0.25s;
        transform: rotate(180deg) scaleX(-1);
        stroke-dasharray: 0, 600;
        opacity: 0;
      }
      &.h-right {
        animation: h-right 0.75s forwards ease;
        transform: scaleY(-1);
      }
    }
  }
}

@keyframes h-curve {
  0% {
    opacity: 1;
  }
  100% {
    stroke-dasharray: 280, 600;
    opacity: 1;
  }
}

@keyframes h-right {
  0% {
    stroke-dasharray: 1000, 0;
  }
  100% {
    stroke-dasharray: 150, 1000;
  }
}
</style>
