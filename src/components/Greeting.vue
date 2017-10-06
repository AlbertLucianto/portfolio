<template>
  <div class="canvas">
      <svg class="h-container">
        <circle cx="100" :cy="hCurveStart" r="90" class="line h-curve">
        </circle>
        <line x1="190" :y1="hLineRightStart" x2="190" :y2="hLineRightEnd" class="line h-right">
        </line>
        <line x1="10" y1="0" x2="10" :y2="hLineLeftEnd" class="line h-left">
        </line>
      </svg>
      <svg class="h-container">
        <circle cx="100" :cy="hCurveStart" r="90" class="line h-curve">
        </circle>
        <line x1="10" y1="0" x2="10" :y2="iLineEnd" class="line i-left">
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
      return (window.innerHeight / 2) - 50;
    },
    hLineRightEnd() {
      return (window.innerHeight / 2) - 50;
    },
    hLineLeftEnd() {
      return (window.innerHeight / 2) + 100;
    },
    hLineRightStart() {
      return window.innerHeight - 25;
    },
    iLineEnd() {
      return window.innerHeight - 150;
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
  .h-container {
    width: 250px;
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
        animation-delay: 0.60s;
        transform: rotate(180deg) scaleX(-1);
        stroke-dasharray: 0, 600;
        opacity: 0;
      }
      &.h-right {
        animation: h-right 0.7s forwards ease;
        transform: scaleY(-1) translateY(-500px);
      }
      &.h-left {
        animation: h-left 1s forwards ease-out;
        transform: scaleY(-1) translateY(500px);
      }
      &.i-left {
        animation: i-left 1s forwards ease-out;
        transform: scaleY(-1) translateY(500px);
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
    transform: scaleY(-1) translateY(0);
  }
}

@keyframes h-left {
  0% {
    stroke-dasharray: 1000, 0;
  }
  100% {
    stroke-dasharray: 450, 1000;
    transform: scaleY(-1) translateY(0);
  }
}

@keyframes i-left {
  0% {
    stroke-dasharray: 1000, 0;
  }
  100% {
    stroke-dasharray: 450, 1000;
    transform: scaleY(-1) translateY(0);
  }
}
</style>
