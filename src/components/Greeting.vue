<template>
  <div class="canvas">
      <svg class="hi-container">
        <circle cx="100" cy="100" r="90" class="line h-curve">
        </circle>
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
    hCurve() {
      const progress = Math.max(0, this.frame - 100) * (235.619 / this.totalFrame);
      return {
        'stroke-dasharray': `${progress}, 235.619`,
      };
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
      &.h-curve {
        animation: h-curve 0.75s forwards ease;
        animation-delay: 1s;
        transform: rotate(180deg) scaleX(-1);
        transform-origin: 50% 50%;
        stroke-dasharray: 0, 600;
        opacity: 0;
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
</style>
