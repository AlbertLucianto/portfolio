<template>
  <div class="canvas">
      <svg class="h-container">
        <circle cx="100" :cy="hCurveStart" r="90" class="line h-curve">
        </circle>
        <line x1="190" :y1="hLineRightStart" x2="190" :y2="hLineRightEnd" class="line h-right">
        </line>
        <line x1="10"  :y1="hLineLeftStart" x2="10" y2="0" class="line h-left">
        </line>
      </svg>
      <svg class="i-container">
        <circle cx="40" :cy="iDotY" :r="iDotRadius" class="line i-dot">
        </circle>
        <line x1="40" :y1="iLineStart" x2="40" :y2="iLineEnd" class="line i">
        </line>
      </svg>
      <svg class="apostrophe-container">
        <line x1="60" :y1="aposLineStart" x2="80" y2="0" class="line apostrophe">
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
      iDotRadius: 50,
    };
  },
  computed: {
    hCurveStart() {
      return (window.innerHeight / 2) - 50;
    },
    hLineRightStart() {
      return (window.innerHeight / 2) - 50;
    },
    hLineRightEnd() {
      return window.innerHeight;
    },
    hLineLeftStart() {
      return (window.innerHeight / 2) + 100;
    },
    iLineStart() {
      return (window.innerHeight / 2) - 125;
    },
    iLineEnd() {
      return window.innerHeight;
    },
    aposLineStart() {
      return (window.innerHeight / 2) + 50;
    },
    iDotY() {
      return (window.innerHeight / 2) - 175;
    },
  },
  mounted() {
    setTimeout(() => {
      const reducing = setInterval(() => {
        this.iDotRadius = this.iDotRadius - 1;
        if (this.iDotRadius < 8) {
          clearInterval(reducing);
        }
      }, 10);
    }, 750);
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
    width: 200px;
    height: 100%;
    margin: auto;
  }
  .i-container {
    width: 80px;
    height: 100%;
    margin: auto;
  }
  .apostrophe-container {
    width: 100px;
    height: 100%;
    margin: auto;
  }
  .line {
    stroke-miterlimit: 50;
    stroke-width: 20;
    fill: none;
    stroke: #7D4896;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    &.h-curve {
      animation: h-curve 1s forwards ease;
      animation-delay: 0.60s;
      transform: rotate(180deg) scaleX(-1);
      stroke-dasharray: 0, 600;
      opacity: 0;
    }
    &.h-right {
      animation: h-right 0.7s forwards ease;
    }
    &.h-left {
      animation: h-left 1s forwards ease-out;
    }
    &.i {
      animation: i 0.75s forwards ease-out;
    }
    &.i-dot {
      animation: i-dot 1s forwards ease;
      stroke-width: 0;
      animation-delay: 0.75s;
    }
    &.apostrophe {
      animation: apostrophe 1.5s forwards ease;
      stroke-width: 30;
      animation-delay: 0.25s;
      opacity: 0;
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
    stroke-dasharray: 1000, 1000;
    stroke-dashoffset: -1000;
  }
  100% {
    stroke-dasharray: 150, 1000;
    stroke-dashoffset: 0;
  }
}

@keyframes h-left {
  0% {
    stroke-dasharray: 1000, 1000;
    stroke-dashoffset: -1000;
  }
  100% {
    stroke-dasharray: 400, 1000;
    stroke-dashoffset: 0;
  }
}

@keyframes i {
  0% {
    stroke-dasharray: 1000, 1000;
    stroke-dashoffset: -1000;
  }
  100% {
    stroke-dasharray: 225, 1000;
    stroke-dashoffset: 0;
  }
}

@keyframes i-dot {
  0% {
    stroke-width: 0;
  }
  50% {
    stroke-width: 15;
  }
  100% {
    stroke-width: 25;
  }
}

@keyframes apostrophe {
  0% {
    stroke-dasharray: 1000, 1000;
    stroke-dashoffset: -1000;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 250, 1000;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
