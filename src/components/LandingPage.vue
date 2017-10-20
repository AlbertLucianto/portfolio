<template>
  <div class="canvas">
    <svg class="h-container">
      <circle cx="100" :cy="hCurveStart" r="90" class="line h-curve"></circle>
      <line x1="190" :y1="hLineRightStart" x2="190" :y2="hLineRightEnd" class="line h-right"></line>
      <line x1="10"  :y1="hLineLeftStart" x2="10" y2="0" class="line h-left"></line>
    </svg>
    <svg class="i-container">
      <circle cx="40" :cy="iDotY" :r="iDotRadius" class="line i-dot"></circle>
      <line x1="40" :y1="iLineStart" x2="40" :y2="iLineEnd" class="line i"></line>
    </svg>
    <svg class="apostrophe-container">
      <line x1="60" :y1="aposLineStart + 15" :x2="aposDotX.value" :y2="aposDotY.value" class="line apostrophe-rope"></line>
      <circle :cx="aposDotX.value" :cy="aposDotY.value" r="25" class="fill apos-dot"
        :class="{ blinking: draggable, on: willReleaseTurnOn }"
        @mousedown="switchOn" @touchstart="switchOn"></circle>
      <line x1="60" :y1="aposLineStart" x2="80" y2="0" class="line apostrophe"></line>
    </svg>
    <svg class="light" v-if="lightCentre.isOn">
      <circle v-for="num in curRipples" :cx="lightCentre.x" :cy="lightCentre.y" r="10" :key="num" class="ripple"></circle>
    </svg>
    <div class="description" :class="{ disappearing: lightCentre.isOn }">
      <div class="title-wrapper">
        <h1 class="title">A Little Tour of Mine</h1>
      </div>
      <div class="author-wrapper">
        <h3 class="author">Created by Albert Lucianto</h3>
      </div>
    </div>
    <div class="guide" :style="guideStylePosition" :class="{ disappear: lightCentre.isOn }">
      <div class="instruction">
        {{ willReleaseTurnOn ? "Release." : "Pull to start the tour." }}
      </div>
    </div>
    <div class="diagonal-bg"/>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

