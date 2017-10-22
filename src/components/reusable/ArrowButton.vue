<template>
  <svg class="arrow-container" :style="position"
    @touchstart="startClick" @mousedown="startClick">
    <circle class="circle" r="30" cx="30" cy="30"></circle>
    <path class="arrow-path" d="M 30 10 L 50 30 H 10 H 50 L 30 50"></path>
    <path class="arrow-path animate" d="M 30 10 L 50 30 H 10 H 50 L 30 50"></path>
  </svg>
</template>

<script>
export default {
  props: {
    startClick: Function,
    direction: {
      type: String,
      required: true,
      default: 'right',
      validator: val => val === 'right' || val === 'left',
    },
  },
  computed: {
    position() {
      const style = {};
      // style[this.direction] = '20px';
      if (this.direction === 'left') style.transform = 'scaleX(-1)';
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';

.arrow-container {
  // position: fixed;
  width: 60px;
  height: 60px;
  top: calc(50vh - 30px);
  transition: .25s opacity ease;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0,0,0,.2);
  opacity: .8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  .circle {
    fill: $purple;
  }
  .arrow-path {
    fill: none;
    stroke: $grey;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    &.animate {
      transition: .4s all ease;
      stroke: $white;
      stroke-dasharray: 0 140;
      stroke-dashoffset: 2;
    }
  }
  &:hover .arrow-path.animate {
    stroke-dasharray: 70 0;
  }
}
</style>
