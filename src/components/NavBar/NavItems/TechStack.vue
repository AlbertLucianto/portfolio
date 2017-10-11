<template>
  <div>
    <router-link to="/tools" class="link">
      <div class="app" :class="{ over }">
        <div class="inner-app"></div>
      </div>
      <svg class="tools" :class="{ over }">
        <line
          :x1="lines.topLeft.start.x" :y1="lines.topLeft.start.y"
          :x2="lines.topLeft.end.x" :y2="lines.topLeft.end.y"
          class="code-line" :class="{ over, disappear: over }"></line>
        <line
          :x1="lines.bottomLeft.start.x" :y1="lines.bottomLeft.start.y"
          :x2="lines.bottomLeft.end.x" :y2="lines.bottomLeft.end.y"
          class="code-line" :class="{ over, disappear: over }"></line>
        <line
          :x1="lines.topRight.start.x" :y1="lines.topRight.start.y"
          :x2="lines.topRight.end.x" :y2="lines.topRight.end.y"
          class="code-line" :class="{ over, disappear: over }"></line>
        <line
          :x1="lines.bottomRight.start.x" :y1="lines.bottomRight.start.y"
          :x2="lines.bottomRight.end.x" :y2="lines.bottomRight.end.y"
          class="code-line" :class="{ over, disappear: over }"></line>
        <line :x1="lines.slash.start.x" :y1="lines.slash.start.y"
          :x2="lines.slash.end.x" :y2="lines.slash.end.y"
          class="code-line" :class="{ over }"></line>
        <g class="control-group" :class="{ over }">
          <circle cx="0" cy="0" :r="rAbs.red" class="red"></circle>
          <circle cx="12.5" cy="0" :r="rAbs.yellow" class="yellow"></circle>
          <circle cx="25" cy="0" :r="rAbs.green" class="green"></circle>
        </g>
        <rect class="tools-helper" width="110" height="110"
        @mouseover="animateIn" @mouseout="animateOut"></rect>
      </svg>
      <div class="text">Tech Stack</div>
    </router-link>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';
/*
grid metrics:
(2 + 5 + 2) x (1 x 3)
*/
const initTopLeft = {
  start: { x: 30, y: 25 },
  end: { x: 10, y: 50 },
};
const initBottomLeft = {
  start: { x: 30, y: 75 },
  end: { x: 10, y: 50 },
};
const initTopRight = {
  start: { x: 80, y: 25 },
  end: { x: 100, y: 50 },
};
const initBottomRight = {
  start: { x: 80, y: 75 },
  end: { x: 100, y: 50 },
};
const initSlash = {
  start: { x: 65, y: 22.5 },
  end: { x: 45, y: 77.5 },
};
const targetR = 5;

const animateEase = (line, newPos) => {
  dynamics.animate(line.start, {
    x: newPos.start.x,
    y: newPos.start.y,
  }, {
    type: dynamics.easeInOut,
    duration: 350,
    friction: 150,
  });
  dynamics.animate(line.end, {
    x: newPos.end.x,
    y: newPos.end.y,
  }, {
    type: dynamics.easeInOut,
    duration: 350,
    friction: 150,
  });
};

