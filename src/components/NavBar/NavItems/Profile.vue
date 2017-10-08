<template>
  <div ref="profile">
    <svg class="profile" @mousemove="moveHead" @mouseout="endMoveHead">
      <circle cx="50" cy="50" r="50" class="head" @mousemove="moveFace" @mouseout="endMoveFace"></circle>
      <g :style="faceStyle">
        <circle cx="-20" cy="-10" r="5" class="eye"></circle>
        <circle cx="20" cy="-10" r="5" class="eye"></circle>
        <path :d="mouthPath" class="mouth"></path>
      </g>
    </svg>
  </div>
</template>

<script>
import dynamics from 'dynamics.js';

const startFacePos = { x: 50, y: 50 };
const dampMove = { x: 7.5, y: 7.5 };

export default {
  data() {
    return {
      over: false,
      facePos: { ...startFacePos },
    };
  },
  computed: {
    faceStyle() {
      return {
        transform: `translate3d(${this.facePos.x}px, ${this.facePos.y}px, 0)`,
      };
    },
    mouthPath() {
      return `
      M -10, 15
      A 10 7.5 0 1 0 10 15
      ${this.over ? '' : 'A 10 3 0 0 1 -10 15'}
      Z
      `;
    },
  },
  methods: {
    moveHead(e) {
      const evt = e.changedTouches ? e.changedTouches[0] : e;
      const rect = this.$refs.profile.getBoundingClientRect();
      const center = {
        x: (rect.left + rect.right) / 2,
        y: (rect.top + rect.bottom) / 2,
      };
      this.over = true;
      dynamics.stop(this.facePos);
      this.facePos.x = startFacePos.x + ((evt.pageX - center.x) / dampMove.x);
      this.facePos.y = startFacePos.y + ((evt.pageY - center.y) / dampMove.y);
    },
    endMoveHead() {
      this.over = false;
      dynamics.animate(this.facePos, {
        x: startFacePos.x,
        y: startFacePos.y,
      }, {
        type: dynamics.easeOut,
        duration: 500,
        friction: 50,
      });
    },
    moveFace() {},
    endMoveFace() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/colors.scss';

.profile {
  width: 100px;
  height: 100px;
  margin: 20px 20px;
  .head {
    fill: $orange;
  }
  .eye {
    fill: $purple;
  }
  .mouth {
    stroke: $purple;
    stroke-width: 2px;
    fill: $purple;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}
</style>
