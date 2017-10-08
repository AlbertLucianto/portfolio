<template>
  <svg class="profile"
  @mouseover="startMoveHead" @mousemove="moveHead" @mouseout="endMoveHead">
    <circle cx="50" cy="50" r="50" class="head"
    @mouseover="startMoveFace" @mousemove="moveFace" @mouseout="endMoveFace"></circle>
    <g :style="faceStyle">
      <circle cx="-20" cy="-10" r="5" class="eye"></circle>
      <circle cx="20" cy="-10" r="5" class="eye"></circle>
      <path :d="mouthPath" class="mouth"></path>
    </g>
  </svg>
</template>

<script>
const startFacePos = { x: 50, y: 50 };

export default {
  data() {
    return {
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
      A 10 2.5 0 0 1 -10 15
      Z
      `;
    },
  },
  methods: {
    startMoveHead() {},
    moveHead() {},
    endMoveHead() {},
    startMoveFace() {},
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
