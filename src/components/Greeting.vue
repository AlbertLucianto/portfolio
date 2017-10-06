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
        <line x1="60" :y1="aposLineStart + 15" :x2="aposDotX.value" :y2="aposDotY.value" class="line apostrophe-rope">
        </line>
        <circle :cx="aposDotX.value" :cy="aposDotY.value" r="25" class="fill apos-dot" :class="{ blinking: draggable, on: willReleaseTurnOn }" @mousedown="switchOn">
        </circle>
        <line x1="60" :y1="aposLineStart" x2="80" y2="0" class="line apostrophe">
        </line>
      </svg>
      <svg class="light" v-if="lightCentre.isOn">
        <circle v-for="num in curRipples" :cx="lightCentre.x" :cy="lightCentre.y" r="10" :key="num" class="ripple">
        </circle>
      </svg>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

export default {
  data() {
    return {
      frame: 0,
      totalFrame: 200,
      iDotRadius: 50,
      aposDotX: {
        value: 25,
      },
      aposDotY: {
        value: (window.innerHeight / 2) + 25,
      },
      blinking: false,
      dragging: false,
      draggable: false,
      lightCentre: {
        isOn: false,
        x: 0, // Unset
        y: 0, // Unset
      },
      curRipples: [],
      start: { x: 0, y: 0 },
      willReleaseTurnOn: false,
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
    setTimeout(() => {
      dynamics.animate(this.aposDotX, {
        value: 60,
      }, {
        type: dynamics.spring,
        duration: 3500,
        frequency: 350,
        friction: 50,
      });
      dynamics.animate(this.aposDotY, {
        value: (window.innerHeight / 2) + 150,
      }, {
        type: dynamics.spring,
        duration: 3500,
        frequency: 600,
        friction: 300,
      });
    }, 1750);
    setTimeout(() => {
      this.draggable = true;
    }, 4000);
  },
  methods: {
    switchOn(e) {
      if (this.draggable) {
        this.aposDotY.value = this.aposDotY.value + 20;
        this.dragging = true;
        const evt = e.changedTouches ? e.changedTouches[0] : e;
        this.start.x = evt.pageX;
        this.start.y = evt.pageY;
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.release);
      }
    },
    onDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging) {
        const startX = 60;
        const startY = (window.innerHeight / 2) + 150;
        this.aposDotX.value = Math.min(Math.max(startX + (evt.pageX - this.start.x), 25), 115);
        this.aposDotY.value = startY + (evt.pageY - this.start.y);
        if (this.aposDotY.value - startY > 0
        && ((this.aposDotX.value - startX) ** 2) + ((this.aposDotY.value - startY) ** 2) > 6400) {
          this.willReleaseTurnOn = true;
        } else {
          this.willReleaseTurnOn = false;
        }
      }
    },
    release(e) {
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.release);
      if (this.dragging) {
        const startX = 60;
        const startY = (window.innerHeight / 2) + 150;
        dynamics.animate(this.aposDotY, {
          value: startY,
        }, {
          type: dynamics.spring,
          duration: 1000,
          frequency: 300,
          friction: 300,
        });
        dynamics.animate(this.aposDotX, {
          value: startX,
        }, {
          type: dynamics.spring,
          duration: 2000,
          frequency: 140,
          friction: 70,
        });
        this.dragging = false;
        if (this.willReleaseTurnOn) {
          this.willReleaseTurnOn = false;
          this.lightCentre.isOn = true;
          this.lightCentre.x = e.pageX;
          this.lightCentre.y = e.pageY;
          setTimeout(() => {
            this.curRipples.push(this.curRipples.length);
            setInterval(() => {
              if (this.curRipples.length < 3) {
                this.curRipples.push(this.curRipples.length);
              }
            }, 1500);
          }, 150);
          setTimeout(() => {
            this.$router.push('/home/');
          }, 6000);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './styles/colors.scss';

.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: $purple;
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
    width: 140px;
    height: 100%;
    margin: auto;
  }
  .light {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    animation: light 6s forwards ease;
    animation-delay: 1s;
    background: rgba(247, 249, 255, 0);
    opacity: 1;
  }
  .ripple {
    animation: ripple 4s forwards ease-out;
    fill: $white;
    opacity: 1;
    transform-origin: 50% 50%;
  }
  .line {
    stroke-miterlimit: 50;
    stroke-width: 20;
    fill: none;
    stroke: $white;
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
      stroke-width: 35;
      animation-delay: 0.25s;
      opacity: 0;
    }
    &.apostrophe-rope {
      stroke-width: 5;
      stroke: $warmRed;
      animation: apos-dot 0.75s forwards ease;
      animation-delay: 1.85s;
      opacity: 0;
    }
  }
  .fill {
    fill: $warmRed;
    &.apos-dot {
      animation: apos-dot 0.75s forwards ease;
      animation-delay: 2s;
      opacity: 0;
      cursor: pointer;
      &.blinking {
        animation: blinking 5s infinite ease;
        opacity: 1;
        &.on {
          animation: none;
          fill: $white;
        }
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

@keyframes apos-dot {
  100% {
    opacity: 1;
  }
}

@keyframes blinking {
  0% {
    fill: $warmRed;
  }
  50% {
    fill: $lightRed;
  }
  100% {
    fill: $warmRed;
  }
}

@keyframes light {
  0% {
    background: rgba(247, 249, 255, 0);
  }
  100% {
    background: rgba(247, 249, 255, 1);
  }
}

@keyframes ripple {
  33% {
    opacity: 0.5;
  }
  66% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: scale(100, 100);
  }
}
</style>