export default {
  data() {
    return {
      window: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      iDotRadius: 50,
      aposSteadyPos: {
        x: 60,
        y: (window.innerHeight / 2) + 175,
      },
      aposDotX: {
        value: 25,
      },
      aposDotY: {
        value: (window.innerHeight / 2) + 50,
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
      return (this.window.height / 2) - 25;
    },
    hLineRightStart() {
      return (this.window.height / 2) - 25;
    },
    hLineRightEnd() {
      return this.window.height;
    },
    hLineLeftStart() {
      return (this.window.height / 2) + 125;
    },
    iLineStart() {
      return (this.window.height / 2) - 100;
    },
    iLineEnd() {
      return this.window.height;
    },
    aposLineStart() {
      return (this.window.height / 2) + 75;
    },
    iDotY() {
      return (this.window.height / 2) - 150;
    },
    guideStylePosition() {
      const offset = {
        x: this.aposDotX.value - 45,
        y: this.aposDotY.value - (this.window.height / 2),
      };
      return {
        left: `${((this.window.width / 2) - 275) + offset.x}px`,
        top: `${(this.window.height / 2) + offset.y}px`,
      };
    },
  },
  mounted() {
    window.addEventListener('resize', this.adjustWindowSize);
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
        value: this.aposSteadyPos.x,
      }, {
        type: dynamics.spring,
        duration: 5000,
        frequency: 400,
        friction: 50,
      });
      dynamics.animate(this.aposDotY, {
        value: this.aposSteadyPos.y,
      }, {
        type: dynamics.spring,
        duration: 5000,
        frequency: 650,
        friction: 300,
      });
    }, 1750);
    setTimeout(() => {
      this.draggable = true;
    }, 4500);
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
        window.addEventListener('touchmove', this.onDrag);
        window.addEventListener('touchend', this.release);
      }
    },
    onDrag(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging) {
        dynamics.stop(this.aposDotX);
        dynamics.stop(this.aposDotY);
        const startX = this.aposSteadyPos.x;
        const startY = this.aposSteadyPos.y;
        const dy = evt.pageY - startY;
        const dampY = dy > 0 ? 3 : 1.5;
        const dampX = 2;
        this.aposDotX.value = Math.min(
          Math.max(startX + ((evt.pageX - this.start.x) / dampX), 25),
          115);
        this.aposDotY.value = startY + (dy / dampY);
        if (this.aposDotY.value - startY > 0
        && ((this.aposDotX.value - startX) ** 2) + ((this.aposDotY.value - startY) ** 2) > 3600) {
          this.willReleaseTurnOn = true;
        } else {
          this.willReleaseTurnOn = false;
        }
      }
    },
    release(e) {
      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.release);
      window.removeEventListener('touchmove', this.onDrag);
      window.removeEventListener('touchend', this.release);
      if (this.dragging) {
        const startX = this.aposSteadyPos.x;
        const startY = this.aposSteadyPos.y;
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
            const numOfRipple = 3;
            this.curRipples.push(this.curRipples.length);
            const itv = setInterval(() => {
              if (this.curRipples.length < numOfRipple - 1) {
                this.curRipples.push(this.curRipples.length);
              } else if (this.curRipples.length === numOfRipple - 1) {
                clearInterval(itv);
                setTimeout(() => {
                  this.curRipples.push(this.curRipples.length);
                }, 300);
              }
            }, 750);
          }, 150);
          setTimeout(() => {
            this.$router.push('/me');
          }, 6000);
        }
      }
    },
    adjustWindowSize() {
      this.window = {
        height: window.innerHeight,
        width: window.innerWidth,
      };
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustWindowSize);
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
    width: 250px;
    height: 100%;
    margin: auto;
  }
  .light {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    animation: light 5s forwards ease;
    animation-delay: 1s;
    background: rgba(247, 249, 255, 0);
    opacity: 1;
  }
  .ripple {
    animation: ripple 3.5s forwards ease-out;
    fill: $black;
    opacity: 1;
    transform-origin: 50% 50%;
  }
  .description {
    position: fixed;
    display: inline-block;
    user-select: none;
    right: 50px;
    top: calc(50vh + 150px);
    margin: 50px;
    color: $white;
    width: 450px;
    overflow: hidden;
    &.disappearing {
      opacity: 0;
      transition: opacity .5s ease-in-out 5s;
    }
    .title-wrapper {
      animation: title 3.5s forwards ease-in-out;
      animation-delay: 1s;
      opacity: 0;
      width: 0;
      .title {
        animation: author-title-text 8s alternate infinite ease-in-out;
        white-space: nowrap;
        margin-bottom: 0;
      }
    }
    .author-wrapper {
      animation: author 3.5s forwards ease-in-out;
      animation-delay: 1.1s;
      opacity: 0;
      width: 0;
      .author {
        animation: author-title-text 8s alternate infinite ease-in-out;
        animation-delay: 1s;
        white-space: nowrap;
        text-align: right;
      }
    }
  }
  .guide {
    position: fixed;
    width: 0;
    border-top: 1px solid $yellow;
    padding-top: 5px;
    text-align: left;
    color: $yellow;
    animation: guide 0.5s forwards ease;
    animation-delay: 5s;
    transition: 500ms opacity ease;
    .instruction {
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      animation: instruction 0.75s forwards ease;
      animation-delay: 5.5s;
    }
    &.disappear {
      opacity: 0;
    }
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
      &:active {
        cursor: grabbing;
      }
    }
  }
  .diagonal-bg {
    background: $aqua;
    position: fixed;
    z-index: -1;
    bottom: 0;
    right: -22.5%;
    width: 50%;
    height: 50%;
    transform: rotate(-45deg) translateX(25px);
    opacity: 0;
    animation: diagonal-bg 1s forwards ease;
    animation-delay: 2.5s;
    border: 1px solid rgba(247, 249, 255, 0.5);
    box-shadow: -10px 5px 30px rgba(0,0,0,0.2);
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
    background: rgba(34, 33, 33, 0);
  }
  100% {
    background: rgba(34, 33, 33, 1);
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

@keyframes title {
  50% {
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

@keyframes author {
  55% {
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

@keyframes guide {
  100% {
    width: 300px;
  }
}

@keyframes instruction {
  0% {
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}

@keyframes diagonal-bg {
  100% {
    opacity: 1;
    transform: rotate(-45deg) translateX(-50px);
  }
}

@keyframes author-title-text {
  100% {
    transform: translateX(-15px);
  }
}
</style>