export default {
  data() {
    return {
      over: false,
      lines: {
        topLeft: {
          start: { ...initTopLeft.start },
          end: { ...initTopLeft.end },
        },
        bottomLeft: {
          start: { ...initBottomLeft.start },
          end: { ...initBottomLeft.end },
        },
        topRight: {
          start: { ...initTopRight.start },
          end: { ...initTopRight.end },
        },
        bottomRight: {
          start: { ...initBottomRight.start },
          end: { ...initBottomRight.end },
        },
        slash: {
          start: { ...initSlash.start },
          end: { ...initSlash.end },
        },
      },
      r: {
        red: 0,
        yellow: 0,
        green: 0,
      },
    };
  },
  computed: {
    rAbs() {
      return {
        red: Math.abs(this.r.red),
        yellow: Math.abs(this.r.yellow),
        green: Math.abs(this.r.green),
      };
    },
  },
  methods: {
    animateIn() {
      this.over = true;
      animateEase(this.lines.topLeft, {
        start: { x: initTopRight.end.x, y: initTopRight.start.y },
        end: { x: initTopLeft.end.x, y: initTopLeft.start.y },
      });
      animateEase(this.lines.bottomLeft, {
        start: { x: initBottomLeft.end.x, y: initBottomLeft.start.y + 10 },
        end: { x: initTopLeft.end.x, y: initTopLeft.start.y },
      });
      animateEase(this.lines.topRight, {
        start: { x: initTopRight.end.x, y: initTopRight.start.y },
        end: { x: initTopRight.end.x, y: initBottomLeft.start.y + 10 },
      });
      animateEase(this.lines.bottomRight, {
        start: { x: initBottomLeft.end.x, y: initBottomLeft.start.y + 10 },
        end: { x: initBottomRight.end.x, y: initBottomRight.start.y + 10 },
      });
      animateEase(this.lines.bottomRight, {
        start: { x: initBottomLeft.end.x, y: initBottomLeft.start.y + 10 },
        end: { x: initBottomRight.end.x, y: initBottomRight.start.y + 10 },
      });
      animateEase(this.lines.slash, {
        start: { x: initTopRight.end.x, y: initTopRight.start.y + 20 },
        end: { x: initTopLeft.end.x, y: initTopLeft.start.y + 20 },
      });
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          red: targetR,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 100);
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          yellow: targetR,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 200);
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          green: targetR,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 300);
    },
    animateOut() {
      this.over = false;
      animateEase(this.lines.topLeft, { ...initTopLeft });
      animateEase(this.lines.bottomLeft, { ...initBottomLeft });
      animateEase(this.lines.topRight, { ...initTopRight });
      animateEase(this.lines.bottomRight, { ...initBottomRight });
      animateEase(this.lines.slash, { ...initSlash });
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          red: 0,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 100);
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          yellow: 0,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 200);
      dynamics.setTimeout(() => {
        dynamics.animate(this.r, {
          green: 0,
        }, {
          type: dynamics.spring,
          duration: 300,
          frequency: 100,
          friction: 150,
        });
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.tools {
  width: 110px;
  height: 110px;
  margin: 20px;
  margin-top: 25px;
  margin-bottom: -5px;
  text-align: center;
  transition: 150ms all ease;
  cursor: pointer;
  .code-line {
    stroke: $warmRed;
    stroke-width: 6px;
    stroke-linecap: round;
    transition: 200ms stroke-width ease 150ms, 200ms stroke ease 350ms, 300ms opacity ease 100ms;
    &.over {
      stroke-width: 1.5px;
      stroke: $lightGrey;
      transition: 200ms stroke-width ease 150ms, 200ms stroke ease 300ms, 300ms opacity ease 450ms;
    }
    &.disappear {
      opacity: 0;
    }
  }
  &-helper {
    opacity: 0;
  }
  &.over {
    transform: scale(1.2);
  }
  .control-group {
    opacity: 0;
    transition: 150ms opacity ease 500ms;
    transform: translate3d(20px, 35px, 0);
    &.over {
      opacity: 1;
      transition: 150ms opacity ease;
    }
    .red {
      fill: $warmRed;
    }
    .yellow {
      fill: $yellow;
    }
    .green {
      fill: $aqua;
    }
  }
}
.app {
  position: absolute;
  z-index: -1;
  fill: white;
  width: 107.5px;
  height: 72.5px;
  top: 43.5px;
  left: 21.5px;
  opacity: 0;
  transition: 200ms all ease 100ms;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.25);
  overflow: hidden;
  &.over {
    opacity: 1;
  }
  .inner-app {
    width: 100%;
    margin-top: 24px;
    height: calc(100% - 24px);
    background: $purple;
  }
}
.link {
  &:link, &:visited, &:active {
    text-decoration: none;
    .text {
      color: $black;
      font-weight: 700;
      transition: 250ms color ease;
    }
  }
  &:hover .text {
    color: $warmRed;
  }
}
</style>
